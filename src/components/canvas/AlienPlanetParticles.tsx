"use client";

import { useRef, useMemo, useState, useEffect, useSyncExternalStore } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Image from "next/image";
import fallbackData from "@/data/alienPlanetParticlesFallback.json";

export interface AlienPlanetParticlesProps {
    accentColor?: string;
    onReady?: () => void;
}

// ----------------------------------------------------------------------
// GLSL SHADERS FOR PERFECT IMAGE-TO-PARTICLE RECONSTRUCTION
// ----------------------------------------------------------------------

const IMAGE_PARTICLES_VERTEX_SHADER = /* glsl */ `
    uniform float uTime;
    uniform float uProgress;
    uniform vec3 uMouseWorld;
    uniform float uRepulsionRadius;
    uniform float uRepulsionStrength;
    uniform float uReducedMotion;
    uniform float uPointSize;

    attribute vec3 aTargetPosition;
    attribute vec3 aScatterPosition;
    attribute vec3 aColor;
    attribute float aRandom;
    attribute float aSize;

    varying vec3 vColor;
    varying float vAlpha;
    varying float vLum;

    void main() {
        vColor = aColor;
        float lum = dot(aColor, vec3(0.299, 0.587, 0.114));
        vLum = lum;

        // --- STEP 2: ANIMATION (SCATTER TO TARGET ASSEMBLY) ---
        // Staggered launch per particle for organic cinematic arrival
        float delay = aRandom * 0.28;
        float p = clamp((uProgress - delay) / (1.0 - 0.28), 0.0, 1.0);

        // Smooth cubic easing curve
        float t = p * p * (3.0 - 2.0 * p);
        if (uReducedMotion > 0.5) {
            t = 1.0;
        }

        // Interpolate between initial 3D scattered position and target pixel position
        vec3 currentPos = mix(aScatterPosition, aTargetPosition, t);

        // Subtle organic breathing motion once assembled (preserves crystal clear image structure)
        if (t > 0.05 && uReducedMotion < 0.5) {
            float floatAmp = t * 0.045;
            currentPos.x += sin(uTime * 0.5 + aRandom * 6.28) * floatAmp;
            currentPos.y += cos(uTime * 0.6 + aRandom * 6.28) * (floatAmp * 1.2);
            currentPos.z += sin(uTime * 0.4 + aRandom * 3.14) * (floatAmp * 1.4);
        }

        // --- STEP 3: MOUSE REPULSION ---
        // Nearby particles move away from cursor and smoothly return to original positions
        if (t > 0.2 && uReducedMotion < 0.5) {
            vec2 diff = currentPos.xy - uMouseWorld.xy;
            float dist = length(diff);
            if (dist < uRepulsionRadius && dist > 0.001) {
                float normDist = dist / uRepulsionRadius;
                // Quadratic falloff for natural spring push
                float pushForce = (1.0 - normDist) * (1.0 - normDist) * uRepulsionStrength * t;
                vec2 pushDir = normalize(diff);
                currentPos.xy += pushDir * pushForce;
                currentPos.z += pushForce * 0.8; // Gentle depth repulsion
            }
        }

        vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        // Point size scaled to seamlessly tile adjacent pixels into a solid image
        float pSize = aSize * uPointSize;

        // Twinkling stars in the night sky
        if (aTargetPosition.y > 1.0 && lum > 0.4) {
            pSize *= (1.0 + sin(uTime * 2.5 + aRandom * 12.0) * 0.25);
        }

        // Perspective point size
        gl_PointSize = pSize * (22.0 / -mvPosition.z);

        // Alpha fade-in during assembly
        vAlpha = smoothstep(0.0, 0.25, t);
    }
`;

const IMAGE_PARTICLES_FRAGMENT_SHADER = /* glsl */ `
    varying vec3 vColor;
    varying float vAlpha;
    varying float vLum;

    uniform vec3 uAccentPrimary;
    uniform vec3 uAccentSecondary;

    void main() {
        // Soft circular particle shape
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        if (dist > 0.5) discard;

        // Soft radial edge
        float softShape = smoothstep(0.5, 0.08, dist);

        // Preserve authentic original pixel colours (volcanic rock, mint mist, white crescent, stars)
        vec3 col = vColor;

        // Lift dark volcanic rock contrast so mountains, crags and valleys are razor sharp & solid
        if (vLum < 0.18) {
            col = max(col * 1.45, vec3(0.035, 0.065, 0.045));
        }

        // Subtle emerald atmospheric lighting on high-luminance highlights (restrained & cinematic)
        if (vLum > 0.35) {
            col = mix(col, uAccentPrimary, 0.08 * vLum);
        }

        // Solid normal blending alpha
        float finalAlpha = softShape * vAlpha * (0.85 + vLum * 0.15);
        gl_FragColor = vec4(col, finalAlpha);
    }
`;

