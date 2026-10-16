"use client";

import { useRef, useMemo, useState, useEffect, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import LOGO_POINTS from "./logoPointsData.json";

// --- GPU SHADERS FOR COLDUNE PARTICLE LOGO ASSEMBLY ---
const VERTEX_SHADER = `
uniform float uTime;
uniform float uProgress;     // 0.0 (scattered chaos) to 1.0 (assembled logo)
uniform float uExitProgress; // 0.0 to 1.0 (cinematic burst upon exit)

attribute vec3 aOrigin;
attribute vec3 aTarget;
attribute float aDelay;
attribute float aSpeed;
attribute float aRandom;
attribute float aSize;

varying vec3 vColor;
varying float vAlpha;
varying float vSpark;

void main() {
    // Progressive staggered arrival: lower delay particles begin flying in first
    float delayedProgress = clamp((uProgress - aDelay * 0.35) / (1.0 - 0.35), 0.0, 1.0);
    
    // Smoothstep with cubic deceleration for a luxurious, controlled landing into the logo ("dheere dheere")
    float ease = smoothstep(0.0, 1.0, delayedProgress);
    float t = 1.0 - pow(1.0 - ease, 3.2);

    // Swirling vortex physics while in flight (1.0 - t)
    float swirlAngle = (1.0 - t) * (4.2 + aRandom * 4.0) + uTime * (0.85 + aSpeed * 0.4);
    float cosA = cos(swirlAngle);
    float sinA = sin(swirlAngle);

    // Cosmic floating turbulence waves
    vec3 turbulence = vec3(
        sin(uTime * 2.2 + aOrigin.y * 0.08 + aRandom * 6.28),
        cos(uTime * 2.0 + aOrigin.x * 0.08 + aRandom * 6.28),
        sin(uTime * 1.8 + aOrigin.z * 0.08)
    ) * (1.0 - t) * 16.0;

    // Dispersed swirling cosmic position
    vec3 animatedOrigin = vec3(
        aOrigin.x * cosA - aOrigin.z * sinA,
        aOrigin.y + sin(uTime * 1.5 + aRandom * 6.28) * 10.0 * (1.0 - t),
        aOrigin.x * sinA + aOrigin.z * cosA
    ) + turbulence;

    // Core physical interpolation from cloud to exact logo mark
    vec3 pos = mix(animatedOrigin, aTarget, t);

    // Subtle alive breathing pulse once particles land into the logo
    if (t > 0.85) {
        float settle = (t - 0.85) / 0.15;
        float flutter = sin(uTime * 3.5 + aRandom * 25.0) * 0.35 * settle;
        pos.z += flutter;
        pos.y += sin(uTime * 1.8 + aTarget.x * 0.08) * 0.25 * settle;
    }

    // Cinematic exit burst (particles disperse forward and outward when preloader completes)
    if (uExitProgress > 0.0) {
        float exitEase = pow(uExitProgress, 2.0);
        vec3 burstDir = normalize(pos + vec3(0.0, 0.0, 45.0));
        pos += burstDir * exitEase * 140.0;
        pos.z += exitEase * 90.0;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Diamond twinkle animation
    float twinkle = sin(uTime * 5.0 + aRandom * 30.0) * 0.5 + 0.5;
    float pointSize = aSize * (0.85 + twinkle * 0.55);

    // Size expansion as the logo locks in
    float sizeScale = mix(0.75, 1.15, t);
    gl_PointSize = pointSize * sizeScale * (115.0 / -mvPosition.z);

    // Exact Coldune signature neon emerald green palette
    vec3 emerald = vec3(0.04, 0.95, 0.38);
    vec3 cyanGlow = vec3(0.20, 1.75, 0.88);
    vec3 baseColor = mix(emerald, cyanGlow, aRandom);

    // 22% of particles are sparkling white-hot diamond sparks
    float isSpark = 0.0;
    if (aRandom > 0.78) {
        baseColor = vec3(2.5, 3.5, 3.0);
        isSpark = 1.0;
    }

    // Luminous completion flash when logo is fully formed
    if (uProgress > 0.92) {
        float flash = (uProgress - 0.92) / 0.08;
        baseColor = mix(baseColor, vec3(3.0, 3.8, 3.4), flash * 0.45 * aRandom);
    }

    vColor = baseColor;
    
    // Smooth alpha fade during exit
    float exitFade = 1.0 - smoothstep(0.4, 1.0, uExitProgress);
    vAlpha = mix(0.65, 1.0, aRandom) * mix(0.7, 1.0, t) * exitFade;
    vSpark = isSpark;
}
`;

const FRAGMENT_SHADER = `
varying vec3 vColor;
varying float vAlpha;
varying float vSpark;

void main() {
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = length(cxy);
    if (r > 1.0) discard;

    // Tight ultra-bright core + radiant halo
    float core = exp(-r * 7.5);
    float edge = exp(-r * 2.2);

    vec3 brightColor = vec3(2.8, 3.8, 3.2);
    vec3 finalColor = mix(vColor, brightColor, core);

    // HDR multiplier feeding the Bloom post-processing pipeline
    finalColor *= 2.8;

    float alpha = vAlpha * edge * mix(0.85, 2.5, core);
    gl_FragColor = vec4(finalColor, alpha);
}
`;

// Deterministic PRNG
function createLCG(seed = 59174) {
    let s = seed;
    return function() {
        s = (s * 1664525 + 1013904223) % 4294967296;
        return s / 4294967296;
    };
}

// Build geometry deterministically from extracted Coldune Studio logo points
function buildLogoGeometry(): THREE.BufferGeometry {
    const rawPoints = (LOGO_POINTS as unknown) as [number, number][];
    const count = rawPoints.length;
    const prng = createLCG(77312);

    const positions = new Float32Array(count * 3);
    const origins = new Float32Array(count * 3);
    const targets = new Float32Array(count * 3);
    const delays = new Float32Array(count);
    const speeds = new Float32Array(count);
    const randoms = new Float32Array(count);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        const [tx, ty] = rawPoints[i];
        const tz = (prng() - 0.5) * 4.5;

        // Wide dispersed cosmic starting point
        const theta = prng() * Math.PI * 2.0;
        const phi = Math.acos(prng() * 2.0 - 1.0);
        const oRadius = 60.0 + prng() * 75.0; // 60 to 135 radius
        const ox = oRadius * Math.sin(phi) * Math.cos(theta);
        const oy = oRadius * Math.sin(phi) * Math.sin(theta);
        const oz = (prng() - 0.5) * 65.0;

        positions[i * 3 + 0] = ox;
        positions[i * 3 + 1] = oy;
        positions[i * 3 + 2] = oz;

        origins[i * 3 + 0] = ox;
        origins[i * 3 + 1] = oy;
        origins[i * 3 + 2] = oz;

        targets[i * 3 + 0] = tx;
        targets[i * 3 + 1] = ty;
        targets[i * 3 + 2] = tz;

        delays[i] = prng();
        speeds[i] = 0.75 + prng() * 0.55;
        randoms[i] = prng();

        const sizeRand = prng();
        const baseSize = sizeRand > 0.90 ? 4.8 + prng() * 2.5 : 2.2 + prng() * 2.0;
        sizes[i] = baseSize;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aOrigin", new THREE.BufferAttribute(origins, 3));
    geo.setAttribute("aTarget", new THREE.BufferAttribute(targets, 3));
    geo.setAttribute("aDelay", new THREE.BufferAttribute(delays, 1));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    geo.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    return geo;
}

function LogoAssemblingParticles({ 
    progress, 
    isExiting 
}: { 
    progress: number; 
    isExiting: boolean;
}) {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    // Deterministically build geometry from logo points
    const activeGeo = useMemo(() => buildLogoGeometry(), []);

    const currentProgress = useRef(0);
    const exitProgress = useRef(0);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uExitProgress: { value: 0 },
    }), []);

    useFrame((state, delta) => {
        if (!materialRef.current) return;
        materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();

        // Smooth gradual progress interpolation towards target progress ("dheere dheere")
        const targetNormalized = Math.min(1.0, progress / 100);
        currentProgress.current = THREE.MathUtils.lerp(
            currentProgress.current,
            targetNormalized,
            Math.min(1.0, delta * 3.5)
        );
        materialRef.current.uniforms.uProgress.value = currentProgress.current;

        // Exit burst progress
        if (isExiting) {
            exitProgress.current = Math.min(1.0, exitProgress.current + delta * 2.2);
            materialRef.current.uniforms.uExitProgress.value = exitProgress.current;
        }
    });

    return (
        <points ref={pointsRef} geometry={activeGeo}>
            <shaderMaterial
                ref={materialRef}
                vertexShader={VERTEX_SHADER}
                fragmentShader={FRAGMENT_SHADER}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Safe client-mounting hook
function useClientMount() {
    return useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );
}

export default function PreloaderLogoScene({
    progress,
    isExiting = false,
}: {
    progress: number;
    isExiting?: boolean;
}) {
    const isClient = useClientMount();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    if (!isClient) return null;

    return (
        <div className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden">
            <Canvas
                camera={{
                    position: [0, 0, isMobile ? 125 : 100],
                    fov: 45,
                }}
                dpr={[1, 2]}
                gl={{
                    alpha: true,
                    antialias: false,
                    powerPreference: "high-performance",
                }}
            >
                <LogoAssemblingParticles progress={progress} isExiting={isExiting} />

                {/* EXACT Services Section Bloom Postprocessing */}
                <EffectComposer multisampling={0}>
                    <Bloom
                        intensity={4.5}
                        luminanceThreshold={0.05}
                        luminanceSmoothing={0.9}
                        blendFunction={BlendFunction.SCREEN}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
