"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowRight, ArrowLeft, RotateCcw, ChevronLeft, ChevronRight, Play, Pause, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface CascadeBrandCard {
    id: string;
    brandName: string;
    title: string;
    category: string;
    tagline: string;
    file: string;
    accentColor: string;
    badgeNumber: string;
}

export const CASCADE_CARDS: CascadeBrandCard[] = [
    {
        id: "nexa-1",
        brandName: "Nexa",
        title: "Monogram Architecture",
        category: "Visual Architecture & Modernism",
        tagline: "Bold monolithic geometry & custom typography",
        file: "/work/branding/nexa 2.webp",
        accentColor: "#E11D48", // Crimson Red (like Card 3 in reference)
        badgeNumber: "01"
    },
    {
        id: "ixora-1",
        brandName: "Ixora",
        title: "L'Élixir Solaire",
        category: "Haute Parfumerie & Skincare",
        tagline: "Tactile glass bottle architecture & fragrance design",
        file: "/work/branding/ChatGPT Image Aug 11, 2026, 02_05_38 PM.png",
        accentColor: "#F59E0B", // Warm Amber Gold (like Card 4 in reference)
        badgeNumber: "02"
    },
    {
        id: "define-1",
        brandName: "Define",
        title: "Digital Publishing System",
        category: "Editorial Identity & Typography",
        tagline: "Monochrome layout systems & digital typography",
        file: "/work/branding/define 1.webp",
        accentColor: "#2563EB", // Electric Cobalt Blue (like Card 6 in reference)
        badgeNumber: "03"
    },
    {
        id: "court-1",
        brandName: "The Verdant Court",
        title: "Palais Promenade",
        category: "Luxury Hospitality & Estate",
        tagline: "Historic European estate branding & spatial design",
        file: "/work/branding/courts 1.webp",
        accentColor: "#10B981", // Emerald Green (like Card 5 in reference)
        badgeNumber: "04"
    },
    {
        id: "ixora-2",
        brandName: "Ixora",
        title: "Ethereal Silk Veil",
        category: "Haute Parfumerie & Skincare",
        tagline: "Silk veil beauty editorial & campaign narrative",
        file: "/work/branding/ChatGPT Image Aug 11, 2026, 01_17_00 PM.png",
        accentColor: "#EC4899", // Rose Silk
        badgeNumber: "05"
    },
    {
        id: "nexa-2",
        brandName: "Nexa",
        title: "Kinetic Monolith Form",
        category: "Visual Architecture & Modernism",
        tagline: "Structural monogram and high-fashion branding",
        file: "/work/branding/nexa 1.webp",
        accentColor: "#FFFFFF", // Crisp Monochrome
        badgeNumber: "06"
    },
    {
        id: "court-2",
        brandName: "The Verdant Court",
        title: "Archival Heritage",
        category: "Luxury Hospitality & Estate",
        tagline: "European archival typography & historic atmosphere",
        file: "/work/branding/courts 2.webp",
        accentColor: "#059669", // Deep Forest Green
        badgeNumber: "07"
    },
    {
        id: "define-2",
        brandName: "Define",
        title: "Monochrome Gaze",
        category: "Editorial Identity & Typography",
        tagline: "High-contrast editorial publishing & digital grid",
        file: "/work/branding/define 2.webp",
        accentColor: "#6366F1", // Modern Indigo
        badgeNumber: "08"
    }
];

interface BrandDiagonalCascadeProps {
    onSelectBrand: (brandName: string) => void;
}

