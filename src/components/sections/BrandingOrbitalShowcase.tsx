"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, RotateCcw, Maximize2, ArrowLeft } from "lucide-react";
import Image from "next/image";

interface BrandingArtwork {
    id: number;
    title: string;
    brand: string;
    category: string;
    file: string;
    aspectRatio: "wide" | "square" | "portrait";
}

export interface BrandingOrbitalShowcaseProps {
    onBack?: () => void;
    onSelectBrand?: (brand: string) => void;
    activeBrand?: string;
}

const BRANDING_ARTWORKS: BrandingArtwork[] = [
    {
        id: 1,
        title: "L'Élixir Solaire",
        brand: "Ixora Haute Parfumerie",
        category: "Fragrance Architecture",
        file: "/work/branding/ChatGPT Image Aug 11, 2026, 02_05_38 PM.png",
        aspectRatio: "wide"
    },
    {
        id: 2,
        title: "Kinetic Form & Shadow",
        brand: "Atelier IX",
        category: "Fashion Editorial",
        file: "/work/branding/ChatGPT Image Aug 11, 2026, 02_18_31 PM.png",
        aspectRatio: "wide"
    },
    {
        id: 3,
        title: "Solar Reverence",
        brand: "Maison Sol",
        category: "Art Direction",
        file: "/work/branding/ChatGPT Image Aug 11, 2026, 02_24_31 PM.png",
        aspectRatio: "square"
    },
    {
        id: 4,
        title: "Silhouette in Ochre",
        brand: "Studio Vesper",
        category: "Visual Identity",
        file: "/work/branding/ChatGPT Image Aug 11, 2026, 02_27_12 PM.png",
        aspectRatio: "portrait"
    },
    {
        id: 5,
        title: "Ethereal Silk Veil",
        brand: "Ixora Botanicals",
        category: "Skincare Editorial",
        file: "/work/branding/ChatGPT Image Aug 11, 2026, 01_17_00 PM.png",
        aspectRatio: "wide"
    },
    {
        id: 6,
        title: "Monochrome Gaze",
        brand: "Define Collective",
        category: "Editorial Portrait",
        file: "/work/branding/ChatGPT Image Aug 11, 2026, 02_21_27 PM.png",
        aspectRatio: "portrait"
    },
    {
        id: 7,
        title: "Palais Promenade",
        brand: "The Verdant Court",
        category: "Luxury Architecture",
        file: "/work/branding/ChatGPT Image Aug 11, 2026, 02_35_46 PM.png",
        aspectRatio: "portrait"
    },
    {
        id: 8,
        title: "Terrace of the Muses",
        brand: "Nexa Haute Couture",
        category: "Summer Editorial",
        file: "/work/branding/ChatGPT Image Aug 11, 2026, 11_10_38 AM.png",
        aspectRatio: "wide"
    },
    {
        id: 9,
        title: "Vinyl & Velvet",
        brand: "Acoustic Heritage",
        category: "Lifestyle Campaign",
        file: "/work/branding/ChatGPT Image Aug 11, 2026, 02_56_59 PM.png",
        aspectRatio: "wide"
    },
    {
        id: 10,
        title: "Crème De Minuit",
        brand: "Ixora Radiance",
        category: "Cosmetics Packaging",
        file: "/work/branding/ChatGPT Image Aug 11, 2026, 03_03_16 PM.png",
        aspectRatio: "wide"
    },
    {
        id: 11,
        title: "Galerie Royale",
        brand: "Imperial Grandeur",
        category: "Heritage Spaces",
        file: "/work/branding/ChatGPT Image Aug 11, 2026, 11_22_22 AM.png",
        aspectRatio: "wide"
    },
    {
        id: 12,
        title: "Facet & Crystal",
        brand: "Cristal d'Or",
        category: "Product Manifesto",
        file: "/work/branding/ChatGPT Image Aug 11, 2026, 01_13_27 PM.png",
        aspectRatio: "square"
    },
    {
        id: 13,
        title: "Aura Botanica",
        brand: "Botanical Essence",
        category: "Clean Luxury",
        file: "/work/branding/ChatGPT Image Aug 11, 2026, 11_11_59 AM.png",
        aspectRatio: "wide"
    },
    {
        id: 14,
        title: "Verve & Precision",
        brand: "Coldune Atelier",
        category: "Brand Narrative",
        file: "/work/branding/ChatGPT Image Aug 11, 2026, 11_26_18 AM.png",
        aspectRatio: "wide"
    }
];

