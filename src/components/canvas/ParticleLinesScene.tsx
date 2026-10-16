"use client";

import { useRef, useMemo, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

export interface ProjectThemeTarget {
    id?: number;
    title?: string;
    brand?: string;
}

export interface ParticleThemeConfig {
    primary: THREE.Color;
    secondary: THREE.Color;
    tertiary: THREE.Color;
    spark: THREE.Color;
    brightCore: THREE.Color;
}

// Exact user-specified dynamic color palettes with HDR postprocessing values
export const PROJECT_THEMES: Record<string, ParticleThemeConfig> = {
    // 1. Creet: "creet par purple"
    creet: {
        primary: new THREE.Color(0.95, 0.15, 1.45),
        secondary: new THREE.Color(0.55, 0.08, 1.05),
        tertiary: new THREE.Color(1.30, 0.35, 1.95),
        spark: new THREE.Color(2.6, 1.8, 3.5),
        brightCore: new THREE.Color(2.9, 2.3, 3.6),
    },
    // 2. FOU: "fou par white"
    fou: {
        primary: new THREE.Color(1.75, 1.75, 1.80),
        secondary: new THREE.Color(1.30, 1.35, 1.42),
        tertiary: new THREE.Color(2.10, 2.10, 2.15),
        spark: new THREE.Color(3.4, 3.4, 3.4),
        brightCore: new THREE.Color(3.5, 3.5, 3.5),
    },
    // 3. UMA Solar: "umar par yellow"
    uma: {
        primary: new THREE.Color(2.2, 1.85, 0.15),
        secondary: new THREE.Color(1.75, 1.35, 0.08),
        tertiary: new THREE.Color(2.40, 2.10, 0.45),
        spark: new THREE.Color(3.2, 3.0, 1.8),
        brightCore: new THREE.Color(3.2, 2.9, 2.1),
    },
    // 4. Leetcore: Exact palette from user design (#283747 Slate Blue, #8899AA Silver Blue, #E8EDF3 Ice White)
    leetcore: {
        primary: new THREE.Color(0.18, 0.25, 0.35),      // Slate Blue / Steel Blue (#283747 / #435365)
        secondary: new THREE.Color(1.20, 1.35, 1.55),    // Silver Blue (#8899AA metallic highlights)
        tertiary: new THREE.Color(2.40, 2.46, 2.54),     // Ice White (#E8EDF3 bright contrast highlights)
        spark: new THREE.Color(3.3, 3.5, 3.7),           // Ice Diamond Spark
        brightCore: new THREE.Color(3.2, 3.4, 3.6),
    },
    // 5. Isharya: "isharya par dark green and white"
    isharya: {
        primary: new THREE.Color(0.06, 0.75, 0.32),
        secondary: new THREE.Color(1.35, 1.55, 1.45),
        tertiary: new THREE.Color(2.20, 2.25, 2.30),
        spark: new THREE.Color(2.2, 3.2, 2.6),
        brightCore: new THREE.Color(2.8, 3.4, 3.0),
    },
    // 6. Outland: "outland par forest green, and yellow"
    outland: {
        primary: new THREE.Color(0.08, 0.92, 0.26),
        secondary: new THREE.Color(1.40, 1.65, 0.22),
        tertiary: new THREE.Color(2.20, 1.80, 0.18),
        spark: new THREE.Color(2.8, 2.9, 1.7),
        brightCore: new THREE.Color(3.0, 3.1, 2.2),
    },
    // 7. Wearth Living: "wearth living pa dark blue"
    wearth: {
        primary: new THREE.Color(0.12, 0.38, 2.0),
        secondary: new THREE.Color(0.06, 0.20, 1.25),
        tertiary: new THREE.Color(0.40, 0.90, 2.40),
        spark: new THREE.Color(1.8, 2.5, 3.6),
        brightCore: new THREE.Color(2.4, 2.8, 3.6),
    },
    // 8. Rivaaz: "rivaaz par yellowish"
    rivaaz: {
        primary: new THREE.Color(1.95, 1.60, 0.35),
        secondary: new THREE.Color(1.55, 1.18, 0.20),
        tertiary: new THREE.Color(2.30, 1.95, 0.55),
        spark: new THREE.Color(3.1, 2.8, 1.8),
        brightCore: new THREE.Color(3.1, 2.9, 2.0),
    },
    // 9. Silver House: "silverhouse par golden"
    silverhouse: {
        primary: new THREE.Color(2.1, 1.60, 0.28),
        secondary: new THREE.Color(1.65, 1.10, 0.16),
        tertiary: new THREE.Color(2.40, 1.95, 0.50),
        spark: new THREE.Color(3.3, 2.9, 1.7),
        brightCore: new THREE.Color(3.3, 3.0, 1.9),
    },
    // 10. Kohsar: "kohsar par red"
    kohsar: {
        primary: new THREE.Color(2.2, 0.15, 0.18),
        secondary: new THREE.Color(1.45, 0.08, 0.10),
        tertiary: new THREE.Color(2.50, 0.40, 0.22),
        spark: new THREE.Color(3.2, 1.6, 1.2),
        brightCore: new THREE.Color(3.3, 2.0, 1.6),
    },
    // 11. Aurus Life: "aurus life paar sky blue"
    aurusLife: {
        primary: new THREE.Color(0.25, 1.45, 2.45),
        secondary: new THREE.Color(0.15, 1.05, 2.05),
        tertiary: new THREE.Color(0.65, 1.85, 2.70),
        spark: new THREE.Color(2.2, 2.9, 3.5),
        brightCore: new THREE.Color(2.6, 3.1, 3.5),
    },
    // 12. Future: "future par thoda sa lava colour"
    future: {
        primary: new THREE.Color(2.35, 0.70, 0.08),
        secondary: new THREE.Color(1.85, 0.20, 0.05),
        tertiary: new THREE.Color(2.80, 1.15, 0.15),
        spark: new THREE.Color(3.4, 2.4, 1.2),
        brightCore: new THREE.Color(3.4, 2.6, 1.4),
    },
    // 13. Aurus Life Luxury: "aurush life luxury par yello green and creamy"
    aurusLuxury: {
        primary: new THREE.Color(1.20, 1.75, 0.22),
        secondary: new THREE.Color(1.95, 1.85, 1.25),
        tertiary: new THREE.Color(2.25, 2.15, 1.50),
        spark: new THREE.Color(3.0, 2.9, 2.2),
        brightCore: new THREE.Color(3.1, 3.0, 2.4),
    },
    // Default / Daylight
    daylight: {
        primary: new THREE.Color(1.85, 1.45, 0.35),
        secondary: new THREE.Color(1.45, 1.10, 0.22),
        tertiary: new THREE.Color(2.20, 1.80, 0.50),
        spark: new THREE.Color(3.0, 2.8, 1.9),
        brightCore: new THREE.Color(3.0, 2.9, 2.2),
    },
    default: {
        primary: new THREE.Color(0.04, 0.85, 0.35),
        secondary: new THREE.Color(0.24, 1.65, 0.85),
        tertiary: new THREE.Color(0.50, 2.00, 1.10),
        spark: new THREE.Color(2.2, 2.8, 2.5),
        brightCore: new THREE.Color(2.5, 3.5, 3.0),
    }
};

export function getProjectTheme(project?: ProjectThemeTarget | null): ParticleThemeConfig {
    if (!project) return PROJECT_THEMES.default;
    const id = project.id;
    const brand = (project.brand || "").toLowerCase();
    const title = (project.title || "").toLowerCase();

    // 1. Creet
    if (id === 7011 || brand.includes("creet") || title.includes("creet")) return PROJECT_THEMES.creet;
    // 2. FOU
    if (id === 7010 || brand.includes("fou") || title.includes("fou")) return PROJECT_THEMES.fou;
    // 3. UMA Solar ("umar")
    if (id === 7007 || brand.includes("uma") || title.includes("uma")) return PROJECT_THEMES.uma;
    // 4. Leetcore
    if (id === 7006 || brand.includes("leetcore") || title.includes("leetcore")) return PROJECT_THEMES.leetcore;
    // 5. Isharya
    if (id === 7002 || brand.includes("isharya") || title.includes("isharya")) return PROJECT_THEMES.isharya;
    // 6. Outland
    if (id === 7001 || brand.includes("outland") || title.includes("outland")) return PROJECT_THEMES.outland;
    // 7. Wearth Living
    if (id === 7000 || id === 7005 || brand.includes("wearth") || title.includes("wearth")) return PROJECT_THEMES.wearth;
    // 8. Rivaaz
    if (id === 7012 || brand.includes("rivaaz") || title.includes("rivaaz")) return PROJECT_THEMES.rivaaz;
    // 9. Silver House
    if (id === 7013 || brand.includes("silver") || title.includes("silver")) return PROJECT_THEMES.silverhouse;
    // 10. Kohsar
    if (id === 7014 || brand.includes("kohsar") || title.includes("kohsar")) return PROJECT_THEMES.kohsar;
    // 11. Aurus Life Luxury (checked before Aurus Life to avoid substring conflict)
    if (id === 7019 || brand.includes("luxury") || title.includes("luxury")) return PROJECT_THEMES.aurusLuxury;
    // 12. Aurus Life
    if (id === 7015 || brand.includes("aurus") || title.includes("aurus")) return PROJECT_THEMES.aurusLife;
    // 13. Future
    if (id === 7018 || brand.includes("future") || title.includes("future")) return PROJECT_THEMES.future;
    // 14. Daylight
    if (id === 7020 || brand.includes("daylight") || title.includes("daylight")) return PROJECT_THEMES.daylight;

    return PROJECT_THEMES.default;
}

// Pure deterministic pseudo-random generator (Linear Congruential Generator)
function createLCG(seed = 42891) {
    let s = seed;
    return function() {
        s = (s * 1664525 + 1013904223) % 4294967296;
        return s / 4294967296;
    };
}

// Build geometry once deterministically (satisfies React purity rules)
function buildParticleGeometry() {
    const prng = createLCG(88412);
    const lineCount = 7;
    const particlesPerLine = 550;
    const totalParticles = lineCount * particlesPerLine; // 3,850 particles

    const positions = new Float32Array(totalParticles * 3);
    const directions = new Float32Array(totalParticles);
    const speeds = new Float32Array(totalParticles);
    const lineIndices = new Float32Array(totalParticles);
    const initialXs = new Float32Array(totalParticles);
    const spreadYs = new Float32Array(totalParticles);
    const spreadZs = new Float32Array(totalParticles);
    const randoms = new Float32Array(totalParticles);
    const sizes = new Float32Array(totalParticles);

    let idx = 0;
    const xMin = -95;
    const xMax = 95;

    for (let l = 0; l < lineCount; l++) {
        // Direction: Alternate left-to-right (1.0) and right-to-left (-1.0)
        const direction = l % 2 === 0 ? 1.0 : -1.0;

        for (let p = 0; p < particlesPerLine; p++) {
            // Initial distributed X along the line
            const xProgress = p / (particlesPerLine - 1);
            const x = xMin + xProgress * (xMax - xMin) + (prng() - 0.5) * 1.5;

            // Box-Muller transform for tight Gaussian clustering forming a sharp line ribbon
            const u1 = Math.max(0.0001, prng());
            const u2 = prng();
            const normalRand = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
            const spreadY = normalRand * 1.35;
            const spreadZ = (prng() - 0.5) * 3.5;

            positions[idx * 3 + 0] = x;
            positions[idx * 3 + 1] = 0;
            positions[idx * 3 + 2] = spreadZ;

            directions[idx] = direction;
            speeds[idx] = 0.85 + prng() * 0.45;
            lineIndices[idx] = l;
            initialXs[idx] = x;
            spreadYs[idx] = spreadY;
            spreadZs[idx] = spreadZ;
            randoms[idx] = prng();
            sizes[idx] = 1.4 + prng() * 2.8;

            idx++;
        }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aDirection", new THREE.BufferAttribute(directions, 1));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    geo.setAttribute("aLineIndex", new THREE.BufferAttribute(lineIndices, 1));
    geo.setAttribute("aInitialX", new THREE.BufferAttribute(initialXs, 1));
    geo.setAttribute("aSpreadY", new THREE.BufferAttribute(spreadYs, 1));
    geo.setAttribute("aSpreadZ", new THREE.BufferAttribute(spreadZs, 1));
    geo.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    return geo;
}

// --- DYNAMIC SHADER MATCHING SERVICES PARTICLE LOGO WITH DYNAMIC THEME ---
const VERTEX_SHADER = `
uniform float uTime;
uniform vec3 uColorPrimary;
uniform vec3 uColorSecondary;
uniform vec3 uColorTertiary;
uniform vec3 uColorSpark;

attribute float aDirection;
attribute float aSpeed;
attribute float aLineIndex;
attribute float aInitialX;
attribute float aSpreadY;
attribute float aSpreadZ;
attribute float aRandom;
attribute float aSize;

varying vec3 vColor;
varying float vAlpha;

void main() {
    float xMin = -95.0;
    float xMax = 95.0;
    float xSpan = xMax - xMin;

    // Continuous directional flow (+1 = left to right, -1 = right to left)
    // Faster, energetic transit speed ("aisa lagna chahiye ke ye particles kahin jaa rahe hai")
    float flowSpeed = 15.0 * aSpeed;
    float currentX = aInitialX + aDirection * uTime * flowSpeed;

    // Wrap around smoothly across [-95, 95]
    float normalizedX = mod(currentX - xMin, xSpan);
    if (normalizedX < 0.0) normalizedX += xSpan;
    float finalX = xMin + normalizedX;

    // Line baseY distributed across screen height (-32 to +32 in Three.js coordinate space)
    float lineCount = 7.0;
    float baseY = -32.0 + (aLineIndex / (lineCount - 1.0)) * 64.0;

    // Organic sinusoidal undulating wave path
    float freq1 = 0.042 + aLineIndex * 0.005;
    float freq2 = 0.088 + aLineIndex * 0.008;
    float wave1 = sin(finalX * freq1 + uTime * 0.75 * aDirection + aLineIndex * 1.6) * 4.2;
    float wave2 = cos(finalX * freq2 - uTime * 1.05 * aDirection + aLineIndex * 2.2) * 2.0;

    // Fluttering noise
    float flutter = sin(finalX * 0.18 + uTime * 2.5 + aRandom * 6.28) * 0.5;

    float finalY = baseY + wave1 + wave2 + aSpreadY + flutter;
    float finalZ = aSpreadZ;

    vec4 mvPosition = modelViewMatrix * vec4(finalX, finalY, finalZ, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Smooth edge fade at screen boundaries
    float edgeDist = min(finalX - xMin, xMax - finalX);
    float edgeFade = clamp(edgeDist / 16.0, 0.0, 1.0);

    // Particle size with sparkle twinkle
    float twinkle = sin(uTime * 4.5 + aRandom * 30.0) * 0.5 + 0.5;
    float size = aSize * (0.85 + twinkle * 0.55);
    gl_PointSize = size * edgeFade * (115.0 / -mvPosition.z);

    // Dynamic brand color palette with 3-tier distribution:
    vec3 baseColor;
    if (aRandom < 0.45) {
        baseColor = mix(uColorPrimary, uColorSecondary, aRandom / 0.45);
    } else if (aRandom < 0.78) {
        baseColor = mix(uColorSecondary, uColorTertiary, (aRandom - 0.45) / 0.33);
    } else {
        baseColor = uColorSpark;
    }

    vColor = baseColor;
    vAlpha = mix(0.55, 1.0, aRandom) * edgeFade;
}
`;

const FRAGMENT_SHADER = `
uniform vec3 uBrightCore;
varying vec3 vColor;
varying float vAlpha;

void main() {
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = length(cxy);
    if (r > 1.0) discard;
    
    // Tight, ultra-bright core + luminous halo
    float core = exp(-r * 7.5);
    float edge = exp(-r * 2.2);
    
    vec3 finalColor = mix(vColor, uBrightCore, core);
    
    // High HDR multiplier to feed the Bloom post-processing pass
    finalColor *= 2.8;
    
    float alpha = vAlpha * edge * mix(0.85, 2.2, core);
    
    gl_FragColor = vec4(finalColor, alpha);
}
`;

function FlowingParticleLines({ activeProject }: { activeProject?: ProjectThemeTarget | null }) {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const geometry = useMemo(() => buildParticleGeometry(), []);
    const targetTheme = useMemo(() => getProjectTheme(activeProject), [activeProject]);

    // Current lerp state colors
    const currentPrimary = useRef<THREE.Color>(targetTheme.primary.clone());
    const currentSecondary = useRef<THREE.Color>(targetTheme.secondary.clone());
    const currentTertiary = useRef<THREE.Color>(targetTheme.tertiary.clone());
    const currentSpark = useRef<THREE.Color>(targetTheme.spark.clone());
    const currentBrightCore = useRef<THREE.Color>(targetTheme.brightCore.clone());

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColorPrimary: { value: targetTheme.primary.clone() },
        uColorSecondary: { value: targetTheme.secondary.clone() },
        uColorTertiary: { value: targetTheme.tertiary.clone() },
        uColorSpark: { value: targetTheme.spark.clone() },
        uBrightCore: { value: targetTheme.brightCore.clone() },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), []);

    useFrame((state, delta) => {
        if (!materialRef.current) return;
        materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();

        // Smooth color transition lerp (~350ms feel)
        const lerpFactor = Math.min(1.0, delta * 3.8);
        currentPrimary.current.lerp(targetTheme.primary, lerpFactor);
        currentSecondary.current.lerp(targetTheme.secondary, lerpFactor);
        currentTertiary.current.lerp(targetTheme.tertiary, lerpFactor);
        currentSpark.current.lerp(targetTheme.spark, lerpFactor);
        currentBrightCore.current.lerp(targetTheme.brightCore, lerpFactor);

        materialRef.current.uniforms.uColorPrimary.value.copy(currentPrimary.current);
        materialRef.current.uniforms.uColorSecondary.value.copy(currentSecondary.current);
        materialRef.current.uniforms.uColorTertiary.value.copy(currentTertiary.current);
        materialRef.current.uniforms.uColorSpark.value.copy(currentSpark.current);
        materialRef.current.uniforms.uBrightCore.value.copy(currentBrightCore.current);
    });

    return (
        <points ref={pointsRef} geometry={geometry}>
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

// React 18/19 safe client mounting detector
function useClientMount() {
    return useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );
}

export default function ParticleLinesScene({ activeProject }: { activeProject?: ProjectThemeTarget | null }) {
    const isClient = useClientMount();
    if (!isClient) return null;

    return (
        <div className="absolute inset-0 pointer-events-none select-none z-0">
            <Canvas
                camera={{ position: [0, 0, 100], fov: 45 }}
                dpr={[1, 2]}
                gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
            >
                <FlowingParticleLines activeProject={activeProject} />

                {/* EXACT Bloom post-processing pass from ServicesScene */}
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
