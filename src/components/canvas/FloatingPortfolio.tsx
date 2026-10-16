"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image, Text, useCursor, Environment, Float, useVideoTexture, Html } from "@react-three/drei";
import { useRef, useState, useEffect, Suspense, useMemo } from "react";
import * as THREE from "three";
import { easing } from "maath";

// --- Configuration ---
const VISIBLE_ITEMS = 12;
const SPREAD = 7; // Spread of the cluster

// --- Data ---
const rawProjects = [
    { file: "shoes.mov", type: "video", category: "Commercial" },
    { file: "timeline-1.mov", type: "video", category: "Motion Graphics" },
    { file: "smart-business-learning---instagram-facebook---linktree.mp4", type: "video", category: "Social Media" },
    { file: "branding-post-1.webp", type: "image", category: "Branding" },
    { file: "img-2768.webp", type: "image", category: "Photography" },
    { file: "img-2769.webp", type: "image", category: "Fashion" },
    { file: "img-2810.webp", type: "image", category: "App Design" },
    { file: "img-2781.webp", type: "image", category: "Web Design" },
    { file: "img-2782.webp", type: "image", category: "UI/UX" },
    { file: "img-2784.webp", type: "image", category: "Product" },
    { file: "img-2838.webp", type: "image", category: "Marketing" },
    { file: "data-analysist.webp", type: "image", category: "Data Vis" },
    { file: "ecommerce.webp", type: "image", category: "E-commerce" },
    { file: "portfolio-2.mov", type: "video", category: "Showreel" },
];

const projects = rawProjects.map((p, i) => ({
    id: i,
    image: `/work/${p.file}`,
    title: p.file.split('.')[0].replace(/-/g, ' '),
    category: p.category,
    type: p.type as 'image' | 'video'
}));

// --- Types ---
interface Project {
    id: number;
    image: string;
    title: string;
    category: string;
    type: 'image' | 'video';
}

interface ItemProps {
    project: Project;
    position: [number, number, number];
    rotation: [number, number, number];
    onSelect: (project: Project) => void;
}

// --- Components ---

function VideoTexture({ url, opacity }: { url: string, opacity: number }) {
    const texture = useVideoTexture(url, {
        muted: true,
        loop: true,
        start: true,
        crossOrigin: 'Anonymous',
    });
    return (
        <meshBasicMaterial map={texture} toneMapped={false} transparent opacity={opacity} side={THREE.DoubleSide} />
    );
}

function Item({ project, position, rotation, onSelect }: ItemProps) {
    const ref = useRef<THREE.Group>(null!);
    const meshRef = useRef<THREE.Mesh>(null!);
    const [hovered, hover] = useState(false);

    useCursor(hovered);

    useFrame((state, delta) => {
        if (!ref.current) return;

        // Hover Scale
        const targetScale = hovered ? 1.5 : 1;
        // @ts-ignore
        easing.damp3(ref.current.scale, [targetScale, targetScale, targetScale], 0.15, delta);

        // Look at camera when hovered
        if (hovered) {
            ref.current.lookAt(state.camera.position);
        }

        // Material
        if (project.type === 'image' && meshRef.current && meshRef.current.material) {
            // @ts-ignore
            easing.damp(meshRef.current.material, 'zoom', hovered ? 1 : 0.85, 0.2, delta);
            // @ts-ignore
            easing.damp(meshRef.current.material, 'grayscale', hovered ? 0 : 0.8, 0.25, delta);
        }
    });

    return (
        <group ref={ref} position={position} rotation={rotation}>
            <Float
                rotationIntensity={hovered ? 0 : 1}
                floatIntensity={hovered ? 0.2 : 2}
                floatingRange={[-0.2, 0.2]}
                speed={2}
            >
                <mesh
                    ref={meshRef}
                    scale={[3, 2, 1]}
                    onPointerOver={(e) => { e.stopPropagation(); hover(true); }}
                    onPointerOut={(e) => { e.stopPropagation(); hover(false); }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect(project);
                    }}
                >
                    <planeGeometry />
                    {project.type === 'video' ? (
                        <Suspense fallback={<meshBasicMaterial color="#111" />}>
                            <VideoTexture url={project.image} opacity={1} />
                        </Suspense>
                    ) : (
                        <Image
                            url={project.image}
                            transparent
                            side={THREE.DoubleSide}
                            scale={[1, 1, 1] as any}
                            toneMapped={false}
                        />
                    )}
                </mesh>

                <group position={[0, -1.2, 0.1]} visible={hovered}>
                    <Text
                        fontSize={0.2}
                        anchorX="center"
                        anchorY="middle"
                        color="white"
                        // @ts-ignore
                        fillOpacity={hovered ? 1 : 0}
                    >
                        {project.title.toUpperCase()}
                    </Text>
                </group>
            </Float>
        </group>
    );
}

function Cloud({ onSelect }: { onSelect: (p: Project) => void }) {
    // Generate random positions
    const items = useMemo(() => {
        return projects.map((project) => {
            const x = (Math.random() - 0.5) * SPREAD * 3.5;
            const y = (Math.random() - 0.5) * SPREAD * 1.5;
            const z = (Math.random() - 0.5) * SPREAD * 1.5;
            const rotX = Math.random() * Math.PI * 0.2;
            const rotY = Math.random() * Math.PI * 0.2;
            const rotZ = Math.random() * Math.PI * 0.1;
            return { ...project, pos: [x, y, z] as [number, number, number], rot: [rotX, rotY, rotZ] as [number, number, number] };
        });
    }, []);

    const group = useRef<THREE.Group>(null!);

    useFrame((state, delta) => {
        if (!group.current) return;

        // Mouse Parallax 
        const { x, y } = state.pointer;
        const targetX = -x * 2;
        const targetY = -y * 2;

        // Gentle rotation
        group.current.rotation.y += delta * 0.05;

        // @ts-ignore
        easing.damp3(group.current.position, [targetX, targetY, 0], 0.2, delta);
        // @ts-ignore
        easing.dampE(group.current.rotation, [y * 0.2, group.current.rotation.y, 0], 0.2, delta);
    });

    return (
        <group ref={group}>
            {items.map((item) => (
                <Item
                    key={item.id}
                    project={item}
                    position={item.pos}
                    rotation={item.rot}
                    onSelect={onSelect}
                />
            ))}
        </group>
    );
}

function Loader() {
    return <Html center><div className="text-accent text-sm tracking-widest animate-pulse">LOADING PROJECTS...</div></Html>
}

interface FloatingPortfolioProps {
    onSelectProject: (project: Project) => void;
}

export default function FloatingPortfolio({ onSelectProject }: FloatingPortfolioProps) {
    const [dpr, setDpr] = useState(1.5);
    useEffect(() => {
        if (window.innerWidth < 768) setDpr(1);
    }, []);

    return (
        <div className="w-full h-full absolute inset-0">
            <Canvas dpr={dpr} camera={{ position: [0, 0, 15], fov: 45 }}>
                <fog attach="fog" args={['#050505', 10, 40]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <DirectionalLight />

                <Suspense fallback={<Loader />}>
                    <Cloud onSelect={onSelectProject} />
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}

function DirectionalLight() {
    const light = useRef<THREE.DirectionalLight>(null!);
    useFrame((state) => {
        light.current.position.x = state.pointer.x * 5;
        light.current.position.y = state.pointer.y * 5;
    })
    return <directionalLight ref={light} position={[0, 0, 5]} intensity={1} />;
}