export default function BrandingOrbitalShowcase({
    onBack,
    onSelectBrand,
    activeBrand = "Ixora"
}: BrandingOrbitalShowcaseProps = {}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragStartRotation, setDragStartRotation] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [selectedArtwork, setSelectedArtwork] = useState<BrandingArtwork | null>(null);
    const [isAutoRotate, setIsAutoRotate] = useState(true);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const totalItems = BRANDING_ARTWORKS.length;

    // Ambient subtle continuous rotation
    useEffect(() => {
        if (!isAutoRotate || isDragging || hoveredIndex !== null) return;
        const interval = setInterval(() => {
            setRotation(prev => prev + 0.0016);
        }, 16);
        return () => clearInterval(interval);
    }, [isAutoRotate, isDragging, hoveredIndex]);

    // Parallax mouse follow
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY, currentTarget } = e;
        const rect = currentTarget.getBoundingClientRect();
        const x = (clientX - rect.left) / rect.width - 0.5;
        const y = (clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
    }, []);

    // Drag to rotate handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStartX(e.clientX);
        setDragStartRotation(rotation);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length > 0) {
            setIsDragging(true);
            setDragStartX(e.touches[0].clientX);
            setDragStartRotation(rotation);
        }
    };

    const handleWindowMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - dragStartX;
        setRotation(dragStartRotation + deltaX * 0.004);
    }, [isDragging, dragStartX, dragStartRotation]);

    const handleWindowTouchMove = useCallback((e: TouchEvent) => {
        if (!isDragging || e.touches.length === 0) return;
        const deltaX = e.touches[0].clientX - dragStartX;
        setRotation(dragStartRotation + deltaX * 0.005);
    }, [isDragging, dragStartX, dragStartRotation]);

    const handleWindowMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleWindowMouseMove);
            window.addEventListener("mouseup", handleWindowMouseUp);
            window.addEventListener("touchmove", handleWindowTouchMove);
            window.addEventListener("touchend", handleWindowMouseUp);
        }
        return () => {
            window.removeEventListener("mousemove", handleWindowMouseMove);
            window.removeEventListener("mouseup", handleWindowMouseUp);
            window.removeEventListener("touchmove", handleWindowTouchMove);
            window.removeEventListener("touchend", handleWindowMouseUp);
        };
    }, [isDragging, handleWindowMouseMove, handleWindowTouchMove, handleWindowMouseUp]);

    // Mouse wheel scroll to rotate
    const handleWheel = useCallback((e: React.WheelEvent) => {
        e.preventDefault();
        setRotation(prev => prev + e.deltaY * 0.0018);
    }, []);

    // Next / Prev step navigation
    const rotateStep = (direction: number) => {
        const step = (Math.PI * 2) / totalItems;
        setRotation(prev => prev + direction * step);
    };

    return (
        <section 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onWheel={handleWheel}
            className="min-h-screen w-full bg-[#000000] text-white overflow-hidden relative select-none flex flex-col justify-between pt-20 pb-8 px-4 md:px-8"
            style={{ touchAction: "none" }}
        >
            {/* Background Subtle Radial Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(20,20,25,0.4)_0%,#000000_75%)]" />

            {/* Subtle Floating Ambient Particles/Dust */}
            <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(60,255,143,0.04)_0%,transparent_60%)]" />

            {/* --- TOP HEADER & IDENTITY --- */}
            <div className="relative z-30 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pointer-events-none max-w-7xl mx-auto">
                <div className="flex flex-wrap items-center gap-3 pointer-events-auto">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white hover:text-[#3CFF8F] transition-all cursor-pointer group shadow-lg backdrop-blur-md"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-[10px] font-universo font-black tracking-widest uppercase">All Brands</span>
                        </button>
                    )}

                    {onSelectBrand && (
                        <div className="flex items-center gap-1 bg-black/60 border border-white/10 rounded-full p-1 backdrop-blur-md">
                            {["Sélvaré", "Ixora", "Nexa", "Define", "The Verdant Court"].map((b) => (
                                <button
                                    key={b}
                                    onClick={() => onSelectBrand(b)}
                                    className={`px-3 py-1 rounded-full text-[10px] font-universo uppercase tracking-wider transition-all cursor-pointer font-black ${
                                        b === activeBrand
                                            ? "bg-[#3CFF8F] text-black shadow-[0_0_12px_rgba(60,255,143,0.5)]"
                                            : "text-white/60 hover:text-white hover:bg-white/10"
                                    }`}
                                >
                                    {b}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3 pointer-events-auto">
                    <button
                        onClick={() => setRotation(0)}
                        aria-label="Reset rotation"
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition-all cursor-pointer"
                        title="Reset Orbit"
                    >
                        <RotateCcw size={14} />
                    </button>
                    <button
                        onClick={() => setIsAutoRotate(!isAutoRotate)}
                        className={`px-3 py-1.5 rounded-full border text-[11px] font-mono tracking-wider uppercase transition-all cursor-pointer ${
                            isAutoRotate 
                                ? "bg-[#3CFF8F]/15 border-[#3CFF8F]/40 text-[#3CFF8F]" 
                                : "bg-white/5 border-white/10 text-white/50"
                        }`}
                    >
                        {isAutoRotate ? "ORBIT ACTIVE" : "PAUSED"}
                    </button>
                </div>
            </div>

            {/* --- CORE ORBITAL STAGE (CENTER LOGO + REVOLVING ARTWORKS) --- */}
            <div 
                className="relative flex-1 w-full flex items-center justify-center my-auto cursor-grab active:cursor-grabbing overflow-visible"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                style={{
                    perspective: "1400px",
                    transformStyle: "preserve-3d"
                }}
            >
                {/* 3D PARALLAX CONTAINER */}
                <div 
                    className="relative w-full h-full flex items-center justify-center pointer-events-none"
                    style={{
                        transform: `rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 10}deg)`,
                        transition: isDragging ? "none" : "transform 0.45s ease-out"
                    }}
                >
                    {/* --- EXACT CENTER: COLDUNE STUDIO LOGO EMBLEM --- */}
                    <div className="absolute z-20 flex flex-col items-center justify-center pointer-events-none select-none -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                        {/* Luminous Halo behind the center logo */}
                        <div 
                            className="absolute w-44 h-44 rounded-full pointer-events-none blur-2xl"
                            style={{
                                background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(60,255,143,0.12) 40%, transparent 70%)"
                            }}
                        />

                        {/* Coldune Monogram Mark (Exact white oval monogram from screenshot) */}
                        <div className="relative w-14 h-14 md:w-20 md:h-20 flex items-center justify-center hover:scale-110 transition-transform duration-500">
                            <Image 
                                src="/coldune-studio-logo-3.webp" 
                                alt="Coldune Studio" 
                                fill
                                className="object-contain brightness-0 invert drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]" 
                                priority
                            />
                        </div>

                        {/* Subtle Center Micro-Label */}
                        <span className="mt-2 text-[9px] font-mono tracking-[0.3em] text-white/50 uppercase whitespace-nowrap">
                            COLDUNE ATELIER
                        </span>
                    </div>

                    {/* --- REVOLVING ORBITAL ARTWORKS --- */}
                    {BRANDING_ARTWORKS.map((item, index) => {
                        const baseAngle = (index / totalItems) * Math.PI * 2;
                        const currentAngle = baseAngle + rotation;

                        // Responsive Elliptical Radius calibrated to match screenshot proportions
                        const radiusX = typeof window !== "undefined" && window.innerWidth < 768 ? 195 : 430;
                        const radiusY = typeof window !== "undefined" && window.innerWidth < 768 ? 165 : 270;

                        const cosA = Math.cos(currentAngle);
                        const sinA = Math.sin(currentAngle);

                        const posX = cosA * radiusX;
                        const posY = sinA * radiusY;

                        // 3D Depth layering: items towards the bottom/front have higher z-index and scale
                        const depthFactor = (sinA + 1) * 0.5; // 0 (back) to 1 (front)
                        const depthZ = cosA * 40;
                        const depthScale = 0.88 + depthFactor * 0.22;
                        const depthOpacity = 0.85 + depthFactor * 0.15;

                        const isHovered = hoveredIndex === index;
                        const isAnyHovered = hoveredIndex !== null;

                        // Determine card dimensions based on aspect ratio
                        const sizeClasses = 
                            item.aspectRatio === "wide" 
                                ? "w-[170px] sm:w-[220px] md:w-[290px] aspect-[16/10]" 
                                : item.aspectRatio === "portrait"
                                    ? "w-[125px] sm:w-[165px] md:w-[210px] aspect-[3/4]"
                                    : "w-[145px] sm:w-[185px] md:w-[240px] aspect-square";

                        return (
                            <div
                                key={item.id}
                                className="absolute pointer-events-auto"
                                style={{
                                    left: "50%",
                                    top: "50%",
                                    transform: `translate(calc(-50% + ${posX}px), calc(-50% + ${posY}px)) translateZ(${depthZ}px) scale(${isHovered ? depthScale * 1.14 : depthScale})`,
                                    zIndex: isHovered ? 60 : Math.round(depthFactor * 30) + 10,
                                    transition: isDragging 
                                        ? "none" 
                                        : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, filter 0.3s ease",
                                    opacity: isAnyHovered && !isHovered ? 0.45 : depthOpacity,
                                    filter: isAnyHovered && !isHovered ? "blur(1px)" : "none"
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => setSelectedArtwork(item)}
                            >
                                <div className={`relative ${sizeClasses} rounded-xl md:rounded-2xl overflow-hidden bg-[#0A0A0E] border border-white/15 hover:border-[#3CFF8F]/80 shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:shadow-[0_0_35px_rgba(60,255,143,0.35)] transition-all duration-300 group cursor-pointer`}>
                                    
                                    {/* Image Asset with eager smooth rendering */}
                                    <Image
                                        src={item.file}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 768px) 220px, 320px"
                                        className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                                        priority={index < 6}
                                    />

                                    {/* Subtle Gradient Vignette at base */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                                        <span className="text-[9px] font-mono font-semibold text-[#3CFF8F] tracking-widest uppercase">
                                            {item.brand}
                                        </span>
                                        <h3 className="text-xs sm:text-sm font-universo font-black uppercase text-white truncate">
                                            {item.title}
                                        </h3>
                                    </div>

                                    {/* Corner Zoom Pill */}
                                    <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white hover:text-[#3CFF8F]">
                                        <Maximize2 size={13} className="stroke-[2.5]" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* --- BOTTOM CONTROLS & CAROUSEL NAVIGATION --- */}
            <div className="relative z-30 w-full flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto pointer-events-none">
                
                {/* Active Hovered Artwork Caption */}
                <div className="flex items-center gap-3 pointer-events-auto">
                    {hoveredIndex !== null && (
                        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/70 backdrop-blur-xl border border-white/15 shadow-lg">
                            <span className="w-2 h-2 rounded-full bg-[#3CFF8F] animate-pulse" />
                            <span className="text-xs font-universo font-black uppercase tracking-wider text-white">
                                {BRANDING_ARTWORKS[hoveredIndex].title}
                            </span>
                            <span className="text-white/30">|</span>
                            <span className="text-[11px] font-mono text-[#3CFF8F]">
                                {BRANDING_ARTWORKS[hoveredIndex].brand}
                            </span>
                        </div>
                    )}
                </div>

                {/* Navigation Orbit Arrows */}
                <div className="flex items-center gap-2 pointer-events-auto">
                    <button
                        onClick={() => rotateStep(1)}
                        aria-label="Orbit previous"
                        className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-xl border border-white/15 hover:border-[#3CFF8F]/60 flex items-center justify-center text-white hover:text-[#3CFF8F] shadow-lg transition-all active:scale-95 cursor-pointer"
                    >
                        <ChevronLeft size={18} className="stroke-[2.5]" />
                    </button>

                    <button
                        onClick={() => rotateStep(-1)}
                        aria-label="Orbit next"
                        className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-xl border border-white/15 hover:border-[#3CFF8F]/60 flex items-center justify-center text-white hover:text-[#3CFF8F] shadow-lg transition-all active:scale-95 cursor-pointer"
                    >
                        <ChevronRight size={18} className="stroke-[2.5]" />
                    </button>
                </div>
            </div>

            {/* --- LIGHTBOX MODAL FOR EXPANDED HIGH-RES ARTWORK --- */}
            <AnimatePresence>
                {selectedArtwork && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0"
                            onClick={() => setSelectedArtwork(null)}
                        />

                        <motion.div
                            initial={{ scale: 0.92, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.92, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 280 }}
                            className="relative z-10 bg-[#0E0E12] border border-white/15 rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl flex flex-col md:flex-row max-h-[88vh]"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedArtwork(null)}
                                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white hover:text-[#3CFF8F] transition-all cursor-pointer"
                            >
                                <X size={20} />
                            </button>

                            {/* Modal Left Preview Image */}
                            <div className="w-full md:w-3/5 h-72 md:h-auto bg-black relative flex items-center justify-center overflow-hidden">
                                <Image
                                    src={selectedArtwork.file}
                                    alt={selectedArtwork.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Modal Right Details */}
                            <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between bg-[#121216] border-t md:border-t-0 md:border-l border-white/10">
                                <div>
                                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#3CFF8F]">
                                        {selectedArtwork.brand}
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-universo font-black uppercase text-white mt-1 leading-tight">
                                        {selectedArtwork.title}
                                    </h2>
                                    <span className="inline-block mt-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-white/70 uppercase">
                                        {selectedArtwork.category}
                                    </span>
                                    <p className="mt-4 text-xs sm:text-sm text-white/60 font-sans leading-relaxed">
                                        High-fidelity visual production and campaign manifestation curated by Coldune Studio for international brand elevation.
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-white/10 mt-6">
                                    <button
                                        onClick={() => setSelectedArtwork(null)}
                                        className="w-full py-3 rounded-xl bg-[#3CFF8F] hover:bg-[#52ff9a] text-black font-universo font-black uppercase text-xs tracking-wider shadow-[0_0_20px_rgba(60,255,143,0.4)] transition-all cursor-pointer"
                                    >
                                        Close Artwork
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