export default function BrandDiagonalCascade({ onSelectBrand }: BrandDiagonalCascadeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragStartOffset, setDragStartOffset] = useState(0);
    const [isAutoScroll, setIsAutoScroll] = useState(true);
    const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

    const totalCards = CASCADE_CARDS.length;

    // Responsive step and card dimensions
    const [dimensions, setDimensions] = useState({
        cardSize: 280,
        step: 175,
        angleDeg: 34
    });

    useEffect(() => {
        const updateDims = () => {
            const w = window.innerWidth;
            if (w < 640) {
                setDimensions({ cardSize: 180, step: 105, angleDeg: 38 });
            } else if (w < 1024) {
                setDimensions({ cardSize: 220, step: 135, angleDeg: 36 });
            } else if (w < 1440) {
                setDimensions({ cardSize: 270, step: 170, angleDeg: 34 });
            } else {
                setDimensions({ cardSize: 310, step: 195, angleDeg: 33 });
            }
        };
        updateDims();
        window.addEventListener("resize", updateDims);
        return () => window.removeEventListener("resize", updateDims);
    }, []);

    const totalLength = totalCards * dimensions.step;

    // Smooth continuous auto-drift
    useEffect(() => {
        if (!isAutoScroll || isDragging || hoveredCardId !== null) return;
        const interval = setInterval(() => {
            setOffset(prev => prev + 0.65);
        }, 16);
        return () => clearInterval(interval);
    }, [isAutoScroll, isDragging, hoveredCardId]);

    // Drag handling (Mouse)
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStartX(e.clientX + e.clientY);
        setDragStartOffset(offset);
    };

    const handleMouseMoveGlobal = useCallback((e: MouseEvent) => {
        if (!isDragging) return;
        const currentCoord = e.clientX + e.clientY;
        const delta = currentCoord - dragStartX;
        setOffset(dragStartOffset + delta * 1.15);
    }, [isDragging, dragStartX, dragStartOffset]);

    const handleMouseUpGlobal = useCallback(() => {
        if (isDragging) setIsDragging(false);
    }, [isDragging]);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMoveGlobal);
            window.addEventListener("mouseup", handleMouseUpGlobal);
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMoveGlobal);
            window.removeEventListener("mouseup", handleMouseUpGlobal);
        };
    }, [isDragging, handleMouseMoveGlobal, handleMouseUpGlobal]);

    // Touch handling (Mobile)
    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            setIsDragging(true);
            setDragStartX(e.touches[0].clientX + e.touches[0].clientY);
            setDragStartOffset(offset);
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || e.touches.length !== 1) return;
        const currentCoord = e.touches[0].clientX + e.touches[0].clientY;
        const delta = currentCoord - dragStartX;
        setOffset(dragStartOffset + delta * 1.25);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    // Mouse wheel handling
    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        setOffset(prev => prev + (e.deltaY > 0 ? 32 : -32));
    };

    // Step navigation
    const stepCards = (direction: 1 | -1) => {
        setOffset(prev => prev + direction * dimensions.step);
    };

    // Jump to specific brand
    const jumpToBrand = (brandName: string) => {
        const index = CASCADE_CARDS.findIndex(c => c.brandName.toLowerCase() === brandName.toLowerCase());
        if (index !== -1) {
            // Calculate offset so target card is centered
            const targetPos = index * dimensions.step;
            setOffset(-targetPos + (totalCards / 2) * dimensions.step);
        }
    };

    const radAngle = (dimensions.angleDeg * Math.PI) / 180;
    const dirX = Math.cos(radAngle);
    const dirY = Math.sin(radAngle);

    return (
        <section
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
            className={`relative min-h-screen w-full bg-[#050508] text-white overflow-hidden flex flex-col justify-between select-none py-8 px-4 sm:px-8 ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
        >
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_40%_35%,rgba(60,255,143,0.05)_0%,transparent_60%)]" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_60%_65%,rgba(225,29,72,0.04)_0%,transparent_65%)]" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_50%,rgba(15,15,22,0.6)_0%,#050508_85%)]" />

            {/* Subtle Diagonal Track Guideline */}
            <div 
                className="absolute pointer-events-none border-b border-dashed border-white/[0.04] w-[200vw] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                style={{
                    transform: `translate(-50%, -50%) rotate(${dimensions.angleDeg}deg)`
                }}
            />

            {/* --- TOP BAR & RETURN LINK --- */}
            <div className="relative z-50 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pointer-events-none max-w-7xl mx-auto">
                <div className="flex items-center gap-4 pointer-events-auto">
                    <Link
                        href="/#spectrum"
                        className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white/80 hover:text-white transition-all shadow-lg backdrop-blur-md"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-mono tracking-widest uppercase font-bold">Return to Hub</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3CFF8F] animate-ping" />
                        <span className="text-[10px] md:text-xs font-mono tracking-[0.25em] text-[#3CFF8F] uppercase font-semibold">
                            COLDUNE BRANDING CASCADE
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3 pointer-events-auto">
                    <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase hidden md:inline">
                        DRAG / SCROLL TO CASCADE
                    </span>
                    <button
                        onClick={() => setOffset(0)}
                        aria-label="Reset position"
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition-all cursor-pointer"
                        title="Reset Cascade"
                    >
                        <RotateCcw size={14} />
                    </button>
                    <button
                        onClick={() => setIsAutoScroll(!isAutoScroll)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer ${
                            isAutoScroll 
                                ? "bg-[#3CFF8F]/15 border-[#3CFF8F]/40 text-[#3CFF8F]" 
                                : "bg-white/5 border-white/10 text-white/50"
                        }`}
                    >
                        {isAutoScroll ? <Pause size={10} /> : <Play size={10} />}
                        <span>{isAutoScroll ? "CASCADE ACTIVE" : "PAUSED"}</span>
                    </button>
                </div>
            </div>

            {/* --- MAIN STAGE: 3D DIAGONAL CASCADING CARDS --- */}
            <div className="relative flex-1 w-full flex items-center justify-center my-auto min-h-[580px] md:min-h-[680px]">
                {CASCADE_CARDS.map((card, index) => {
                    // Position along infinite loop
                    const rawDist = (index * dimensions.step + offset) % totalLength;
                    const loopDist = rawDist < 0 ? rawDist + totalLength : rawDist;
                    
                    // Center the cascade around (0, 0)
                    const centeredDist = loopDist - totalLength / 2;

                    const posX = centeredDist * dirX;
                    const posY = centeredDist * dirY;

                    // Layering: higher along path = higher z-index (overlaps previous)
                    const normalizedPos = loopDist / totalLength; // 0 to 1
                    const baseZIndex = Math.round(normalizedPos * 50) + 10;

                    const isHovered = hoveredCardId === card.id;

                    // Fade out smoothly at extreme edges
                    const edgeDist = Math.abs(centeredDist) / (totalLength / 2);
                    const opacity = edgeDist > 0.85 ? Math.max(0, 1 - (edgeDist - 0.85) / 0.15) : 1;

                    return (
                        <div
                            key={card.id}
                            onMouseEnter={() => setHoveredCardId(card.id)}
                            onMouseLeave={() => setHoveredCardId(null)}
                            onClick={(e) => {
                                e.stopPropagation();
                                onSelectBrand(card.brandName);
                            }}
                            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                            style={{
                                left: `calc(50% + ${posX}px)`,
                                top: `calc(50% + ${posY}px)`,
                                width: dimensions.cardSize,
                                height: dimensions.cardSize,
                                zIndex: isHovered ? 120 : baseZIndex,
                                opacity: isHovered ? 1 : opacity,
                                transform: isHovered 
                                    ? "scale(1.08) translate(-8px, -12px)" 
                                    : "scale(1)",
                                transition: isDragging
                                    ? "none"
                                    : "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease"
                            }}
                        >
                            {/* Upright Rounded Square Card */}
                            <div 
                                className={`w-full h-full rounded-[28px] sm:rounded-3xl overflow-hidden relative flex flex-col justify-between p-5 sm:p-6 transition-all duration-500 bg-[#0E0E14] border ${
                                    isHovered
                                        ? "shadow-[0_30px_70px_rgba(0,0,0,0.85)] ring-2"
                                        : "shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-white/15"
                                }`}
                                style={{
                                    borderColor: isHovered ? card.accentColor : undefined,
                                    boxShadow: isHovered ? `0 25px 65px ${card.accentColor}40` : undefined
                                }}
                            >
                                {/* Full-bleed Cover Image */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={card.file}
                                        alt={card.title}
                                        fill
                                        sizes="(max-width: 768px) 220px, 320px"
                                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                    />
                                    {/* Gradients for typography contrast */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
                                </div>

                                {/* Card Top Row: Brand Tag Pill & Number */}
                                <div className="relative z-10 flex justify-between items-center">
                                    <div 
                                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 border border-white/20 backdrop-blur-md shadow-md"
                                    >
                                        <span 
                                            className="w-2 h-2 rounded-full" 
                                            style={{ backgroundColor: card.accentColor }}
                                        />
                                        <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-white">
                                            {card.brandName}
                                        </span>
                                    </div>

                                    <span className="text-[10px] font-mono font-bold tracking-widest text-white/50 bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
                                        {card.badgeNumber}
                                    </span>
                                </div>

                                {/* Card Bottom Row: Title, Category & Enter Prompt */}
                                <div className="relative z-10">
                                    <span 
                                        className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] font-semibold block mb-0.5"
                                        style={{ color: card.accentColor }}
                                    >
                                        {card.category}
                                    </span>

                                    <h3 className="text-xl sm:text-2xl font-serif italic font-black text-white leading-tight mb-2 group-hover:text-white transition-colors drop-shadow-md">
                                        {card.title}
                                    </h3>

                                    {/* Click Prompt Bar */}
                                    <div 
                                        className="w-full py-2 px-3 rounded-xl bg-black/70 group-hover:bg-white text-white group-hover:text-black border border-white/15 text-[10px] font-mono uppercase tracking-wider font-bold transition-all duration-300 flex items-center justify-between shadow-md"
                                    >
                                        <span>Enter {card.brandName}</span>
                                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* --- BOTTOM HUD CONTROLS --- */}
            <div className="relative z-50 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-none">
                {/* Brand Quick Jump Selector Pills */}
                <div className="flex items-center gap-1.5 bg-black/80 border border-white/15 p-1.5 rounded-full backdrop-blur-xl pointer-events-auto shadow-2xl">
                    <button
                        onClick={() => stepCards(-1)}
                        aria-label="Previous card"
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
                    >
                        <ChevronLeft size={14} />
                    </button>

                    {["Ixora", "Nexa", "Define", "The Verdant Court"].map((b) => (
                        <button
                            key={b}
                            onClick={() => jumpToBrand(b)}
                            className="px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                        >
                            {b}
                        </button>
                    ))}

                    <button
                        onClick={() => stepCards(1)}
                        aria-label="Next card"
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
                    >
                        <ChevronRight size={14} />
                    </button>
                </div>

                {/* Interaction Helper Prompt */}
                <div className="flex items-center gap-2 bg-black/80 border border-white/15 px-4 py-2 rounded-full backdrop-blur-xl pointer-events-auto shadow-2xl text-[10px] font-mono tracking-widest text-white/50 uppercase">
                    <Layers size={12} className="text-[#3CFF8F]" />
                    <span>DRAG OR SCROLL • CLICK ANY CARD TO ENTER</span>
                </div>
            </div>
        </section>
    );
}
