"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { Globe, Cpu, Binary, PenTool, Target, Zap, Layers, Camera, ArrowUpRight, Hexagon, Component, Hash } from "lucide-react";

// --- Service Manifest (8 Chapters) ---
const manifest = [
    {
        id: "01",
        title: "WEB DESIGN",
        tagline: "DIGITAL_ARCHITECTURE",
        description: "Monolithic digital anchors engineered for absolute brand authority. High-speed interactive platforms that manifest presence.",
        icon: Globe,
        accent: "#3CFF8F"
    },
    {
        id: "02",
        title: "AUTOMATION",
        tagline: "EFFICIENCY_PROTOCOL",
        description: "Autonomous growth engines that eliminate friction. We build neural pipelines that scale your operations while you sleep.",
        icon: Cpu,
        accent: "#00F0FF"
    },
    {
        id: "03",
        title: "APP DEV",
        tagline: "MOBILE_NEXUS",
        description: "High-fidelity native experiences designed for the modern user. Architecture for the infinite, built on reactive code.",
        icon: Binary,
        accent: "#FF007A"
    },
    {
        id: "04",
        title: "BRANDING",
        tagline: "IDENTITY_MANIFEST",
        description: "Engineering the soul of your institution. We translate raw brand truth into a cinematic visual manifesto that commands respect.",
        icon: PenTool,
        accent: "#FFD600"
    },
    {
        id: "05",
        title: "MARKETING",
        tagline: "REVENUE_ARCHIVE",
        description: "Biological response engineering. Turning attention into inevitable revenue through high-velocity narrative dominance.",
        icon: Target,
        accent: "#FF3D00"
    },
    {
        id: "06",
        title: "INFLUENCER",
        tagline: "CULTURAL_REACH",
        description: "Bridges between brands and cultural leaders. We coordinate influence to drive authentic authority and community growth.",
        icon: Zap,
        accent: "#7000FF"
    },
    {
        id: "07",
        title: "VIDEO EDITING",
        tagline: "PRODUCTION_NEXUS",
        description: "Surgical precision in motion design. High-end color grading and sound design that elevate content to the cinema tier.",
        icon: Layers,
        accent: "#3CFF8F"
    },
    {
        id: "08",
        title: "SHOOTS",
        tagline: "VISUAL_ASSETS",
        description: "Capturing the frequency of authority. High-end visual production that manifests prestige and instant brand recognition.",
        icon: Camera,
        accent: "#00F0FF"
    }
];

