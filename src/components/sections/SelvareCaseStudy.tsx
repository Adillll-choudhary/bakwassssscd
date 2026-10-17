"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X, ChevronDown, Sparkles, Maximize2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SelvareArtwork {
    id: number;
    title: string;
    caption: string;
    file: string;
    span: string;
}

export const SELVARE_GALLERY: SelvareArtwork[] = [
    {
        id: 1,
        title: "The Signature Flacon",
        caption: "Substantial rectangular glass bottle with dark wood-grain cap and champagne-gold accents.",
        file: "/work/branding/selvare/selvare 1.png",
        span: "col-span-12 md:col-span-8 row-span-2 min-h-[460px]"
    },
    {
        id: 2,
        title: "Amber Tone & Reflection",
        caption: "Warm amber-toned fragrance interacting with natural atmospheric light and shadow.",
        file: "/work/branding/selvare/selvare 2.png",
        span: "col-span-12 md:col-span-4 row-span-1 min-h-[220px]"
    },
    {
        id: 3,
        title: "Tactile Packaging",
        caption: "Textured paper packaging with restrained Cormorant Garamond embossing.",
        file: "/work/branding/selvare/selvare 3.png",
        span: "col-span-12 md:col-span-4 row-span-1 min-h-[220px]"
    },
    {
        id: 5,
        title: "Sculptural Lighting",
        caption: "Directional editorial lighting emphasizing bottle geometry and fluid clarity.",
        file: "/work/branding/selvare/selvare 5.png",
        span: "col-span-12 md:col-span-6 row-span-2 min-h-[380px]"
    },
    {
        id: 6,
        title: "Glass Reflections",
        caption: "Cinematic macro capture of liquid viscosity and crystal glass prism reflections.",
        file: "/work/branding/selvare/selvare 6.png",
        span: "col-span-12 md:col-span-6 row-span-2 min-h-[380px]"
    },
    {
        id: 7,
        title: "Botanical Nuance",
        caption: "Organic textures communicating raw natural ingredients and aromatic character.",
        file: "/work/branding/selvare/selvare 7.png",
        span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
    },
    {
        id: 8,
        title: "Natural Materials",
        caption: "Dark wood-grain cap and sandstone surfaces embodying quiet luxury.",
        file: "/work/branding/selvare/selvare 8.png",
        span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
    },
    {
        id: 9,
        title: "Campaign Editorial",
        caption: "Fashion-led portraiture capturing intimate, timeless personal presence.",
        file: "/work/branding/selvare/selvare 9.png",
        span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
    },
    {
        id: 10,
        title: "Unboxing Architecture",
        caption: "A considered unboxing ritual engineered through tactile materials and precise tolerances.",
        file: "/work/branding/selvare/selvare 10.png",
        span: "col-span-12 md:col-span-7 row-span-2 min-h-[420px]"
    },
    {
        id: 11,
        title: "Visual Identity System",
        caption: "Harmonious dialogue between Cormorant Garamond wordmark and Manrope system.",
        file: "/work/branding/selvare/selvare 11.png",
        span: "col-span-12 md:col-span-5 row-span-2 min-h-[420px]"
    },
    {
        id: 12,
        title: "Material Harmony",
        caption: "Espresso, warm taupe, and champagne gold details forming an intimate world.",
        file: "/work/branding/selvare/selvare 12.png",
        span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
    },
    {
        id: 13,
        title: "Digital Art Direction",
        caption: "Spacious digital layouts translated into an immersive online discovery experience.",
        file: "/work/branding/selvare/selvare 13.png",
        span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
    },
    {
        id: 14,
        title: "Fashion-Led Perspective",
        caption: "Sculptural shadow and form communicating memory, scent, and understated luxury.",
        file: "/work/branding/selvare/selvare 14.png",
        span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
    },
    {
        id: 15,
        title: "Spatial Atmosphere",
        caption: "Intimate architectural staging anchoring the flacon in a serene environment.",
        file: "/work/branding/selvare/selvare 15.png",
        span: "col-span-12 md:col-span-6 row-span-2 min-h-[380px]"
    },
    {
        id: 16,
        title: "Modern Essence",
        caption: "Contemporary luxury free from ostentation, driven by poise and material honesty.",
        file: "/work/branding/selvare/selvare 16.png",
        span: "col-span-12 md:col-span-6 row-span-2 min-h-[380px]"
    },
    {
        id: 17,
        title: "Editorial Essence",
        caption: "Quiet elegance framed by architectural minimalism and cinematic light.",
        file: "/work/branding/selvare/selvare 17.png",
        span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
    },
    {
        id: 18,
        title: "Tactile Texture",
        caption: "Paper stock grain and micro-embossed insignia detail.",
        file: "/work/branding/selvare/selvare 18.png",
        span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
    },
    {
        id: 19,
        title: "Atmospheric Shadow",
        caption: "Chiaroscuro balance defining the amber glass contour.",
        file: "/work/branding/selvare/selvare 19.png",
        span: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
    },
    {
        id: 20,
        title: "Timeless Presence",
        caption: "The complete SÉLVARÉ brand world distilled into a single timeless manifestation.",
        file: "/work/branding/selvare/selvare 20.png",
        span: "col-span-12 row-span-2 min-h-[460px]"
    }
];