// ----------------------------------------------------------------------
// SCENE COMPONENT: PARTICLE MESH & INTERACTION
// ----------------------------------------------------------------------
interface ParticleMeshProps {
    geometry: THREE.BufferGeometry;
    isReducedMotion: boolean;
}

function ParticleMesh({ geometry, isReducedMotion }: ParticleMeshProps) {
    const meshRef = useRef<THREE.Points>(null!);
    const matRef = useRef<THREE.ShaderMaterial>(null!);
    const { camera, size } = useThree();

    const progress = useRef(isReducedMotion ? 1.0 : 0.0);
    const mousePos = useRef({ x: 0, y: 0 });
    const targetMouse = useRef({ x: 0, y: 0 });

    // Dynamic point size factor calculated from viewport height to guarantee particles overlap seamlessly
    const dynamicPointSize = useMemo(() => {
        const isMobile = size.width < 768;
        // Calibrate point size so particles tile cleanly across the canvas
        return isMobile ? 3.8 : 4.6;
    }, [size.width]);

    // Track mouse coordinates normalized [-1, 1]
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const nx = (e.clientX / window.innerWidth - 0.5) * 2.0;
            const ny = -(e.clientY / window.innerHeight - 0.5) * 2.0;
            targetMouse.current.x = nx;
            targetMouse.current.y = ny;
        };

        const handleMouseLeave = () => {
            targetMouse.current.x = 0;
            targetMouse.current.y = 0;
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    // Uniforms initialization
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uProgress: { value: isReducedMotion ? 1.0 : 0.0 },
            uMouseWorld: { value: new THREE.Vector3(999, 999, 0) },
            uRepulsionRadius: { value: 5.2 },
            uRepulsionStrength: { value: 1.6 },
            uReducedMotion: { value: isReducedMotion ? 1.0 : 0.0 },
            uPointSize: { value: dynamicPointSize },
            uAccentPrimary: { value: new THREE.Color("#63E81D") },
            uAccentSecondary: { value: new THREE.Color("#9CFF4F") }
        }),
        [isReducedMotion, dynamicPointSize]
    );

    useFrame((_, delta) => {
        const dt = Math.min(delta, 0.05);

        // Smooth assembly animation
        if (!isReducedMotion && progress.current < 1.0) {
            progress.current = Math.min(1.0, progress.current + dt * 0.45);
        }

        // Smooth spring mouse interpolation
        mousePos.current.x += (targetMouse.current.x - mousePos.current.x) * (dt * 3.5);
        mousePos.current.y += (targetMouse.current.y - mousePos.current.y) * (dt * 3.5);

        // Convert mouse position to 3D world plane coordinates at Z = 0
        const fovRad = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
        const distZ = Math.abs(camera.position.z);
        const vHeight = 2.0 * Math.tan(fovRad / 2.0) * distZ;
        const vWidth = vHeight * (size.width / size.height);

        const worldX = (mousePos.current.x / 2.0) * vWidth;
        const worldY = (mousePos.current.y / 2.0) * vHeight;

        // Subtle camera/mesh parallax tilt (restrained & cinematic)
        if (meshRef.current && !isReducedMotion) {
            meshRef.current.rotation.y = mousePos.current.x * 0.035;
            meshRef.current.rotation.x = -mousePos.current.y * 0.025;
        }

        // Update uniforms
        if (matRef.current) {
            matRef.current.uniforms.uTime.value += dt;
            matRef.current.uniforms.uProgress.value = progress.current;
            matRef.current.uniforms.uMouseWorld.value.set(worldX, worldY, 0);
            matRef.current.uniforms.uPointSize.value = dynamicPointSize;
        }
    });

    return (
        <points ref={meshRef} geometry={geometry}>
            <shaderMaterial
                ref={matRef}
                vertexShader={IMAGE_PARTICLES_VERTEX_SHADER}
                fragmentShader={IMAGE_PARTICLES_FRAGMENT_SHADER}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                blending={THREE.NormalBlending}
            />
        </points>
    );
}

