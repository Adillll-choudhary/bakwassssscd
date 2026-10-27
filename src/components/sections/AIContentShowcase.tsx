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
    Eye, 
    Copy, 
    Check, 
    Play, 
    Pause, 
    Grid, 
    List, 
    Sliders,
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
        title: "Zero-Gravity Kinetic Flux",
        series: "Motion Synthesis",
        type: "video",
        file: "/work/ai content/IMG_5079.MP4",
        category: "Zero-Gravity Fluidity",
        theoryName: "Dynamic Flow Triggers",
        theory: "Dynamic Flow Triggers use the natural physics of movement to guide the eye. By engineering a motion sequence along proprietary Energy Curves, we ensure the viewer's gaze never exits the frame, expanding brand dwell time by 340%.",
        description: "A cinematic motion sequence produced entirely through neural synthesis. This project explores fluid dynamics in a zero-gravity environment, creating an organic viscosity that challenges traditional physics.",
        promptArchitecture: "zero-gravity fluid dynamics, viscous chrome mercury emulsion, cinematic lighting, volumetric refraction, ultra-smooth laminar flow, anamorphic lens flare --ar 16:9 --style coldune_synapse --motion 6",
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
        theoryName: "Generative Realism Protocol",
        theory: "Focuses on the uncanny valley's absolute edge. By infusing intentional biological imperfections—subtle lens grain, diffused natural light, and organic depth of field—we bypass the artificial filter of the human brain, anchoring immediate authenticity.",
        description: "Merging synthetic architectural precision with organic textures, this AI-driven visual narrative explores the boundaries of digital dreaming. Each element was refined through multiple prompt iterations and structural overrides.",
        promptArchitecture: "monolithic raw concrete pavilion embedded in lush bio-synthetic moss garden, soft overcast dawn illumination, 35mm optical lens characteristics, photorealistic material decay, quiet luxury atmosphere --ar 4:5 --v 6.1",
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
        title: "Refractive Crystalline Matrix",
        series: "Synthetic Protocols",
        type: "image",
        file: "/work/ai content/IMG_5085.webp",
        category: "Optical Physics",
        theoryName: "Refractive Trust Theory",
        theory: "By calculating and visualizing complex multi-surface light refraction with physical accuracy, we subconsciously project technical mastery and flawless execution that viewers naturally ascribe to the brand's core capability.",
        description: "A high-fidelity neural exploration focusing on light dispersion through synthetic surfaces, creating a layered visual experience that mimics advanced crystal optics and high-purity prism dynamics.",
        promptArchitecture: "hyper-refractive crystal geometry, internal chromatic aberration, light caustics on black obsidian plinth, studio rim lighting, pristine macro clarity --ar 4:5 --v 6.1",
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
        theoryName: "Cognitive Curiosity Theory",
        theory: "The human mind recognises the geometric patterns as structurally coherent, yet the environment is clearly synthetic. This creates a state of perceptual tension that keeps viewers engaged 400% longer than traditional stock photography.",
        description: "A continued exploration into generative environmental design. This visual focuses on the intersection of architecture and nature, using neural networks to simulate light diffusion through impossible vaulted structures.",
        promptArchitecture: "vaulted brutalist archways intersecting with surreal desert landscape, twilight golden hour rays, geometric shadow play, ultra-wide 24mm architectural perspective --ar 16:9 --v 6.1",
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
        title: "Abstract Authority Plinth",
        series: "Neural Landscapes",
        type: "image",
        file: "/work/ai content/IMG_5058.webp",
        category: "Atmospheric Abstraction",
        theoryName: "Abstract Authority Theory",
        theory: "By encasing a sharp, immaculately defined monolith in chaotic atmospheric fog and particle noise, we dramatise the brand's clarity amidst market noise. A direct perceptual metaphor for authoritative market leadership.",
        description: "This piece experiments with atmospheric overlays in an AI pipeline. Fog and particle systems obey real atmospheric physics while the subject remains a crystalline abstraction of pure form.",
        promptArchitecture: "dark monolith pedestal floating in dense volumetric fog, low key cinematic spotlight, subtle particle suspension, ultra-deep blacks, museum installation aesthetics --ar 1:1 --v 6.1",
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
        title: "Non-Euclidean Sunpath",
        series: "Synthetic Protocols",
        type: "image",
        file: "/work/ai content/IMG_5060.webp",
        category: "Impossible Architecture",
        theoryName: "Impossible Intuition Theory",
        theory: "Creates visuals that the brain instinctively accepts as physically plausible despite their structural impossibility. This triggers Perceptual Dissonance, prompting the mind to resolve the visual paradox.",
        description: "Continuing the exploration of impossible architecture, this visual uses neural-weighted lighting to simulate sun paths through non-Euclidean voids. A study in prompt layering and structural override.",
        promptArchitecture: "non-euclidean architectural interior, curved concrete planes defying gravity, natural skylight casting impossible circular shadow, minimalist gallery atmosphere --ar 4:5 --v 6.1",
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
        title: "Tactile Memory Surface",
        series: "Synthetic Protocols",
        type: "image",
        file: "/work/ai content/IMG_5062.webp",
        category: "Tactile Materiality",
        theoryName: "Tactile Memory Anchoring",
        theory: "Simulates familiar, hyper-tangible physical sensations in an unfamiliar synthetic world, bypassing digital filters and creating an indelible brand memory that feels physically felt rather than just observed.",
        description: "A deep-field study in micro-texture, organic moss, and ancient stone within a synthetic frame. Engineered to bridge the cognitive divide between digital glass and tactile skin.",
        promptArchitecture: "extreme macro of weathered basalt stone intertwined with velvety alpine moss, morning dew droplets, shallow depth of field, tactile haptic realism --ar 4:5 --v 6.1",
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
        title: "Bipolar Contrast Monolith",
        series: "Synthetic Protocols",
        type: "image",
        file: "/work/ai content/IMG_5066.webp",
        category: "High-Contrast Lighting",
        theoryName: "Bipolar Contrast Logic",
        theory: "Maximising the dynamic spread between absolute black (#000000) and specular white creates an instinctual perception of scale, signaling monolithic stability and domain authority.",
        description: "A master study in extreme high-contrast environmental design. Neural prompt weighting retains crisp surface microstructure in both the deepest shadow and brightest specular highlights.",
        promptArchitecture: "stark brutalist silhouette against blinding white studio background, hard razor-sharp shadows, geometric purity, luxury editorial composition --ar 4:5 --v 6.1",
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
        title: "Holistic World Genesis",
        series: "Neural Landscapes",
        type: "image",
        file: "/work/ai content/IMG_5067.webp",
        category: "Worldbuilding",
        theoryName: "Brand Universe Theory",
        theory: "Instead of producing isolated graphics, we construct a cohesive fictional reality. Welcoming the viewer into an entire universe elevates perceived brand depth and intelligence by 300%.",
        description: "The culmination of the Neural Landscape series. Synthesises architectural logic, organic atmosphere, and cinematic grading into a singular high-fidelity world.",
        promptArchitecture: "vast futuristic sanctuary, seamless integration of natural stone and brushed dark titanium, soft ambient light filtering from above, cinematic scale --ar 16:9 --v 6.1",
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
        theoryName: "Silence of Authority",
        theory: "Leverages the psychological weight of what is omitted. By giving vast negative space to a solitary subject, we command focused attention and project unshakeable confidence.",
        description: "An architectural study in generative minimalism. Pushes the boundaries of what neural networks perceive as structure through negative space and clean edges.",
        promptArchitecture: "solitary geometric sculpture on seamless dark plane, sweeping negative space, minimalist exhibition aesthetic, directional key light --ar 4:5 --v 6.1",
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
        title: "Granular Micro-Structure",
        series: "Synthetic Protocols",
        type: "image",
        file: "/work/ai content/IMG_5089.webp",
        category: "Macro Texture",
        theoryName: "Granular Authority Theory",
        theory: "When a brand demonstrates microscopic precision at the granular level, observers intuitively assume equal mastery at the macro scale. A subtle yet powerful trust multiplier.",
        description: "Explores the micro-textures of digital manifestation, rendering pixel-perfect optical reflections, nano-scale surface fissures, and ultra-crisp material grains.",
        promptArchitecture: "macro texture of pulverized volcanic sand mixed with gold leaf flecks, shallow focus, cinematic studio lighting, haptic physical presence --ar 4:5 --v 6.1",
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
        title: "Atmospheric Kinetic Pulse",
        series: "Synthetic Protocols",
        type: "image",
        file: "/work/ai content/IMG_5091.webp",
        category: "Particle Systems",
        theoryName: "Kinetic Resonance Theory",
        theory: "Human perception is biologically primed to detect minute atmospheric changes as indicators of opportunity or momentum. Simulates the vital energy of a brand in motion.",
        description: "A study in atmospheric resonance. Generates neural-driven particle systems that create a palpable sense of movement and life within a single still frame.",
        promptArchitecture: "suspended micro-particulate vortex illuminated by faint emerald neon glow, cosmic depth, dark matter simulation, atmospheric diffusion --ar 4:5 --v 6.1",
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
        title: "Synthesised Visual Climax",
        series: "Synthetic Protocols",
        type: "image",
        file: "/work/ai content/IMG_5093.webp",
        category: "Generative Climax",
        theoryName: "Synthesis Mastery Protocol",
        theory: "Harmonising disparate digital elements—light, material, architecture, and atmospheric physics—into a cohesive whole demonstrates the studio's capacity to orchestrate high-order complexity.",
        description: "The culmination of the 900-series manifestos. Synthesises light, form, and texture into a definitive vision of an AI-first creative discipline.",
        promptArchitecture: "synthesis of monolithic stone, glowing liquid neon channels, and atmospheric haze, cinematic 8k masterpiece, transcendent luxury composition --ar 4:5 --v 6.1",
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
        name: "Zero-Gravity Flux",
        code: "PR-911",
        prompt: "zero-gravity fluid dynamics, viscous chrome mercury emulsion, cinematic lighting, volumetric refraction, ultra-smooth laminar flow, anamorphic lens flare --ar 16:9 --style coldune_synapse --motion 6",
        theory: "Dynamic Flow Triggers — Sustaining visual retention along proprietary energy arcs.",
        file: "/work/ai content/IMG_5079.MP4",
        type: "video" as const
    },
    {
        id: "monolith",
        name: "Biophilic Monolith",
        code: "NL-01",
        prompt: "monolithic raw concrete pavilion embedded in lush bio-synthetic moss garden, soft overcast dawn illumination, 35mm optical lens characteristics, photorealistic material decay, quiet luxury atmosphere --ar 4:5 --v 6.1",
        theory: "Generative Realism — Microscopic human imperfections that bypass the artificial filter.",
        file: "/work/ai content/IMG_5054.webp",
        type: "image" as const
    },
    {
        id: "refraction",
        name: "Optical Refraction",
        code: "PR-915",
        prompt: "hyper-refractive crystal geometry, internal chromatic aberration, light caustics on black obsidian plinth, studio rim lighting, pristine macro clarity --ar 4:5 --v 6.1",
        theory: "Refractive Trust — Light dispersion accuracy signaling infallible technical discipline.",
        file: "/work/ai content/IMG_5085.webp",
        type: "image" as const
    },
    {
        id: "non-euclidean",
        name: "Non-Euclidean Space",
        code: "PR-909",
        prompt: "non-euclidean architectural interior, curved concrete planes defying gravity, natural skylight casting impossible circular shadow, minimalist gallery atmosphere --ar 4:5 --v 6.1",
        theory: "Impossible Intuition — Engaging cognitive curiosity through structural paradox.",
        file: "/work/ai content/IMG_5060.webp",
        type: "image" as const
    }
];

