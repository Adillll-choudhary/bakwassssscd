"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    ArrowLeft, 
    ArrowRight, 
    Sparkles, 
    Maximize2, 
    X, 
    ChevronDown, 
    Terminal, 
    Cpu, 
    Copy, 
    Check, 
    Play, 
    Pause, 
    Layers
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/work";

export interface AIArtifact {
    id: number;
    protocolCode: string;
    title: string;
    series: "Neural Landscapes" | "Synthetic Protocols" | "Motion Synthesis";
    type: "image" | "video";
    file: string;
    category: string;
    theoryName: string;
    theory: string;
    description: string;
    promptArchitecture: string;
    tensorMetrics: {
        steps: number;
        cfg: number;
        sampler: string;
        aspectRatio: string;
        dwellMultiplier: string;
        seed: string;
    };
    spanClass: string;
}

export const AI_COLLECTION: AIArtifact[] = [
    {
        id: 4025,
        protocolCode: "PR-911",
        title: "Kinetic Flux",
        series: "Motion Synthesis",
        type: "video",
        file: "/work/ai content/IMG_5079.MP4",
        category: "Zero-Gravity Fluidity",
        theoryName: "Dynamic Flow Triggers",
        theory: "Movement physics engineered along proprietary energy curves to sustain continuous visual retention.",
        description: "Zero-gravity neural motion sequence exploring organic fluid dynamics and mercury viscosity.",
        promptArchitecture: "zero-gravity fluid dynamics, viscous chrome mercury emulsion, cinematic lighting, volumetric refraction --ar 16:9 --style coldune_synapse",
        tensorMetrics: {
            steps: 60,
            cfg: 8.5,
            sampler: "Euler Ancestral Motion",
            aspectRatio: "16:9",
            dwellMultiplier: "+340%",
            seed: "91108246"
        },
        spanClass: "col-span-12 md:col-span-8 row-span-2 min-h-[460px]"
    },
    {
        id: 4020,
        protocolCode: "NL-01",
        title: "Biophilic Monolith",
        series: "Neural Landscapes",
        type: "image",
        file: "/work/ai content/IMG_5054.webp",
        category: "Generative Realism",
        theoryName: "Generative Realism",
        theory: "Subtle biological textures that bypass the artificial filter of human perception.",
        description: "Raw monolithic architecture immersed in synthetic moss and soft dawn lighting.",
        promptArchitecture: "monolithic raw concrete pavilion in lush bio-synthetic moss garden, soft overcast dawn, 35mm optical lens --ar 4:5 --v 6.1",
        tensorMetrics: {
            steps: 50,
            cfg: 7.0,
            sampler: "DPM++ 2M Karras",
            aspectRatio: "4:5",
            dwellMultiplier: "+280%",
            seed: "40201984"
        },
        spanClass: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
    },
    {
        id: 4029,
        protocolCode: "PR-915",
        title: "Refractive Matrix",
        series: "Synthetic Protocols",
        type: "image",
        file: "/work/ai content/IMG_5085.webp",
        category: "Optical Physics",
        theoryName: "Refractive Trust",
        theory: "Calculated light dispersion signaling precision engineering and domain mastery.",
        description: "Synthetic prism dispersion and micro-caustics across polished crystalline surfaces.",
        promptArchitecture: "hyper-refractive crystal geometry, internal chromatic aberration, light caustics on obsidian plinth --ar 4:5 --v 6.1",
        tensorMetrics: {
            steps: 55,
            cfg: 7.5,
            sampler: "DPM++ SDE Karras",
            aspectRatio: "4:5",
            dwellMultiplier: "+310%",
            seed: "40295821"
        },
        spanClass: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
    },
    {
        id: 4021,
        protocolCode: "NL-02",
        title: "Structural Synthesis",
        series: "Neural Landscapes",
        type: "image",
        file: "/work/ai content/IMG_5056.webp",
        category: "Impossible Architecture",
        theoryName: "Cognitive Curiosity",
        theory: "Geometrically sound structures set within physically impossible environments.",
        description: "Vaulted brutalist archways intersecting with desert light and geometric shadows.",
        promptArchitecture: "vaulted brutalist archways intersecting with surreal desert landscape, golden hour rays, geometric shadow --ar 16:9 --v 6.1",
        tensorMetrics: {
            steps: 50,
            cfg: 7.2,
            sampler: "DPM++ 2M Karras",
            aspectRatio: "16:9",
            dwellMultiplier: "+400%",
            seed: "40217392"
        },
        spanClass: "col-span-12 md:col-span-6 row-span-2 min-h-[380px]"
    },
    {
        id: 4022,
        protocolCode: "NL-03",
        title: "Abstract Authority",
        series: "Neural Landscapes",
        type: "image",
        file: "/work/ai content/IMG_5058.webp",
        category: "Atmospheric Abstraction",
        theoryName: "Abstract Authority",
        theory: "Sharp architectural clarity cutting through chaotic volumetric atmosphere.",
        description: "Dark monolith suspended in dense atmospheric fog under focused studio key light.",
        promptArchitecture: "dark monolith pedestal floating in dense volumetric fog, low key cinematic spotlight, deep blacks --ar 1:1 --v 6.1",
        tensorMetrics: {
            steps: 48,
            cfg: 7.8,
            sampler: "Euler Ancestral",
            aspectRatio: "1:1",
            dwellMultiplier: "+290%",
            seed: "40228410"
        },
        spanClass: "col-span-12 md:col-span-6 row-span-2 min-h-[380px]"
    },
    {
        id: 4023,
        protocolCode: "PR-909",
        title: "Non-Euclidean Void",
        series: "Synthetic Protocols",
        type: "image",
        file: "/work/ai content/IMG_5060.webp",
        category: "Impossible Architecture",
        theoryName: "Impossible Intuition",
        theory: "Visual paradoxes the mind instinctively accepts as authentic forms.",
        description: "Curved gravity-defying concrete planes shaping natural light into circular shadows.",
        promptArchitecture: "non-euclidean architectural interior, curved concrete planes defying gravity, natural skylight --ar 4:5 --v 6.1",
        tensorMetrics: {
            steps: 52,
            cfg: 8.0,
            sampler: "DPM++ 2M Karras",
            aspectRatio: "4:5",
            dwellMultiplier: "+320%",
            seed: "40239104"
        },
        spanClass: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
    },
    {
        id: 4024,
        protocolCode: "PR-910",
        title: "Tactile Surface",
        series: "Synthetic Protocols",
        type: "image",
        file: "/work/ai content/IMG_5062.webp",
        category: "Tactile Materiality",
        theoryName: "Tactile Anchoring",
        theory: "Simulating physical sensations that transform digital imagery into haptic memory.",
        description: "Basalt rock intertwined with micro-moss and morning condensation.",
        promptArchitecture: "extreme macro of weathered basalt stone intertwined with velvety alpine moss, morning dew droplets --ar 4:5 --v 6.1",
        tensorMetrics: {
            steps: 55,
            cfg: 7.0,
            sampler: "DPM++ SDE Karras",
            aspectRatio: "4:5",
            dwellMultiplier: "+260%",
            seed: "40246619"
        },
        spanClass: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
    },
    {
        id: 4027,
        protocolCode: "PR-913",
        title: "Bipolar Monolith",
        series: "Synthetic Protocols",
        type: "image",
        file: "/work/ai content/IMG_5066.webp",
        category: "High-Contrast Lighting",
        theoryName: "Bipolar Contrast",
        theory: "Maximum dynamic spread between absolute black and specular white.",
        description: "Stark brutalist silhouette defined by razor-sharp shadows and specular highlights.",
        promptArchitecture: "stark brutalist silhouette against white studio background, hard razor-sharp shadows, geometric purity --ar 4:5 --v 6.1",
        tensorMetrics: {
            steps: 45,
            cfg: 8.0,
            sampler: "Euler Ancestral",
            aspectRatio: "4:5",
            dwellMultiplier: "+350%",
            seed: "40271928"
        },
        spanClass: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
    },
    {
        id: 4028,
        protocolCode: "NL-04",
        title: "World Genesis",
        series: "Neural Landscapes",
        type: "image",
        file: "/work/ai content/IMG_5067.webp",
        category: "Worldbuilding",
        theoryName: "Brand Universe",
        theory: "Cohesive fictional environments that elevate perceived intelligence.",
        description: "Seamless integration of raw natural rock, titanium framing, and ambient sky.",
        promptArchitecture: "vast futuristic sanctuary, seamless natural stone and brushed dark titanium, soft ambient light --ar 16:9 --v 6.1",
        tensorMetrics: {
            steps: 60,
            cfg: 7.5,
            sampler: "DPM++ 2M Karras",
            aspectRatio: "16:9",
            dwellMultiplier: "+380%",
            seed: "40283011"
        },
        spanClass: "col-span-12 md:col-span-7 row-span-2 min-h-[420px]"
    },
    {
        id: 4030,
        protocolCode: "PR-916",
        title: "Silence of Authority",
        series: "Synthetic Protocols",
        type: "image",
        file: "/work/ai content/IMG_5087.webp",
        category: "Generative Minimalism",
        theoryName: "Silence Theory",
        theory: "Negative space commanding undivided focus and quiet confidence.",
        description: "Solitary geometric structure grounded in vast dark negative space.",
        promptArchitecture: "solitary geometric sculpture on seamless dark plane, sweeping negative space, minimalist exhibition --ar 4:5 --v 6.1",
        tensorMetrics: {
            steps: 50,
            cfg: 7.2,
            sampler: "DPM++ 2M Karras",
            aspectRatio: "4:5",
            dwellMultiplier: "+270%",
            seed: "40309482"
        },
        spanClass: "col-span-12 md:col-span-5 row-span-2 min-h-[420px]"
    },
    {
        id: 4031,
        protocolCode: "PR-917",
        title: "Granular Structure",
        series: "Synthetic Protocols",
        type: "image",
        file: "/work/ai content/IMG_5089.webp",
        category: "Macro Texture",
        theoryName: "Granular Authority",
        theory: "Microscopic precision that subconsciously signals overall mastery.",
        description: "Nano-scale fissures and volcanic mineral grains with gold fleck reflections.",
        promptArchitecture: "macro texture of volcanic sand mixed with gold leaf flecks, shallow focus, studio lighting --ar 4:5 --v 6.1",
        tensorMetrics: {
            steps: 54,
            cfg: 7.6,
            sampler: "DPM++ SDE Karras",
            aspectRatio: "4:5",
            dwellMultiplier: "+300%",
            seed: "40317820"
        },
        spanClass: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
    },
    {
        id: 4032,
        protocolCode: "PR-918",
        title: "Kinetic Pulse",
        series: "Synthetic Protocols",
        type: "image",
        file: "/work/ai content/IMG_5091.webp",
        category: "Particle Systems",
        theoryName: "Kinetic Resonance",
        theory: "Simulating vital atmospheric energy within a static frame.",
        description: "Suspended micro-particulate vortex illuminated by faint emerald radiance.",
        promptArchitecture: "suspended micro-particulate vortex illuminated by emerald glow, dark matter simulation --ar 4:5 --v 6.1",
        tensorMetrics: {
            steps: 52,
            cfg: 7.4,
            sampler: "Euler Ancestral",
            aspectRatio: "4:5",
            dwellMultiplier: "+310%",
            seed: "40325199"
        },
        spanClass: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
    },
    {
        id: 4033,
        protocolCode: "PR-919",
        title: "Visual Synthesis",
        series: "Synthetic Protocols",
        type: "image",
        file: "/work/ai content/IMG_5093.webp",
        category: "Generative Climax",
        theoryName: "Synthesis Mastery",
        theory: "Harmonising light, form, and texture into a singular creative future.",
        description: "Monolithic stone, luminous fluid channels, and atmospheric haze.",
        promptArchitecture: "synthesis of monolithic stone, glowing liquid neon channels, atmospheric haze, 8k masterpiece --ar 4:5 --v 6.1",
        tensorMetrics: {
            steps: 65,
            cfg: 8.2,
            sampler: "DPM++ 2M Karras",
            aspectRatio: "4:5",
            dwellMultiplier: "+420%",
            seed: "40339912"
        },
        spanClass: "col-span-12 md:col-span-4 row-span-1 min-h-[260px]"
    }
];

