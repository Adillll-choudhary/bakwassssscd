"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles, Float } from "@react-three/drei";

export default function GreenParticles() {
    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]}>
                
                {/* Foreground giant floating orbs (Mint Green) */}
                <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
                    <Sparkles 
                        count={50} 
                        scale={30} 
                        size={8} 
                        speed={0.2} 
                        opacity={0.15} 
                        color="#6EF095" 
                    />
                </Float>
                
                {/* Midground medium fast particles (Brand Neon Green) */}
                <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                    <Sparkles 
                        count={150} 
                        scale={25} 
                        size={4} 
                        speed={0.4} 
                        opacity={0.4} 
                        color="#3CFF8F" 
                    />
                </Float>

                {/* Background dense tiny sparks (White hot) */}
                <Sparkles 
                    count={200} 
                    scale={15} 
                    size={1.5} 
                    speed={0.8} 
                    opacity={0.8} 
                    color="#ffffff" 
                    noise={0.1}
                />
                
            </Canvas>
        </div>
    );
}
