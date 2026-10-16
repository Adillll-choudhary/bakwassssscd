"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Image, Text, useCursor, Environment, useVideoTexture, Html, ContactShadows } from "@react-three/drei";
import { useRef, useState, Suspense, useEffect, useMemo } from "react";
import * as THREE from "three";
import { easing } from "maath";
import { Play } from "lucide-react";

// --- Configuration ---
const VISIBLE_ROWS = 4;
const ROW_Height = 2.6; // Vertical spacing
const ITEM_WIDTH = 3.6; // Horizontal spacing
const TILT_ANGLE = -Math.PI / 6; // -30 degrees tilt for that "surface" look
const SCROLL_SPEED = 1.0; // Base scroll speed

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
    { file: "shoes.mov", type: "video", category: "Commercial" }, // Loop filler
];

const projectsBase = rawProjects.map((p, i) => ({
    id: i,
    image: `/work/${p.file}`,
    title: p.file.split('.')[0].replace(/-/g, ' '),
    category: p.category,
    type: p.type as 'image' | 'video'
}));

// Clone items for infinite scroll
const projects = [...projectsBase, ...projectsBase];

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
    onSelect: (project: Project) => void;
}

// --- Components ---

function VideoPlayer({ url, opacity }: { url: string, opacity: number }) {
    const texture = useVideoTexture(url, {
        muted: true,
        loop: true,
        start: true,
        crossOrigin: 'Anonymous',
    });
    return (
        <meshBasicMaterial map={texture} toneMapped={false} transparent opacity={opacity} />
    );
}

function Item({ project, position, onSelect }: ItemProps) {
    const ref = useRef<THREE.Group>(null!);
    const meshRef = useRef<THREE.Mesh>(null!);
    const [hovered, hover] = useState(false);

    useCursor(hovered);

    useFrame((state, delta) => {
        if (!ref.current) return;

        // Hover Lift & Scale
        const targetY = position[1] + (hovered ? 0.4 : 0);
        const targetScale = hovered ? 1.08 : 1;
        const targetTilt = hovered ? 0.1 : 0;

        // @ts-ignore
        easing.damp3(ref.current.position, [position[0], targetY, position[2]], 0.15, delta);
        // @ts-ignore
        easing.damp3(ref.current.scale, [targetScale, targetScale, targetScale], 0.15, delta);
        // @ts-ignore
        easing.dampE(ref.current.rotation, [targetTilt, 0, 0], 0.15, delta);
    });

    return (
        <group ref={ref} position={position}>
            <mesh
                ref={meshRef}
                onClick={(e) => { e.stopPropagation(); onSelect(project); }}
                onPointerOver={(e) => { e.stopPropagation(); hover(true); }}
                onPointerOut={(e) => { e.stopPropagation(); hover(false); }}
                castShadow
                receiveShadow
            >
                {/* Thick slab geometry */}
                <boxGeometry args={[3.2, 2.2, 0.25]} />
                <meshStandardMaterial color="#1C1F26" roughness={0.4} metalness={0.6} />

                {/* Content Plane */}
                <group position={[0, 0, 0.13]}>
                    {project.type === 'video' ? (
                        <mesh scale={[3.1, 2.1, 1]}>
                            <planeGeometry />
                            {hovered ? (
                                <Suspense fallback={<meshBasicMaterial color="#111" />}>
                                    <VideoPlayer url={project.image} opacity={1} />
                                </Suspense>
                            ) : (
                                <meshBasicMaterial color="#303030" />
                            )}
                        </mesh>
                    ) : (
                        <Image
                            url={project.image}
                            transparent
                            scale={[3.1, 2.1, 1] as any}
                            toneMapped={false}
                        />
                    )}
                </group>

            </mesh>

            {/* Text Label */}
            <group position={[-1.4, -1.4, 0]} visible={hovered}>
                <Text
                    fontSize={0.2}
                    anchorX="left"
                    anchorY="top"
                    color="white"
                    outlineWidth={0.02}
                    outlineColor="#000000"
                >
                    {project.title.toUpperCase()}
                </Text>
                <Text
                    position={[0, -0.25, 0]}
                    fontSize={0.12}
                    anchorX="left"
                    anchorY="top"
                    color="#ACC8A2"
                >
                    {project.category}
                </Text>
            </group>
        </group>
    );
}

function InfiniteGrid({ onSelect }: { onSelect: (p: Project) => void }) {
    const group = useRef<THREE.Group>(null!);
    const scrollY = useRef(0);
    const velocity = useRef(SCROLL_SPEED);
    const isHovering = useRef(false);

    // Calculate grid layout once
    const items = useMemo(() => {
        return projects.map((project, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            const xOffset = (col - 1) * ITEM_WIDTH;
            const yOffset = -row * ROW_Height; // Start from top (0) and go down negative
            return {
                ...project,
                layoutId: i, // Unique visual ID
                baseY: yOffset,
                x: xOffset
            };
        });
    }, []);

    const totalHeight = Math.ceil(projects.length / 3) * ROW_Height;

    useFrame((state, delta) => {
        if (!group.current) return;

        // Auto Scroll
        // Slow down on hover? Maybe slightly
        const targetSpeed = isHovering.current ? 0.2 : SCROLL_SPEED;
        // Damp velocity
        velocity.current = THREE.MathUtils.lerp(velocity.current, targetSpeed, 0.1);

        // Update Scroll Position
        scrollY.current += velocity.current * delta;

        // Loop Scroll
        // Seamless visual loop based on base content height
        const rows = Math.ceil(projectsBase.length / 3);
        const loopHeight = rows * ROW_Height;

        if (scrollY.current > loopHeight) {
            scrollY.current -= loopHeight;
        }

        group.current.position.y = scrollY.current;

        // Gentle Tilt Parallax
        const { x, y } = state.pointer;
        // @ts-ignore
        easing.dampE(group.current.rotation, [TILT_ANGLE + y * 0.05, x * 0.05, 0], 0.3, delta);
    });

    return (
        <group
            rotation={[TILT_ANGLE, 0, 0]}
            onPointerOver={() => (isHovering.current = true)}
            onPointerOut={() => (isHovering.current = false)}
        >
            <group ref={group}>
                {items.map((item) => (
                    <Item
                        key={item.layoutId}
                        project={item}
                        position={[item.x, item.baseY + 3, 0]} // +3 to center initial view
                        onSelect={onSelect}
                    />
                ))}
            </group>
        </group>
    );
}

function Loader() {
    return <Html center><div className="text-accent text-sm tracking-widest animate-pulse">LOADING WORK...</div></Html>
}

export default function GroundedGrid({ onSelectProject }: { onSelectProject: (p: Project) => void }) {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    if (isMobile) return null; // Completely disable this heavy grid on mobile

    return (
        <div ref={containerRef} className="w-full h-full absolute inset-0 bg-gradient-to-b from-[#0B0D10] to-[#14171C]">
            {isVisible && (
                <Canvas dpr={[1, 1.5]} camera={{ position: [0, 2, 11], fov: 45 }} shadows={false}>
                    <fog attach="fog" args={['#0B0D10', 5, 25]} />
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 10, 5]} intensity={1} />

                    <Suspense fallback={<Loader />}>
                        <InfiniteGrid onSelect={onSelectProject} />
                        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2.5} far={4.5} />
                        <Environment preset="city" />
                    </Suspense>
                </Canvas>
            )}
        </div>
    );
}
