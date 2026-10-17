"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowLeft, RotateCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AlienPlanetParticles from "@/components/canvas/AlienPlanetParticles";

export interface BrandCardData {
    id: string;
    brandName: string;
    file: string;
    accentColor: string;
    tagline: string;
}

export const BRANDS: BrandCardData[] = [
    {
        id: "selvare",
        brandName: "Selvare",
        file: "/work/branding/selvare/selvare 1.png",
        accentColor: "#E8D8C8", // Champagne & Warm Ivory
        tagline: "The Art of Presence · Luxury Fragrance"
    },
    {
        id: "ixora",
        brandName: "Ixora",
        file: "/work/branding/ChatGPT Image Aug 11, 2026, 02_05_38 PM.png",
        accentColor: "#F59E0B", // Warm Amber Gold
        tagline: "Haute Parfumerie & Luxury Skincare"
    },
    {
        id: "nexa",
        brandName: "Nexa",
        file: "/work/branding/nexa 2.webp",
        accentColor: "#E11D48", // Crimson Red
        tagline: "Visual Architecture & Modernism"
    },
    {
        id: "define",
        brandName: "Define",
        file: "/work/branding/define 1.webp",
        accentColor: "#2563EB", // Electric Cobalt Blue
        tagline: "Editorial Identity & Typography"
    },
    {
        id: "verdant-court",
        brandName: "The Verdant Court",
        file: "/work/branding/courts 1.webp",
        accentColor: "#10B981", // Emerald Green
        tagline: "Luxury Hospitality & Estate"
    }
];

export const FOUR_BRANDS = BRANDS;

interface BrandDiagonalCascadeProps {
    onSelectBrand: (brandName: string) => void;
}

