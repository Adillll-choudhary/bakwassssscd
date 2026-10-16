"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image, Text, useCursor, Environment, Float, useVideoTexture, Html } from "@react-three/drei";
import { useRef, useState, useEffect, Suspense } from "react";
import * as THREE from "three";
import { easing } from "maath";

// --- Configuration ---
const VISIBLE_ITEMS = 8;
const RADIUS = 6.5;
const TILT_ANGLE = 0.15;
const FRICTION = 0.95;

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

interface CardProps {
    project: Project;
    count: number;
    radius: number;
    index: number;
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
    // Cleanup video texture on unmount
    useEffect(() => {
        return () => texture.dispose();
    }, [texture]);

    return (
        <meshBasicMaterial map={texture} toneMapped={false} transparent opacity={opacity} side={THREE.DoubleSide} />
    );
}


function Card({ project, count, radius, index, onSelect, ...props }: CardProps) {
    const ref = useRef<THREE.Group>(null!);
    const meshRef = useRef<THREE.Mesh>(null!);
    const [hovered, hover] = useState(false);

    useCursor(hovered);

    const angle = (index / count) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    useFrame((state, delta) => {
        if (!ref.current) return;

        // Scale & Position
        const targetScale = hovered ? 1.4 : 1;
        // @ts-ignore
        easing.damp3(ref.current.scale, [targetScale, targetScale, targetScale], 0.1, delta);

        // Face outward
        ref.current.lookAt(0, 0, 0);
        ref.current.rotation.y += Math.PI;

        // Image Material handling
        if (project.type === 'image' && meshRef.current && meshRef.current.material) {
            // @ts-ignore
            easing.damp(meshRef.current.material, 'zoom', hovered ? 1 : 0.85, 0.2, delta);
            // @ts-ignore
            easing.damp(meshRef.current.material, 'grayscale', hovered ? 0 : 1, 0.25, delta);
        }
    });

    return (
        <group ref={ref} {...props} position={[x, 0, z]}>
            <Float rotationIntensity={0.1} floatIntensity={0.3} floatingRange={[-0.05, 0.05]}>
                <mesh
                    ref={meshRef}
                    scale={[3, 2, 1] as any}
                    onPointerOver={() => hover(true)}
                    onPointerOut={() => hover(false)}
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

                <group position={[0, -1.3, 0.1]}>
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
                    <Text
                        position={[0, -0.25, 0]}
                        fontSize={0.1}
                        anchorX="center"
                        anchorY="middle"
                        color="#ACC8A2"
                        // @ts-ignore
                        fillOpacity={hovered ? 1 : 0}
                    >
                        {project.category.toUpperCase()}
                    </Text>
                </group>
            </Float>
        </group>
    );
}

function Rig({ children, sensitivity = 1 }: { children: React.ReactNode, sensitivity?: number }) {
    const ref = useRef<THREE.Group>(null!);
    const { camera, size, viewport } = useThree();
    const velocity = useRef(0);
    const lastMouseX = useRef(0);
    const isDragging = useRef(false);

    const handlePointerDown = (e: any) => {
        isDragging.current = true;
        lastMouseX.current = e.clientX;
    };

    const handlePointerUp = () => {
        isDragging.current = false;
    };

    const handlePointerMove = (e: any) => {
        if (isDragging.current) {
            const deltaX = e.clientX - lastMouseX.current;
            lastMouseX.current = e.clientX;
            velocity.current += deltaX * 0.0005 * sensitivity;
        }
    };

    useEffect(() => {
        window.addEventListener('pointerup', handlePointerUp);
        return () => window.removeEventListener('pointerup', handlePointerUp);
    }, []);

    useFrame((state, delta) => {
        if (!ref.current) return;

        // Rotation removed

        const x = state.pointer.x * TILT_ANGLE;
        const y = state.pointer.y * TILT_ANGLE;

        // @ts-ignore
        easing.dampE(ref.current.rotation, [y, ref.current.rotation.y, x], 0.2, delta);
    });

    return (
        <group
            ref={ref}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            {children}
        </group>
    );
}

function Loader() {
    return <Html center><div className="text-accent text-sm tracking-widest">LOADING ASSETS...</div></Html>
}

interface WorkOrbitProps {
    onSelectProject: (project: Project) => void;
}

export default function WorkOrbit({ onSelectProject }: WorkOrbitProps) {
    const [dpr, setDpr] = useState(1.5);
    useEffect(() => {
        if (window.innerWidth < 768) setDpr(1);
    }, []);

    return (
        <div className="w-full h-full absolute inset-0">
            <Canvas dpr={dpr} camera={{ position: [0, 0, 14], fov: 35 }}>
                <fog attach="fog" args={['#050505', 8, 30]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />

                <Suspense fallback={<Loader />}>
                    <Rig>
                        {projects.map((project, i) => (
                            <Card
                                key={project.id}
                                project={project}
                                index={i}
                                count={projects.length}
                                radius={RADIUS}
                                onSelect={onSelectProject}
                            />
                        ))}
                    </Rig>
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}
