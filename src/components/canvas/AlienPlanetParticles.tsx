"use client";

import { useRef, useMemo, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

export interface AlienPlanetParticlesProps {
    accentColor?: string;
    speed?: number;
}

// Deterministic pseudo-random number generator
function createLCG(seed = 94821) {
    let s = seed;
    return function() {
        s = (s * 1664525 + 1013904223) % 4294967296;
        return s / 4294967296;
    };
}

// ----------------------------------------------------------------------
// 1. ALIEN PLANET ROCK SURFACE PARTICLE GEOMETRY (Fibonacci Sphere Grid)
// ----------------------------------------------------------------------
function buildAlienPlanetGeometry(count = 14000, radius = 22.0) {
    const prng = createLCG(73918);
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    const sizes = new Float32Array(count);

    const phi = Math.PI * (Math.sqrt(5) - 1); // Golden ratio angle (~2.39996 rad)

    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
        const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = phi * i;

        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        // Base spherical position with slight organic irregularity
        const rVariation = radius + (prng() - 0.5) * 0.8;
        positions[i * 3 + 0] = x * rVariation;
        positions[i * 3 + 1] = y * rVariation;
        positions[i * 3 + 2] = z * rVariation;

        randoms[i] = prng();
        sizes[i] = 1.2 + prng() * 2.2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    return geo;
}

// ----------------------------------------------------------------------
// 2. FLOWING COSMIC STREAMS & PARTICLES (From Website section)
// ----------------------------------------------------------------------
function buildCosmicStreamsGeometry() {
    const prng = createLCG(38291);
    const streamCount = 6;
    const particlesPerStream = 320;
    const total = streamCount * particlesPerStream; // 1,920 stream particles

    const positions = new Float32Array(total * 3);
    const directions = new Float32Array(total);
    const speeds = new Float32Array(total);
    const streamIndices = new Float32Array(total);
    const initialXs = new Float32Array(total);
    const spreadYs = new Float32Array(total);
    const spreadZs = new Float32Array(total);
    const randoms = new Float32Array(total);
    const sizes = new Float32Array(total);

    let idx = 0;
    const xMin = -75;
    const xMax = 75;

    for (let s = 0; s < streamCount; s++) {
        const direction = s % 2 === 0 ? 1.0 : -1.0;
        for (let p = 0; p < particlesPerStream; p++) {
            const xProgress = p / (particlesPerStream - 1);
            const x = xMin + xProgress * (xMax - xMin) + (prng() - 0.5) * 1.5;

            // Box-Muller Gaussian ribbon spread
            const u1 = Math.max(0.0001, prng());
            const u2 = prng();
            const normalRand = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
            const spreadY = normalRand * 1.5;
            const spreadZ = (prng() - 0.5) * 8.0;

            positions[idx * 3 + 0] = x;
            positions[idx * 3 + 1] = 0;
            positions[idx * 3 + 2] = spreadZ;

            directions[idx] = direction;
            speeds[idx] = 0.8 + prng() * 0.5;
            streamIndices[idx] = s;
            initialXs[idx] = x;
            spreadYs[idx] = spreadY;
            spreadZs[idx] = spreadZ;
            randoms[idx] = prng();
            sizes[idx] = 1.6 + prng() * 2.8;

            idx++;
        }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aDirection", new THREE.BufferAttribute(directions, 1));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    geo.setAttribute("aStreamIndex", new THREE.BufferAttribute(streamIndices, 1));
    geo.setAttribute("aInitialX", new THREE.BufferAttribute(initialXs, 1));
    geo.setAttribute("aSpreadY", new THREE.BufferAttribute(spreadYs, 1));
    geo.setAttribute("aSpreadZ", new THREE.BufferAttribute(spreadZs, 1));
    geo.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    return geo;
}

// ----------------------------------------------------------------------
// 3. AMBIENT FLOATING DUST/EMBERS
// ----------------------------------------------------------------------
function buildAmbientDustGeometry(count = 700) {
    const prng = createLCG(55219);
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    const speeds = new Float32Array(count);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        positions[i * 3 + 0] = (prng() - 0.5) * 110;
        positions[i * 3 + 1] = (prng() - 0.5) * 70;
        positions[i * 3 + 2] = (prng() - 0.5) * 45;

        randoms[i] = prng();
        speeds[i] = 0.4 + prng() * 0.8;
        sizes[i] = 1.0 + prng() * 2.5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    return geo;
}

// ----------------------------------------------------------------------
// GLSL SHADERS: ALIEN PLANET ROCK SURFACE (With 3D Simplex Craggy Ridges)
// ----------------------------------------------------------------------
const PLANET_VERTEX_SHADER = `
uniform float uTime;
uniform vec3 uColorPrimary;
uniform vec3 uColorSecondary;
uniform vec3 uColorCore;

attribute float aRandom;
attribute float aSize;

varying vec3 vColor;
varying float vElevation;
varying float vAlpha;

// Simplex 3D Noise for craggy rock ridges
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main() {
    vec3 norm = normalize(position);

    // Planet slow majestic rotation on tilted axis
    float rotAngle = uTime * 0.05;
    mat2 rotY = mat2(cos(rotAngle), -sin(rotAngle), sin(rotAngle), cos(rotAngle));
    vec3 rotatedNorm = norm;
    rotatedNorm.xz = rotY * rotatedNorm.xz;

    // Multi-octave alien rock mountain & ridge noise
    float n1 = snoise(rotatedNorm * 2.1 + vec3(uTime * 0.03));
    float n2 = snoise(rotatedNorm * 5.4 - vec3(uTime * 0.06));
    float n3 = snoise(rotatedNorm * 11.2 + vec3(uTime * 0.04));

    // Craggy rock elevation
    float rockElevation = (n1 * 3.8) + (n2 * 1.8) + (n3 * 0.65);

    // Apply elevation along spherical normal
    vec3 displaced = position + norm * rockElevation;
    displaced.xz = rotY * displaced.xz;

    // Organic tectonic breathing pulsation
    displaced += norm * sin(uTime * 0.7 + aRandom * 6.28) * 0.35;

    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuation: closer and higher rock peaks are sharper and larger
    float dist = length(mvPosition.xyz);
    float peakFactor = smoothstep(-3.0, 5.0, rockElevation);
    gl_PointSize = (aSize * (72.0 / dist)) * (0.85 + 0.65 * peakFactor);

    // Mineral vein illumination on ridges and craters
    float veinFactor = smoothstep(0.15, 0.85, n2 * 0.5 + 0.5);
    vec3 deepRock = mix(vec3(0.04, 0.08, 0.06), uColorSecondary, clamp(n1 * 0.5 + 0.5, 0.0, 1.0));
    vec3 glowingVein = mix(uColorPrimary, uColorCore, veinFactor);

    vColor = mix(deepRock, glowingVein, veinFactor * 0.85 + 0.15);
    vElevation = rockElevation;
    vAlpha = smoothstep(-5.0, 3.5, rockElevation) * 0.75 + 0.25;
}
`;

const PLANET_FRAGMENT_SHADER = `
uniform vec3 uColorCore;
varying vec3 vColor;
varying float vElevation;
varying float vAlpha;

void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float r = length(coord) * 2.0;
    if (r > 1.0) discard;

    // Radiant soft circular particle with intense crystal hot-core
    float core = exp(-r * 6.5);
    float glow = exp(-r * 2.2);

    vec3 finalColor = mix(vColor, uColorCore, core);
    // Multiply by HDR multiplier for post-processing Bloom
    finalColor *= 2.6;

    float alpha = vAlpha * glow * mix(0.75, 2.2, core);
    gl_FragColor = vec4(finalColor, alpha);
}
`;

// ----------------------------------------------------------------------
// GLSL SHADERS: FLOWING COSMIC STREAMS (Matches ParticleLinesScene)
// ----------------------------------------------------------------------
const STREAMS_VERTEX_SHADER = `
uniform float uTime;
uniform vec3 uColorPrimary;
uniform vec3 uColorSecondary;
uniform vec3 uColorCore;

attribute float aDirection;
attribute float aSpeed;
attribute float aStreamIndex;
attribute float aInitialX;
attribute float aSpreadY;
attribute float aSpreadZ;
attribute float aRandom;
attribute float aSize;

varying vec3 vColor;
varying float vAlpha;

void main() {
    float xMin = -75.0;
    float xMax = 75.0;
    float xSpan = xMax - xMin;

    // Continuous flow across the screen
    float flowSpeed = 12.0 * aSpeed;
    float currentX = aInitialX + aDirection * uTime * flowSpeed;

    // Wrap around smoothly across [-75, 75]
    float normX = mod(currentX - xMin, xSpan);
    if (normX < 0.0) normX += xSpan;
    float finalX = xMin + normX;

    // Stream baseY distributed across screen height (-28 to +28)
    float streamCount = 6.0;
    float baseY = -28.0 + (aStreamIndex / (streamCount - 1.0)) * 56.0;

    // Undulating sine wave path curving around the planet
    float wavePhase = finalX * 0.045 + uTime * 0.45 + aStreamIndex * 1.35;
    float waveY = sin(wavePhase) * 4.8 + cos(wavePhase * 0.5) * 2.2;
    float waveZ = cos(wavePhase * 0.8) * 8.0;

    vec3 pos = vec3(
        finalX,
        baseY + waveY + aSpreadY,
        waveZ + aSpreadZ - 5.0
    );

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float dist = length(mvPosition.xyz);
    gl_PointSize = (aSize * (60.0 / dist));

    // Dynamic gradient color along stream
    float progress = (finalX - xMin) / xSpan;
    vec3 streamColor = mix(uColorSecondary, uColorPrimary, sin(progress * 3.14159));
    vColor = mix(streamColor, uColorCore, step(0.88, aRandom));
    
    // Smooth edge fade on screen boundaries
    float edgeFade = smoothstep(xMin, xMin + 15.0, finalX) * (1.0 - smoothstep(xMax - 15.0, xMax, finalX));
    vAlpha = edgeFade * 0.85;
}
`;

const STREAMS_FRAGMENT_SHADER = `
uniform vec3 uColorCore;
varying vec3 vColor;
varying float vAlpha;

void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float r = length(coord) * 2.0;
    if (r > 1.0) discard;

    float core = exp(-r * 7.0);
    float glow = exp(-r * 2.2);

    vec3 finalColor = mix(vColor, uColorCore, core) * 2.8;
    float alpha = vAlpha * glow * mix(0.8, 2.2, core);
    gl_FragColor = vec4(finalColor, alpha);
}
`;

// ----------------------------------------------------------------------
// GLSL SHADERS: AMBIENT FLOATING DUST/EMBERS
// ----------------------------------------------------------------------
const DUST_VERTEX_SHADER = `
uniform float uTime;
uniform vec3 uColorPrimary;
uniform vec3 uColorCore;

attribute float aRandom;
attribute float aSpeed;
attribute float aSize;

varying vec3 vColor;
varying float vAlpha;

void main() {
    vec3 pos = position;

    // Slow organic Brownian drift
    pos.x += sin(uTime * 0.25 * aSpeed + aRandom * 6.28) * 3.5;
    pos.y += cos(uTime * 0.3 * aSpeed + aRandom * 6.28) * 3.0;
    pos.z += sin(uTime * 0.2 * aSpeed + aRandom * 3.14) * 2.5;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float dist = length(mvPosition.xyz);
    gl_PointSize = (aSize * (48.0 / dist));

    vColor = mix(uColorPrimary, uColorCore, aRandom * 0.7);
    vAlpha = (sin(uTime * 0.8 + aRandom * 6.28) * 0.35 + 0.65) * 0.6;
}
`;

const DUST_FRAGMENT_SHADER = `
varying vec3 vColor;
varying float vAlpha;

void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float r = length(coord) * 2.0;
    if (r > 1.0) discard;

    float glow = exp(-r * 2.5);
    gl_FragColor = vec4(vColor * 2.2, vAlpha * glow);
}
`;

// ----------------------------------------------------------------------
// REACT COMPONENT: ALIEN SCENE RENDERER
// ----------------------------------------------------------------------
function AlienPlanetMesh({ accentColor = "#3CFF8F" }: { accentColor?: string }) {
    const planetPointsRef = useRef<THREE.Points>(null);
    const planetMatRef = useRef<THREE.ShaderMaterial>(null);
    const streamsMatRef = useRef<THREE.ShaderMaterial>(null);
    const dustMatRef = useRef<THREE.ShaderMaterial>(null);

    const planetGeo = useMemo(() => buildAlienPlanetGeometry(14000, 23.0), []);
    const streamsGeo = useMemo(() => buildCosmicStreamsGeometry(), []);
    const dustGeo = useMemo(() => buildAmbientDustGeometry(650), []);

    // Target dynamic colors derived from accentColor
    const targetColors = useMemo(() => {
        const base = new THREE.Color(accentColor || "#3CFF8F");
        const secondary = base.clone().multiplyScalar(0.55);
        const core = new THREE.Color(2.5, 3.2, 2.8);
        return { primary: base, secondary, core };
    }, [accentColor]);

    const curPrimary = useRef(targetColors.primary.clone());
    const curSecondary = useRef(targetColors.secondary.clone());
    const curCore = useRef(targetColors.core.clone());

    const planetUniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColorPrimary: { value: targetColors.primary.clone() },
        uColorSecondary: { value: targetColors.secondary.clone() },
        uColorCore: { value: targetColors.core.clone() },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), []);

    const streamsUniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColorPrimary: { value: targetColors.primary.clone() },
        uColorSecondary: { value: targetColors.secondary.clone() },
        uColorCore: { value: targetColors.core.clone() },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), []);

    const dustUniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColorPrimary: { value: targetColors.primary.clone() },
        uColorCore: { value: targetColors.core.clone() },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), []);

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();

        // Update uniforms
        if (planetMatRef.current) planetMatRef.current.uniforms.uTime.value = time;
        if (streamsMatRef.current) streamsMatRef.current.uniforms.uTime.value = time;
        if (dustMatRef.current) dustMatRef.current.uniforms.uTime.value = time;

        // Smooth color transition
        const lerpFactor = Math.min(1.0, delta * 3.5);
        curPrimary.current.lerp(targetColors.primary, lerpFactor);
        curSecondary.current.lerp(targetColors.secondary, lerpFactor);
        curCore.current.lerp(targetColors.core, lerpFactor);

        if (planetMatRef.current) {
            planetMatRef.current.uniforms.uColorPrimary.value.copy(curPrimary.current);
            planetMatRef.current.uniforms.uColorSecondary.value.copy(curSecondary.current);
            planetMatRef.current.uniforms.uColorCore.value.copy(curCore.current);
        }
        if (streamsMatRef.current) {
            streamsMatRef.current.uniforms.uColorPrimary.value.copy(curPrimary.current);
            streamsMatRef.current.uniforms.uColorSecondary.value.copy(curSecondary.current);
            streamsMatRef.current.uniforms.uColorCore.value.copy(curCore.current);
        }
        if (dustMatRef.current) {
            dustMatRef.current.uniforms.uColorPrimary.value.copy(curPrimary.current);
            dustMatRef.current.uniforms.uColorCore.value.copy(curCore.current);
        }

        // Gentle planetary tilt
        if (planetPointsRef.current) {
            planetPointsRef.current.rotation.x = Math.sin(time * 0.12) * 0.08 + 0.15;
            planetPointsRef.current.rotation.z = Math.cos(time * 0.1) * 0.06;
        }
    });

    return (
        <group position={[0, 0, -8]}>
            {/* 1. Alien Planet Rock Surface */}
            <points ref={planetPointsRef} geometry={planetGeo}>
                <shaderMaterial
                    ref={planetMatRef}
                    vertexShader={PLANET_VERTEX_SHADER}
                    fragmentShader={PLANET_FRAGMENT_SHADER}
                    uniforms={planetUniforms}
                    transparent={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* 2. Flowing Cosmic Streams */}
            <points geometry={streamsGeo}>
                <shaderMaterial
                    ref={streamsMatRef}
                    vertexShader={STREAMS_VERTEX_SHADER}
                    fragmentShader={STREAMS_FRAGMENT_SHADER}
                    uniforms={streamsUniforms}
                    transparent={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* 3. Ambient Floating Cosmic Embers */}
            <points geometry={dustGeo}>
                <shaderMaterial
                    ref={dustMatRef}
                    vertexShader={DUST_VERTEX_SHADER}
                    fragmentShader={DUST_FRAGMENT_SHADER}
                    uniforms={dustUniforms}
                    transparent={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
}

// React 18/19 safe SSR mount detector
function useClientMount() {
    return useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );
}

export default function AlienPlanetParticles({ accentColor = "#3CFF8F" }: AlienPlanetParticlesProps) {
    const isClient = useClientMount();
    if (!isClient) return null;

    return (
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
            <Canvas
                camera={{ position: [0, 0, 48], fov: 45 }}
                dpr={[1, 2]}
                gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
            >
                <AlienPlanetMesh accentColor={accentColor} />

                {/* HDR Bloom pass to make craggy minerals & flowing streams radiate */}
                <EffectComposer multisampling={0}>
                    <Bloom
                        intensity={3.2}
                        luminanceThreshold={0.08}
                        luminanceSmoothing={0.85}
                        blendFunction={BlendFunction.SCREEN}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