export default function AIContentShowcase({ projects }: { projects?: Project[] }) {
    const [selectedSeries, setSelectedSeries] = useState<string>("ALL");
    const [viewMode, setViewMode] = useState<"bento" | "editorial">("bento");
    const [activeInspector, setActiveInspector] = useState<AIArtifact | null>(null);
    const [copiedPrompt, setCopiedPrompt] = useState(false);
    const [activeTerminalPreset, setActiveTerminalPreset] = useState(TERMINAL_PRESETS[0]);
    const [featuredPlaying, setFeaturedPlaying] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Keyboard navigation for inspector
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
        <main className="min-h-screen bg-[#000000] text-white selection:bg-[#3CFF8F] selection:text-black font-sans relative overflow-x-hidden">
            {/* Ambient Cyber Grid & Glow */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div 
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage: "linear-gradient(to right, rgba(60,255,143,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(60,255,143,0.15) 1px, transparent 1px)",
                        backgroundSize: "60px 60px"
                    }}
                />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#3CFF8F]/[0.03] blur-[150px] rounded-full" />
                <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-[#3CFF8F]/[0.02] blur-[180px] rounded-full" />
            </div>

            {/* Persistent Top Sub-Navigation (Fixed at top-20 md:top-24 so it never overlaps the main Coldune logo/nav) */}
            <header className="fixed top-20 md:top-24 left-0 right-0 z-[90] px-4 md:px-8 pointer-events-none">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 bg-black/80 backdrop-blur-2xl border border-white/10 px-4 md:px-6 py-2.5 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.8)] pointer-events-auto">
                    {/* Left: Return button */}
                    <Link
                        href="/#spectrum"
                        className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                    >
                        <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#3CFF8F]/50 group-hover:scale-105 transition-all">
                            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform text-[#3CFF8F]" />
                        </div>
                        <span className="text-[10px] md:text-[11px] font-universo font-black uppercase tracking-wider hidden sm:inline">
                            All Work
                        </span>
                    </Link>

                    {/* Center: Series Filter Pills */}
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                        {[
                            { key: "ALL", label: "All Protocols", count: AI_COLLECTION.length },
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
                                        : "text-white/60 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                <span>{tab.label}</span>
                                <span className={`text-[9px] px-1 rounded-full ${
                                    selectedSeries === tab.key ? "bg-black/20 text-black font-mono" : "bg-white/10 text-white/40"
                                }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Right: View Mode Toggle & Telemetry status */}
                    <div className="flex items-center gap-2">
                        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-mono text-[#3CFF8F]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3CFF8F] animate-pulse" />
                            <span>LATENT v4.8 ONLINE</span>
                        </div>

                        <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-0.5">
                            <button
                                onClick={() => setViewMode("bento")}
                                title="Bento Matrix"
                                className={`p-1.5 rounded-full transition-all ${
                                    viewMode === "bento" ? "bg-[#3CFF8F] text-black" : "text-white/60 hover:text-white"
                                }`}
                            >
                                <Grid size={13} />
                            </button>
                            <button
                                onClick={() => setViewMode("editorial")}
                                title="Cognitive Blueprint Stream"
                                className={`p-1.5 rounded-full transition-all ${
                                    viewMode === "editorial" ? "bg-[#3CFF8F] text-black" : "text-white/60 hover:text-white"
                                }`}
                            >
                                <List size={13} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 md:px-8 pt-44 md:pt-52 pb-20 overflow-hidden">
                {/* Looping Hero Background Video with Scanlines and Radial Gradient */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <video
                        src="/work/ai content/IMG_5079.MP4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover opacity-35 filter contrast-125 saturate-50 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-[#000000]" />
                    <div 
                        className="absolute inset-0 opacity-[0.08]"
                        style={{
                            backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 4px)"
                        }}
                    />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto text-center space-y-6">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-[#3CFF8F]/30 backdrop-blur-md shadow-[0_0_20px_rgba(60,255,143,0.15)]"
                    >
                        <Sparkles size={13} className="text-[#3CFF8F] animate-spin" style={{ animationDuration: "6s" }} />
                        <span className="text-[10px] md:text-[11px] font-universo uppercase tracking-widest text-white/90">
                            Coldune Synapse // Proprietary Generative Architecture
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3CFF8F] animate-ping" />
                    </motion.div>

                    {/* Coldune Studio Signature Typography Duo */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.1 }}
                        className="relative"
                    >
                        <h1 className="text-[13vw] md:text-[8rem] lg:text-[10.5rem] font-universo font-black uppercase leading-[0.82] tracking-tight text-white select-none">
                            SYNTHETIC
                            <br />
                            <span className="relative inline-block mt-2">
                                <span className="font-universo font-black uppercase text-white">DREAMS</span>
                                <span 
                                    className="block md:inline font-siestha normal-case text-[#3CFF8F] text-[15vw] md:text-[8rem] lg:text-[10rem] -rotate-[6deg] md:ml-6 align-middle"
                                    style={{ textShadow: "0 4px 35px rgba(60,255,143,0.45)" }}
                                >
                                    &amp; Perception
                                </span>
                            </span>
                        </h1>
                    </motion.div>

                    {/* Editorial Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="max-w-2xl mx-auto text-base md:text-xl text-white/70 font-light leading-relaxed pt-4"
                    >
                        Where deep neural learning meets boundary-pushing luxury. We don&apos;t produce generic AI outputs—we architect proprietary visual universes, tactile micro-physics, and subconscious perceptual triggers for tier-one brands.
                    </motion.p>

                    {/* Live Cybernetic Telemetry Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.3 }}
                        className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left"
                    >
                        {[
                            { code: "01. ENGINE", label: "Coldune Synapse v4.8", stat: "Active" },
                            { code: "02. RESOLUTION", label: "Native Generative", stat: "8K UHD" },
                            { code: "03. RETENTION", label: "Cognitive Dwell Time", stat: "+400%" },
                            { code: "04. PROTOCOLS", label: "Engineered Artifacts", stat: "13 Works" }
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md"
                            >
                                <span className="text-[9px] font-mono text-white/40 block mb-1">{stat.code}</span>
                                <div className="text-[11px] font-universo font-black uppercase text-white/90">{stat.label}</div>
                                <div className="text-sm font-universo font-black text-[#3CFF8F] mt-0.5">{stat.stat}</div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Down Indicator */}
                    <div className="pt-10 flex flex-col items-center">
                        <ChevronDown size={28} className="text-[#3CFF8F] animate-bounce" />
                    </div>
                </div>
            </section>

            {/* FEATURED MOTION SPOTLIGHT: PROTOCOL 911 */}
            <section className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-mono text-[#3CFF8F] uppercase tracking-widest mb-2">
                            <span className="w-2 h-2 rounded-full bg-[#3CFF8F] animate-ping" />
                            Featured Masterwork // PR-911
                        </div>
                        <h2 className="text-3xl md:text-5xl font-universo font-black uppercase tracking-tight text-white">
                            Zero-Gravity <span className="font-siestha normal-case text-[#3CFF8F] text-4xl md:text-6xl -rotate-[5deg] inline-block ml-2">Kinetic Flux</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleFeaturedVideo}
                            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-universo uppercase tracking-wider text-white flex items-center gap-2 transition-all cursor-pointer"
                        >
                            {featuredPlaying ? <Pause size={14} className="text-[#3CFF8F]" /> : <Play size={14} className="text-[#3CFF8F]" />}
                            <span>{featuredPlaying ? "Pause Motion" : "Play Motion"}</span>
                        </button>
                        <button
                            onClick={() => setActiveInspector(AI_COLLECTION[0])}
                            className="px-4 py-2 rounded-full bg-[#3CFF8F] text-black text-xs font-universo font-black uppercase tracking-wider flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(60,255,143,0.5)] cursor-pointer"
                        >
                            <Maximize2 size={14} />
                            <span>Inspect Blueprint</span>
                        </button>
                    </div>
                </div>

                <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-black shadow-[0_30px_100px_rgba(0,0,0,0.9)] aspect-[16/9] md:aspect-[21/9]">
                    <video
                        ref={videoRef}
                        src="/work/ai content/IMG_5079.MP4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlay for bottom text HUD */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

                    {/* Top HUD Badges */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-center pointer-events-none">
                        <span className="px-3 py-1 rounded-full bg-black/60 border border-white/15 text-[10px] font-mono text-[#3CFF8F] backdrop-blur-md">
                            4K NEURAL FLUID DYNAMICS // 60 FPS
                        </span>
                        <span className="px-3 py-1 rounded-full bg-black/60 border border-white/15 text-[10px] font-mono text-white/70 backdrop-blur-md">
                            ENERGY CURVE: 0.94
                        </span>
                    </div>

                    {/* Bottom HUD Metadata */}
                    <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-none">
                        <div className="max-w-2xl">
                            <span className="text-[10px] font-mono text-[#3CFF8F] uppercase tracking-widest block mb-1">
                                Perceptual Theory: Dynamic Flow Triggers
                            </span>
                            <p className="text-xs md:text-sm text-white/80 leading-relaxed font-light backdrop-blur-sm bg-black/30 p-3 rounded-xl border border-white/10">
                                Engineering movement physics along proprietary energy arcs prevents saccadic gaze escape, achieving an unprecedented <strong className="text-[#3CFF8F] font-bold">+340% increase in brand dwell time</strong> compared to standard video content.
                            </p>
                        </div>
                        <div className="hidden md:flex items-center gap-2 bg-black/70 border border-white/10 rounded-2xl p-3 backdrop-blur-md">
                            <div>
                                <span className="text-[9px] font-mono text-white/40 block">SAMPLER</span>
                                <span className="text-xs font-mono font-bold text-white">Euler Ancestral</span>
                            </div>
                            <div className="w-px h-8 bg-white/10 mx-2" />
                            <div>
                                <span className="text-[9px] font-mono text-white/40 block">CFG SCALE</span>
                                <span className="text-xs font-mono font-bold text-[#3CFF8F]">8.5</span>
                            </div>
                            <div className="w-px h-8 bg-white/10 mx-2" />
                            <div>
                                <span className="text-[9px] font-mono text-white/40 block">STEPS</span>
                                <span className="text-xs font-mono font-bold text-white">60</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN COLLECTION SECTION */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-mono text-white/50 uppercase tracking-widest mb-2">
                            <Layers size={12} className="text-[#3CFF8F]" />
                            Curated Synthetic Archive ({filteredArtifacts.length})
                        </div>
                        <h2 className="text-3xl md:text-6xl font-universo font-black uppercase tracking-tight text-white">
                            THE NEURAL <span className="font-siestha normal-case text-[#3CFF8F] text-4xl md:text-7xl -rotate-[6deg] inline-block ml-2">Protocols</span>
                        </h2>
                    </div>

                    <p className="text-xs md:text-sm text-white/60 max-w-md font-light">
                        Click on any artifact to reveal its latent prompt architecture, mathematical tensor metrics, and cognitive resonance theory.
                    </p>
                </div>

                {/* VIEW MODE A: BENTO MATRIX */}
                {viewMode === "bento" && (
                    <motion.div
                        layout
                        className="grid grid-cols-12 gap-3 md:gap-4"
                    >
                        <AnimatePresence>
                            {filteredArtifacts.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.6, delay: (idx % 6) * 0.05 }}
                                    onClick={() => setActiveInspector(item)}
                                    className={`${item.spanClass} group relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#0A0A0A] border border-white/10 hover:border-[#3CFF8F]/60 transition-all duration-500 cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_60px_rgba(60,255,143,0.15)] flex flex-col justify-end`}
                                >
                                    {/* Media Rendering */}
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

                                    {/* Vignette / Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                    {/* Top Telemetry Pills */}
                                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                                        <span className="px-3 py-1 rounded-full bg-black/70 border border-white/15 text-[9px] font-mono font-bold text-[#3CFF8F] backdrop-blur-md">
                                            {item.protocolCode}
                                        </span>
                                        <span className="px-2.5 py-1 rounded-full bg-black/70 border border-white/15 text-[9px] font-mono text-white/70 backdrop-blur-md group-hover:border-[#3CFF8F]/50 transition-colors">
                                            {item.category}
                                        </span>
                                    </div>

                                    {/* Bottom Content Card */}
                                    <div className="relative z-20 p-5 md:p-6 space-y-2 pointer-events-none">
                                        <div className="text-[10px] font-mono text-[#3CFF8F] flex items-center gap-1.5 opacity-90">
                                            <span>{item.theoryName}</span>
                                            <span className="text-white/40">•</span>
                                            <span className="text-white/60">{item.tensorMetrics.dwellMultiplier} Dwell</span>
                                        </div>

                                        <h3 className="text-xl md:text-2xl font-universo font-black uppercase text-white tracking-tight leading-tight group-hover:text-[#3CFF8F] transition-colors">
                                            {item.title}
                                        </h3>

                                        <p className="text-xs text-white/70 line-clamp-2 font-light leading-relaxed">
                                            {item.theory}
                                        </p>

                                        {/* Hover Quick Action */}
                                        <div className="pt-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="text-[10px] font-universo uppercase text-white flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
                                                <Maximize2 size={11} className="text-[#3CFF8F]" />
                                                Inspect Tensor Directives
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* VIEW MODE B: COGNITIVE BLUEPRINT (EDITORIAL STREAM) */}
                {viewMode === "editorial" && (
                    <div className="space-y-16 md:space-y-28">
                        {filteredArtifacts.map((item, idx) => (
                            <motion.article
                                key={item.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center p-6 md:p-10 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#3CFF8F]/30 transition-all"
                            >
                                {/* Media Column */}
                                <div 
                                    onClick={() => setActiveInspector(item)}
                                    className="lg:col-span-7 relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[16/10] bg-black border border-white/10 group cursor-pointer shadow-2xl"
                                >
                                    {item.type === "video" ? (
                                        <video
                                            src={item.file}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <Image
                                            src={item.file}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                        <span className="px-4 py-2 rounded-full bg-[#3CFF8F] text-black font-universo font-black text-xs uppercase flex items-center gap-2 shadow-xl">
                                            <Maximize2 size={13} /> Open Fullscreen Inspector
                                        </span>
                                    </div>
                                </div>

                                {/* Information / Theory Column */}
                                <div className="lg:col-span-5 space-y-6">
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 rounded-full bg-[#3CFF8F]/10 border border-[#3CFF8F]/30 text-[10px] font-mono font-bold text-[#3CFF8F]">
                                            {item.protocolCode}
                                        </span>
                                        <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest">
                                            {item.series}
                                        </span>
                                    </div>

                                    <h3 className="text-3xl md:text-4xl font-universo font-black uppercase text-white tracking-tight leading-none">
                                        {item.title}
                                    </h3>

                                    {/* Theory Callout Box */}
                                    <div className="p-5 rounded-2xl bg-white/[0.03] border-l-2 border-l-[#3CFF8F] border-y border-r border-white/5 space-y-2">
                                        <div className="text-[10px] font-mono text-[#3CFF8F] uppercase tracking-widest flex items-center gap-1.5">
                                            <Cpu size={12} />
                                            <span>Perceptual Theory // {item.theoryName}</span>
                                        </div>
                                        <p className="text-xs md:text-sm text-white/90 leading-relaxed font-light">
                                            &ldquo;{item.theory}&rdquo;
                                        </p>
                                    </div>

                                    {/* Narrative Description */}
                                    <p className="text-xs md:text-sm text-white/70 leading-relaxed font-light">
                                        {item.description}
                                    </p>

                                    {/* Prompt Architecture Block */}
                                    <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2">
                                        <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
                                            <span className="flex items-center gap-1"><Terminal size={11} className="text-[#3CFF8F]" /> PROMPT DIRECTIVE</span>
                                            <button
                                                onClick={() => handleCopyPrompt(item.promptArchitecture)}
                                                className="hover:text-[#3CFF8F] transition-colors cursor-pointer flex items-center gap-1"
                                            >
                                                {copiedPrompt ? <Check size={11} className="text-[#3CFF8F]" /> : <Copy size={11} />}
                                                <span>{copiedPrompt ? "Copied" : "Copy"}</span>
                                            </button>
                                        </div>
                                        <p className="text-[11px] font-mono text-white/80 line-clamp-2 leading-relaxed">
                                            {item.promptArchitecture}
                                        </p>
                                    </div>

                                    {/* Technical Metrics Strip */}
                                    <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] font-mono border-t border-white/10">
                                        <div>
                                            <span className="text-white/40 block">SAMPLER</span>
                                            <span className="text-white font-bold">{item.tensorMetrics.sampler}</span>
                                        </div>
                                        <div>
                                            <span className="text-white/40 block">CFG / STEPS</span>
                                            <span className="text-[#3CFF8F] font-bold">{item.tensorMetrics.cfg} / {item.tensorMetrics.steps}</span>
                                        </div>
                                        <div>
                                            <span className="text-white/40 block">RETENTION</span>
                                            <span className="text-[#3CFF8F] font-bold">{item.tensorMetrics.dwellMultiplier}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </section>

            {/* INTERACTIVE FEATURE: COLDUNE SYNAPSE PROMPT TERMINAL */}
            <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
                <div className="p-8 md:p-14 rounded-3xl bg-gradient-to-b from-[#0c0e12] to-[#050608] border border-white/15 shadow-[0_40px_120px_rgba(0,0,0,0.9)] space-y-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 text-[10px] font-mono text-[#3CFF8F] uppercase tracking-widest mb-2">
                                <Terminal size={13} />
                                Interactive Neural Sandbox
                            </div>
                            <h2 className="text-3xl md:text-5xl font-universo font-black uppercase text-white tracking-tight">
                                SYNAPSE <span className="font-siestha normal-case text-[#3CFF8F] text-4xl md:text-6xl -rotate-[5deg] inline-block ml-2">Terminal</span>
                            </h2>
                            <p className="text-xs md:text-sm text-white/60 font-light mt-2 max-w-xl">
                                Select a creative directive below to inspect how Coldune synthesises natural-language prompts into high-order visual architecture.
                            </p>
                        </div>

                        {/* Presets Switcher */}
                        <div className="flex flex-wrap gap-2">
                            {TERMINAL_PRESETS.map(preset => (
                                <button
                                    key={preset.id}
                                    onClick={() => setActiveTerminalPreset(preset)}
                                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-universo uppercase tracking-wider transition-all cursor-pointer ${
                                        activeTerminalPreset.id === preset.id
                                            ? "bg-[#3CFF8F] text-black font-black shadow-[0_0_15px_rgba(60,255,143,0.4)]"
                                            : "bg-white/5 hover:bg-white/10 text-white/70 border border-white/10"
                                    }`}
                                >
                                    {preset.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Terminal Window Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        {/* Terminal Code Screen */}
                        <div className="lg:col-span-7 bg-[#050505] rounded-2xl border border-white/15 p-6 space-y-4 font-mono text-xs shadow-inner">
                            {/* Window Header */}
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                    <span className="text-[10px] text-white/40 ml-2">coldune-synapse-v4.8 --session #{activeTerminalPreset.code}</span>
                                </div>
                                <span className="text-[9px] text-[#3CFF8F]">TENSOR_OK</span>
                            </div>

                            {/* Prompt Code Display */}
                            <div className="space-y-3 pt-2">
                                <div>
                                    <span className="text-white/40 block">// Creative Directive Input:</span>
                                    <p className="text-[#3CFF8F] font-bold text-sm">{activeTerminalPreset.name}</p>
                                </div>

                                <div>
                                    <span className="text-white/40 block">// Synthesised Neural Prompt:</span>
                                    <p className="text-white/90 leading-relaxed bg-white/[0.02] p-3 rounded-lg border border-white/5">
                                        &ldquo;{activeTerminalPreset.prompt}&rdquo;
                                    </p>
                                </div>

                                <div>
                                    <span className="text-white/40 block">// Cognitive Resonance Logic:</span>
                                    <p className="text-white/70 italic text-[11px]">
                                        {activeTerminalPreset.theory}
                                    </p>
                                </div>
                            </div>

                            {/* Execution Status */}
                            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-white/40">
                                <span className="flex items-center gap-1.5 text-[#3CFF8F]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#3CFF8F] animate-ping" />
                                    PIPELINE LATENCY: 14ms
                                </span>
                                <button
                                    onClick={() => handleCopyPrompt(activeTerminalPreset.prompt)}
                                    className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                                >
                                    {copiedPrompt ? <Check size={11} className="text-[#3CFF8F]" /> : <Copy size={11} />}
                                    <span>{copiedPrompt ? "Copied Prompt" : "Copy Prompt Directive"}</span>
                                </button>
                            </div>
                        </div>

                        {/* Real-time Render Result Preview */}
                        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] bg-black border border-white/15 shadow-2xl">
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
                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 border border-white/15 text-[9px] font-mono text-[#3CFF8F] backdrop-blur-md">
                                LIVE SYNTHESIS PREVIEW
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMMISSION & CONVERSION CTA */}
            <section className="py-28 md:py-44 px-4 text-center relative z-10 border-t border-white/10 overflow-hidden">
                <div className="max-w-4xl mx-auto space-y-8 relative">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-universo uppercase tracking-widest text-[#3CFF8F]">
                        <Sparkles size={12} /> Bespoke Generative Commission
                    </div>

                    <h2 className="text-4xl md:text-7xl lg:text-8xl font-universo font-black uppercase tracking-tight text-white leading-none">
                        READY TO SCALE WITH
                        <br />
                        <span 
                            className="font-siestha normal-case text-[#3CFF8F] text-6xl md:text-8xl lg:text-9xl -rotate-[5deg] inline-block mt-4"
                            style={{ textShadow: "0 4px 30px rgba(60,255,143,0.5)" }}
                        >
                            Synthetic Visuals?
                        </span>
                    </h2>

                    <p className="max-w-xl mx-auto text-sm md:text-lg text-white/70 font-light leading-relaxed">
                        From campaign master visuals to entire generative product worlds, Coldune Studio engineers visual authority that leaves conventional stock assets obsolete.
                    </p>

                    <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/#contact"
                            className="px-8 py-4 rounded-full bg-[#3CFF8F] text-black font-universo font-black text-xs md:text-sm uppercase tracking-wider hover:shadow-[0_0_30px_rgba(60,255,143,0.6)] hover:scale-105 transition-all flex items-center gap-3"
                        >
                            <span>Initiate AI Commission</span>
                            <ArrowRight size={16} />
                        </Link>
                        <Link
                            href="/work/branding/"
                            className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-universo font-black text-xs md:text-sm uppercase tracking-wider transition-all"
                        >
                            Explore Brand Systems
                        </Link>
                    </div>
                </div>
            </section>

            {/* FULLSCREEN NEURAL INSPECTOR MODAL */}
            <AnimatePresence>
                {activeInspector && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 md:p-6">
                        {/* Blur Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveInspector(null)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                        />

                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.94, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.94, opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="relative z-10 w-full max-w-7xl max-h-[92vh] bg-[#0A0D10] border border-white/15 rounded-3xl overflow-hidden shadow-[0_50px_150px_rgba(0,0,0,0.95)] flex flex-col lg:flex-row"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setActiveInspector(null)}
                                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white hover:text-[#3CFF8F] hover:scale-105 transition-all flex items-center justify-center cursor-pointer shadow-xl backdrop-blur-md"
                            >
                                <X size={18} />
                            </button>

                            {/* Left: Media Canvas */}
                            <div className="lg:w-7/12 relative bg-black flex items-center justify-center min-h-[40vh] lg:min-h-[75vh] overflow-hidden">
                                {activeInspector.type === "video" ? (
                                    <video
                                        src={activeInspector.file}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        controls
                                        className="w-full h-full max-h-[85vh] object-contain"
                                    />
                                ) : (
                                    <div className="relative w-full h-full min-h-[45vh] lg:min-h-[75vh]">
                                        <Image
                                            src={activeInspector.file}
                                            alt={activeInspector.title}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                )}

                                {/* Protocol Overlay Badge */}
                                <div className="absolute bottom-4 left-4 pointer-events-none">
                                    <span className="px-3 py-1.5 rounded-full bg-black/80 border border-white/15 text-[10px] font-mono text-[#3CFF8F] backdrop-blur-md">
                                        {activeInspector.protocolCode} // {activeInspector.category}
                                    </span>
                                </div>
                            </div>

                            {/* Right: Technical Telemetry Drawer */}
                            <div className="lg:w-5/12 p-6 md:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 overflow-y-auto max-h-[85vh] space-y-6">
                                <div className="space-y-6">
                                    {/* Header */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[10px] font-mono text-[#3CFF8F] uppercase tracking-widest">
                                                {activeInspector.series}
                                            </span>
                                            <span className="text-white/30">•</span>
                                            <span className="text-[10px] font-mono text-white/50">
                                                Seed: {activeInspector.tensorMetrics.seed}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-universo font-black uppercase text-white leading-tight">
                                            {activeInspector.title}
                                        </h3>
                                    </div>

                                    {/* Theory Callout */}
                                    <div className="p-4 rounded-2xl bg-white/[0.03] border-l-2 border-l-[#3CFF8F] border-y border-r border-white/5 space-y-1.5">
                                        <div className="text-[10px] font-mono text-[#3CFF8F] uppercase tracking-widest flex items-center gap-1.5">
                                            <Cpu size={12} />
                                            <span>Perceptual Theory // {activeInspector.theoryName}</span>
                                        </div>
                                        <p className="text-xs text-white/90 leading-relaxed font-light">
                                            &ldquo;{activeInspector.theory}&rdquo;
                                        </p>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Architecture Breakdown</span>
                                        <p className="text-xs text-white/70 leading-relaxed font-light">
                                            {activeInspector.description}
                                        </p>
                                    </div>

                                    {/* Prompt Directive */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
                                            <span className="flex items-center gap-1"><Terminal size={11} className="text-[#3CFF8F]" /> PROMPT DIRECTIVE</span>
                                            <button
                                                onClick={() => handleCopyPrompt(activeInspector.promptArchitecture)}
                                                className="hover:text-[#3CFF8F] transition-colors cursor-pointer flex items-center gap-1 text-[10px]"
                                            >
                                                {copiedPrompt ? <Check size={11} className="text-[#3CFF8F]" /> : <Copy size={11} />}
                                                <span>{copiedPrompt ? "Copied" : "Copy Directive"}</span>
                                            </button>
                                        </div>
                                        <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 text-[11px] font-mono text-white/80 leading-relaxed max-h-32 overflow-y-auto">
                                            {activeInspector.promptArchitecture}
                                        </div>
                                    </div>

                                    {/* Tensor Metrics Grid */}
                                    <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-[10px] font-mono">
                                        <div>
                                            <span className="text-white/40 block">SAMPLER</span>
                                            <span className="text-white font-bold">{activeInspector.tensorMetrics.sampler}</span>
                                        </div>
                                        <div>
                                            <span className="text-white/40 block">CFG SCALE</span>
                                            <span className="text-[#3CFF8F] font-bold">{activeInspector.tensorMetrics.cfg}</span>
                                        </div>
                                        <div>
                                            <span className="text-white/40 block">STEPS</span>
                                            <span className="text-white font-bold">{activeInspector.tensorMetrics.steps}</span>
                                        </div>
                                        <div>
                                            <span className="text-white/40 block">ASPECT</span>
                                            <span className="text-white font-bold">{activeInspector.tensorMetrics.aspectRatio}</span>
                                        </div>
                                        <div>
                                            <span className="text-white/40 block">DWELL MULTIPLIER</span>
                                            <span className="text-[#3CFF8F] font-bold">{activeInspector.tensorMetrics.dwellMultiplier}</span>
                                        </div>
                                        <div>
                                            <span className="text-white/40 block">ENGINE</span>
                                            <span className="text-white font-bold">Synapse v4.8</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Modal Footer Nav */}
                                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => {
                                                const currentIndex = AI_COLLECTION.findIndex(a => a.id === activeInspector.id);
                                                const prevIndex = (currentIndex - 1 + AI_COLLECTION.length) % AI_COLLECTION.length;
                                                setActiveInspector(AI_COLLECTION[prevIndex]);
                                            }}
                                            className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-universo uppercase text-white flex items-center gap-1.5 transition-all cursor-pointer"
                                        >
                                            <ArrowLeft size={12} /> Prev
                                        </button>
                                        <button
                                            onClick={() => {
                                                const currentIndex = AI_COLLECTION.findIndex(a => a.id === activeInspector.id);
                                                const nextIndex = (currentIndex + 1) % AI_COLLECTION.length;
                                                setActiveInspector(AI_COLLECTION[nextIndex]);
                                            }}
                                            className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-universo uppercase text-white flex items-center gap-1.5 transition-all cursor-pointer"
                                        >
                                            Next <ArrowRight size={12} />
                                        </button>
                                    </div>

                                    <Link
                                        href="/#contact"
                                        className="px-4 py-1.5 rounded-full bg-[#3CFF8F] text-black font-universo font-black text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(60,255,143,0.5)] transition-all"
                                    >
                                        Commission Style
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
