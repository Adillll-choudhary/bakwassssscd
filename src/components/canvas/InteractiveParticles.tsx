"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// --- CUSTOM SHADER FOR GLOWING PARTICLES ---
const particleVertexShader = `
  uniform float uTime;
  attribute float particlePhase;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float aRandom = fract(particlePhase * 1.234);
    
    // Ultra-bright neon green base colors matching Logo Particle
    vColor = mix(vec3(0.05, 0.8, 0.3), vec3(0.2, 1.5, 0.8), aRandom); 

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    
    // Slightly larger particles so the star flares are visible
    float aSize = mix(1.0, 3.0, aRandom); 
    gl_PointSize = aSize * (30.0 / -mvPosition.z); 
    gl_Position = projectionMatrix * mvPosition;
    
    vAlpha = mix(0.4, 1.0, aRandom);
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    if (length(cxy) > 1.0) discard;
    
    // 4-pointed Star flare distance calculation
    float starDist = length(cxy) * (1.0 + 8.0 * abs(cxy.x * cxy.y));
    
    float core = exp(-length(cxy) * 12.0); // Tight round white-hot core
    float edge = exp(-starDist * 3.0);     // 4-pointed star flare
    
    vec3 brightColor = vec3(2.0, 3.0, 2.5);
    vec3 finalColor = mix(vColor, brightColor, core);
    
    // Massive brightness multiplier to make it glow intensely
    finalColor *= 2.5; 
    
    float alpha = vAlpha * edge * mix(1.0, 2.5, core);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

/**
 * Utility to convert SVG Image to Particle Arrays.
 */
const extractPointsFromImage = async (src: string, count: number): Promise<Float32Array> => {
    try {
        let imageSrc = src;

        if (src.endsWith('.svg')) {
            const response = await fetch(src);
            if (!response.ok) throw new Error(`Failed to fetch SVG: ${src}`);
            const svgText = await response.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(svgText, "image/svg+xml");
            const svgElement = doc.querySelector("svg");
            if (!svgElement) throw new Error(`No SVG element in ${src}`);

            // Ensure viewBox exists for proper scaling
            if (!svgElement.hasAttribute("viewBox")) {
                const w = svgElement.getAttribute("width") || "100";
                const h = svgElement.getAttribute("height") || "100";
                svgElement.setAttribute("viewBox", `0 0 ${w} ${h}`);
            }

            // Only force white outlines for simple icons. Let complex shapes like adil.svg render naturally.
            if (!src.includes('adil')) {
                const style = doc.createElementNS("http://www.w3.org/2000/svg", "style");
                style.textContent = `
                    path, rect, circle, ellipse, polygon, polyline { 
                        stroke: white !important; 
                        fill: transparent !important; 
                        stroke-width: 2px !important; 
                    }
                    text { 
                        fill: white !important; 
                        stroke: none !important; 
                    }
                `;
                svgElement.appendChild(style);
            }
            
            // Force large canvas rendering resolution
            svgElement.setAttribute("width", "800");
            svgElement.setAttribute("height", "800");

            const processedSvg = new XMLSerializer().serializeToString(doc);
            const svg64 = btoa(unescape(encodeURIComponent(processedSvg)));
            imageSrc = 'data:image/svg+xml;base64,' + svg64;
        }

        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                try {
                    const canvas = document.createElement("canvas");
                    const size = 1200; // Ultra high-resolution sampling grid
                    canvas.width = size;
                    canvas.height = size;
                    const ctx = canvas.getContext("2d", { willReadFrequently: true });
                    if (!ctx) throw new Error("No 2D context");

                    const scale = Math.min(size / img.width, size / img.height) * 0.9;
                    const drawW = img.width * scale;
                    const drawH = img.height * scale;
                    const dx = (size - drawW) / 2;
                    const dy = (size - drawH) / 2;

                    ctx.fillStyle = "black";
                    ctx.fillRect(0, 0, size, size);
                    ctx.drawImage(img, dx, dy, drawW, drawH);

                    const imgData = ctx.getImageData(0, 0, size, size).data;
                    const rawPoints: { x: number, y: number }[] = [];

                    for (let y = 0; y < size; y += 2) {
                        for (let x = 0; x < size; x += 2) {
                            const index = (y * size + x) * 4;
                            const r = imgData[index];
                            const g = imgData[index + 1];
                            const b = imgData[index + 2];
                            // Check brightness
                            if (r > 30 || g > 30 || b > 30) {
                                rawPoints.push({ x, y });
                            }
                        }
                    }

                    const out = new Float32Array(count * 3);
                    if (rawPoints.length === 0) {
                        resolve(out);
                        return;
                    }

                    // Base scale increased by 20% (24 -> 28.8). Coldune Logo increased by 40% (28.8 * 1.4 = ~40.3)
                    const mapScale = src.includes('coldune-studio') ? 40.3 : 28.8;
                    const mapOffset = mapScale / 2.0;

                    for (let i = 0; i < count; i++) {
                        const pt = rawPoints[Math.floor(Math.random() * rawPoints.length)];
                        
                        const mapX = (pt.x / size) * mapScale - mapOffset;
                        const mapY = -((pt.y / size) * mapScale - mapOffset);
                        
                        out[i * 3] = mapX;
                        out[i * 3 + 1] = mapY;
                        
                        // Tighten Z-depth variation
                        out[i * 3 + 2] = (Math.random() - 0.5) * 1.5; 
                    }
                    resolve(out);
                } catch (e) {
                    console.error("Canvas parsing error:", e);
                    resolve(new Float32Array(count * 3));
                }
            };
            img.onerror = () => resolve(new Float32Array(count * 3));
            img.src = imageSrc;
        });
    } catch (e) {
        console.error("Extraction wrapper error:", e);
        return new Float32Array(count * 3);
    }
};

function ParticleSystem({ shapesData }: { shapesData: Float32Array[] }) {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const count = 20000;

    const hover = useRef(new THREE.Vector3(0, 0, 0));
    const targetHover = useRef(new THREE.Vector3(0, 0, 0));
    const { viewport, mouse } = useThree();

    const [positions, speeds, phases] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const spd = new Float32Array(count);
        const phs = new Float32Array(count);
        
        if (shapesData.length > 0) {
            pos.set(shapesData[0]); 
        }

        for (let i = 0; i < count; i++) {
            spd[i] = Math.random() * 0.4 + 0.1;
            phs[i] = Math.random() * Math.PI * 2;
        }
        return [pos, spd, phs];
    }, [shapesData]);

    const transitionTime = 2.0; 
    const holdTime = 4.0;
    const totalCycle = holdTime + transitionTime;

    useFrame((state, delta) => {
        if (!materialRef.current || !pointsRef.current) return;
        
        const time = state.clock.getElapsedTime();
        materialRef.current.uniforms.uTime.value = time;

        const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
        const positionsAttribute = pointsRef.current.geometry.attributes.position;

        targetHover.current.x = (mouse.x * viewport.width) / 2;
        targetHover.current.y = (mouse.y * viewport.height) / 2;
        hover.current.lerp(targetHover.current, 0.1);

        if (shapesData.length === 0) return;

        const cycleTime = time % totalCycle;
        const step = Math.floor(time / totalCycle);
        const currentShapeIndex = step % shapesData.length;
        const nextShapeIndex = (step + 1) % shapesData.length;

        const currentShapeBase = shapesData[currentShapeIndex];
        const nextShapeBase = shapesData[nextShapeIndex];

        let morphFactor = 0;
        if (cycleTime > holdTime) {
            morphFactor = (cycleTime - holdTime) / transitionTime;
            morphFactor = morphFactor * morphFactor * morphFactor * (morphFactor * (6 * morphFactor - 15) + 10);
        }

        for (let i = 0; i < count; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            const targetX = currentShapeBase[ix] + (nextShapeBase[ix] - currentShapeBase[ix]) * morphFactor;
            const targetY = currentShapeBase[iy] + (nextShapeBase[iy] - currentShapeBase[iy]) * morphFactor;
            const targetZ = currentShapeBase[iz] + (nextShapeBase[iz] - currentShapeBase[iz]) * morphFactor;

            const tx = targetX;
            const ty = targetY;
            const tz = targetZ;

            const isHolding = cycleTime <= holdTime;
            const snapMulti = isHolding ? 4.0 : 1.0; 
            const currentSpeed = speeds[i] * (delta * 60.0) * snapMulti;
            const lerpSpeed = Math.min(currentSpeed, 0.2); 

            posArray[ix] += (tx - posArray[ix]) * lerpSpeed;
            posArray[iy] += (ty - posArray[iy]) * lerpSpeed;
            posArray[iz] += (tz - posArray[iz]) * lerpSpeed;

            // Interactive repelling in local mesh space (Mesh is at [14, 0, -5])
            const localHoverX = hover.current.x - 14;
            const localHoverY = hover.current.y;
            const localHoverZ = hover.current.z - (-5);

            const dx = posArray[ix] - localHoverX;
            const dy = posArray[iy] - localHoverY;
            const dz = posArray[iz] - localHoverZ;
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < 16) {
                const dist = Math.sqrt(distSq);
                const repelForce = (4 - dist) * 0.4;
                posArray[ix] += (dx / dist) * repelForce * (delta * 60.0);
                posArray[iy] += (dy / dist) * repelForce * (delta * 60.0);
                posArray[iz] += (dz / dist) * repelForce * (delta * 60.0);
            }
        }
        positionsAttribute.needsUpdate = true;
        // Slow majestic rotation
        pointsRef.current.rotation.y = Math.sin(time * 0.1) * 0.05;
        pointsRef.current.rotation.x = Math.cos(time * 0.1) * 0.02;
    });

    return (
        <points ref={pointsRef} position={[14, 0, -5]}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-particlePhase" args={[phases, 1]} />
            </bufferGeometry>
            <shaderMaterial
                ref={materialRef}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                vertexShader={particleVertexShader}
                fragmentShader={particleFragmentShader}
                uniforms={{ uTime: { value: 0 } }}
            />
        </points>
    );
}

export default function InteractiveParticles() {
    const [shapesData, setShapesData] = useState<Float32Array[]>([]);

    useEffect(() => {
        const count = 20000;
        const loadShapes = async () => {
            const svgPaths = [
                "/svg/adil 3.svg",
                "/svg/ai-brain.svg",
                "/svg/gpu.svg",
                "/svg/tree.svg",
                "/svg/marketing.svg",
                "/svg/video-editing.svg",
                "/svg/planet.svg",
                "/coldune-studio-logo-3.webp", 
            ];
            const shapes = await Promise.all(svgPaths.map(async (path) => {
                const res = await extractPointsFromImage(path, count);
                return res;
            }));
            
            setShapesData(shapes.filter(s => s !== null));
        };
        loadShapes();
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden">
            <Canvas camera={{ position: [0, 0, 20], fov: 60 }} dpr={[1, 3]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
                {shapesData.length > 0 && <ParticleSystem shapesData={shapesData} />}
            </Canvas>
        </div>
    );
}
