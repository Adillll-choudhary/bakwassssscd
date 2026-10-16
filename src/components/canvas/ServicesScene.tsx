"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import ParticleLogo from "./ParticleLogo";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

export default function ServicesScene({ scrollProgress }: { scrollProgress: number }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    // The canvas MUST be taller than the section to prevent the intense Bloom post-processing from being sliced off by the edge of the bitmap!
    return (
        <div className="absolute top-[-1000px] bottom-[-1000px] left-0 right-0 pointer-events-none z-0">
            <Canvas camera={{ position: [0, 0, 100], fov: 45 }} dpr={[1, 2]} gl={{ alpha: true }}>
                
                <ParticleLogo scrollProgress={scrollProgress} />

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