export const PALETTE = [
    { name: "Ivory", hex: "#F7F5F0", textDark: true },
    { name: "Champagne", hex: "#E8D8C8", textDark: true },
    { name: "Warm Taupe", hex: "#8C7D70", textDark: false },
    { name: "Muted Olive", hex: "#6B705C", textDark: false },
    { name: "Espresso", hex: "#2B1E1A", textDark: false }
];

interface SelvareCaseStudyProps {
    onBack: () => void;
    onSelectBrand?: (brandName: string) => void;
}

export default function SelvareCaseStudy({ onBack, onSelectBrand }: SelvareCaseStudyProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const activeImage = lightboxIndex !== null ? SELVARE_GALLERY[lightboxIndex] : null;

    return (
        <article className="min-h-screen w-full bg-[#070709] text-white selection:bg-[#E8D8C8] selection:text-black">
            {/* --- TOP PERSISTENT NAVIGATION --- */}
            <header className="fixed top-0 left-0 w-full z-[100] px-6 py-6 flex justify-between items-center pointer-events-none">
                <div className="flex items-center gap-3 pointer-events-auto">
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-black/70 hover:bg-black/90 border border-white/15 hover:border-white/40 text-white transition-all shadow-2xl backdrop-blur-xl cursor-pointer"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[11px] font-mono tracking-widest uppercase font-bold">All Brands</span>
                    </button>

                    {onSelectBrand && (
                        <div className="hidden sm:flex items-center gap-1 bg-black/70 border border-white/15 p-1 rounded-full backdrop-blur-xl shadow-2xl">
                            {["Sélvaré", "Ixora", "Nexa", "Define", "The Verdant Court"].map((b) => (
                                <button
                                    key={b}
                                    onClick={() => onSelectBrand(b)}
                                    className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                                        b === "Sélvaré"
                                            ? "bg-[#E8D8C8] text-black font-bold shadow-[0_0_12px_rgba(232,216,200,0.5)]"
                                            : "text-white/60 hover:text-white hover:bg-white/10"
                                    }`}
                                >
                                    {b}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="pointer-events-auto">
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-mono tracking-widest text-[#E8D8C8] uppercase font-bold">
                        <Sparkles size={11} className="text-[#E8D8C8]" />
                        <span>CONCEPT BRAND IDENTITY</span>
                    </div>
                </div>
            </header>

            {/* --- HERO SECTION --- */}
            <section className="relative min-h-[92vh] w-full flex flex-col justify-end px-6 sm:px-12 pb-16 md:pb-24 pt-32 overflow-hidden">
                {/* Background Hero Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/work/branding/selvare/selvare 1.png"
                        alt="Sélvaré Luxury Fragrance Bottle"
                        fill
                        className="object-cover opacity-60 scale-105"
                        priority
                    />
                    {/* Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#070709] via-transparent to-[#070709]/50" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(232,216,200,0.12)_0%,transparent_65%)]" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 mb-6 backdrop-blur-md"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#E8D8C8] animate-pulse" />
                        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#E8D8C8] font-bold">
                            LUXURY FRAGRANCE BRAND IDENTITY · CONCEPT PROJECT
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.1 }}
                        className="text-6xl sm:text-8xl md:text-9xl font-serif italic font-black uppercase tracking-tight text-white mb-4 leading-none"
                    >
                        SÉLVARÉ.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="text-xl sm:text-2xl md:text-3xl font-serif italic text-white/80 max-w-2xl font-light mb-8"
                    >
                        The Art of Presence
                    </motion.p>

                    {/* Metadata Strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.3 }}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/15 max-w-4xl"
                    >
                        <div>
                            <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 block mb-1">
                                PROJECT TYPE
                            </span>
                            <span className="text-xs sm:text-sm font-sans font-medium text-white/90">
                                Self-initiated Concept
                            </span>
                        </div>
                        <div>
                            <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 block mb-1">
                                TYPOGRAPHY
                            </span>
                            <span className="text-xs sm:text-sm font-sans font-medium text-white/90">
                                Cormorant Garamond & Manrope
                            </span>
                        </div>
                        <div>
                            <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 block mb-1">
                                DISCIPLINE
                            </span>
                            <span className="text-xs sm:text-sm font-sans font-medium text-white/90">
                                Identity, Packaging & Digital
                            </span>
                        </div>
                        <div>
                            <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 block mb-1">
                                CURATION
                            </span>
                            <span className="text-xs sm:text-sm font-sans font-medium text-[#E8D8C8]">
                                19 Curated Assets
                            </span>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-2 text-white/40 font-mono text-[10px] tracking-widest uppercase">
                    <span>SCROLL TO EXPLORE</span>
                    <ChevronDown size={14} className="animate-bounce" />
                </div>
            </section>

            {/* --- EDITORIAL CHAPTERS (THE BRIEF & CREATIVE DIRECTION) --- */}
            <section className="max-w-6xl mx-auto px-6 sm:px-12 py-24 sm:py-32">
                {/* Chapter 1: Overview & The Challenge */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 items-start mb-24 pb-20 border-b border-white/10">
                    <div className="md:col-span-5">
                        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#E8D8C8] font-bold block mb-3">
                            CHAPTER 01 // OVERVIEW
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-serif italic font-black uppercase text-white leading-tight">
                            The Emotional Power of Scent & Memory.
                        </h2>
                    </div>
                    <div className="md:col-span-7 space-y-6 text-sm sm:text-base text-white/70 font-sans leading-relaxed">
                        <p>
                            <strong className="text-white font-medium">SÉLVARÉ</strong> is a conceptual niche fragrance house built around the emotional power of scent, memory and personal identity. The project explores how a fragrance brand can communicate understated luxury through a cohesive visual language spanning identity, packaging, product design and digital art direction.
                        </p>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mt-6">
                            <span className="text-[10px] font-mono tracking-widest uppercase text-[#E8D8C8] font-bold block mb-2">
                                THE CHALLENGE
                            </span>
                            <p className="text-xs sm:text-sm text-white/80">
                                To create a distinctive fragrance identity that feels sophisticated without relying on excessive ornamentation or conventional luxury clichés. The system needed to work across the perfume bottle, packaging, campaign imagery and digital experience while maintaining a recognisable visual signature.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Chapter 2: The Creative Direction & Palette */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 items-start mb-24 pb-20 border-b border-white/10">
                    <div className="md:col-span-5">
                        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#E8D8C8] font-bold block mb-3">
                            CHAPTER 02 // CREATIVE DIRECTION
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-serif italic font-black uppercase text-white leading-tight mb-6">
                            The Art of Presence.
                        </h2>
                        <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                            The concept positions fragrance as a quiet but lasting expression of identity. A refined serif wordmark, warm neutral palette, tactile material references and cinematic photography establish a world that feels intimate, timeless and contemporary.
                        </p>
                    </div>

                    <div className="md:col-span-7">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 font-bold block mb-4">
                            RESTRAINED COLOR ARCHITECTURE
                        </span>
                        {/* Interactive Color Palette */}
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {PALETTE.map((c) => (
                                <div
                                    key={c.name}
                                    className="p-4 rounded-2xl border border-white/15 flex flex-col justify-between h-32 transition-transform hover:scale-105"
                                    style={{ backgroundColor: c.hex }}
                                >
                                    <span
                                        className="text-[10px] font-mono font-bold uppercase tracking-wider"
                                        style={{ color: c.textDark ? "#111111" : "#F7F5F0" }}
                                    >
                                        {c.name}
                                    </span>
                                    <span
                                        className="text-[10px] font-mono opacity-80"
                                        style={{ color: c.textDark ? "#111111" : "#F7F5F0" }}
                                    >
                                        {c.hex}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 text-xs sm:text-sm text-white/60 leading-relaxed space-y-3">
                            <p>
                                <strong className="text-white">Cormorant Garamond</strong> introduces editorial elegance, while <strong className="text-white">Manrope</strong> provides clarity across supporting information and digital interfaces. Ivory, espresso, champagne, warm taupe and muted olive create a restrained palette designed to balance warmth, contrast and sophistication.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Chapter 3: Product, Packaging & Digital Experience */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    <div className="p-8 rounded-3xl bg-[#0E0E12] border border-white/10 flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8D8C8] font-bold block mb-3">
                                01 // PRODUCT & PACKAGING
                            </span>
                            <h3 className="text-xl font-serif italic font-black uppercase text-white mb-4">
                                Tactile Unboxing.
                            </h3>
                            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                                The signature product direction features a substantial rectangular glass bottle, amber-toned fragrance, a dark wood-grain cap and champagne-gold detailing. Textured packaging, restrained typography and subtle embossing extend the identity into a considered unboxing experience.
                            </p>
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-[#0E0E12] border border-white/10 flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8D8C8] font-bold block mb-3">
                                02 // ART DIRECTION
                            </span>
                            <h3 className="text-xl font-serif italic font-black uppercase text-white mb-4">
                                Sculptural Lighting.
                            </h3>
                            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                                The visual world combines sculptural lighting, rich glass reflections, natural materials, botanical details and fashion-led editorial compositions. Each image communicates atmosphere while keeping the product at the center.
                            </p>
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-[#0E0E12] border border-white/10 flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8D8C8] font-bold block mb-3">
                                03 // DIGITAL EXPERIENCE
                            </span>
                            <h3 className="text-xl font-serif italic font-black uppercase text-white mb-4">
                                Editorial Discovery.
                            </h3>
                            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                                The website direction translates the identity into an editorial fragrance experience, combining spacious layouts, oversized product imagery, subtle motion and clear navigation.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Chapter 4: Services Explored */}
                <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/10 mb-28">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#E8D8C8] font-bold block mb-4">
                        SERVICES EXPLORED & METHODOLOGY
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                        {[
                            "Brand Strategy",
                            "Visual Identity",
                            "Logo Design",
                            "Packaging Concept",
                            "Product Art Direction",
                            "Campaign Imagery",
                            "Website Art Direction"
                        ].map((s) => (
                            <span
                                key={s}
                                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-white/80"
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                </div>

                {/* --- 19-IMAGE CURATED HIGH-RES GALLERY --- */}
                <div className="mb-12">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 pb-6 border-b border-white/10">
                        <div>
                            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#E8D8C8] font-bold block mb-2">
                                VISUAL PRODUCTION ARCHIVE
                            </span>
                            <h2 className="text-3xl sm:text-5xl font-serif italic font-black uppercase text-white">
                                The Sélvaré Collection.
                            </h2>
                        </div>
                        <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                            19 Visual Manifestations · Click to Expand
                        </span>
                    </div>

                    {/* Bento Mosaic Grid */}
                    <div className="grid grid-cols-12 gap-3 sm:gap-4">
                        {SELVARE_GALLERY.map((artwork, index) => (
                            <motion.div
                                key={artwork.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.7, delay: (index % 4) * 0.1 }}
                                onClick={() => setLightboxIndex(index)}
                                className={`${artwork.span} group relative bg-black rounded-2xl overflow-hidden border border-white/10 hover:border-[#E8D8C8]/60 transition-all duration-500 cursor-pointer shadow-xl`}
                            >
                                <Image
                                    src={artwork.file}
                                    alt={artwork.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <span className="text-[10px] font-mono text-[#E8D8C8] uppercase tracking-widest block mb-1">
                                                0{index + 1} {"//"} SÉLVARÉ
                                            </span>
                                            <h4 className="text-lg sm:text-xl font-serif italic font-black text-white">
                                                {artwork.title}
                                            </h4>
                                            <p className="text-xs text-white/70 max-w-md line-clamp-1 mt-1 font-sans">
                                                {artwork.caption}
                                            </p>
                                        </div>
                                        <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                            <Maximize2 size={14} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* --- OUTCOME & WORK WITH COLDUNE --- */}
                <div className="pt-20 border-t border-white/10 mt-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div>
                        <span className="text-[10px] font-mono tracking-widest uppercase text-[#E8D8C8] font-bold block mb-2">
                            THE OUTCOME
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif italic font-black uppercase text-white max-w-xl">
                            A unified creative direction demonstrating how a consistent design system turns an individual product into a complete brand world.
                        </h3>
                    </div>

                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-[#E8D8C8] hover:bg-white text-black font-universo font-black uppercase text-xs tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(232,216,200,0.3)] hover:scale-105 group"
                    >
                        <span>Commission Brand Identity</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* --- LIGHTBOX MODAL --- */}
            <AnimatePresence>
                {activeImage && (
                    <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-10">
                        <div
                            className="absolute inset-0"
                            onClick={() => setLightboxIndex(null)}
                        />

                        <motion.div
                            initial={{ scale: 0.94, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.94, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 280 }}
                            className="relative z-10 max-w-5xl w-full max-h-[90vh] bg-[#0E0E12] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setLightboxIndex(null)}
                                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all cursor-pointer"
                            >
                                <X size={20} />
                            </button>

                            {/* Image Container */}
                            <div className="w-full md:w-3/5 h-80 md:h-[600px] relative bg-black flex items-center justify-center">
                                <Image
                                    src={activeImage.file}
                                    alt={activeImage.title}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            {/* Metadata Sidebar */}
                            <div className="w-full md:w-2/5 p-8 flex flex-col justify-between bg-[#121217] border-t md:border-t-0 md:border-l border-white/10">
                                <div>
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#E8D8C8]">
                                        SÉLVARÉ // ARCHIVE
                                    </span>
                                    <h3 className="text-2xl sm:text-3xl font-serif italic font-black uppercase text-white mt-1 leading-tight">
                                        {activeImage.title}
                                    </h3>
                                    <p className="mt-4 text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                                        {activeImage.caption}
                                    </p>
                                </div>

                                <div className="pt-8 border-t border-white/10 mt-8 flex justify-between items-center">
                                    <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                                        Image {lightboxIndex! + 1} of {SELVARE_GALLERY.length}
                                    </span>
                                    <button
                                        onClick={() => setLightboxIndex(null)}
                                        className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </article>
    );
}
