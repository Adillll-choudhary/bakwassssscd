"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image, useCursor, Environment, useVideoTexture, Html, ContactShadows, Float, useTexture } from "@react-three/drei";
import { useRef, useState, useMemo, Suspense, useEffect } from "react";
import * as THREE from "three";
import { easing } from "maath";
import { Play } from "lucide-react";

// --- Configuration ---
const HEX_RADIUS = 2.5;
const HEX_GAP = 0.2;
const HEX_WIDTH = Math.sqrt(3) * HEX_RADIUS;
const HEX_HEIGHT = 2 * HEX_RADIUS;
const ROW_SPACING = HEX_HEIGHT * 0.75 + HEX_GAP;
const COL_SPACING = HEX_WIDTH + HEX_GAP;

// --- Data ---
const rawProjects = [
    { file: "portfolio-2.mov", type: "video", category: "Showreel" },
    { file: "shoes.mov", type: "video", category: "Commercial" },
    { file: "branding-post-1.webp", type: "image", category: "Branding" },
    { file: "data-analysist.webp", type: "image", category: "Data Vis" },
    { file: "ecommerce.webp", type: "image", category: "E-commerce" },
    { file: "timeline-1.mov", type: "video", category: "Edits" },
    { file: "img-2810.webp", type: "image", category: "UI/UX" },
    { file: "img-2781.webp", type: "image", category: "Poster Design" },
    { file: "img-2791.webp", type: "image", category: "Social Media" },
    { file: "smart-business-learning---instagram-facebook---linktree.mp4", type: "video", category: "Education" },
    { file: "img-2838.webp", type: "image", category: "Art Direction" },
    { file: "img-2842.webp", type: "image", category: "Photography" },
];

const projects = rawProjects.map((p, i) => ({
    id: i,
    image: `/work/${p.file}`,
    file: p.file,
    title: p.file.split('.')[0].replace(/-/g, ' '),
    category: p.category,
    type: p.type as 'image' | 'video'
}));

// --- Helper Components ---

function VideoTexture({ url, opacity }: { url: string; opacity: number }) {
    const texture = useVideoTexture(url, {
        unsuspend: 'canplay',
        muted: true,
        loop: true,
        start: true,
        crossOrigin: 'Anonymous'
    });

    return (
        <meshBasicMaterial
            map={texture}
            side={THREE.DoubleSide}
            transparent
            opacity={opacity}
            toneMapped={false}
        />
    );
}

function ImageTexture({ url }: { url: string }) {
    const texture = useTexture(url);

    useEffect(() => {
        if (texture && texture.image) {
            // Calculate aspect ratios for cover-fit
            const img = texture.image as HTMLImageElement;
            const imgAspect = img.width / img.height;
            const hexAspect = 1; // Hexagons are roughly square

            // Cover fit - scale to fill and center
            if (imgAspect > hexAspect) {
                // Image is wider - fit to height
                const scale = imgAspect / hexAspect;
                texture.repeat.set(1 / scale, 1);
                texture.offset.set((1 - 1 / scale) / 2, 0);
            } else {
                // Image is taller - fit to width
                const scale = hexAspect / imgAspect;
                texture.repeat.set(1, 1 / scale);
                texture.offset.set(0, (1 - 1 / scale) / 2);
            }

            texture.center.set(0.5, 0.5);
            texture.needsUpdate = true;
        }
    }, [texture]);

    return (
        <meshBasicMaterial
            map={texture}
            side={THREE.DoubleSide}
            toneMapped={false}
        />
    );
}

// Custom Hexagon Shape with Bevels
function HexagonShape({ args = [1, 0.4] }: { args?: [number, number] }) {
    const shape = useMemo(() => {
        const s = new THREE.Shape();
        const r = args[0];
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const x = r * Math.sin(angle);
            const y = r * Math.cos(angle);
            if (i === 0) s.moveTo(x, y);
            else s.lineTo(x, y);
        }
        s.closePath();
        return s;
    }, [args]);

    return shape;
}

