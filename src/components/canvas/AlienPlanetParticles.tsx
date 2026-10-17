"use client";

import { useRef, useMemo, useEffect, useSyncExternalStore } from "react";
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
// 1. IMAGE-BASED ALIEN MOUNTAIN & MOON LANDSCAPE GEOMETRY (32,768 pts)
// ----------------------------------------------------------------------
function buildLandscapeGridGeometry(cols = 256, rows = 128) {
    const total = cols * rows;
    const positions = new Float32Array(total * 3);
    const uvs = new Float32Array(total * 2);
    const randoms = new Float32Array(total);
    const sizes = new Float32Array(total);

    const prng = createLCG(104829);

    let idx = 0;
    for (let r = 0; r < rows; r++) {
        const v = r / (rows - 1); // 0.0 (bottom/foreground) to 1.0 (top/sky)
        for (let c = 0; c < cols; c++) {
            const u = c / (cols - 1); // 0.0 (left) to 1.0 (right)

            // Base unprojected coordinates
            positions[idx * 3 + 0] = (u - 0.5) * 88.0;
            positions[idx * 3 + 1] = (v - 0.5) * 36.0;
            positions[idx * 3 + 2] = 0.0;

            uvs[idx * 2 + 0] = u;
            uvs[idx * 2 + 1] = v;

            randoms[idx] = prng();
            sizes[idx] = 1.0 + prng() * 1.8;

            idx++;
        }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aUv", new THREE.BufferAttribute(uvs, 2));
    geo.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    return geo;
}

// ----------------------------------------------------------------------
// 2. FLOWING KINETIC STREAMS (WEBSITE SECTION STYLE PARTICLES)
// ----------------------------------------------------------------------
function buildCosmicStreamsGeometry() {
    const prng = createLCG(38291);
    const streamCount = 6;
    const particlesPerStream = 340;
    const total = streamCount * particlesPerStream; // 2,040 stream particles

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
    const xMin = -50;
    const xMax = 50;

    for (let s = 0; s < streamCount; s++) {
        const direction = s % 2 === 0 ? 1.0 : -1.0;
        for (let p = 0; p < particlesPerStream; p++) {
            const xProgress = p / (particlesPerStream - 1);
            const x = xMin + xProgress * (xMax - xMin) + (prng() - 0.5) * 1.5;

            // Valley mist distribution height (Y in -12 to -2)
            const spreadY = -10.0 + s * 1.6 + (prng() - 0.5) * 1.2;
            const spreadZ = -2.0 + (prng() - 0.5) * 8.0;

            positions[idx * 3 + 0] = x;
            positions[idx * 3 + 1] = spreadY;
            positions[idx * 3 + 2] = spreadZ;

            directions[idx] = direction;
            speeds[idx] = 0.8 + prng() * 0.6;
            streamIndices[idx] = s;
            initialXs[idx] = x;
            spreadYs[idx] = spreadY;
            spreadZs[idx] = spreadZ;
            randoms[idx] = prng();
            sizes[idx] = 2.0 + prng() * 3.0;

            idx++;
        }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aDirection", new THREE.BufferAttribute(directions, 1));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    geo.setAttribute("aStreamIdx", new THREE.BufferAttribute(streamIndices, 1));
    geo.setAttribute("aInitialX", new THREE.BufferAttribute(initialXs, 1));
    geo.setAttribute("aSpreadY", new THREE.BufferAttribute(spreadYs, 1));
    geo.setAttribute("aSpreadZ", new THREE.BufferAttribute(spreadZs, 1));
    geo.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    return geo;
}

// ----------------------------------------------------------------------
// 3. FLOATING COSMIC EMBERS / STARDUST
// ----------------------------------------------------------------------
function buildCosmicDustGeometry(count = 750) {
    const prng = createLCG(88471);
    const positions = new Float32Array(count * 3);
    const initialPositions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        const x = (prng() - 0.5) * 90.0;
        const y = -14.0 + prng() * 32.0;
        const z = -25.0 + prng() * 35.0;

        positions[i * 3 + 0] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        initialPositions[i * 3 + 0] = x;
        initialPositions[i * 3 + 1] = y;
        initialPositions[i * 3 + 2] = z;

        velocities[i * 3 + 0] = (prng() - 0.5) * 0.4;
        velocities[i * 3 + 1] = 0.2 + prng() * 0.6;
        velocities[i * 3 + 2] = (prng() - 0.5) * 0.4;

        randoms[i] = prng();
        sizes[i] = 1.0 + prng() * 2.2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aInitialPos", new THREE.BufferAttribute(initialPositions, 3));
    geo.setAttribute("aVelocity", new THREE.BufferAttribute(velocities, 3));
    geo.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    return geo;
}

// ----------------------------------------------------------------------
// GLSL SHADERS FOR RECREATING THE IMAGE IN PARTICLES
// ----------------------------------------------------------------------

const LANDSCAPE_VERTEX_SHADER = /* glsl */ `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec3 uAccentColor;
    uniform float uTextureLoaded;

    attribute vec2 aUv;
    attribute float aRandom;
    attribute float aSize;

    varying vec3 vColor;
    varying float vAlpha;
    varying float vLum;

    void main() {
        // Sample exact pixel from user's image
        vec4 texColor = texture2D(uTexture, aUv);
        float lum = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));

        vec3 pos = position;

        // --- 1. MOUNTAIN CRAGS & ROCK TERRAIN (Bottom 54% of image) ---
        if (aUv.y < 0.54) {
            float tNorm = aUv.y / 0.54; // 0 = foreground close to camera, 1 = distant mountain ridge

            // Z-Depth: foreground reaches near camera (+10.0), distant mountains recede (-20.0)
            pos.z = mix(9.0, -20.0, tNorm);

            // Mountain height elevation driven by image brightness & ridges
            float peakElevation = lum * 14.5 * smoothstep(0.03, 0.48, aUv.y);
            pos.y += peakElevation - (1.0 - tNorm) * 5.0;

            // Low-lying valley mist kinetic movement (subtle undulating waves)
            if (texColor.g > 0.08 && texColor.g > texColor.r * 1.1) {
                float wave = sin(pos.x * 0.16 + uTime * 0.8) * 0.45 + cos(pos.x * 0.3 - uTime * 0.6) * 0.25;
                pos.y += wave;
                pos.z += sin(pos.x * 0.1 + uTime * 0.5) * 0.5;
            }

            // Tectonic subtle geological breathing
            pos.y += sin(uTime * 0.4 + aUv.x * 12.0) * 0.15;
        }
        // --- 2. THE GIANT RISING ALIEN CELESTIAL MOON (Right side horizon) ---
        else if (aUv.x > 0.48 && aUv.y > 0.32) {
            vec2 moonCenter = vec2(0.78, 0.56);
            vec2 moonDelta = (aUv - moonCenter) * vec2(1.0, 0.72);
            float moonDist = length(moonDelta);
            float moonRadius = 0.30;

            if (moonDist < moonRadius) {
                // Project into a majestic 3D spherical dome
                float sphereZ = sqrt(max(0.0, moonRadius * moonRadius - moonDist * moonDist)) * 32.0;
                pos.z = -25.0 + sphereZ;
                pos.y += sphereZ * 0.12;
                pos.x -= sphereZ * 0.08;

                // Subtle planetary rotation & aura pulsation
                pos.y += sin(uTime * 0.3) * 0.2;
            } else {
                // Distant space behind the moon
                pos.z = -32.0 + aRandom * 4.0;
            }
        }
        // --- 3. DEEP SPACE & MILKY WAY STARDUST (Upper left sky) ---
        else {
            pos.z = -34.0 + aRandom * 6.0;

            // Subtle cosmic drift
            pos.x += sin(uTime * 0.2 + aRandom * 6.28) * 0.3;
            pos.y += cos(uTime * 0.25 + aRandom * 6.28) * 0.3;
        }

        // --- 4. INTERACTIVE 3D MOUSE PARALLAX ---
        // Multi-depth camera parallax: closer particles shift more than deep space
        float depthFactor = (pos.z + 36.0) / 46.0; // 0 (deep space) to 1 (near camera)
        pos.x += uMouse.x * (0.8 + depthFactor * 3.2);
        pos.y += uMouse.y * (0.6 + depthFactor * 2.4);

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        // --- 5. PARTICLE POINT SIZE COMPUTATION ---
        float pointSize = aSize;

        // In pitch-black empty sky void, extinguish particles for high contrast
        if (aUv.y > 0.45 && lum < 0.015) {
            gl_PointSize = 0.0;
            vAlpha = 0.0;
            return;
        }

        // Bright moon crescent edge glow gets amplified size
        if (aUv.x > 0.55 && aUv.y > 0.38 && lum > 0.45) {
            pointSize *= (2.6 + lum * 2.8);
        }
        // Mountain crags & mist
        else if (aUv.y < 0.54) {
            pointSize *= (1.4 + lum * 2.0);
        }
        // Stars twinkle
        else {
            pointSize *= (1.0 + sin(uTime * 2.5 + aRandom * 12.56) * 0.6);
        }

        // Perspective size attenuation
        gl_PointSize = pointSize * (75.0 / -mvPosition.z);

        // --- 6. COLOR & GLOW GRADING ---
        vec3 col = texColor.rgb;

        // Enhance the luminous emerald/mint green valley fog & moon atmosphere
        if (texColor.g > 0.06) {
            // Blend with dynamic brand accent color
            col = mix(col, uAccentColor * (0.8 + lum * 1.2), 0.35);
        }

        // Mountain rock contrast
        if (aUv.y < 0.54) {
            col += vec3(0.01, 0.02, 0.015);
        }

        vColor = col;
        vLum = lum;
        vAlpha = smoothstep(0.01, 0.06, lum) * 0.95;
    }
`;

const LANDSCAPE_FRAGMENT_SHADER = /* glsl */ `
    varying vec3 vColor;
    varying float vAlpha;
    varying float vLum;

    void main() {
        // Soft circular particle
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        if (dist > 0.5) discard;

        // Soft radial glow falloff
        float softShape = smoothstep(0.5, 0.05, dist);

        // Radiant glow boost for bright features (moon crescent, valley mist)
        vec3 finalColor = vColor * (1.1 + vLum * 1.4);

        gl_FragColor = vec4(finalColor, softShape * vAlpha);
    }
`;

// ----------------------------------------------------------------------
// GLSL SHADERS FOR FLOWING STREAMS (WEBSITE SECTION STYLE)
// ----------------------------------------------------------------------
const STREAMS_VERTEX_SHADER = /* glsl */ `
    uniform float uTime;
    uniform vec3 uAccentColor;
    uniform vec2 uMouse;

    attribute float aDirection;
    attribute float aSpeed;
    attribute float aStreamIdx;
    attribute float aInitialX;
    attribute float aSpreadY;
    attribute float aSpreadZ;
    attribute float aRandom;
    attribute float aSize;

    varying vec3 vColor;
    varying float vAlpha;

    void main() {
        float xMin = -50.0;
        float xMax = 50.0;
        float lengthX = xMax - xMin;

        // Kinetic horizontal continuous flow
        float advance = uTime * aSpeed * 5.0 * aDirection;
        float currentX = mod((aInitialX - xMin) + advance, lengthX) + xMin;

        // Multi-frequency wave undulation weaving through mountain valleys
        float wave1 = sin(currentX * 0.09 + uTime * 1.2 + aStreamIdx * 1.05) * 1.8;
        float wave2 = cos(currentX * 0.18 - uTime * 0.8 + aRandom * 3.14) * 0.8;
        float currentY = aSpreadY + wave1 + wave2;

        float waveZ = sin(currentX * 0.12 + uTime * 0.9 + aStreamIdx * 0.7) * 2.5;
        float currentZ = aSpreadZ + waveZ;

        // Interactive mouse parallax
        currentX += uMouse.x * 2.0;
        currentY += uMouse.y * 1.5;

        vec4 mvPosition = modelViewMatrix * vec4(currentX, currentY, currentZ, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        // Perspective attenuation
        gl_PointSize = (aSize * 2.2) * (70.0 / -mvPosition.z);

        // Edge fade along stream boundary
        float edgeDist = min(currentX - xMin, xMax - currentX);
        float edgeAlpha = smoothstep(0.0, 8.0, edgeDist);

        vAlpha = edgeAlpha * (0.6 + sin(uTime * 2.0 + aRandom * 6.28) * 0.35);

        // Radiant emerald and brand accent
        vec3 baseTint = mix(vec3(0.24, 1.0, 0.56), uAccentColor, 0.4);
        vColor = baseTint * (1.2 + aRandom * 0.8);
    }
`;

const STREAMS_FRAGMENT_SHADER = /* glsl */ `
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        if (dist > 0.5) discard;

        float soft = smoothstep(0.5, 0.02, dist);
        gl_FragColor = vec4(vColor, soft * vAlpha);
    }
`;

// ----------------------------------------------------------------------
// GLSL SHADERS FOR FLOATING COSMIC DUST EMBERS
// ----------------------------------------------------------------------
const DUST_VERTEX_SHADER = /* glsl */ `
    uniform float uTime;
    uniform vec3 uAccentColor;
    uniform vec2 uMouse;

    attribute vec3 aInitialPos;
    attribute vec3 aVelocity;
    attribute float aRandom;
    attribute float aSize;

    varying vec3 vColor;
    varying float vAlpha;

    void main() {
        vec3 pos = aInitialPos;

        // Upward floating drift from mountain valleys into space
        float lifeCycle = mod(uTime * 0.25 + aRandom * 10.0, 10.0) / 10.0;
        pos.y += lifeCycle * 28.0;

        // Helical curl turbulence
        pos.x += sin(uTime * 0.5 + aRandom * 6.28) * 1.8;
        pos.z += cos(uTime * 0.6 + aRandom * 6.28) * 1.8;

        // Mouse parallax
        pos.x += uMouse.x * 1.2;
        pos.y += uMouse.y * 1.0;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        gl_PointSize = (aSize * 1.8) * (65.0 / -mvPosition.z);

        // Life cycle fade (fade in at birth, fade out at apex)
        float lifeAlpha = sin(lifeCycle * 3.14159);
        vAlpha = lifeAlpha * (0.4 + aRandom * 0.5);

        // Soft mint / white / brand accent
        vColor = mix(vec3(0.5, 1.0, 0.75), uAccentColor, 0.35) * 1.4;
    }
`;

const DUST_FRAGMENT_SHADER = /* glsl */ `
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        if (dist > 0.5) discard;

        float soft = smoothstep(0.5, 0.05, dist);
        gl_FragColor = vec4(vColor, soft * vAlpha);
    }
`;

// ----------------------------------------------------------------------
// 4. INNER THREE.JS SCENE COMPONENT
// ----------------------------------------------------------------------
function AlienLandscapeScene({ accentColor = "#3CFF8F" }: AlienPlanetParticlesProps) {
    const landscapeMatRef = useRef<THREE.ShaderMaterial>(null!);
    const streamsMatRef = useRef<THREE.ShaderMaterial>(null!);
    const dustMatRef = useRef<THREE.ShaderMaterial>(null!);

    const targetColor = useMemo(() => new THREE.Color(accentColor), [accentColor]);
    const currentColor = useRef(new THREE.Color(accentColor));

    // Mouse parallax tracking
    const mousePos = useRef({ x: 0, y: 0 });
    const targetMouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const nx = (e.clientX / window.innerWidth - 0.5) * 2.0;
            const ny = -(e.clientY / window.innerHeight - 0.5) * 2.0;
            targetMouse.current.x = nx;
            targetMouse.current.y = ny;
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Load image texture with linear filtering (no mipmaps for vertex texture sampling)
    const texture = useMemo(() => {
        const loader = new THREE.TextureLoader();
        const tex = loader.load("/images/alien-planet-reference.png", (loadedTex) => {
            loadedTex.minFilter = THREE.LinearFilter;
            loadedTex.magFilter = THREE.LinearFilter;
            loadedTex.generateMipmaps = false;
            loadedTex.needsUpdate = true;
            if (landscapeMatRef.current) {
                landscapeMatRef.current.uniforms.uTextureLoaded.value = 1.0;
            }
        });
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        return tex;
    }, []);

    // Geometries
    const landscapeGeo = useMemo(() => buildLandscapeGridGeometry(256, 128), []);
    const streamsGeo = useMemo(() => buildCosmicStreamsGeometry(), []);
    const dustGeo = useMemo(() => buildCosmicDustGeometry(750), []);

    // Uniforms
    const landscapeUniforms = useMemo(
        () => ({
            uTexture: { value: texture },
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uAccentColor: { value: new THREE.Color(accentColor) },
            uTextureLoaded: { value: 0.0 }
        }),
        [texture, accentColor]
    );

    const streamsUniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uAccentColor: { value: new THREE.Color(accentColor) },
            uMouse: { value: new THREE.Vector2(0, 0) }
        }),
        [accentColor]
    );

    const dustUniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uAccentColor: { value: new THREE.Color(accentColor) },
            uMouse: { value: new THREE.Vector2(0, 0) }
        }),
        [accentColor]
    );

    useFrame((_, delta) => {
        const dt = Math.min(delta, 0.05);

        // Smooth mouse spring interpolation
        mousePos.current.x += (targetMouse.current.x - mousePos.current.x) * (dt * 3.0);
        mousePos.current.y += (targetMouse.current.y - mousePos.current.y) * (dt * 3.0);

        // Smooth color lerping to active brand card accent
        currentColor.current.lerp(targetColor, dt * 3.5);

        // Update Landscape Uniforms
        if (landscapeMatRef.current) {
            landscapeMatRef.current.uniforms.uTime.value += dt;
            landscapeMatRef.current.uniforms.uAccentColor.value.copy(currentColor.current);
            landscapeMatRef.current.uniforms.uMouse.value.set(mousePos.current.x, mousePos.current.y);
        }

        // Update Streams Uniforms
        if (streamsMatRef.current) {
            streamsMatRef.current.uniforms.uTime.value += dt;
            streamsMatRef.current.uniforms.uAccentColor.value.copy(currentColor.current);
            streamsMatRef.current.uniforms.uMouse.value.set(mousePos.current.x, mousePos.current.y);
        }

        // Update Dust Uniforms
        if (dustMatRef.current) {
            dustMatRef.current.uniforms.uTime.value += dt;
            dustMatRef.current.uniforms.uAccentColor.value.copy(currentColor.current);
            dustMatRef.current.uniforms.uMouse.value.set(mousePos.current.x, mousePos.current.y);
        }
    });

    return (
        <group position={[0, 0, -6]}>
            {/* 1. Image-Recreated Alien Mountain & Moon Particle Landscape */}
            <points geometry={landscapeGeo}>
                <shaderMaterial
                    ref={landscapeMatRef}
                    vertexShader={LANDSCAPE_VERTEX_SHADER}
                    fragmentShader={LANDSCAPE_FRAGMENT_SHADER}
                    uniforms={landscapeUniforms}
                    transparent={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* 2. Flowing Kinetic Streams (Website Section Style) */}
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

            {/* 3. Floating Cosmic Embers */}
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
                camera={{ position: [0, 0, 36], fov: 48 }}
                dpr={[1, 2]}
                gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
            >
                <AlienLandscapeScene accentColor={accentColor} />

                {/* HDR Bloom pass for glowing moon crescent, mist & streams */}
                <EffectComposer multisampling={0}>
                    <Bloom
                        intensity={2.8}
                        luminanceThreshold={0.12}
                        luminanceSmoothing={0.8}
                        blendFunction={BlendFunction.SCREEN}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
