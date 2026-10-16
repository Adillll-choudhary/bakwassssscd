"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const particleVertexShader = `
  uniform float uTime;
  attribute float particlePhase;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float aRandom = fract(particlePhase * 1.234);

    // Ultra-bright neon green base colors (matching Logo Particles)
    vColor = mix(vec3(0.05, 0.8, 0.3), vec3(0.2, 1.5, 0.8), aRandom); 

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    
    // Size based on depth and random factor
    float aSize = mix(0.5, 2.0, aRandom);
    gl_PointSize = aSize * (15.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    
    vAlpha = mix(0.6, 1.0, aRandom);
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = length(cxy);
    if (r > 1.0) discard;
    
    float edge = exp(-r * 2.5);
    
    vec3 finalColor = vColor;
    float alpha = vAlpha * edge;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

function createRandomScatter(count: number, range: number) {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
        arr[i] = (Math.random() - 0.5) * range;
    }
    return arr;
}

const extractPointsFromText = async (text: string, count: number): Promise<Float32Array> => {
    return new Promise((resolve) => {
        document.fonts.ready.then(() => {
            const canvas = document.createElement("canvas");
            const size = 800; // Use a larger canvas to avoid cutoff
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            if (!ctx) return resolve(createRandomScatter(count, 10));

            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, size, size);

            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = '250px Siestha, serif'; // Fixed large font size
            
            ctx.fillText(text, size / 2, size / 2);

            const imgData = ctx.getImageData(0, 0, size, size).data;
            const rawPoints: { x: number, y: number }[] = [];
            
            let minX = size, maxX = 0, minY = size, maxY = 0;

            // Scan pixels and find bounding box
            for (let y = 0; y < size; y += 2) {
                for (let x = 0; x < size; x += 2) {
                    const index = (y * size + x) * 4;
                    if (imgData[index] > 30) { // Lower threshold to capture thin cursive strokes
                        rawPoints.push({ x, y });
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                    }
                }
            }

            if (rawPoints.length < 10) {
                return resolve(createRandomScatter(count, 10));
            }

            const textWidth = maxX - minX;
            const textHeight = maxY - minY;
            const maxDim = Math.max(textWidth, textHeight);

            const pos = new Float32Array(count * 3);
            for (let i = 0; i < count; i++) {
                const pt = rawPoints[Math.floor(Math.random() * rawPoints.length)];
                
                // Map to -1 to 1 based on the actual pixel bounding box
                const normalizedX = (pt.x - minX - textWidth / 2) / maxDim;
                const normalizedY = -(pt.y - minY - textHeight / 2) / maxDim;

                // Scale to 3D space (12 units wide)
                const scale = 12.0; 
                
                // Add jitter based on density
                const jitter = 0.05; 
                
                pos[i * 3] = (normalizedX * scale) + (Math.random() - 0.5) * jitter;
                pos[i * 3 + 1] = (normalizedY * scale) + (Math.random() - 0.5) * jitter;
                pos[i * 3 + 2] = (Math.random() - 0.5) * 0.2; // Slight depth
            }
            resolve(pos);
        });
    });
};

function StaticParticleSystem({ shapeData, count }: { shapeData: Float32Array, count: number }) {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const [phases] = useMemo(() => {
        const particlePhases = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            particlePhases[i] = Math.random() * Math.PI * 2;
        }
        return [particlePhases];
    }, [count]);
    
    // No dynamic positions needed for static particles
    
    useFrame((state) => {
        if (!materialRef.current) return;
        // Keep updating uTime just in case the shader wants to pulse later, 
        // but no position updates or mouse interactions are applied.
        materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    });

    return (
        <points ref={pointsRef} position={[0, 0, 0]} scale={1.0}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[shapeData, 3]} />
                <bufferAttribute attach="attributes-particlePhase" args={[phases, 1]} />
            </bufferGeometry>
            <shaderMaterial
                ref={materialRef}
                transparent
                depthWrite={false}
                blending={THREE.NormalBlending}
                vertexShader={particleVertexShader}
                fragmentShader={particleFragmentShader}
                uniforms={{ uTime: { value: 0 } }}
            />
        </points>
    );
}

export default function NumberParticles({ text }: { text: string }) {
    const [shapeData, setShapeData] = useState<Float32Array | null>(null);
    const count = 3000; // Lower count for performance since we have 4 of these

    useEffect(() => {
        const loadShape = async () => {
            const data = await extractPointsFromText(text, count);
            setShapeData(data);
        };
        loadShape();
    }, [text]);

    return (
        <div className="w-full h-[180px] md:h-[220px] relative pointer-events-none z-0">
            {shapeData ? (
                <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 2]} gl={{ alpha: true, antialias: false }}>
                    <StaticParticleSystem shapeData={shapeData} count={count} />
                </Canvas>
            ) : (
                // Fallback while generating particles
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl md:text-8xl font-siestha text-accent/10 opacity-0">{text}</span>
                </div>
            )}
        </div>
    );
}
