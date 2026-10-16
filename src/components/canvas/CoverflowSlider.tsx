"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX, Maximize2, Sparkles, MapPin, Cloudy, Wind } from "lucide-react";

import { Project } from "@/data/work";

export default function CoverflowSlider({
    projects,
    onSlideChange
}: {
    projects: Project[];
    onSlideChange?: (index: number) => void
}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const [mounted, setMounted] = useState(false);

    // Mobile Detection
    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        onSlideChange?.(activeIndex);
    }, [activeIndex, onSlideChange]);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
            setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
        } else if (e.key === "ArrowRight") {
            setActiveIndex((prev) => (prev + 1) % projects.length);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Center the active card
    const getCardStyle = (index: number) => {
        const offset = index - activeIndex;
        const absOffset = Math.abs(offset);
        const isActive = offset === 0;

        // Visual Parameters matching "Vision Pro" Aesthetic - Tighter Stacking
        let translateX = offset * (isMobile ? 100 : 160);
        if (absOffset > 2) translateX = offset * (isMobile ? 80 : 120);

        const translateZ = isActive ? 50 : -absOffset * 100;
        const translateY = isActive ? -30 : 0; // Lift the active card
        const rotateY = isActive ? 0 : offset * -45;
        const scale = isActive ? 1.15 : Math.max(0.65, 1 - absOffset * 0.2);
        const opacity = isActive ? 1 : Math.max(0.4, 0.8 - absOffset * 0.2);

        const blur = isActive ? 0 : (isMobile ? absOffset * 1 : absOffset * 2);
        const brightness = isActive ? 1.2 : Math.max(0.4, 0.7 - absOffset * 0.15);

        return {
            x: translateX,
            y: translateY,
            z: translateZ,
            rotateY,
            scale,
            opacity,
            filter: `blur(${blur}px) brightness(${brightness})`,
            zIndex: 100 - absOffset
        };
    };

    const [aspectRatios, setAspectRatios] = useState<Record<number, number>>({});

    if (!mounted) return null;

    return (
        <div className="relative w-full h-[800px] flex flex-col items-center justify-center overflow-visible">

            {/* Main Stage */}
            <div className="relative w-full max-w-[1400px] h-[600px] flex items-center justify-center perspective-[1200px] overflow-visible">
                <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
                    {projects.map((project, index) => {
                        const style = getCardStyle(index);
                        const isVisible = Math.abs(index - activeIndex) <= (isMobile ? 1 : 3);
                        const ar = aspectRatios[project.id] || (isMobile ? 0.75 : 0.66); // Fallback until loaded

                        if (!isVisible) return null;

                        return (
                            <motion.div
                                key={project.id}
                                className="absolute cursor-pointer will-change-transform"
                                initial={style}
                                animate={style}
                                transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8 }}
                                onClick={() => setActiveIndex(index)}
                                style={{
                                    transformStyle: isMobile ? "flat" : "preserve-3d",
                                    zIndex: 100 - Math.abs(index - activeIndex),
                                    // Dynamically set width based on aspect ratio while keeping height constant
                                    width: isMobile ? `${380 * ar}px` : `${500 * ar}px`,
                                    height: isMobile ? '380px' : '500px'
                                }}
                            >
                                {/* Card Container - No background, just the content shape */}
                                <div className="relative w-full h-full rounded-2xl overflow-hidden group transform-gpu shadow-[0_20px_50px_rgba(0,0,0,0.8)]">

                                    {/* Image/Video Content */}
                                    <div className="absolute inset-0 z-0 bg-transparent">
                                        {project.type === "video" ? (
                                            <div className="relative w-full h-full">
                                                {/* Loading Spinner */}
                                                {!aspectRatios[project.id] && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-20">
                                                        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                                                    </div>
                                                )}
                                                <video
                                                    ref={(el) => { videoRefs.current[index] = el; }}
                                                    src={`/work/${project.file}`}
                                                    className={`w-full h-full object-contain transition-all duration-700 ${activeIndex !== index ? 'brightness-[0.3] grayscale-[0.5]' : 'brightness-100 grayscale-0'}`}
                                                    muted
                                                    loop
                                                    playsInline
                                                    autoPlay
                                                    preload="none"
                                                    onLoadedMetadata={(e) => {
                                                        const { videoWidth, videoHeight } = e.currentTarget;
                                                        setAspectRatios(prev => ({ ...prev, [project.id]: videoWidth / videoHeight }));
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={`/work/${project.file}`}
                                                    alt={project.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    priority={Math.abs(index - activeIndex) <= 1}
                                                    className={`object-contain transition-all duration-700 ${activeIndex !== index ? 'brightness-[0.3] grayscale-[0.5]' : 'brightness-100 grayscale-0'}`}
                                                    onLoadingComplete={(img) => {
                                                        setAspectRatios(prev => ({ ...prev, [project.id]: img.naturalWidth / img.naturalHeight }));
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Minimal Vignette for Text Legibility (only on active) */}
                                    <div className={`absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 z-10 transition-opacity duration-300 ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`} />

                                    {/* Content Overlay */}
                                    <div className={`absolute bottom-0 left-0 right-0 p-6 z-30 flex flex-col items-center text-center transition-all duration-300 ${activeIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                        <h3 className="text-xl md:text-2xl font-serif font-bold text-accent drop-shadow-2xl mb-1">{project.title}</h3>
                                        <p className="text-[10px] font-mono text-accent tracking-widest uppercase">{project.location}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Floating Menu - Vision Style */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-10 flex items-center gap-4 z-50 pointer-events-auto"
            >
                {/* Control Pills */}
                <div className="flex items-center gap-2 p-1.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                        <MapPin size={14} className="text-accent group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-mono text-accent">{projects[activeIndex].distance}</span>
                    </div>
                    <div className="w-[1px] h-4 bg-white/10" />
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                        <Wind size={14} className="text-blue-400 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-mono text-accent">{projects[activeIndex].temp}</span>
                    </div>
                    <div className="w-[1px] h-4 bg-white/10" />
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                        <Cloudy size={14} className="text-accent group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-mono text-accent">Clear</span>
                    </div>
                </div>

                {/* Navigation Pills */}
                <div className="flex items-center gap-2 p-1.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl ml-4">
                    <button
                        onClick={() => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)}
                        className="p-3 rounded-full hover:bg-white/10 transition-colors text-accent hover:text-accent"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={() => setActiveIndex((prev) => (prev + 1) % projects.length)}
                        className="p-3 rounded-full hover:bg-white/10 transition-colors text-accent hover:text-accent"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
