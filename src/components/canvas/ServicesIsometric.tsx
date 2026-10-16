"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, Environment, Html } from "@react-three/drei";
import { useRef, useState, Suspense } from "react";
import * as THREE from "three";
import { easing } from "maath";
import {
    Megaphone, Video, PenTool, Music, Cpu, Globe,
    Layout, Share2, TrendingUp, Smartphone, Server,
    Users, Camera, Shirt, Image as ImageIcon, MessageSquare
} from "lucide-react";

const services = [
    { name: "Marketing", icon: Megaphone },
    { name: "Video Editing", icon: Video },
    { name: "Graphic Design", icon: PenTool },
    { name: "Song Composer", icon: Music },
    { name: "AI Automations", icon: Cpu },
    { name: "Web Designs", icon: Layout },
    { name: "Branding", icon: Globe },
    { name: "Social Media", icon: Share2 },
    { name: "SEO Growth", icon: TrendingUp },
    { name: "Mobile Apps", icon: Smartphone },
    { name: "Hosting", icon: Server },
    { name: "Influencer", icon: Users },
    { name: "Video Shoots", icon: Camera },
    { name: "Garments", icon: Shirt },
    { name: "Thumbnails", icon: ImageIcon },
    { name: "Creatives", icon: MessageSquare },
];

interface CardProps {
    service: typeof services[0];
    position: [number, number, number];
    index: number;
}

function ServiceCard({ service, position, index }: CardProps) {
    const ref = useRef<THREE.Group>(null!);
    const [hovered, setHovered] = useState(false);

    useFrame((state, delta) => {
        if (!ref.current) return;

        // Hover lift
        const targetY = position[1] + (hovered ? 0.3 : 0);
        // @ts-ignore
        easing.damp3(ref.current.position, [position[0], targetY, position[2]], 0.2, delta);

        // Hover scale
        const targetScale = hovered ? 1.05 : 1;
        // @ts-ignore
        easing.damp3(ref.current.scale, [targetScale, targetScale, targetScale], 0.2, delta);
    });

    return (
        <group ref={ref} position={position}>
            <Float
                speed={1.5}
                rotationIntensity={0.1}
                floatIntensity={0.3}
                floatingRange={[-0.1, 0.1]}
            >
                <mesh
                    onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
                    onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
                    castShadow
                    receiveShadow
                >
                    <boxGeometry args={[2.5, 3, 0.15]} />
                    <meshPhysicalMaterial
                        color="#f5f5f0"
                        roughness={0.3}
                        metalness={0.1}
                        clearcoat={0.3}
                        clearcoatRoughness={0.4}
                    />
                </mesh>

                {/* Icon */}
                <Html
                    position={[0, 0.8, 0.08]}
                    center
                    distanceFactor={6}
                    transform
                    sprite
                >
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#ACC8A2]/20 to-[#8DA885]/10 border border-[#ACC8A2]/30">
                        <service.icon size={24} className="text-[#556B2F]" />
                    </div>
                </Html>

                {/* Title */}
                <Text
                    position={[0, 0.2, 0.08]}
                    fontSize={0.18}
                    color="#1A2517"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/Inter-Bold.ttf"
                    maxWidth={2}
                >
                    {service.name}
                </Text>

                {/* Mock UI Elements */}
                <mesh position={[0, -0.3, 0.08]}>
                    <planeGeometry args={[2, 0.4]} />
                    <meshBasicMaterial color="#e8e8e0" opacity={0.6} transparent />
                </mesh>
                <mesh position={[0, -0.8, 0.08]}>
                    <planeGeometry args={[1.8, 0.3]} />
                    <meshBasicMaterial color="#d8d8d0" opacity={0.5} transparent />
                </mesh>
            </Float>
        </group>
    );
}

function Scene() {
    const group = useRef<THREE.Group>(null!);

    useFrame((state, delta) => {
        if (!group.current) return;

        // Subtle parallax
        const { x, y } = state.pointer;
        // @ts-ignore
        easing.damp3(group.current.rotation, [y * 0.05, x * 0.05, 0], 0.3, delta);
    });

    // Layout: 4x4 grid
    const gridLayout = services.map((service, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = (col - 1.5) * 3;
        const z = (row - 1.5) * 3.5;
        return { ...service, pos: [x, 0, z] as [number, number, number], index: i };
    });

    return (
        <group ref={group}>
            {gridLayout.map((item) => (
                <ServiceCard
                    key={item.name}
                    service={item}
                    position={item.pos}
                    index={item.index}
                />
            ))}
        </group>
    );
}

function Loader() {
    return <Html center><div className="text-neutral-600 text-sm tracking-widest animate-pulse">LOADING SERVICES...</div></Html>;
}

export default function ServicesIsometric() {
    return (
        <div className="w-full h-[900px] relative bg-gradient-to-br from-[#f5f5f0] via-[#e8e8e0] to-[#d8d8d0]">
            <Canvas
                camera={{ position: [0, 8, 12], fov: 35 }}
                dpr={[1, 2]}
                shadows
            >
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
                <directionalLight position={[-5, 5, -5]} intensity={0.3} />

                <Suspense fallback={<Loader />}>
                    <Scene />
                    <Environment preset="apartment" />
                </Suspense>
            </Canvas>
        </div>
    );
}
