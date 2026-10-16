"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Planet() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <mesh ref={meshRef} scale={2}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial
                color="#1A2517"
                emissive="#0F160E"
                emissiveIntensity={0.8}
                roughness={0.5}
                metalness={0.8}
                wireframe={true}
            />
            {/* Inner Glow Sphere (Optional simulation) */}
            <mesh scale={0.98}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial color="#000000" />
            </mesh>
        </mesh>
    );
}

function Atmosphere() {
    return (
        <mesh scale={2.2}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial
                color="#ACC8A2"
                transparent
                opacity={0.2}
                side={THREE.BackSide}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    )
}

export default function EarthScene() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full bg-black">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={2.5} color="#ACC8A2" />
                <Stars radius={300} depth={50} count={7000} factor={4} saturation={0} fade speed={0.5} />
                <Planet />
                <Atmosphere />
                <Sparkles count={300} scale={10} size={1} speed={0.2} opacity={0.6} color="#ACC8A2" />
                {/* Disable zoom to keep layout stable */}
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
}
