"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowRight, ArrowLeft, RotateCcw, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface BrandOption {
    id: string;
    name: string;
    tag: string;
    category: string;
    desc: string;
    file: string;
    secondaryImages: string[];
    count: string;
    accent: string;
    indexNumber: string;
}

export const BRAND_OPTIONS: BrandOption[] = [
    {
        id: "ixora",
        name: "Ixora",
        tag: "Haute Parfumerie & Luxury Skincare",
        category: "Fragrance Architecture",
        desc: "Tactile glass packaging, silk veil editorial, and visual campaign narratives for high luxury fragrance.",
        file: "/work/branding/ChatGPT Image Aug 11, 2026, 02_05_38 PM.png",
        secondaryImages: [
            "/work/branding/ChatGPT Image Aug 11, 2026, 01_17_00 PM.png",
            "/work/branding/ChatGPT Image Aug 11, 2026, 02_24_31 PM.png",
            "/work/branding/ChatGPT Image Aug 11, 2026, 03_03_16 PM.png"
        ],
        count: "18 Artworks",
        accent: "#E2BA84",
        indexNumber: "01"
    },
    {
        id: "nexa",
        name: "Nexa",
        tag: "Visual Architecture & Modernism",
        category: "Structural Identity",
        desc: "Monolithic geometry, bespoke typographic monograms, and architectural brand identity systems.",
        file: "/work/branding/nexa 2.webp",
        secondaryImages: [
            "/work/branding/nexa 1.webp",
            "/work/branding/nexa 4.webp",
            "/work/branding/nexa 6.webp"
        ],
        count: "15 Artworks",
        accent: "#3CFF8F",
        indexNumber: "02"
    },
    {
        id: "define",
        name: "Define",
        tag: "Editorial Identity & Typography",
        category: "Monochrome Systems",
        desc: "High-contrast editorial publishing, digital design systems, and minimalist typographic harmony.",
        file: "/work/branding/define 1.webp",
        secondaryImages: [
            "/work/branding/define 2.webp",
            "/work/branding/define 3.webp",
            "/work/branding/define 5.webp"
        ],
        count: "7 Artworks",
        accent: "#FFFFFF",
        indexNumber: "03"
    },
    {
        id: "verdant-court",
        name: "The Verdant Court",
        tag: "Luxury Hospitality & Estate",
        category: "Heritage Identity",
        desc: "European archival typography, historic estate branding, and spatial elegance for grand architecture.",
        file: "/work/branding/courts 1.webp",
        secondaryImages: [
            "/work/branding/courts 2.webp",
            "/work/branding/courts 3.webp",
            "/work/branding/court 4.webp"
        ],
        count: "6 Artworks",
        accent: "#95D5B2",
        indexNumber: "04"
    }
];

interface BrandOrbitalSelectorProps {
    onSelectBrand: (brandName: string) => void;
}

