"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const auraVertexShader = `
  uniform float uTime;
  attribute float randomOffset;
  attribute float sizeMulti;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float angle = randomOffset * 3.14159 * 2.0 + uTime * 0.5;
    float radius = mix(0.5, 4.0, randomOffset);
    
    // Create a swirling vortex
    vec3 pos = position;
    pos.x += cos(angle) * radius;
    pos.y += sin(angle) * radius;
    pos.z += sin(uTime * 1.0 + randomOffset * 10.0) * 1.5;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Green/Teal accent colors matching the theme
    vColor = mix(vec3(0.1, 0.9, 0.4), vec3(0.7, 1.0, 0.6), randomOffset);
    
    gl_PointSize = sizeMulti * (12.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    
    // Fade out based on time and random
    vAlpha = (sin(uTime * 3.0 + randomOffset * 20.0) * 0.5 + 0.5) * 0.8;
  }
`;

const auraFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = length(cxy);
    if (r > 1.0) discard;
    
    // Soft glowing edge
    float edge = exp(-r * 3.0);
    gl_FragColor = vec4(vColor, vAlpha * edge);
  }
`;

function AuraParticleSystem() {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const count = 400; // Dense enough for a glow, sparse enough for performance

    const [positions, offsets, sizes] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const off = new Float32Array(count);
        const siz = new Float32Array(count);
        
        for (let i = 0; i < count; i++) {
            // Start at origin, shader will push them out into a vortex
            pos[i * 3] = (Math.random() - 0.5) * 0.5;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
            
            off[i] = Math.random();
            siz[i] = Math.random() * 2.0 + 1.0;
        }
        return [pos, off, siz];
    }, [count]);

    useFrame((state) => {
        if (!materialRef.current || !pointsRef.current) return;
        const time = state.clock.getElapsedTime();
        materialRef.current.uniforms.uTime.value = time;
        // Slow majestic rotation
        pointsRef.current.rotation.z = time * 0.1;
        pointsRef.current.rotation.y = Math.sin(time * 0.2) * 0.3;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-randomOffset" args={[offsets, 1]} />
                <bufferAttribute attach="attributes-sizeMulti" args={[sizes, 1]} />
            </bufferGeometry>
            <shaderMaterial
                ref={materialRef}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                vertexShader={auraVertexShader}
                fragmentShader={auraFragmentShader}
                uniforms={{ uTime: { value: 0 } }}
            />
        </points>
    );
}

export default function NumberAuraParticles() {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-30 group-hover:opacity-100 transition-opacity duration-700">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ alpha: true }}>
                <AuraParticleSystem />
            </Canvas>
        </div>
    );
}