// --- Cinematic Galaxy Background ---
const TunnelBackground = ({ progress }: { progress: any }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let w: number, h: number;
        let particles: { x: number; y: number; z: number; o: number }[] = [];
        
        const init = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            particles = [];
            for(let i = 0; i < 400; i++) {
                particles.push({
                    x: Math.random() * w - w/2,
                    y: Math.random() * h - h/2,
                    z: Math.random() * w,
                    o: Math.random() * 0.5 + 0.1
                });
            }
        };

        const draw = () => {
            ctx.fillStyle = 'rgba(3, 3, 5, 0.2)';
            ctx.fillRect(0, 0, w, h);
            
            const scroll = progress.get();
            const speed = 1.5 + (scroll * 40);

            particles.forEach(p => {
                p.z -= speed;
                if(p.z <= 0) p.z = w;

                const scale = w / p.z;
                const x = p.x * scale + w/2;
                const y = p.y * scale + h/2;
                const size = (1 - p.z / w) * 2;

                if(x > 0 && x < w && y > 0 && y < h) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${p.o * (1 - p.z/w)})`;
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
            requestAnimationFrame(draw);
        };

        window.addEventListener('resize', init);
        init();
        draw();
        return () => window.removeEventListener('resize', init);
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
};

// --- Continuous Layer Component ---
const LayeredScene = ({ service, index, total, progress }: { service: typeof manifest[0], index: number, total: number, progress: any }) => {
    const step = 1 / total;
    
    // THE KEY: Overlapping ranges
    // Service starts appearing MUCH earlier and exits MUCH later
    const appearAt = (index - 0.5) * step;
    const peakAt = index * step;
    const disappearAt = (index + 0.5) * step;
    const vanishAt = (index + 1.2) * step;

    // --- Transformations ---
    const opacity = useTransform(progress, [appearAt, peakAt, disappearAt, vanishAt], [0, 1, 0.3, 0.05]);
    const scale = useTransform(progress, [appearAt, peakAt, disappearAt, vanishAt], [1.5, 1, 0.7, 0.4]);
    const z = useTransform(progress, [appearAt, peakAt, disappearAt, vanishAt], [500, 0, -500, -1000]);
    const blur = useTransform(progress, [appearAt, peakAt, disappearAt, vanishAt], ["15px", "0px", "4px", "12px"]);
    
    // Kinetic Typography effects
    const letterSpacing = useTransform(progress, [appearAt, peakAt, disappearAt], ["0.8em", "-0.05em", "0.3em"]);
    const titleSkew = useTransform(progress, [appearAt, peakAt, disappearAt], [15, 0, -10]);
    const titleY = useTransform(progress, [appearAt, peakAt, disappearAt], [100, 0, -150]);

    // Narrative Info transitions (Visible only when peaking)
    const infoOpacity = useTransform(progress, [peakAt - step/4, peakAt, peakAt + step/4], [0, 1, 0]);
    const infoX = useTransform(progress, [peakAt - step/4, peakAt + step/4], [50, -50]);

    return (
        <motion.div 
            style={{ opacity, scale, filter: blur, zIndex: 100 - index }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
            <div className="container mx-auto grid grid-cols-12 gap-8 items-center w-full px-8 lg:px-24 max-w-[1800px]">
                
                {/* --- CENTER: MASSIVE PERSPECTIVE TYPOGRAPHY --- */}
                <div className="col-span-12 lg:col-span-8 flex flex-col justify-center">
                    <motion.div style={{ letterSpacing, skewX: titleSkew, y: titleY }} className="relative text-center lg:text-left">
                        <div className="flex items-center gap-4 mb-8 justify-center lg:justify-start opacity-30">
                            <Hash size={12} className="text-[#3CFF8F]" />
                            <span className="text-[10px] font-black text-accent tracking-[0.8em] uppercase">
                                SEQUENCE_MODULE_{service.id}
                            </span>
                        </div>
                        <h2 className="text-6xl md:text-[14vw] font-serif font-black italic text-accent leading-[0.65] tracking-tighter mix-blend-difference">
                            {service.title.split(" ").map((word, i) => (
                                <span key={i} className="block first:mb-[-0.1em] last:text-transparent" style={{ WebkitTextStroke: i === service.title.split(" ").length - 1 ? "1px rgba(255,255,255,0.2)" : "none" }}>{word}</span>
                            ))}
                        </h2>
                    </motion.div>
                </div>

                {/* --- RIGHT: PROTOCOL DATA --- */}
                <div className="col-span-12 lg:col-span-4 flex flex-col justify-center pointer-events-auto">
                    <motion.div style={{ opacity: infoOpacity, x: infoX }} className="space-y-12 text-right lg:text-left">
                        <div className="space-y-6 border-l lg:border-l-0 lg:border-r border-white/5 pr-0 lg:pr-12">
                            <div className="flex items-center gap-4 justify-end lg:justify-start">
                                <service.icon size={20} className="text-[#3CFF8F] opacity-40" />
                                <span className="text-[10px] font-black text-accent tracking-[0.5em] uppercase">{service.tagline}</span>
                            </div>
                            <p className="text-xl md:text-2xl text-accent font-serif italic font-medium leading-tight max-w-sm ml-auto lg:ml-0">
                                {service.description}
                            </p>
                        </div>

                        <button className="group flex items-center gap-6 py-4 px-10 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500 ml-auto lg:ml-0">
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase">Execute Protocol</span>
                            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default function EndlessServices() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 45, damping: 25 });

    return (
        <section ref={containerRef} className="relative bg-[#030305] h-[1200vh] overflow-hidden">
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center">
                
                {/* 1. Cinematic Warp Field */}
                <TunnelBackground progress={smoothProgress} />

                {/* 2. Unified Command HUD */}
                <div className="absolute inset-0 pointer-events-none z-[101] p-12 flex flex-col justify-between border-x border-white/[0.02] mix-blend-difference">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <div className="text-[10px] font-black text-accent tracking-[1em] uppercase">SYSTEM.NEXUS // v_08_ACTIVE</div>
                            <div className="text-[10px] font-black text-[#3CFF8F]/40 tracking-[1em] uppercase animate-pulse">STREAMING_NARRATIVE_DATA</div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <Hexagon size={14} className="text-accent" />
                            <span className="text-[10px] font-black text-accent tracking-[0.6em] uppercase">EST. APRIL 2026</span>
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-end">
                        <div className="flex gap-20">
                            <div className="space-y-1">
                                <div className="text-[8px] font-black text-accent tracking-[0.4em] uppercase">COORDINATES</div>
                                <div className="text-[10px] font-black text-accent tracking-[0.2em] uppercase">28.6139° N // 77.2090° E</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <Component size={14} className="text-[#3CFF8F]/20 animate-spin-slow" />
                            <span className="text-[10px] font-black text-[#3CFF8F]/20 tracking-[1em] uppercase">DESCENDING_INTO_CORE</span>
                        </div>
                    </div>
                </div>

                {/* 3. Left Side Index Tracker */}
                <div className="absolute left-12 top-1/2 -translate-y-1/2 z-[101] hidden lg:flex flex-col gap-10">
                    {manifest.map((s, i) => {
                        const peak = i / manifest.length;
                        return (
                            <div key={i} className="flex items-center gap-6 group">
                                <div className="flex flex-col items-center gap-2">
                                    <motion.div 
                                        style={{ 
                                            width: useTransform(smoothProgress, [peak - 0.1, peak, peak + 0.1], ["2px", "16px", "2px"]),
                                            backgroundColor: useTransform(smoothProgress, [peak - 0.1, peak, peak + 0.1], ["rgba(255,255,255,0.05)", "#3CFF8F", "rgba(255,255,255,0.05)"]),
                                            height: "2px"
                                        }}
                                        className="rounded-full"
                                    />
                                </div>
                                <span className="text-[9px] font-black text-accent group-hover:text-accent tracking-[0.5em] uppercase transition-colors">{s.title}</span>
                            </div>
                        );
                    })}
                </div>

                {/* 4. The Continuous Experience Engine (Overlapping Layers) */}
                <div className="relative h-full w-full">
                    {manifest.map((service, i) => (
                        <LayeredScene 
                            key={service.id} 
                            service={service} 
                            index={i} 
                            total={manifest.length} 
                            progress={smoothProgress} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