export default function BrandOrbitalSelector({ onSelectBrand }: BrandOrbitalSelectorProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragStartRotation, setDragStartRotation] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isAutoRotate, setIsAutoRotate] = useState(true);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const totalBrands = BRAND_OPTIONS.length;

    // Ambient continuous drift
    useEffect(() => {
        if (!isAutoRotate || isDragging || hoveredIndex !== null) return;
        const interval = setInterval(() => {
            setRotation(prev => prev + 0.0018);
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

    // Drag start
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStartX(e.clientX);
        setDragStartRotation(rotation);
    };

    // Drag move
    const handleMouseMoveGlobal = useCallback((e: MouseEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - dragStartX;
        setRotation(dragStartRotation + deltaX * 0.0045);
    }, [isDragging, dragStartX, dragStartRotation]);

    // Drag end
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

    // Touch events for mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            setIsDragging(true);
            setDragStartX(e.touches[0].clientX);
            setDragStartRotation(rotation);
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || e.touches.length !== 1) return;
        const deltaX = e.touches[0].clientX - dragStartX;
        setRotation(dragStartRotation + deltaX * 0.0055);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    // Wheel rotation
    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        setRotation(prev => prev + (e.deltaY > 0 ? 0.07 : -0.07));
    };

    // Step to Next/Prev brand (90 degrees = Math.PI / 2)
    const stepBrand = (dir: 1 | -1) => {
        setRotation(prev => prev + (dir * (Math.PI / 2)));
    };

    // Rotate target brand to front (angle = Math.PI / 2 at front)
    const rotateBrandToFront = (targetIndex: number) => {
        const step = (2 * Math.PI) / totalBrands;
        const targetAngle = Math.PI / 2;
        const currentBrandBase = targetIndex * step;
        const newRotation = targetAngle - currentBrandBase;
        setRotation(newRotation);
    };

    // Responsive radii
    const [radii, setRadii] = useState({ radiusX: 460, radiusY: 240 });

    useEffect(() => {
        const updateRadii = () => {
            const w = window.innerWidth;
            if (w < 640) {
                setRadii({ radiusX: 180, radiusY: 130 });
            } else if (w < 1024) {
                setRadii({ radiusX: 330, radiusY: 180 });
            } else if (w < 1440) {
                setRadii({ radiusX: 440, radiusY: 230 });
            } else {
                setRadii({ radiusX: 520, radiusY: 260 });
            }
        };
        updateRadii();
        window.addEventListener("resize", updateRadii);
        return () => window.removeEventListener("resize", updateRadii);
    }, []);

    // Find the currently front-most brand
    const activeFrontIndex = (() => {
        let bestIdx = 0;
        let maxSin = -2;
        BRAND_OPTIONS.forEach((_, idx) => {
            const angle = (idx / totalBrands) * 2 * Math.PI + rotation;
            const sinVal = Math.sin(angle);
            if (sinVal > maxSin) {
                maxSin = sinVal;
                bestIdx = idx;
            }
        });
        return bestIdx;
    })();

    const activeBrand = BRAND_OPTIONS[activeFrontIndex];

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
            className={`relative min-h-screen w-full bg-[#000000] text-white overflow-hidden flex flex-col justify-between select-none py-10 px-4 sm:px-8 ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
        >
            {/* Background luxury gradient glow */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(60,255,143,0.06)_0%,transparent_65%)]" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_50%,rgba(20,20,28,0.8)_0%,#000000_80%)]" />

            {/* --- TOP HEADER & RETURN TO SPECTRUM --- */}
            <div className="relative z-50 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pointer-events-none max-w-7xl mx-auto">
                <div className="flex items-center gap-4 pointer-events-auto">
                    <Link
                        href="/#spectrum"
                        className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white/80 hover:text-white transition-all shadow-lg backdrop-blur-md"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-mono tracking-widest uppercase font-bold">Return to Hub</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3CFF8F] animate-ping" />
                        <span className="text-[10px] md:text-xs font-mono tracking-[0.25em] text-[#3CFF8F] uppercase font-semibold">
                            COLDUNE BRANDING ORBIT
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3 pointer-events-auto">
                    <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase hidden md:inline">
                        DRAG / SCROLL TO ORBIT BRANDS
                    </span>
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
                        className={`px-3 py-1.5 rounded-full border text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer ${
                            isAutoRotate 
                                ? "bg-[#3CFF8F]/15 border-[#3CFF8F]/40 text-[#3CFF8F]" 
                                : "bg-white/5 border-white/10 text-white/50"
                        }`}
                    >
                        {isAutoRotate ? "ORBIT ACTIVE" : "PAUSED"}
                    </button>
                </div>
            </div>

            {/* --- CORE ORBITAL STAGE (CENTER LOGO + 4 BRAND CARDS) --- */}
            <div 
                className="relative flex-1 w-full flex items-center justify-center my-auto min-h-[560px] md:min-h-[660px]"
                style={{
                    perspective: 1200,
                    transform: `rotateX(${mousePos.y * -8}deg) rotateY(${mousePos.x * 8}deg)`,
                    transition: isDragging ? "none" : "transform 0.4s ease-out"
                }}
            >
                {/* Orbital Faint Concentric Guideline Rings */}
                <div 
                    className="absolute rounded-full border border-white/[0.04] pointer-events-none"
                    style={{
                        width: radii.radiusX * 2 + 180,
                        height: radii.radiusY * 2 + 100,
                        transform: "translate(-50%, -50%)",
                        top: "50%",
                        left: "50%"
                    }}
                />
                <div 
                    className="absolute rounded-full border border-dashed border-white/[0.06] pointer-events-none"
                    style={{
                        width: radii.radiusX * 2,
                        height: radii.radiusY * 2,
                        transform: "translate(-50%, -50%)",
                        top: "50%",
                        left: "50%"
                    }}
                />

                {/* Dead Center Luminous Coldune Studio Emblem */}
                <div 
                    className="absolute z-20 pointer-events-none flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                >
                    {/* Glowing Ambient Core */}
                    <div className="absolute w-44 h-44 rounded-full bg-[#3CFF8F]/15 blur-3xl pointer-events-none animate-pulse" />
                    <div className="absolute w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none" />

                    {/* Coldune Logo Mark */}
                    <div className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center">
                        <Image
                            src="/coldune-studio-logo-3.webp"
                            alt="Coldune Studio Logo"
                            fill
                            className="object-contain brightness-0 invert drop-shadow-[0_0_24px_rgba(255,255,255,0.7)]"
                            priority
                        />
                    </div>

                    <div className="mt-3 text-center">
                        <span className="text-[9px] md:text-[10px] font-mono tracking-[0.3em] uppercase text-white/50 block">
                            COLDUNE STUDIO
                        </span>
                        <span className="text-[11px] md:text-xs font-serif italic text-white/80 font-black">
                            Select Brand
                        </span>
                    </div>
                </div>

                {/* The 4 Orbital Brand Cards */}
                {BRAND_OPTIONS.map((brand, index) => {
                    const angle = (index / totalBrands) * 2 * Math.PI + rotation;
                    const cosVal = Math.cos(angle);
                    const sinVal = Math.sin(angle);

                    const x = cosVal * radii.radiusX;
                    const y = sinVal * radii.radiusY;

                    // Depth: sinVal ranges from -1 (back of orbit) to +1 (front of orbit)
                    const depthFactor = (sinVal + 1) / 2; // 0 to 1
                    const scale = 0.82 + depthFactor * 0.32;
                    const opacity = 0.55 + depthFactor * 0.45;
                    const zIndex = Math.round(10 + depthFactor * 30); // 10 (behind center logo at 20) to 40 (front)

                    const isHovered = hoveredIndex === index;
                    const isFront = activeFrontIndex === index;

                    return (
                        <div
                            key={brand.id}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={(e) => {
                                e.stopPropagation();
                                onSelectBrand(brand.name);
                            }}
                            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                            style={{
                                left: `calc(50% + ${x}px)`,
                                top: `calc(50% + ${y}px)`,
                                transform: `scale(${isHovered ? scale * 1.08 : scale}) translateZ(${depthFactor * 80}px)`,
                                opacity: isHovered ? 1 : opacity,
                                zIndex: isHovered ? 50 : zIndex,
                                transition: isDragging
                                    ? "none"
                                    : "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease"
                            }}
                        >
                            {/* Card Body */}
                            <div 
                                className={`w-64 sm:w-72 md:w-80 h-[380px] sm:h-[430px] rounded-3xl overflow-hidden relative flex flex-col justify-between p-6 sm:p-7 transition-all duration-500 bg-[#0B0B0F]/95 backdrop-blur-xl border ${
                                    isHovered || isFront
                                        ? "border-[#3CFF8F]/70 shadow-[0_15px_45px_rgba(60,255,143,0.25)] ring-1 ring-[#3CFF8F]/40"
                                        : "border-white/10 shadow-2xl hover:border-white/30"
                                }`}
                            >
                                {/* Full Background Cover Image */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={brand.file}
                                        alt={brand.name}
                                        fill
                                        sizes="(max-width: 768px) 280px, 320px"
                                        className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                                    />
                                    {/* Gradients to keep typography crisp */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
                                </div>

                                {/* Card Top Row */}
                                <div className="relative z-10 flex justify-between items-center">
                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-white/15 backdrop-blur-md">
                                        <Layers size={11} className="text-[#3CFF8F]" />
                                        <span className="text-[10px] font-mono tracking-widest text-[#3CFF8F] uppercase font-bold">
                                            {brand.count}
                                        </span>
                                    </div>
                                    <span className="text-xs font-mono font-bold tracking-widest text-white/50 bg-black/50 px-2.5 py-0.5 rounded-full border border-white/10">
                                        {brand.indexNumber}
                                    </span>
                                </div>

                                {/* Card Bottom Details & CTA */}
                                <div className="relative z-10">
                                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#3CFF8F] font-bold block mb-1">
                                        {brand.category}
                                    </span>

                                    <h2 className="text-3xl sm:text-4xl font-serif italic font-black uppercase text-white tracking-tight leading-none mb-2 drop-shadow-md group-hover:text-[#3CFF8F] transition-colors">
                                        {brand.name}.
                                    </h2>

                                    <p className="text-xs text-white/70 font-sans line-clamp-2 leading-relaxed mb-4">
                                        {brand.desc}
                                    </p>

                                    {/* Click Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onSelectBrand(brand.name);
                                        }}
                                        className="w-full py-2.5 px-4 rounded-xl bg-white/10 group-hover:bg-[#3CFF8F] border border-white/20 group-hover:border-[#3CFF8F] text-white group-hover:text-black font-universo font-black uppercase text-[11px] tracking-wider transition-all duration-300 flex items-center justify-between shadow-lg cursor-pointer"
                                    >
                                        <span>Enter {brand.name}</span>
                                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* --- BOTTOM HUD CONTROLS --- */}
            <div className="relative z-50 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-none">
                {/* Active Brand Info Indicator */}
                <div className="flex items-center gap-3 bg-black/70 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-xl pointer-events-auto">
                    <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                        ACTIVE:
                    </span>
                    <span className="text-xs font-serif italic font-black text-[#3CFF8F] tracking-wide">
                        {activeBrand.name}
                    </span>
                    <span className="text-white/20 text-xs">|</span>
                    <span className="text-[10px] font-mono tracking-widest text-white/60 uppercase">
                        {activeBrand.category}
                    </span>
                </div>

                {/* 4 Brand Quick Select Pills */}
                <div className="flex items-center gap-1.5 bg-black/70 border border-white/10 p-1.5 rounded-full backdrop-blur-xl pointer-events-auto">
                    <button
                        onClick={() => stepBrand(-1)}
                        aria-label="Previous Brand"
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
                    >
                        <ChevronLeft size={14} />
                    </button>

                    {BRAND_OPTIONS.map((b, idx) => (
                        <button
                            key={b.id}
                            onClick={() => rotateBrandToFront(idx)}
                            className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                                idx === activeFrontIndex
                                    ? "bg-[#3CFF8F] text-black font-bold shadow-[0_0_14px_rgba(60,255,143,0.5)]"
                                    : "text-white/60 hover:text-white hover:bg-white/10"
                            }`}
                        >
                            {b.name}
                        </button>
                    ))}

                    <button
                        onClick={() => stepBrand(1)}
                        aria-label="Next Brand"
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
                    >
                        <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </section>
    );
}