function HexagonCard({ project, position, index, isMobile }: { project: typeof projects[0], position: [number, number, number], index: number, isMobile: boolean }) {
    const group = useRef<THREE.Group>(null!);
    const mesh = useRef<THREE.Mesh>(null!);
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);

    // Initial staggered fade-in
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), index * 100 + 500);
        return () => clearTimeout(t);
    }, [index]);

    useFrame((state, delta) => {
        if (!group.current) return;

        // Hover State Logic
        const targetScale = hovered ? 1.1 : 1;
        const targetZ = hovered ? 0.8 : 0;
        const hoverTiltX = 0; // No tilt
        const hoverTiltY = 0; // No tilt

        // Entrance animation mixing
        const entranceScale = visible ? 1 : 0;

        // Smooth transitions
        // @ts-ignore
        easing.damp3(group.current.scale, [targetScale * entranceScale, targetScale * entranceScale, targetScale * entranceScale], 0.2, delta);
        // @ts-ignore
        easing.damp3(group.current.position, [position[0], position[1], position[2] + targetZ], 0.2, delta);
        // @ts-ignore
        easing.dampE(group.current.rotation, [hoverTiltX, hoverTiltY, 0], 0.2, delta);

        // Subtle floating when not hovered
        if (!hovered && visible) {
            group.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.002;
        }
    });

    const shape = HexagonShape({ args: [HEX_RADIUS, 0.2] }); // Radius, Depth

    return (
        <group ref={group} position={position}>
            {/* Main Hexagon Body (Extruded) */}
            <mesh
                ref={mesh}
                onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
                onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
                castShadow
                receiveShadow
                rotation={[0, 0, Math.PI / 6]} // Rotate flat top
            >
                <extrudeGeometry args={[shape, { depth: 0.3, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05, bevelSegments: 3 }]} />
                <meshStandardMaterial
                    color="#1C1F26" // Card Base (Palette)
                    metalness={0.8}
                    roughness={0.2}
                    emissive={hovered ? "#3A3F48" : "#000"}
                    emissiveIntensity={hovered ? 0.2 : 0}
                />
            </mesh>

            {/* Content Mask / Surface */}
            <group position={[0, 0, 0.36]} rotation={[0, 0, Math.PI / 6]}>
                <mesh>
                    <shapeGeometry args={[shape]} />
                    {/* On mobile, fallback to image even if it is a video type to save memory */}
                    {!isMobile && project.type === 'video' ? (
                        hovered ? (
                            <Suspense fallback={<meshBasicMaterial color="#14171C" />}>
                                <VideoTexture url={project.image} opacity={1} />
                            </Suspense>
                        ) : (
                            <meshBasicMaterial color="#1C1F26" />
                        )
                    ) : (
                        <Suspense fallback={<meshBasicMaterial color="#1C1F26" />}>
                            {/* If video on mobile, we might want a poster here, effectively using the image texture */}
                            <ImageTexture url={project.type === 'video' ? `/work/${project.file.replace('.mov', '.webp').replace('.mp4', '.webp')}` : project.image} />
                        </Suspense>
                    )}
                </mesh>
            </group>

            {/* Play Icon for Videos */}
            {project.type === 'video' && !hovered && (
                <Html position={[0, 0, 0.4]} center transform pointerEvents="none" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s' }}>
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
                        <Play size={20} fill="white" className="text-accent ml-1" />
                    </div>
                </Html>
            )}

            {/* Hover Label */}
            {hovered && (
                <Html position={[0, -2.5, 0.5]} center distanceFactor={10} style={{ opacity: 1, transition: 'opacity 0.2s' }}>
                    <div className="bg-[#0B0D10]/80 backdrop-blur-md border border-[#2A2E36] px-4 py-2 rounded-lg text-center min-w-[140px]">
                        <h3 className="text-accent font-serif text-lg leading-tight">{project.title.toUpperCase()}</h3>
                        <p className="text-[#A6ABB4] text-xs font-mono mt-1 tracking-widest">{project.category}</p>
                    </div>
                </Html>
            )}
        </group>
    );
}

function HoneycombLayout({ isMobile }: { isMobile: boolean }) {
    // Determine grid layout based on screen width roughly in 3D units
    const { viewport } = useThree();
    const cols = viewport.width > 20 ? 5 : viewport.width > 12 ? 4 : 2;

    // Calculate positions
    const items = useMemo(() => {
        return projects.map((project, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;

            let x = (col * COL_SPACING) - ((cols * COL_SPACING) / 2) + (COL_SPACING / 2);
            const y = -(row * ROW_SPACING) + ((Math.ceil(projects.length / cols) * ROW_SPACING) / 2) - ROW_SPACING;

            // Offset odd rows
            if (row % 2 !== 0) {
                x += COL_SPACING / 2;
            }

            return { ...project, pos: [x, y, 0] as [number, number, number] };
        });
    }, [cols, viewport.width]);

    return (
        <group>
            {items.map((item, i) => (
                <HexagonCard key={item.id} project={item} position={item.pos} index={i} isMobile={isMobile} />
            ))}
        </group>
    );
}

export default function HexagonGrid() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    return (
        <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-[#0B0D10] to-[#14171C]">
            <Canvas dpr={isMobile ? [1, 1] : [1, 2]} camera={{ position: [0, 0, 18], fov: 35 }} shadows={!isMobile}>
                <color attach="background" args={["#0B0D10"]} />
                <fog attach="fog" args={['#0B0D10', 15, 35]} />

                <ambientLight intensity={0.4} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3A3F48" />

                <Suspense fallback={null}>
                    <HoneycombLayout isMobile={isMobile} />
                    {!isMobile && <ContactShadows position={[0, -8, 0]} opacity={0.6} scale={40} blur={2} far={10} color="#000" />}
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}