export default function BrandDiagonalCascade({ onSelectBrand }: BrandDiagonalCascadeProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [screenCategory, setScreenCategory] = useState<"mobile" | "tablet" | "desktop">("desktop");

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            if (w < 640) {
                setScreenCategory("mobile");
            } else if (w < 1024) {
                setScreenCategory("tablet");
            } else {
                setScreenCategory("desktop");
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Layout spacing according to screen size
    const config = {
        mobile: { cardSize: 155, dx: 68, dy: 52 },
        tablet: { cardSize: 205, dx: 98, dy: 72 },
        desktop: { cardSize: 260, dx: 125, dy: 88 }
    }[screenCategory];

    // Physics-based smooth drag and wheel motion (Zero shivering)
    const rawDragOffset = useMotionValue(0);
    const smoothOffset = useSpring(rawDragOffset, {
        stiffness: 90,
        damping: 22,
        mass: 0.4
    });

    // Handle mouse wheel scrolling along diagonal
    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const current = rawDragOffset.get();
        // Limit range so cards don't fly off screen
        const maxRange = config.dx * 1.5;
        const newOffset = Math.max(-maxRange, Math.min(maxRange, current + (e.deltaY > 0 ? -24 : 24)));
        rawDragOffset.set(newOffset);
    };

    // Parallax mouse tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 80, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 80, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY, currentTarget } = e;
        const rect = currentTarget.getBoundingClientRect();
        const normX = (clientX - rect.left) / rect.width - 0.5;
        const normY = (clientY - rect.top) / rect.height - 0.5;
        mouseX.set(normX * 8);
        mouseY.set(normY * -8);
    };

    const hoveredBrand = BRANDS.find(b => b.id === hoveredId);

    return (
        <section
            onWheel={handleWheel}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen w-full bg-[#050508] text-white overflow-hidden flex flex-col justify-between select-none pt-28 md:pt-32 pb-8 px-4 sm:px-8 cursor-default"
        >
            {/* Ambient luxury lighting */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_45%_35%,rgba(60,255,143,0.06)_0%,transparent_65%)]" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_60%_65%,rgba(225,29,72,0.05)_0%,transparent_65%)]" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_50%,rgba(15,15,22,0.7)_0%,#050508_85%)]" />

            {/* 3D Alien Planet Rock Surface & Flowing Particle Streams */}
            <AlienPlanetParticles accentColor={hoveredBrand?.accentColor || "#3CFF8F"} />

            {/* Top Bar Navigation / HUD */}
            <div className="relative z-50 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pointer-events-none max-w-7xl mx-auto">
                <div className="flex items-center gap-4 pointer-events-auto">
                    <Link
                        href="/#spectrum"
                        className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white/80 hover:text-white transition-all shadow-lg backdrop-blur-md"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-mono tracking-widest uppercase font-bold">Return to Hub</span>
                    </Link>
                </div>

                <div className="flex items-center gap-3 pointer-events-auto">
                    <button
                        onClick={() => rawDragOffset.set(0)}
                        aria-label="Reset position"
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition-all cursor-pointer"
                        title="Reset Cascade Position"
                    >
                        <RotateCcw size={14} />
                    </button>
                </div>
            </div>

            {/* --- MAIN STAGE: THE DIAGONAL CASCADING SQUIRCLE CARDS --- */}
            <motion.div
                style={{
                    rotateX: smoothMouseY,
                    rotateY: smoothMouseX,
                    perspective: 1200
                }}
                className="relative flex-1 w-full flex items-center justify-center my-auto min-h-[520px] md:min-h-[640px]"
            >
                {BRANDS.map((brand, index) => {
                    // Center cards symmetrically along diagonal
                    const centerOffset = index - (BRANDS.length - 1) / 2;
                    const baseX = centerOffset * config.dx;
                    const baseY = centerOffset * config.dy;

                    // Cascading z-index: bottom-right sits in front of top-left
                    const zIndex = (index + 1) * 10;
                    const isHovered = hoveredId === brand.id;

                    return (
                        <DiagonalCard
                            key={brand.id}
                            brand={brand}
                            baseX={baseX}
                            baseY={baseY}
                            cardSize={config.cardSize}
                            zIndex={zIndex}
                            isHovered={isHovered}
                            smoothOffset={smoothOffset}
                            floatDelay={index * 0.35}
                            onSelect={() => onSelectBrand(brand.brandName)}
                            onHoverChange={(hovering) => setHoveredId(hovering ? brand.id : null)}
                        />
                    );
                })}
            </motion.div>

            {/* --- BOTTOM HUD: HOVER BRAND INDICATOR & QUICK PILLS --- */}
            <div className="relative z-50 w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-none">
                {/* Active Hover Label */}
                <div className="flex items-center gap-3 bg-black/80 border border-white/15 px-5 py-2.5 rounded-full backdrop-blur-xl pointer-events-auto shadow-2xl min-h-[42px]">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: hoveredBrand?.accentColor || "#3CFF8F" }} />
                    <span className="text-xs sm:text-sm font-universo font-black uppercase text-white tracking-wider flex items-center gap-1.5">
                        {hoveredBrand ? (
                            <span>{hoveredBrand.brandName}</span>
                        ) : (
                            <>
                                <span>SELECT A</span>
                                <span className="font-siestha normal-case text-[#3CFF8F] text-base -rotate-[6deg] inline-block font-normal">
                                    Brand
                                </span>
                            </>
                        )}
                    </span>
                    <span className="text-white/20 text-xs">|</span>
                    <span className="text-[10px] font-mono tracking-widest text-white/60 uppercase">
                        {hoveredBrand ? hoveredBrand.tagline : `${BRANDS.length} Brand Identity Showcases`}
                    </span>
                </div>

                {/* Direct Click Pills for All Brands */}
                <div className="flex items-center gap-1.5 bg-black/80 border border-white/15 p-1.5 rounded-full backdrop-blur-xl pointer-events-auto shadow-2xl flex-wrap justify-center">
                    {BRANDS.map((b) => (
                        <button
                            key={b.id}
                            onClick={() => onSelectBrand(b.brandName)}
                            className="px-3.5 py-1.5 rounded-full text-[10px] font-universo uppercase tracking-wider text-white/80 hover:text-black hover:bg-[#3CFF8F] transition-all cursor-pointer font-black"
                        >
                            {b.brandName}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Sub-component for individual card with smooth continuous floating and physics offset
interface DiagonalCardProps {
    brand: BrandCardData;
    baseX: number;
    baseY: number;
    cardSize: number;
    zIndex: number;
    isHovered: boolean;
    smoothOffset: MotionValue<number>;
    floatDelay: number;
    onSelect: () => void;
    onHoverChange: (hovering: boolean) => void;
}

function DiagonalCard({
    brand,
    baseX,
    baseY,
    cardSize,
    zIndex,
    isHovered,
    smoothOffset,
    floatDelay,
    onSelect,
    onHoverChange
}: DiagonalCardProps) {
    // Transform offset along 35-degree diagonal: dirX = cos(35) ≈ 0.819, dirY = sin(35) ≈ 0.573
    const xPos = useTransform(smoothOffset, (val: number) => baseX + val * 0.819);
    const yPos = useTransform(smoothOffset, (val: number) => baseY + val * 0.573);

    return (
        <motion.div
            style={{
                x: xPos,
                y: yPos,
                width: cardSize,
                height: cardSize,
                zIndex: isHovered ? 150 : zIndex
            }}
            onClick={onSelect}
            onMouseEnter={() => onHoverChange(true)}
            onMouseLeave={() => onHoverChange(false)}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
        >
            {/* Smooth Harmonic Floating Float (Butter Smooth, Zero Shivering) */}
            <motion.div
                animate={{
                    y: isHovered ? -16 : [0, -10, 0]
                }}
                transition={
                    isHovered
                        ? { type: "spring", stiffness: 350, damping: 25 }
                        : {
                              duration: 4.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: floatDelay
                          }
                }
                whileHover={{
                    scale: 1.08,
                    transition: { type: "spring", stiffness: 380, damping: 26 }
                }}
                whileTap={{
                    scale: 0.98
                }}
                className="w-full h-full"
            >
                {/* Pure Clean Squircle Artwork Card (Zero Text Overlays) */}
                <div
                    className={`w-full h-full rounded-[28px] sm:rounded-[34px] overflow-hidden relative shadow-[0_20px_55px_rgba(0,0,0,0.65)] transition-all duration-300 border ${
                        isHovered
                            ? "shadow-[0_35px_85px_rgba(0,0,0,0.95)] ring-2"
                            : "border-white/15 hover:border-white/40"
                    }`}
                    style={{
                        borderColor: isHovered ? brand.accentColor : undefined,
                        boxShadow: isHovered ? `0 30px 80px ${brand.accentColor}45` : undefined
                    }}
                >
                    {/* Clean Full-Bleed Artwork Image */}
                    <Image
                        src={brand.file}
                        alt={brand.brandName}
                        fill
                        sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 320px"
                        className="object-cover"
                        priority
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}