// ----------------------------------------------------------------------
// MAIN EXPORT COMPONENT
// ----------------------------------------------------------------------
function useClientMount() {
    return useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );
}

export default function AlienPlanetParticles({ accentColor = "#63E81D" }: AlienPlanetParticlesProps) {
    const isClient = useClientMount();
    const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
    const [hasWebGL, setHasWebGL] = useState<boolean>(true);
    const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

    useEffect(() => {
        // 1. Detect WebGL support
        try {
            const canvas = document.createElement("canvas");
            const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
            if (!gl) {
                setHasWebGL(false);
                return;
            }
        } catch {
            setHasWebGL(false);
            return;
        }

        // 2. Detect prefers-reduced-motion
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setIsReducedMotion(reduced);

        const isMobile = window.innerWidth < 768;
        const planeW = isMobile ? 32.0 : 38.0;
        const planeH = planeW / 2.6667;

        // Function to build Three.js BufferGeometry from particle arrays
        const buildGeometry = (
            targetPositions: number[],
            scatterPositions: number[],
            colors: number[],
            randoms: number[],
            sizes: number[]
        ) => {
            const geo = new THREE.BufferGeometry();
            geo.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(targetPositions), 3));
            geo.setAttribute("aTargetPosition", new THREE.Float32BufferAttribute(new Float32Array(targetPositions), 3));
            geo.setAttribute("aScatterPosition", new THREE.Float32BufferAttribute(new Float32Array(scatterPositions), 3));
            geo.setAttribute("aColor", new THREE.Float32BufferAttribute(new Float32Array(colors), 3));
            geo.setAttribute("aRandom", new THREE.Float32BufferAttribute(new Float32Array(randoms), 1));
            geo.setAttribute("aSize", new THREE.Float32BufferAttribute(new Float32Array(sizes), 1));
            setGeometry(geo);
        };

        // Fallback generator from pre-computed raw pixel data
        const loadFallbackData = () => {
            const targetPositions: number[] = [];
            const scatterPositions: number[] = [];
            const colors: number[] = [];
            const randoms: number[] = [];
            const sizes: number[] = [];

            const step = isMobile ? 2 : 1;
            for (let i = 0; i < fallbackData.count; i += step) {
                const u = fallbackData.u[i];
                const v = fallbackData.v[i];
                const r = fallbackData.r[i];
                const g = fallbackData.g[i];
                const b = fallbackData.b[i];
                const z = fallbackData.z[i];

                const tx = (u - 0.5) * planeW;
                const ty = (0.5 - v) * planeH;

                targetPositions.push(tx, ty, z);

                // Scatter positions in 3D volume
                const phi = Math.random() * Math.PI * 2;
                const theta = Math.acos(Math.random() * 2 - 1);
                const scatterRadius = 24.0 + Math.random() * 32.0;
                const sx = scatterRadius * Math.sin(theta) * Math.cos(phi);
                const sy = scatterRadius * Math.sin(theta) * Math.sin(phi);
                const sz = (Math.random() - 0.5) * 35.0 - 8.0;

                scatterPositions.push(sx, sy, sz);
                colors.push(r, g, b);
                randoms.push(Math.random());

                const lum = 0.299 * r + 0.587 * g + 0.114 * b;
                let size = isMobile ? 1.2 : 1.5;
                if (lum > 0.45) size = isMobile ? 1.8 : 2.4;
                else if (lum > 0.2) size = isMobile ? 1.5 : 1.9;
                sizes.push(size);
            }

            buildGeometry(targetPositions, scatterPositions, colors, randoms, sizes);
        };

        // Primary: Offscreen HTML Canvas Sampling
        try {
            const sampleW = isMobile ? 160 : 256;
            const sampleH = isMobile ? 60 : 96;

            const img = new window.Image();
            // Note: DO NOT set crossOrigin="anonymous" on relative path to prevent canvas tainting on localhost
            img.src = "/images/alien-planet.png";

            let processed = false;
            const processCanvas = () => {
                if (processed) return;
                processed = true;

                try {
                    const offCanvas = document.createElement("canvas");
                    offCanvas.width = sampleW;
                    offCanvas.height = sampleH;
                    const ctx = offCanvas.getContext("2d", { willReadFrequently: true });
                    if (!ctx) {
                        loadFallbackData();
                        return;
                    }

                    ctx.drawImage(img, 0, 0, sampleW, sampleH);
                    const imgData = ctx.getImageData(0, 0, sampleW, sampleH).data;

                    const targetPositions: number[] = [];
                    const scatterPositions: number[] = [];
                    const colors: number[] = [];
                    const randoms: number[] = [];
                    const sizes: number[] = [];

                    for (let y = 0; y < sampleH; y++) {
                        const vNorm = y / (sampleH - 1);
                        for (let x = 0; x < sampleW; x++) {
                            const uNorm = x / (sampleW - 1);
                            const idx = (y * sampleW + x) * 4;

                            const r = imgData[idx] / 255;
                            const g = imgData[idx + 1] / 255;
                            const b = imgData[idx + 2] / 255;
                            const lum = 0.299 * r + 0.587 * g + 0.114 * b;

                            // Skip empty black sky void
                            if (vNorm < 0.42 && lum < 0.015) continue;
                            if (vNorm >= 0.42 && lum < 0.003) continue;

                            const tx = (uNorm - 0.5) * planeW;
                            const ty = (0.5 - vNorm) * planeH;

                            let tz = 0.0;
                            if (vNorm >= 0.42) {
                                const t = (vNorm - 0.42) / 0.58;
                                tz = (t * 3.2 - 1.8) + lum * 1.2;
                            } else if (uNorm > 0.54 && vNorm < 0.62) {
                                const du = uNorm - 0.77;
                                const dv = (vNorm - 0.36) * 2.667;
                                const dist = Math.sqrt(du * du + dv * dv);
                                if (dist < 0.26) {
                                    tz = -1.0 + Math.sqrt(Math.max(0, 0.26 * 0.26 - dist * dist)) * 4.5;
                                } else {
                                    tz = -3.5;
                                }
                            } else {
                                tz = -4.5 + (Math.random() - 0.5) * 1.0;
                            }

                            targetPositions.push(tx, ty, tz);

                            const phi = Math.random() * Math.PI * 2;
                            const theta = Math.acos(Math.random() * 2 - 1);
                            const scatterRadius = 24.0 + Math.random() * 32.0;
                            const sx = scatterRadius * Math.sin(theta) * Math.cos(phi);
                            const sy = scatterRadius * Math.sin(theta) * Math.sin(phi);
                            const sz = (Math.random() - 0.5) * 35.0 - 8.0;

                            scatterPositions.push(sx, sy, sz);
                            colors.push(r, g, b);
                            randoms.push(Math.random());

                            let size = isMobile ? 1.2 : 1.5;
                            if (lum > 0.45) size = isMobile ? 1.8 : 2.4;
                            else if (lum > 0.2) size = isMobile ? 1.5 : 1.9;
                            sizes.push(size);
                        }
                    }

                    if (targetPositions.length > 1000) {
                        buildGeometry(targetPositions, scatterPositions, colors, randoms, sizes);
                    } else {
                        loadFallbackData();
                    }
                } catch {
                    loadFallbackData();
                }
            };

            if (img.complete && img.naturalWidth > 0) {
                processCanvas();
            } else {
                img.onload = processCanvas;
                img.onerror = () => loadFallbackData();
            }
        } catch {
            loadFallbackData();
        }

        return () => {
            if (geometry) {
                geometry.dispose();
            }
        };
    }, []);

    // Static fallback if WebGL is unavailable
    if (!hasWebGL) {
        return (
            <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden flex items-center justify-center">
                <Image
                    src="/images/alien-planet.png"
                    alt="Alien Planet Landscape"
                    fill
                    className="object-cover opacity-75 filter contrast-125"
                    priority
                />
            </div>
        );
    }

    if (!isClient) {
        return null;
    }

    return (
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden flex items-center justify-center">
            {geometry && (
                <Canvas
                    camera={{ position: [0, 0, 22], fov: 45 }}
                    dpr={[1, 2]}
                    gl={{
                        alpha: true,
                        antialias: false,
                        powerPreference: "high-performance",
                        stencil: false,
                        depth: false
                    }}
                >
                    <ParticleMesh geometry={geometry} isReducedMotion={isReducedMotion} />
                </Canvas>
            )}
        </div>
    );
}
