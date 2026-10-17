"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, X, Brain, Target, Zap, ChevronDown, Activity, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { workProjects, Project } from "@/data/work";
import { useState, useEffect } from "react";
import Image from "next/image";
import FeaturedWebsites from "./FeaturedWebsites";
import BrandingOrbitalShowcase from "./BrandingOrbitalShowcase";
import BrandDiagonalCascade from "./BrandDiagonalCascade";
import SelvareCaseStudy from "./SelvareCaseStudy";

const MediaCard = ({ item, onClick }: { item: Project, onClick?: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden cursor-pointer aspect-[4/5] bg-black"
            onClick={onClick}
        >
            <Image 
                src={(item.thumbnail ? (item.thumbnail.startsWith('/') ? item.thumbnail : `/work/${item.thumbnail}`) : `/work/${item.file}`)} 
                alt={item.title} 
                fill 
                className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" 
            />
            <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                <span className="text-accent text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.brand}
                </span>
            </div>
        </motion.div>
    );
};

const GridItem = ({ item, index }: { item: Project, index: number }) => {
    const isEven = index % 2 === 0;
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.1 }}
            className={`w-full relative group/media ${index % 3 === 1 ? 'md:mt-32' : index % 3 === 2 ? 'md:mt-16' : ''}`}
        >
            <div className="relative w-full overflow-hidden rounded-xl md:rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] transition-all duration-700 group-hover/media:scale-[1.03] group-hover/media:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] bg-black/20">
                {item.type === "video" ? (
                    <div className="w-full h-full">
                        <video src={`/work/${item.file}`} autoPlay muted loop playsInline preload="none" className="w-full h-full object-cover transition-all duration-1000" />
                    </div>
                ) : item.type === "youtube" ? (
                    <div className="w-full aspect-video transition-all duration-1000">
                        <iframe 
                            className="w-full h-full pointer-events-none scale-105"
                            src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${item.youtubeId}&controls=0`}
                            title={item.title}
                        />
                    </div>
                ) : (
                    <div className="w-full h-full">
                        <img 
                            src={`/work/${item.file}`} 
                            alt="Visual" 
                            loading="lazy" 
                            className="w-full h-full object-cover transition-all duration-1000" 
                        />
                    </div>
                )}
                
                {/* Simple Visit Overlay */}
                {item.link && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/media:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-all shadow-xl">
                            <ArrowRight size={20} />
                        </a>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const StorySection = ({ item, index }: { item: Project, index: number }) => {
    return (
        <section className="py-20 md:py-32 relative overflow-hidden group/section flex flex-col items-center">
            {/* Minimalist Background Accent */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[30vw] font-serif font-black italic text-accent/[0.02] select-none pointer-events-none leading-none z-0 tracking-tighter">
                0{index + 1}
            </div>

            <div className="w-full max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center">
                <motion.div 
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-10%" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full relative group/media"
                >
                    <div className="relative w-full flex flex-col items-center">
                        <div className="relative w-full overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] transition-all duration-1000 group-hover/media:scale-[1.02] group-hover/media:shadow-[0_80px_150px_-30px_rgba(0,0,0,0.9)]">
                            {item.type === "video" ? (
                                <div className="w-full h-auto">
                                    <video src={`/work/${item.file}`} autoPlay muted loop playsInline preload="none" className="w-full h-full object-contain transition-all duration-1000" />
                                </div>
                            ) : item.type === "youtube" ? (
                                <div className="w-full aspect-video transition-all duration-1000">
                                    <iframe 
                                        className="w-full h-full pointer-events-none scale-105"
                                        src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${item.youtubeId}&controls=0`}
                                        title={item.title}
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-auto">
                                    <img 
                                        src={`/work/${item.file}`} 
                                        alt="Visual" 
                                        loading="lazy" 
                                        className="w-full h-full object-contain transition-all duration-1000" 
                                    />
                                </div>
                            )}
                            
                            {/* Visit Overlay */}
                            {item.link && (
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/media:opacity-100 transition-all duration-700 flex items-center justify-center backdrop-blur-[8px]">
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="bg-white text-black px-12 py-5 rounded-full flex items-center gap-4 font-serif italic font-black text-xl hover:scale-110 transition-all shadow-2xl">
                                        Visit Project <ArrowRight size={20} />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default function CategoryWorkClient() {
    const params = useParams();
    const [mounted, setMounted] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const categorySlug = (params?.category as string) || "";
    const isAI = categorySlug === "ai-content";
    
    const filteredProjects = workProjects.filter(p => {
        if (!categorySlug) return false;
        const slug = categorySlug.toLowerCase();
        const pGroup = p.group?.toLowerCase().replace(" ", "-") || "";
        const pCat = p.category?.toLowerCase().replace(" ", "-") || "";
        
        return (
            pGroup === slug ||
            pCat === slug ||
            (slug === "websites" && (pGroup === "websites" || pCat === "websites")) ||
            (slug === "archive" || slug === "all")
        );
    });

    if (!mounted) return <div className="min-h-screen bg-black" />;

    if (categorySlug === "websites") {
        return <FeaturedWebsites projects={filteredProjects} />;
    }

    if (filteredProjects.length === 0) {
        return (
            <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-accent">
                <h2 className="text-4xl font-serif italic mb-4">No content here.</h2>
                <Link href="/#spectrum" className="text-accent underline">Return to Hub</Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#020202] text-accent selection:bg-[#3CFF8F] selection:text-black font-sans relative ">
            <div className="noise-overlay" />
            
            {/* Minimal Header */}
            <div className="fixed top-0 left-0 w-full z-[100] px-6 py-10 flex justify-between items-center pointer-events-none">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <Link href="/#spectrum" className="pointer-events-auto group flex items-center gap-4 bg-white/5 backdrop-blur-3xl border border-white/10 px-6 py-3 rounded-full text-accent hover:text-accent transition-all">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest italic">Return</span>
                    </Link>
                </motion.div>
                

            </div>

            {isAI ? (
                <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-6">
                    <div className="absolute inset-0 z-0 scale-110">
                        <video src="/work/ai content/IMG_5079.MP4" autoPlay muted loop playsInline preload="none" className="w-full h-full object-cover opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                    </div>
                    <motion.div className="relative z-10 text-center">

                        <h1 className="text-[12vw] font-serif font-black italic uppercase leading-[0.8] tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                            Synthetic <br /> Dreams.
                        </h1>
                        <ChevronDown size={30} className="mx-auto text-accent animate-bounce mt-10" />
                    </motion.div>
                </section>
            ) : categorySlug === "instagram-posts" ? (
                <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-6">
                    <div className="absolute inset-0 z-0">
                        <Image src="/work/posts/instagram-home.webp" alt="Hero" fill className="object-cover opacity-70" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
                    </div>
                    <motion.div className="relative z-10 text-center">

                        <h1 className="text-[9vw] font-serif font-black italic uppercase leading-[0.8] tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                            Instagram <br /> Posts.
                        </h1>
                        <ChevronDown size={30} className="mx-auto text-accent animate-bounce mt-10" />
                    </motion.div>
                </section>
            ) : categorySlug === "edits" ? (
                <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-6">
                    <div className="absolute inset-0 z-0 scale-105">
                        <video src="/work/videos/shoes.mov" autoPlay muted loop playsInline preload="none" className="w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
                    </div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-10 text-center"
                    >
                        <ChevronDown size={30} className="mx-auto text-accent animate-bounce mt-10" />
                    </motion.div>
                </section>
            ) : categorySlug === "ads" ? (
                <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-6">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[#030305]" />
                        <div className="absolute inset-0 opacity-10" 
                             style={{backgroundImage: 'radial-gradient(circle at 2px 2px, #3CFF8F 1px, transparent 0)', backgroundSize: '40px 40px'}} />
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                    </div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-10 text-center"
                    >
                        <h1 className="text-[12vw] font-serif font-black italic uppercase leading-[0.8] tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                            Ad <br /> Campaigns.
                        </h1>
                        <ChevronDown size={30} className="mx-auto text-accent animate-bounce mt-10" />
                    </motion.div>
                </section>
            ) : categorySlug === "strategic-growth" ? (
                <>
                    {/* 1. OPENING STATEMENT */}
                    <section className="min-h-[80vh] w-full flex flex-col items-center justify-center relative overflow-hidden px-6 pt-40 bg-[#030305]">
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <Image 
                                src="/work/growth/Urban professionals in vibrant settings.webp" 
                                alt="Strategic Analysis" 
                                fill 
                                className="object-cover opacity-20 filter grayscale"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#030305] via-transparent to-[#030305]" />
                        </div>
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                             style={{backgroundImage: 'radial-gradient(circle at 2px 2px, #3CFF8F 1px, transparent 0)', backgroundSize: '30px 30px'}} />
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-5xl text-center space-y-8 relative z-10"
                        >

                            <h1 className="text-[10vw] md:text-[7vw] font-serif font-black italic uppercase leading-[0.95] tracking-tighter text-accent py-4">
                                Data Before Design. <br /> <span className="text-accent">Growth Before Everything.</span>
                            </h1>
                            <p className="max-w-2xl mx-auto text-accent text-lg md:text-xl font-medium tracking-tight">
                                We donâ€™t rely on assumptions. Every decision is backed by performance metrics and measurable outcomes. We donâ€™t design; we scale.
                            </p>
                        </motion.div>
                        <ChevronDown size={30} className="mx-auto text-accent animate-pulse mt-24" />
                    </section>

                    {/* 2. MASTER PERFORMANCE DASHBOARD */}
                    <div className="py-24 bg-[#030305] border-y border-white/5">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="mb-20 text-left">

                                <h2 className="text-5xl font-serif italic font-black text-accent uppercase tracking-tighter">Growth Dashboard.</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
                                {[
                                    { label: "Revenue Delta", val: "â‚¹1.4Cr+", trend: "+290%" },
                                    { label: "Avg. Engagement", val: "10.2%", trend: "+812%" },
                                    { label: "Conversion Rate", val: "4.82%", trend: "+210%" },
                                    { label: "CPL Reduction", val: "-42%", trend: "Optimized" },
                                    { label: "ROI Multiplier", val: "14.8x", trend: "Peak" }
                                ].map((kpi, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-3xl"
                                    >
                                        <p className="text-[10px] font-serif italic font-black text-accent uppercase tracking-widest mb-4">{kpi.label}</p>
                                        <div className="text-3xl font-serif italic font-black text-accent mb-2">{kpi.val}</div>
                                        <div className="text-[10px] font-bold text-[#3CFF8F] bg-[#3CFF8F]/10 px-2 py-1 rounded inline-block">{kpi.trend}</div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Consolidated Growth Curve */}
                            <div className="p-10 border border-white/5 rounded-[3rem] bg-black/40 relative group overflow-hidden">
                                <div className="absolute top-0 right-0 p-10 opacity-[0.02] -rotate-12 pointer-events-none">
                                    <TrendingUp size={300} strokeWidth={1} />
                                </div>
                                <div className="flex justify-between items-start mb-12">
                                    <div>
                                        <h4 className="text-xl font-serif italic font-black uppercase text-accent tracking-widest leading-none mb-2">Omnichannel Velocity</h4>
                                        <p className="text-xs text-accent">Aggregated performance across Search, Social & Direct</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#3CFF8F]" /><span className="text-[9px] font-bold uppercase text-accent">Post-Optimize</span></div>
                                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-white/10" /><span className="text-[9px] font-bold uppercase text-accent">Baseline</span></div>
                                    </div>
                                </div>
                                <div className="h-64 w-full relative">
                                    <svg viewBox="0 0 1000 200" className="w-full h-full overflow-visible">
                                        {/* Baseline Path */}
                                        <motion.path 
                                            d="M 0 160 Q 250 155, 500 158 T 1000 155" 
                                            fill="none" 
                                            stroke="white" 
                                            strokeOpacity="0.1" 
                                            strokeWidth="2" 
                                            strokeDasharray="8 4"
                                        />
                                        {/* Growth Path */}
                                        <motion.path 
                                            d="M 0 160 Q 150 150, 300 100 T 600 50 T 1000 10" 
                                            fill="none" 
                                            stroke="#3CFF8F" 
                                            strokeWidth="4"
                                            initial={{ pathLength: 0 }}
                                            whileInView={{ pathLength: 1 }}
                                            transition={{ duration: 2.5, ease: "easeInOut" }}
                                            className="drop-shadow-[0_0_15px_rgba(60,255,143,0.4)]"
                                        />
                                        <circle cx="1000" cy="10" r="6" fill="#3CFF8F" className="animate-pulse" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. CASE STUDY INTEGRATION (HIGHLIGHTS) */}
                    <div className="py-40 bg-[#030305]">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {/* Arjun Fauzdaar Case */}
                                <div className="space-y-12">
                                    <div className="p-12 bg-white/[0.02] border border-white/5 rounded-[4rem] relative group overflow-hidden">
                                        <div className="absolute top-0 right-0 p-12 -mr-12 -mt-12 bg-[#3CFF8F]/10 blur-3xl rounded-full" />
                                        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <Image 
                                                src="/work/growth/Urban professionals in vibrant settings.webp" 
                                                alt="Arjun Fauzdaar" 
                                                fill 
                                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                            />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-12">
                                                <div>

                                                    <h3 className="text-4xl font-serif italic font-black text-accent">10x Engagement Surge</h3>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-4xl font-black text-accent tracking-tighter">7M+</span>
                                                    <p className="text-[9px] text-accent uppercase mt-1">Peak Reach</p>
                                                </div>
                                            </div>
                                            
                                            {/* Mini Conversion Graph */}
                                            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
                                                <div className="space-y-2">
                                                    <span className="text-[9px] font-black text-accent uppercase">Engagement</span>
                                                    <p className="text-xl font-serif italic text-accent font-black">+275%</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <span className="text-[9px] font-black text-accent uppercase">Lead Conv.</span>
                                                    <p className="text-xl font-serif italic text-accent font-black">3.2x</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <span className="text-[9px] font-black text-accent uppercase">CPA Delta</span>
                                                    <p className="text-xl font-serif italic text-[#3CFF8F] font-black">-42%</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bimbra 4x4 Case */}
                                <div className="space-y-12">
                                    <div className="p-12 bg-white/[0.02] border border-white/5 rounded-[4rem] relative group overflow-hidden">
                                        <div className="absolute top-0 right-0 p-12 -mr-12 -mt-12 bg-blue-500/10 blur-3xl rounded-full" />
                                        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <Image 
                                                src="/work/growth/Glazed lip oil collection in pink display.webp" 
                                                alt="Bimbra 4x4 Content" 
                                                fill 
                                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                            />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-12">
                                                <div>

                                                    <h3 className="text-4xl font-serif italic font-black text-accent">400% Perception Lift</h3>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-4xl font-black text-accent tracking-tighter">14.8x</span>
                                                    <p className="text-[9px] text-accent uppercase mt-1">Peak ROAS</p>
                                                </div>
                                            </div>
                                            
                                            {/* Mini ROI Graph */}
                                            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
                                                <div className="space-y-2">
                                                    <span className="text-[9px] font-black text-accent uppercase">Interaction</span>
                                                    <p className="text-xl font-serif italic text-accent font-black">+310%</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <span className="text-[9px] font-black text-accent uppercase">Conv. Rate</span>
                                                    <p className="text-xl font-serif italic text-accent font-black">+220%</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <span className="text-[9px] font-black text-accent uppercase">ROI Multi</span>
                                                    <p className="text-xl font-serif italic text-blue-400 font-black">4.1x</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. PERFORMANCE BREAKDOWN STEPS */}
                    <div className="py-40 bg-[#050505]">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="mb-24 text-center">

                                <h2 className="text-5xl font-serif italic font-black text-accent uppercase tracking-tighter">Performance Breakdown.</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                {[
                                    { step: "01", title: "Audience Analysis", items: ["Behavior tracking", "Interest mapping", "Content patterns"] },
                                    { step: "02", title: "Content Opt.", items: ["High-retention formats", "Hook engineering", "Visual physics"] },
                                    { step: "03", title: "Conv. Engineering", items: ["CTA placement", "Funnel restructuring", "Landing experience"] },
                                    { step: "04", title: "Scaling System", items: ["Performance tracking", "Iteration loops", "Data-based scaling"] }
                                ].map((s, i) => (
                                    <div key={i} className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] space-y-8">
                                        <div className="text-4xl font-serif italic font-black text-accent">{s.step}</div>
                                        <h4 className="text-2xl font-serif italic font-black text-accent leading-tight">{s.title}</h4>
                                        <ul className="space-y-4">
                                            {s.items.map((item, j) => (
                                                <li key={j} className="flex items-center gap-3">
                                                    <div className="w-1 h-1 rounded-full bg-[#3CFF8F]" />
                                                    <span className="text-xs text-accent uppercase tracking-widest font-bold">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 6. BEFORE VS AFTER TABLE */}
                    <div className="py-40 bg-[#030305] border-y border-white/5">
                        <div className="max-w-4xl mx-auto px-6">
                            <h3 className="text-2xl font-serif italic font-black uppercase text-center mb-20 tracking-widest text-accent">Optimization Matrix</h3>
                            <div className="w-full bg-white/[0.02] border border-white/10 rounded-[2.5rem] overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="border-b border-white/10 bg-white/5">
                                        <tr>
                                            <th className="p-8 text-[10px] font-black uppercase tracking-widest text-accent">Performance Metric</th>
                                            <th className="p-8 text-[10px] font-black uppercase tracking-widest text-accent">Before Protocol</th>
                                            <th className="p-8 text-[10px] font-black uppercase tracking-widest text-[#3CFF8F]">Post-Optimization</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-accent">
                                        {[
                                            { m: "Engagement Velocity", b: "Fragmented / Low", a: "Aggressive / Surge" },
                                            { m: "Lead Pipeline", b: "Unstable / Manual", a: "Consistent / Automated" },
                                            { m: "Conversion Efficiency", b: "Weak / Diluted", a: "Optimized / Targeted" },
                                            { m: "Acquisition Cost", b: "Inefficient / High", a: "Profitable / Reduced" }
                                        ].map((row, i) => (
                                            <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                                <td className="p-8 text-sm font-black uppercase italic tracking-tight">{row.m}</td>
                                                <td className="p-8 text-sm text-accent">{row.b}</td>
                                                <td className="p-8 text-sm font-black text-[#3CFF8F]">{row.a}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* 7. STRATEGIC INSIGHTS / CONSULTING */}
                    <div className="py-60 bg-black relative">
                        <div className="absolute inset-0 opacity-10 pointer-events-none" />
                        <div className="max-w-4xl mx-auto px-6 text-center space-y-32">
                            {[
                                "Most brands fail due to a lack of measurable systems.",
                                "Consistency + Data = Predictable Market Growth.",
                                "Creativity without performance is just expensive decoration."
                            ].map((quote, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    className="p-12 border-l border-white/5"
                                >
                                    <p className="text-3xl md:text-5xl font-serif italic text-accent font-medium leading-tight">
                                        â€œ{quote}â€
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* 8. FINAL STATEMENT */}
                    <div className="py-60 bg-[#030305] text-center px-6">
                        <motion.h3 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-[6vw] font-serif font-black italic uppercase leading-none text-accent mb-20 drop-shadow-3xl"
                        >
                            If itâ€™s not measurable, <br /> <span className="text-[#3CFF8F]">itâ€™s not scalable.</span>
                        </motion.h3>
                        <Link href="/#contact" className="inline-flex items-center gap-6 group">
                            <span className="text-2xl font-serif font-black italic text-accent tracking-tighter group-hover:text-[#3CFF8F] transition-colors">Work With Coldune Studio</span>
                            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#3CFF8F] transition-all group-hover:scale-110 shadow-xl bg-white/5">
                                <ArrowRight size={24} className="text-accent group-hover:text-[#3CFF8F] transition-colors" />
                            </div>
                        </Link>
                    </div>
                </>
            ) : categorySlug === "branding" ? (
                !selectedBrand ? (
                    <BrandDiagonalCascade onSelectBrand={(brandName) => setSelectedBrand(brandName)} />
                ) : selectedBrand === "Sélvaré" || selectedBrand === "Selvare" ? (
                    <SelvareCaseStudy 
                        onBack={() => setSelectedBrand(null)} 
                        onSelectBrand={(brand) => setSelectedBrand(brand)} 
                    />
                ) : selectedBrand === "Ixora" ? (
                    <BrandingOrbitalShowcase 
                        onBack={() => setSelectedBrand(null)} 
                        onSelectBrand={(brand) => setSelectedBrand(brand)} 
                        activeBrand="Ixora"
                    />
                ) : (
                <>
                    <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-6">
                        <div className="absolute inset-0 z-0 scale-105">
                            <Image 
                                src={
                                    selectedBrand === "Nexa" ? "/work/branding/nexa 2.webp" :
                                    selectedBrand === "Define" ? "/work/branding/define 1.webp" :
                                    selectedBrand === "The Verdant Court" ? "/work/branding/courts 1.webp" :
                                    "/work/branding/branding-hero-final.webp"
                                } 
                                alt="Hero" 
                                fill 
                                className="object-cover opacity-50" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
                        </div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative z-10 text-center"
                        >
                            {/* Brand switcher pills & Back Button */}
                            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
                                <button 
                                    onClick={() => setSelectedBrand(null)} 
                                    className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-[11px] font-universo font-black uppercase tracking-widest text-white flex items-center gap-2 cursor-pointer shadow-lg backdrop-blur-md"
                                >
                                    <ArrowLeft size={14} /> All Brands
                                </button>
                                <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 rounded-full p-1 backdrop-blur-md">
                                    {["Sélvaré", "Ixora", "Nexa", "Define", "The Verdant Court"].map(b => (
                                        <button
                                            key={b}
                                            onClick={() => setSelectedBrand(b)}
                                            className={`px-3.5 py-1.5 rounded-full text-[10px] font-universo uppercase tracking-wider transition-all cursor-pointer font-black ${
                                                b === selectedBrand
                                                    ? "bg-[#3CFF8F] text-black font-black shadow-[0_0_12px_rgba(60,255,143,0.5)]"
                                                    : "text-white/60 hover:text-white hover:bg-white/10"
                                            }`}
                                        >
                                            {b}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <h1 className="text-[12vw] md:text-[8vw] font-universo font-black uppercase leading-[0.82] tracking-tight mb-8 text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]">
                                {selectedBrand}
                            </h1>
                            <ChevronDown size={30} className="mx-auto text-accent animate-bounce mt-10" />
                        </motion.div>
                    </section>

                    <div className="pt-32 pb-32">
                        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row gap-0">
                            {/* Left Side: 5-Image Grid Pattern (Bento/Mosaic) */}
                            <div className="w-full grid grid-cols-2 md:grid-cols-12 gap-1 p-1 bg-white/5 overflow-hidden">
                                {filteredProjects.filter(p => {
                                    if (selectedBrand === "Nexa") return p.title.toLowerCase().includes("nexa");
                                    if (selectedBrand === "Define") return p.title.toLowerCase().includes("define");
                                    if (selectedBrand === "The Verdant Court") return p.title.toLowerCase().includes("court");
                                    if (selectedBrand === "Ixora") return p.title.toLowerCase().includes("ixora");
                                    if (selectedBrand === "Sélvaré" || selectedBrand === "Selvare") return p.title.toLowerCase().includes("selvare");
                                    return true;
                                }).map((p, idx) => {
                                    // Repeating pattern of 5
                                    const patternIdx = idx % 5;
                                    let spanClass = "md:col-span-6"; 
                                    
                                    if (patternIdx === 0) spanClass = "md:col-span-8 md:row-span-2 min-h-[400px]";
                                    else if (patternIdx === 1) spanClass = "md:col-span-4 md:row-span-1 min-h-[200px]";
                                    else if (patternIdx === 2) spanClass = "md:col-span-4 md:row-span-1 min-h-[200px]";
                                    else if (patternIdx === 3) spanClass = "md:col-span-5 md:row-span-2 min-h-[350px]";
                                    else if (patternIdx === 4) spanClass = "md:col-span-7 md:row-span-2 min-h-[350px]";

                                    return (
                                        <motion.div 
                                            key={p.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.8, delay: (idx % 5) * 0.1 }}
                                            className={`${spanClass} relative overflow-hidden group bg-black border border-white/5`}
                                        >
                                            {p.type === "video" ? (
                                                <video src={`/work/${p.file}`} autoPlay muted loop playsInline preload="none" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000" />
                                            ) : (
                                                <img src={`/work/${p.file}`} alt={p.title} loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000" />
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </>
                )
            ) : categorySlug === "websites" ? (
                <FeaturedWebsites projects={filteredProjects} />
            ) : (
                <section className="h-[60vh] w-full flex flex-col items-center justify-center relative overflow-hidden px-6">
                    <h1 className="text-7xl md:text-[10rem] font-serif font-black italic uppercase tracking-tighter text-accent capitalize">
                        {categorySlug.replace('-', ' ')}.
                    </h1>
                </section>
            )}

            {categorySlug !== "branding" && categorySlug !== "websites" && (
                <div className={`relative px-4 md:px-12 pb-60 ${
                    (categorySlug === "instagram-posts" || categorySlug === "social-media") 
                    ? "grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 items-start" 
                    : "flex flex-col items-center"
                }`}>
                    {filteredProjects.map((project, idx) => (
                        (categorySlug === "instagram-posts" || categorySlug === "social-media")
                        ? <GridItem key={project.id} item={project} index={idx} />
                        : <StorySection key={project.id} item={project} index={idx} />
                    ))}
                </div>
            )}

            {selectedProject && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/95" onClick={() => setSelectedProject(null)} />
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#0B0F14] border border-white/10 rounded-3xl overflow-hidden w-full max-w-6xl shadow-2xl relative z-10 max-h-[90vh]">
                        <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 z-[210] p-3 text-accent focus:outline-none hover:text-[#3CFF8F] transition-colors"><X size={24} /></button>
                        <div className="w-full h-full flex flex-col md:flex-row">
                            <div className="w-full md:w-2/3 h-[50vh] md:h-auto bg-black relative">
                                {selectedProject.type === "video" ? <video autoPlay preload="none" src={`/work/${selectedProject.file}`} className="w-full h-full object-contain" controls /> : <Image src={`/work/${selectedProject.file}`} alt="Visual" fill className="object-contain" />}
                            </div>
                            <div className="w-full md:w-1/3 p-10 bg-[#050505] border-l border-white/5 shadow-inner">
                                <h4 className="text-4xl font-serif italic font-black text-accent uppercase leading-none">{selectedProject.title}</h4>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </main>
    );
}

