"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, TrendingUp, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePerformance } from "@/hooks/usePerformance";
import RevealHeading from "../ui/RevealHeading";
import RevealText from "../ui/RevealText";

const arjunReels = [
    { id: 1, views: "7M", title: "Viral Storytelling", file: "reel-4.webp" },
    { id: 2, views: "2.7M", title: "Social Interaction", file: "reel-1.webp" },
    { id: 3, views: "1.6M", title: "Personal Narrative", file: "reel-5.webp" },
    { id: 4, views: "159K", title: "Creative Concept", file: "reel-2.webp" },
    { id: 5, views: "110K", title: "Daily Life", file: "reel-3.webp" },
];

const bimbraVisuals = [
    { id: 1, title: "Custom Front Grille", category: "Fabrication" },
    { id: 2, title: "Off-road Lighting", category: "Accessories" },
    { id: 3, title: "Interior Luxury", category: "Upholstery" },
    { id: 4, title: "Performance Suspension", category: "Engineering" },
];

export default function SelectedWork() {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const { isMobile } = usePerformance();
    const [videoVisible, setVideoVisible] = useState(false);

    // Lazy load video
    useEffect(() => {
        if (isMobile) return;
        const target = sectionRef.current;
        if (!target) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVideoVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "400px" }
        );
        observer.observe(target);
        return () => observer.disconnect();
    }, [isMobile]);

    // Play/pause video
    useEffect(() => {
        if (!videoRef.current) return;
        const video = videoRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(video);
        return () => observer.disconnect();
    }, [videoVisible]);

    return (
        <section id="selected-work" ref={sectionRef} className="relative w-full bg-[#030305] py-24 md:py-40 overflow-hidden">
            {/* Background Texture & Glows */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-accent/5 blur-[150px] rounded-full animate-pulse-slow" />
                <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[180px] rounded-full" />
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #ACC8A2 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <div className="flex flex-col mb-24 md:mb-32">
                    
                    <RevealHeading 
                        preset="B"
                        className="text-6xl md:text-9xl font-serif font-black text-accent italic tracking-tighter leading-none mb-8"
                    >
                        Selected Work
                    </RevealHeading>
                    
                    <RevealText 
                        delay={0.2}
                        className="max-w-2xl text-xl md:text-2xl text-accent font-light leading-relaxed italic border-l-2 border-accent/30 pl-8"
                    >
                        Real brands. Real performance. Real results. <br />
                    </RevealText>
                </div>

                {/* Case Study 1: Arjun Fauzdarr */}
                <div className="mb-40 md:mb-64">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 items-center">
                        {/* Left Side: Portrait */}
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="lg:col-span-5 relative group"
                        >
                            <div 
                                className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] border border-white/5 shadow-2xl"
                                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 40px 100%, 0 calc(100% - 40px))' }}
                            >
                                {isMobile ? (
                                    <Image
                                        src="/case-studies/arjun/reel-4.webp"
                                        alt="Arjun Fauzdarr"
                                        fill
                                        className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                ) : videoVisible ? (
                                    <video 
                                        ref={videoRef}
                                        muted 
                                        loop 
                                        playsInline
                                        preload="metadata"
                                        poster="/case-studies/arjun/reel-4.webp"
                                        className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                                    >
                                        <source src="/case-studies/arjun/arjun_video.mp4" type="video/mp4" />
                                    </video>
                                ) : (
                                    <div className="w-full h-full bg-surface" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent opacity-60" />
                                
                                {/* View Generation Badge */}
                                <div className="absolute bottom-10 left-10 right-10 flex flex-col gap-4">
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 }}
                                        className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 w-fit"
                                    >
                                        <TrendingUp size={16} className="text-accent" />
                                        <span className="text-accent font-serif italic text-sm tracking-wide font-bold">18M+ Views Generated</span>
                                    </motion.div>
                                    
                                    <RevealHeading preset="B" className="text-4xl md:text-5xl font-serif font-black text-accent italic tracking-tighter leading-[0.9]">
                                        {"Building a Brand\nPeople Can't Ignore"}
                                    </RevealHeading>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Side: Grid & Metrics */}
                        <div className="lg:col-span-7 space-y-12">
                            <div className="space-y-6">
                                <RevealText className="text-lg md:text-xl text-accent font-light max-w-xl leading-relaxed">
                                    We transformed raw content into a structured personal brand that consistently delivers multi-million view performance.
                                </RevealText>
                                
                                {/* Growth Block / Graph */}
                                <div className="p-8 md:p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl overflow-hidden relative group will-change-transform">
                                    
                                    <div className="flex flex-col gap-8">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-4xl md:text-5xl font-black text-accent tracking-tighter">10x Growth</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-accent text-glow text-2xl font-serif italic font-bold">7M+ Peak</p>
                                            </div>
                                        </div>

                                        {/* Simple SVG Graph */}
                                        <div className="relative h-24 md:h-32 w-full group-hover:opacity-100 transition-opacity">
                                            <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none" className="overflow-visible">
                                                <defs>
                                                    <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                        <stop offset="0%" stopColor="#ACC8A2" stopOpacity="0.2" />
                                                        <stop offset="100%" stopColor="#ACC8A2" stopOpacity="1" />
                                                    </linearGradient>
                                                </defs>
                                                <motion.path 
                                                    d="M 0 90 Q 50 85 100 80 T 200 60 T 300 20 T 400 5"
                                                    fill="none"
                                                    stroke="url(#curveGradient)"
                                                    strokeWidth="4"
                                                    strokeLinecap="round"
                                                    initial={{ pathLength: 0 }}
                                                    whileInView={{ pathLength: 1 }}
                                                    transition={{ duration: 2, ease: "easeInOut" }}
                                                    viewport={{ once: true }}
                                                    className="drop-shadow-[0_0_15px_rgba(172,200,162,0.8)]"
                                                />
                                                {/* Data Points Tooltips */}
                                                <motion.circle cx="100" cy="80" r="3" fill="#ACC8A2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} />
                                                <motion.circle cx="300" cy="20" r="3" fill="#ACC8A2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.5 }} />
                                                <motion.circle cx="400" cy="5" r="5" fill="#ACC8A2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2 }} />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Reels Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                                {arjunReels.map((reel, idx) => (
                                    <motion.div 
                                        key={reel.id}
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-white/5 group/reel cursor-pointer shadow-xl"
                                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 24px 100%, 0 calc(100% - 24px))' }}
                                    >
                                        <img 
                                            src={`/case-studies/arjun/${reel.file}`} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/reel:scale-110 opacity-80 group-hover/reel:opacity-100"
                                            alt={reel.title}
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/reel:opacity-100 transition-opacity" />
                                        
                                        <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-1">
                                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-accent/20 backdrop-blur-md border border-accent/30 w-fit">
                                                <Play size={8} className="fill-accent text-accent" />
                                                <span className="text-[9px] font-bold text-accent font-sans">{reel.views}</span>
                                            </div>
                                            <p className="text-[10px] text-accent font-medium line-clamp-1 opacity-0 group-hover/reel:opacity-100 transition-opacity">{reel.title}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Case Study 2: Bimbra 4x4 */}
                <div className="relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
                        {/* Text Content Block */}
                        <div className="lg:col-span-12 mb-12">
                            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                                <div className="max-w-2xl">
                                    <RevealHeading preset="B" className="text-4xl md:text-[6rem] font-serif font-black text-accent italic tracking-tighter leading-[0.85] mb-8">
                                        {"Engineering a Premium\nAutomotive Presence"}
                                    </RevealHeading>
                                    <RevealText delay={0.2} className="text-lg md:text-xl text-accent font-light leading-relaxed max-w-xl italic border-l-2 border-white/10 pl-8">
                                        We transformed product visuals into a high-impact digital experience that builds trust and drives perception.
                                    </RevealText>
                                </div>
                            </div>
                        </div>

                        {/* Full Width Cinematic Visual */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="lg:col-span-12 relative aspect-[21/9] md:aspect-[2.39/1] overflow-hidden rounded-[2.5rem] md:rounded-[4rem] border border-white/5 group shadow-2xl"
                            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 48px 100%, 0 calc(100% - 48px))' }}
                        >
                            <img 
                                src="/case-studies/bimbra/hero.webp" 
                                alt="Bimbra 4x4 Mahindra Thar" 
                                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 group-hover:rotate-1"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute inset-0 border-[20px] md:border-[40px] border-[#030305]/20 pointer-events-none" />
                            
                        </motion.div>

                        {/* Product Detail Grid */}
                        <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12">
                            {bimbraVisuals.map((item, idx) => (
                                <motion.div 
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.15 }}
                                    className="group/item"
                                >
                                    <div 
                                        className="aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/5 relative mb-6 shadow-xl"
                                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 32px 100%, 0 calc(100% - 32px))' }}
                                    >
                                        <img 
                                            src="/case-studies/bimbra/grid.webp" 
                                            alt={item.title} 
                                            className="w-full h-full object-cover grayscale opacity-60 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-700 group-hover/item:scale-110"
                                            style={{ objectPosition: `${(idx % 2) * 100}% ${(Math.floor(idx / 2)) * 100}%` }}
                                            loading="lazy"
                                        />
                                        <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                            <ArrowUpRight size={18} className="text-accent" />
                                        </div>
                                    </div>
                                    <div className="px-2">
                                        <p className="text-[10px] text-accent font-serif italic uppercase tracking-widest mb-1 font-bold">{item.category}</p>
                                        <h4 className="text-accent font-serif italic text-xl tracking-tight leading-tight group-hover/item:text-accent transition-colors">{item.title}</h4>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom CTA / Link */}
                <div className="mt-40 flex flex-col items-center gap-12">
                    <div className="w-[1px] h-24 bg-gradient-to-b from-accent/40 to-transparent" />
                    <Link href="/#spectrum" className="group flex flex-col items-center gap-4">
                        <div className="flex items-center gap-6">
                            <RevealHeading preset="B" className="text-2xl md:text-4xl font-serif font-black text-accent italic tracking-tighter group-hover:text-accent transition-colors">
                                View All Case Studies
                            </RevealHeading>
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent/40 transition-all group-hover:scale-110">
                                <ArrowUpRight size={24} className="text-accent group-hover:text-accent transition-colors" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            
            <style jsx>{`
                .text-glow {
                    text-shadow: 0 0 15px rgba(172, 200, 162, 0.4);
                }
            `}</style>
        </section>
    );
}