const TERMINAL_PRESETS = [
    {
        id: "fluid",
        name: "PR-911",
        prompt: "zero-gravity fluid dynamics, viscous chrome mercury emulsion --ar 16:9 --style coldune",
        file: "/work/ai content/IMG_5079.MP4",
        type: "video" as const
    },
    {
        id: "monolith",
        name: "NL-01",
        prompt: "monolithic raw concrete pavilion in lush bio-synthetic moss garden --ar 4:5 --v 6.1",
        file: "/work/ai content/IMG_5054.webp",
        type: "image" as const
    },
    {
        id: "refraction",
        name: "PR-915",
        prompt: "hyper-refractive crystal geometry, internal chromatic aberration on obsidian --ar 4:5 --v 6.1",
        file: "/work/ai content/IMG_5085.webp",
        type: "image" as const
    },
    {
        id: "non-euclidean",
        name: "PR-909",
        prompt: "non-euclidean architectural interior, curved concrete planes defying gravity --ar 4:5 --v 6.1",
        file: "/work/ai content/IMG_5060.webp",
        type: "image" as const
    }
];

export default function AIContentShowcase({ projects }: { projects?: Project[] }) {
    const [selectedSeries, setSelectedSeries] = useState<string>("ALL");
    const [activeInspector, setActiveInspector] = useState<AIArtifact | null>(null);
    const [copiedPrompt, setCopiedPrompt] = useState(false);
    const [activeTerminalPreset, setActiveTerminalPreset] = useState(TERMINAL_PRESETS[0]);
    const [featuredPlaying, setFeaturedPlaying] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!activeInspector) return;
            if (e.key === "Escape") {
                setActiveInspector(null);
            } else if (e.key === "ArrowRight") {
                const currentIndex = AI_COLLECTION.findIndex(a => a.id === activeInspector.id);
                const nextIndex = (currentIndex + 1) % AI_COLLECTION.length;
                setActiveInspector(AI_COLLECTION[nextIndex]);
            } else if (e.key === "ArrowLeft") {
                const currentIndex = AI_COLLECTION.findIndex(a => a.id === activeInspector.id);
                const prevIndex = (currentIndex - 1 + AI_COLLECTION.length) % AI_COLLECTION.length;
                setActiveInspector(AI_COLLECTION[prevIndex]);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeInspector]);

    const filteredArtifacts = selectedSeries === "ALL"
        ? AI_COLLECTION
        : AI_COLLECTION.filter(a => a.series === selectedSeries);

    const handleCopyPrompt = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedPrompt(true);
        setTimeout(() => setCopiedPrompt(false), 2000);
    };

    const toggleFeaturedVideo = () => {
        if (!videoRef.current) return;
        if (featuredPlaying) {
            videoRef.current.pause();
            setFeaturedPlaying(false);
        } else {
            videoRef.current.play();
            setFeaturedPlaying(true);
        }
    };

    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#3CFF8F] selection:text-black font-sans relative overflow-x-hidden">
            {/* Ambient Dual Atmosphere: Charcoal Grid + Crimson Red (#A31C1B) + Neon Green (#3CFF8F) */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div 
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: "linear-gradient(to right, rgba(163,28,27,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(60,255,143,0.15) 1px, transparent 1px)",
                        backgroundSize: "64px 64px"
                    }}
                />
                <div className="absolute top-1/4 right-0 w-[600px] h-[400px] bg-[#A31C1B]/[0.07] blur-[180px] rounded-full" />
                <div className="absolute top-1/3 left-0 w-[700px] h-[400px] bg-[#3CFF8F]/[0.03] blur-[160px] rounded-full" />
            </div>

            {/* Persistent Top Sub-Navigation (Charcoal Black #171717 base) */}
            <header className="fixed top-20 md:top-24 left-0 right-0 z-[90] px-4 md:px-8 pointer-events-none">
                <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 bg-[#171717]/90 backdrop-blur-2xl border border-white/10 px-4 md:px-6 py-2.5 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.85)] pointer-events-auto">
                    {/* Left: Return */}
                    <Link
                        href="/#spectrum"
                        className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                    >
                        <div className="w-7 h-7 rounded-full bg-[#171717] border border-white/15 flex items-center justify-center group-hover:border-[#3CFF8F]/60 group-hover:scale-105 transition-all">
                            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform text-[#3CFF8F]" />
                        </div>
                        <span className="text-[10px] md:text-[11px] font-universo font-black uppercase tracking-wider hidden sm:inline">
                            All Work
                        </span>
                    </Link>

                    {/* Center: Series Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                        {[
                            { key: "ALL", label: "All", count: AI_COLLECTION.length },
                            { key: "Neural Landscapes", label: "Landscapes", count: 4 },
                            { key: "Synthetic Protocols", label: "Protocols", count: 8 },
                            { key: "Motion Synthesis", label: "Motion", count: 1 }
                        ].map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setSelectedSeries(tab.key)}
                                className={`px-3 py-1 rounded-full text-[10px] font-universo uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                                    selectedSeries === tab.key
                                        ? "bg-[#3CFF8F] text-black font-black shadow-[0_0_15px_rgba(60,255,143,0.5)]"
                                        : "bg-[#171717]/60 text-white/60 hover:text-white hover:bg-white/10 border border-white/5"
                                }`}
                            >
                                <span>{tab.label}</span>
                                <span className={`text-[9px] px-1 rounded-full ${
                                    selectedSeries === tab.key ? "bg-black/20 text-black font-mono font-bold" : "bg-white/10 text-white/40"
                                }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Right: Telemetry status */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#A31C1B]/40 text-[9px] font-mono text-[#A31C1B]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#A31C1B] animate-ping" />
                            <span className="font-bold">v4.8</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* HERO SECTION: Minimal, High-Impact, Low Text */}
            <section className="relative min-h-[85vh] flex flex-col justify-center items-center px-4 md:px-8 pt-40 md:pt-48 pb-16 overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <video
                        src="/work/ai content/IMG_5079.MP4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover opacity-30 filter contrast-125 saturate-50 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/75 to-[#0A0A0A]" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center space-y-5">
                    {/* Minimal Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171717] border border-[#A31C1B]/40 text-[10px] font-universo uppercase tracking-widest text-white/90 shadow-sm"
                    >
                        <Sparkles size={11} className="text-[#3CFF8F]" />
                        <span>Coldune Synapse // Neural Visuals</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A31C1B] animate-ping" />
                    </motion.div>

                    {/* Coldune Signature Typography Duo */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-[13vw] md:text-[7.5rem] lg:text-[9.5rem] font-universo font-black uppercase leading-[0.82] tracking-tight text-white select-none">
                            SYNTHETIC
                            <br />
                            <span className="relative inline-block mt-1">
                                <span className="font-universo font-black uppercase text-white">DREAMS</span>
                                <span 
                                    className="block md:inline font-siestha normal-case text-[#3CFF8F] text-[15vw] md:text-[7.5rem] lg:text-[9.5rem] -rotate-[6deg] md:ml-6 align-middle"
                                    style={{ textShadow: "0 4px 35px rgba(60,255,143,0.45)" }}
                                >
                                    &amp; Perception
                                </span>
                            </span>
                        </h1>
                    </motion.div>

                    {/* Crisp One-Line Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-sm md:text-base text-white/60 font-light max-w-lg mx-auto"
                    >
                        Proprietary generative architectures engineered for luxury brands.
                    </motion.p>

                    {/* Compact Streamlined Telemetry Strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="pt-2 flex flex-wrap items-center justify-center gap-2 font-mono text-[10px]"
                    >
                        <span className="px-3 py-1 rounded-full bg-[#171717] border border-white/5 text-white/60">
                            ENGINE: <strong className="text-[#3CFF8F]">SYNAPSE v4.8</strong>
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#171717] border border-white/5 text-white/60">
                            RES: <strong className="text-[#A31C1B]">8K NATIVE</strong>
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#171717] border border-white/5 text-white/60">
                            RETENTION: <strong className="text-[#3CFF8F]">+400%</strong>
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#171717] border border-white/5 text-white/60">
                            ARCHIVE: <strong className="text-[#A31C1B]">13 WORKS</strong>
                        </span>
                    </motion.div>

                    <div className="pt-6 flex justify-center">
                        <ChevronDown size={24} className="text-[#3CFF8F] animate-bounce" />
                    </div>
                </div>
            </section>

            {/* FEATURED SPOTLIGHT: Clean Visual-First */}
            <section className="py-12 md:py-20 px-4 md:px-8 max-w-6xl mx-auto relative z-10">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#171717] border border-[#A31C1B]/40 text-[9px] font-mono text-[#A31C1B] font-bold">
                            PR-911
                        </span>
                        <h2 className="text-xl md:text-3xl font-universo font-black uppercase text-white">
                            Kinetic Flux <span className="font-siestha normal-case text-[#3CFF8F] text-2xl md:text-4xl -rotate-[5deg] inline-block ml-1">Motion</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleFeaturedVideo}
                            className="p-2 rounded-full bg-[#171717] border border-white/15 text-white hover:border-[#3CFF8F]/60 transition-all cursor-pointer"
                            title={featuredPlaying ? "Pause" : "Play"}
                        >
                            {featuredPlaying ? <Pause size={13} className="text-[#3CFF8F]" /> : <Play size={13} className="text-[#3CFF8F]" />}
                        </button>
                        <button
                            onClick={() => setActiveInspector(AI_COLLECTION[0])}
                            className="px-3.5 py-1.5 rounded-full bg-[#3CFF8F] text-black text-xs font-universo font-black uppercase flex items-center gap-1.5 hover:shadow-[0_0_15px_rgba(60,255,143,0.5)] transition-all cursor-pointer"
                        >
                            <Maximize2 size={12} />
                            <span>Inspect</span>
                        </button>
                    </div>
                </div>

                <div 
                    onClick={() => setActiveInspector(AI_COLLECTION[0])}
                    className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#171717] shadow-2xl aspect-[16/9] md:aspect-[21/9] cursor-pointer group"
                >
                    <video
                        ref={videoRef}
                        src="/work/ai content/IMG_5079.MP4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono pointer-events-none">
                        <span className="text-[#3CFF8F]">Dynamic Flow Triggers</span>
                        <span className="text-white/60">4K 60FPS</span>
                    </div>
                </div>
            </section>

            {/* MAIN PROTOCOL GALLERY: Clean Visual Bento Grid */}
            <section className="py-12 md:py-20 px-4 md:px-8 max-w-6xl mx-auto relative z-10">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl md:text-5xl font-universo font-black uppercase tracking-tight text-white">
                        THE NEURAL <span className="font-siestha normal-case text-[#3CFF8F] text-3xl md:text-6xl -rotate-[5deg] inline-block ml-2">Protocols</span>
                    </h2>
                    <span className="text-xs font-mono text-white/40">[{filteredArtifacts.length} Artifacts]</span>
                </div>

                {/* Clean Bento Grid — Visuals First, Minimal Text */}
                <motion.div layout className="grid grid-cols-12 gap-3 md:gap-4">
                    <AnimatePresence>
                        {filteredArtifacts.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, delay: (idx % 4) * 0.05 }}
                                onClick={() => setActiveInspector(item)}
                                className={`${item.spanClass} group relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#171717] border border-white/5 hover:border-[#3CFF8F]/60 transition-all duration-500 cursor-pointer shadow-xl flex flex-col justify-end`}
                            >
                                {/* Media */}
                                {item.type === "video" ? (
                                    <video
                                        src={item.file}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="auto"
                                        className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                    />
                                ) : (
                                    <Image
                                        src={item.file}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                    />
                                )}

                                {/* Subtle Dark Vignette */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                {/* Top Protocol Pill */}
                                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-20 pointer-events-none">
                                    <span className="px-2.5 py-0.5 rounded-full bg-[#171717]/85 border border-[#A31C1B]/40 text-[9px] font-mono font-bold text-[#A31C1B] backdrop-blur-md">
                                        {item.protocolCode}
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full bg-black/60 text-[9px] font-mono text-white/60 backdrop-blur-md">
                                        {item.category}
                                    </span>
                                </div>

                                {/* Bottom Minimal Title Bar (Clean, uncluttered) */}
                                <div className="relative z-20 p-4 md:p-5 flex items-end justify-between pointer-events-none">
                                    <div>
                                        <div className="text-[10px] font-mono text-[#3CFF8F] opacity-90 mb-0.5">
                                            {item.theoryName}
                                        </div>
                                        <h3 className="text-lg md:text-xl font-universo font-black uppercase text-white tracking-tight group-hover:text-[#3CFF8F] transition-colors">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-[#171717]/80 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Maximize2 size={12} className="text-[#3CFF8F]" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </section>

            {/* COMPACT INTERACTIVE TERMINAL */}
            <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto relative z-10">
                <div className="p-6 md:p-10 rounded-3xl bg-[#171717] border border-white/10 shadow-2xl space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#A31C1B]/20 text-[9px] font-mono text-[#A31C1B] font-bold border border-[#A31C1B]/40">
                                SANDBOX
                            </span>
                            <h3 className="text-xl md:text-2xl font-universo font-black uppercase text-white">
                                SYNAPSE <span className="font-siestha normal-case text-[#3CFF8F] text-2xl md:text-3xl -rotate-[5deg] inline-block ml-1">Terminal</span>
                            </h3>
                        </div>

                        {/* Presets */}
                        <div className="flex items-center gap-1.5">
                            {TERMINAL_PRESETS.map(preset => (
                                <button
                                    key={preset.id}
                                    onClick={() => setActiveTerminalPreset(preset)}
                                    className={`px-3 py-1 rounded-full text-[10px] font-universo uppercase transition-all cursor-pointer ${
                                        activeTerminalPreset.id === preset.id
                                            ? "bg-[#3CFF8F] text-black font-black"
                                            : "bg-[#171717] text-white/60 hover:text-white border border-white/10"
                                    }`}
                                >
                                    {preset.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Compact Code + Preview */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="md:col-span-8 bg-black/60 rounded-2xl border border-white/10 p-4 space-y-3 font-mono text-xs">
                            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-[#A31C1B]" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                                    <div className="w-2 h-2 rounded-full bg-[#3CFF8F]" />
                                    <span className="text-[10px] text-white/40 ml-2">prompt-directive</span>
                                </div>
                                <button
                                    onClick={() => handleCopyPrompt(activeTerminalPreset.prompt)}
                                    className="hover:text-[#3CFF8F] transition-colors cursor-pointer flex items-center gap-1 text-[10px] text-white/60"
                                >
                                    {copiedPrompt ? <Check size={11} className="text-[#3CFF8F]" /> : <Copy size={11} />}
                                    <span>{copiedPrompt ? "Copied" : "Copy"}</span>
                                </button>
                            </div>

                            <p className="text-white/80 leading-relaxed text-[11px]">
                                &ldquo;{activeTerminalPreset.prompt}&rdquo;
                            </p>
                        </div>

                        <div className="md:col-span-4 relative rounded-2xl overflow-hidden aspect-[16/10] bg-black border border-white/10">
                            {activeTerminalPreset.type === "video" ? (
                                <video
                                    key={activeTerminalPreset.file}
                                    src={activeTerminalPreset.file}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Image
                                    key={activeTerminalPreset.file}
                                    src={activeTerminalPreset.file}
                                    alt={activeTerminalPreset.name}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* MINIMAL CTA SECTION */}
            <section className="py-20 md:py-32 px-4 text-center relative z-10 border-t border-white/10">
                <div className="max-w-3xl mx-auto space-y-6">
                    <h2 className="text-3xl md:text-6xl font-universo font-black uppercase text-white leading-none">
                        READY TO SCALE WITH
                        <br />
                        <span 
                            className="font-siestha normal-case text-[#3CFF8F] text-5xl md:text-7xl -rotate-[5deg] inline-block mt-3"
                            style={{ textShadow: "0 4px 30px rgba(60,255,143,0.5)" }}
                        >
                            Synthetic Visuals?
                        </span>
                    </h2>

                    <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/#contact"
                            className="px-7 py-3 rounded-full bg-[#3CFF8F] text-black font-universo font-black text-xs uppercase tracking-wider hover:scale-105 transition-all flex items-center gap-2 shadow-lg"
                        >
                            <span>Initiate AI Commission</span>
                            <ArrowRight size={14} />
                        </Link>
                        <Link
                            href="/work/branding/"
                            className="px-7 py-3 rounded-full bg-[#A31C1B] hover:bg-[#A31C1B]/85 text-white font-universo font-black text-xs uppercase tracking-wider transition-all"
                        >
                            Brand Systems
                        </Link>
                    </div>
                </div>
            </section>

            {/* FULLSCREEN INSPECTOR MODAL */}
            <AnimatePresence>
                {activeInspector && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 md:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveInspector(null)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                        />

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative z-10 w-full max-w-6xl max-h-[90vh] bg-[#171717] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
                        >
                            <button
                                onClick={() => setActiveInspector(null)}
                                className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-[#171717]/90 border border-white/20 text-white hover:text-[#3CFF8F] flex items-center justify-center cursor-pointer shadow-xl"
                            >
                                <X size={16} />
                            </button>

                            {/* Canvas */}
                            <div className="lg:w-7/12 relative bg-black flex items-center justify-center min-h-[40vh] lg:min-h-[70vh]">
                                {activeInspector.type === "video" ? (
                                    <video
                                        src={activeInspector.file}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        controls
                                        className="w-full h-full max-h-[80vh] object-contain"
                                    />
                                ) : (
                                    <div className="relative w-full h-full min-h-[45vh] lg:min-h-[70vh]">
                                        <Image
                                            src={activeInspector.file}
                                            alt={activeInspector.title}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Minimal Drawer */}
                            <div className="lg:w-5/12 p-6 md:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 overflow-y-auto space-y-5 bg-[#171717]">
                                <div className="space-y-5">
                                    <div>
                                        <span className="px-2 py-0.5 rounded bg-[#A31C1B]/20 text-[10px] font-mono text-[#A31C1B] font-bold border border-[#A31C1B]/40">
                                            {activeInspector.protocolCode} // {activeInspector.series}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-universo font-black uppercase text-white mt-2">
                                            {activeInspector.title}
                                        </h3>
                                    </div>

                                    {/* Theory */}
                                    <div className="p-3.5 rounded-xl bg-black/40 border-l-4 border-l-[#3CFF8F] border-y border-r border-white/5 space-y-1">
                                        <span className="text-[10px] font-mono text-[#3CFF8F] uppercase font-bold block">
                                            {activeInspector.theoryName}
                                        </span>
                                        <p className="text-xs text-white/80 leading-relaxed font-light">
                                            {activeInspector.theory}
                                        </p>
                                    </div>

                                    {/* Prompt */}
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
                                            <span>PROMPT</span>
                                            <button
                                                onClick={() => handleCopyPrompt(activeInspector.promptArchitecture)}
                                                className="hover:text-[#3CFF8F] transition-colors cursor-pointer flex items-center gap-1 text-[10px]"
                                            >
                                                {copiedPrompt ? <Check size={11} className="text-[#3CFF8F]" /> : <Copy size={11} />}
                                                <span>{copiedPrompt ? "Copied" : "Copy"}</span>
                                            </button>
                                        </div>
                                        <div className="p-3 rounded-xl bg-black/70 border border-white/10 text-[11px] font-mono text-white/80 leading-relaxed max-h-24 overflow-y-auto">
                                            {activeInspector.promptArchitecture}
                                        </div>
                                    </div>

                                    {/* Metrics */}
                                    <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-black/30 border border-white/5 text-[10px] font-mono">
                                        <div>
                                            <span className="text-white/40 block">SAMPLER</span>
                                            <span className="text-white font-bold">{activeInspector.tensorMetrics.sampler}</span>
                                        </div>
                                        <div>
                                            <span className="text-white/40 block">CFG</span>
                                            <span className="text-[#3CFF8F] font-bold">{activeInspector.tensorMetrics.cfg}</span>
                                        </div>
                                        <div>
                                            <span className="text-white/40 block">DWELL</span>
                                            <span className="text-[#A31C1B] font-bold">{activeInspector.tensorMetrics.dwellMultiplier}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Navigation */}
                                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => {
                                                const currentIndex = AI_COLLECTION.findIndex(a => a.id === activeInspector.id);
                                                const prevIndex = (currentIndex - 1 + AI_COLLECTION.length) % AI_COLLECTION.length;
                                                setActiveInspector(AI_COLLECTION[prevIndex]);
                                            }}
                                            className="px-3 py-1.5 rounded-full bg-[#171717] hover:bg-white/10 border border-white/15 text-xs font-universo uppercase text-white flex items-center gap-1 cursor-pointer"
                                        >
                                            <ArrowLeft size={12} /> Prev
                                        </button>
                                        <button
                                            onClick={() => {
                                                const currentIndex = AI_COLLECTION.findIndex(a => a.id === activeInspector.id);
                                                const nextIndex = (currentIndex + 1) % AI_COLLECTION.length;
                                                setActiveInspector(AI_COLLECTION[nextIndex]);
                                            }}
                                            className="px-3 py-1.5 rounded-full bg-[#171717] hover:bg-white/10 border border-white/15 text-xs font-universo uppercase text-white flex items-center gap-1 cursor-pointer"
                                        >
                                            Next <ArrowRight size={12} />
                                        </button>
                                    </div>

                                    <Link
                                        href="/#contact"
                                        className="px-4 py-1.5 rounded-full bg-[#3CFF8F] text-black font-universo font-black text-xs uppercase"
                                    >
                                        Commission
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}
