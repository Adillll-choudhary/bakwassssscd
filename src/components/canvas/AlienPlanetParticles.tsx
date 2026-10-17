"use client";

import { useRef, useMemo, useState, useEffect, useSyncExternalStore } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Image from "next/image";

export interface AlienPlanetParticlesProps {
    accentColor?: string;
    onReady?: () => void;
}

// ----------------------------------------------------------------------
// GLSL SHADERS FOR IMAGE-TO-PARTICLE RECONSTRUCTION
// ----------------------------------------------------------------------

const IMAGE_PARTICLES_VERTEX_SHADER = /* glsl */ `
    uniform float uTime;
    uniform float uProgress;
    uniform vec3 uMouseWorld;
    uniform float uRepulsionRadius;
    uniform float uRepulsionStrength;
    uniform float uReducedMotion;

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
        // Staggered flight: each particle has an organic launch offset
        float delay = aRandom * 0.28;
        float p = clamp((uProgress - delay) / (1.0 - 0.28), 0.0, 1.0);

        // Smooth quintic easing curve for cinematic arrival
        float t = p * p * (3.0 - 2.0 * p);
        if (uReducedMotion > 0.5) {
            t = 1.0;
        }

        // Interpolate between initial 3D scattered position and target pixel position
        vec3 currentPos = mix(aScatterPosition, aTargetPosition, t);

        // Subtle floating movement and depth once assembled (preserves clear image recognizability)
        if (t > 0.02 && uReducedMotion < 0.5) {
            float floatAmp = t * 0.055;
            currentPos.x += sin(uTime * 0.5 + aRandom * 6.28) * floatAmp;
            currentPos.y += cos(uTime * 0.6 + aRandom * 6.28) * (floatAmp * 1.25);
            currentPos.z += sin(uTime * 0.4 + aRandom * 3.14) * (floatAmp * 1.5);
        }

        // --- STEP 3: MOUSE REPULSION ---
        // Nearby particles move away from cursor and smoothly return to original positions
        if (t > 0.15 && uReducedMotion < 0.5) {
            vec2 diff = currentPos.xy - uMouseWorld.xy;
            float dist = length(diff);
            if (dist < uRepulsionRadius && dist > 0.001) {
                float normDist = dist / uRepulsionRadius;
                // Quadratic falloff for smooth return
                float pushForce = (1.0 - normDist) * (1.0 - normDist) * uRepulsionStrength * t;
                vec2 pushDir = normalize(diff);
                currentPos.xy += pushDir * pushForce;
                currentPos.z += pushForce * 0.7; // Gentle depth repulsion
            }
        }

        vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        // Perspective point size attenuation
        float pSize = aSize;
        // Subtle twinkling for bright stars in the sky
        if (aTargetPosition.y > 1.0 && lum > 0.35) {
            pSize *= (1.0 + sin(uTime * 2.2 + aRandom * 12.0) * 0.22);
        }
        gl_PointSize = pSize * (38.0 / -mvPosition.z);

        // Cinematic fade-in as particles arrive
        vAlpha = smoothstep(0.0, 0.2, t);
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

        // Smooth Gaussian-like soft edge
        float softShape = smoothstep(0.5, 0.06, dist);

        // Preserve authentic original pixel colours (volcanic rock, mint mist, white crescent, stars)
        vec3 col = vColor;

        // Subtle emerald atmospheric lighting in highlights (restrained & cinematic)
        if (vLum > 0.3) {
            col = mix(col, uAccentPrimary, 0.06 * vLum);
        }

        gl_FragColor = vec4(col, softShape * vAlpha);
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
            uRepulsionRadius: { value: 5.5 },
            uRepulsionStrength: { value: 1.8 },
            uReducedMotion: { value: isReducedMotion ? 1.0 : 0.0 },
            uAccentPrimary: { value: new THREE.Color("#63E81D") },
            uAccentSecondary: { value: new THREE.Color("#9CFF4F") }
        }),
        [isReducedMotion]
    );

    useFrame((_, delta) => {
        const dt = Math.min(delta, 0.05);

        // Smooth assembly animation (takes ~2.2s for cinematic flight)
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
                blending={THREE.AdditiveBlending}
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

        // 3. Responsive particle grid configuration
        const isMobile = window.innerWidth < 768;
        // Desktop: 280 x 105 (~29.4k potential pixels)
        // Mobile: 160 x 60 (~9.6k potential pixels for 60 FPS mobile performance)
        const sampleW = isMobile ? 160 : 280;
        const sampleH = isMobile ? 60 : 105;

        // 4. Sample image pixels using offscreen HTML canvas
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.src = "/images/alien-planet.png";

        let isDisposed = false;

        img.onload = () => {
            if (isDisposed) return;

            const offCanvas = document.createElement("canvas");
            offCanvas.width = sampleW;
            offCanvas.height = sampleH;
            const ctx = offCanvas.getContext("2d", { willReadFrequently: true });
            if (!ctx) return;

            ctx.drawImage(img, 0, 0, sampleW, sampleH);
            const imgData = ctx.getImageData(0, 0, sampleW, sampleH).data;

            const targetPositions: number[] = [];
            const scatterPositions: number[] = [];
            const colors: number[] = [];
            const randoms: number[] = [];
            const sizes: number[] = [];

            // 3D Plane dimensions (aspect ratio ~2.667 matching image)
            const planeW = isMobile ? 32.0 : 38.0;
            const planeH = planeW / (sampleW / sampleH);

            for (let y = 0; y < sampleH; y++) {
                const vNorm = y / (sampleH - 1); // 0 (top/sky) to 1 (bottom/foreground)
                for (let x = 0; x < sampleW; x++) {
                    const uNorm = x / (sampleW - 1); // 0 (left) to 1 (right)
                    const idx = (y * sampleW + x) * 4;

                    // Authentic original pixel colors
                    const r = imgData[idx] / 255;
                    const g = imgData[idx + 1] / 255;
                    const b = imgData[idx + 2] / 255;
                    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

                    // Deep space void filtering:
                    // In upper sky (vNorm < 0.44), skip pure empty black void (lum < 0.018)
                    // so cosmic contrast is deep and particles focus on actual landscape & stars
                    if (vNorm < 0.44 && lum < 0.018) {
                        continue;
                    }

                    // In the mountain terrain (vNorm >= 0.44):
                    // Keep all shadow & rock details
                    if (vNorm >= 0.44 && lum < 0.005) {
                        continue;
                    }

                    // Target 3D coordinates (invert Y so +Y is up)
                    const targetX = (uNorm - 0.5) * planeW;
                    const targetY = (0.5 - vNorm) * planeH;

                    // 3D Depth sculpting:
                    let targetZ = 0.0;
                    if (vNorm >= 0.44) {
                        // Mountain terrain: foreground rocks come forward (+1.6), distant ridges recede (-3.5)
                        const tTerrain = (vNorm - 0.44) / 0.56;
                        targetZ = (tTerrain * 3.8 - 2.2) + lum * 1.4;
                    } else if (uNorm > 0.52 && vNorm < 0.65) {
                        // Giant celestial planet/moon: subtle spherical dome protrusion
                        const moonCenterU = 0.77;
                        const moonCenterV = 0.36;
                        const du = (uNorm - moonCenterU);
                        const dv = (vNorm - moonCenterV) * (planeW / planeH);
                        const dMoon = Math.sqrt(du * du + dv * dv);
                        if (dMoon < 0.26) {
                            targetZ = -1.2 + Math.sqrt(Math.max(0, 0.26 * 0.26 - dMoon * dMoon)) * 5.0;
                        } else {
                            targetZ = -4.0;
                        }
                    } else {
                        // Deep space & Milky Way
                        targetZ = -5.0 + (Math.random() - 0.5) * 1.5;
                    }

                    targetPositions.push(targetX, targetY, targetZ);

                    // Initial scatter positions in 3D space
                    const phi = Math.random() * Math.PI * 2;
                    const theta = Math.acos(Math.random() * 2 - 1);
                    const scatterRadius = 24.0 + Math.random() * 32.0;
                    const scatterX = scatterRadius * Math.sin(theta) * Math.cos(phi);
                    const scatterY = scatterRadius * Math.sin(theta) * Math.sin(phi);
                    const scatterZ = (Math.random() - 0.5) * 35.0 - 8.0;

                    scatterPositions.push(scatterX, scatterY, scatterZ);

                    // Authentic original pixel colours preserved
                    colors.push(r, g, b);

                    randoms.push(Math.random());

                    // Size scaling: bright features (moon crescent, stars) are slightly larger
                    let size = isMobile ? 1.3 : 1.6;
                    if (lum > 0.45) {
                        size = isMobile ? 2.0 : 2.6;
                    } else if (lum > 0.2) {
                        size = isMobile ? 1.6 : 2.0;
                    }
                    sizes.push(size);
                }
            }

            // Construct BufferGeometry
            const geo = new THREE.BufferGeometry();
            geo.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(targetPositions), 3));
            geo.setAttribute("aTargetPosition", new THREE.Float32BufferAttribute(new Float32Array(targetPositions), 3));
            geo.setAttribute("aScatterPosition", new THREE.Float32BufferAttribute(new Float32Array(scatterPositions), 3));
            geo.setAttribute("aColor", new THREE.Float32BufferAttribute(new Float32Array(colors), 3));
            geo.setAttribute("aRandom", new THREE.Float32BufferAttribute(new Float32Array(randoms), 1));
            geo.setAttribute("aSize", new THREE.Float32BufferAttribute(new Float32Array(sizes), 1));

            setGeometry(geo);
        };

        return () => {
            isDisposed = true;
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
                    className="object-cover opacity-60 filter contrast-125"
                    priority
                />
            </div>
        );
    }

    if (!isClient) {
        return null;
    }

    return (
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
            {geometry && (
                <Canvas
                    camera={{ position: [0, 0, 22], fov: 45 }}
                    dpr={[1, 2]}
                    gl={{
                        alpha: true,
                        antialias: false,
                        powerPreference: "high-performance",
                        stencil: false,
                        depth: true
                    }}
                >
                    <ParticleMesh geometry={geometry} isReducedMotion={isReducedMotion} />
                </Canvas>
            )}
        </div>
    );
}
