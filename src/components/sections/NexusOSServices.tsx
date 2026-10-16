"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { Globe, Cpu, Binary, PenTool, Target, Zap, Layers, Camera, ArrowUpRight, Hexagon, Component, Hash, Boxes, Radio, Activity } from "lucide-react";

// --- Service Manifest (Billion-Dollar Tier) ---
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

// --- 3D Depth Canvas ---
const StarfieldCanvas = ({ progress }: { progress: any }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let w: number, h: number;
        let stars: { x: number; y: number; z: number; o: number }[] = [];
        
        const init = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            stars = [];
            for(let i = 0; i < 500; i++) {
                stars.push({
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
            const speed = 1.5 + (scroll * 35);

            stars.forEach(s => {
                s.z -= speed;
                if(s.z <= 0) s.z = w;

                const scale = w / s.z;
                const x = s.x * scale + w/2;
                const y = s.y * scale + h/2;
                const size = (1 - s.z / w) * 1.5;

                if(x > 0 && x < w && y > 0 && y < h) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${s.o * (1 - s.z/w)})`;
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

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-40" />;
};

// --- Service Module Layer ---
const ServiceModule = ({ service, index, total, progress }: { service: typeof manifest[0], index: number, total: number, progress: any }) => {
    const step = 1 / total;
    
    // THE ARCHITECTURE: Ultra-overlapping ranges for continuous layering
    const emerge = (index - 0.7) * step;
    const focus = index * step;
    const recede = (index + 0.7) * step;
    const ghost = (index + 1.5) * step;

    // --- Kinetic Transformations ---
    const opacity = useTransform(progress, [emerge, focus, recede, ghost], [0, 1, 0.4, 0.05]);
    const scale = useTransform(progress, [emerge, focus, recede, ghost], [2, 1, 0.7, 0.4]);
    const z = useTransform(progress, [emerge, focus, recede, ghost], [500, 0, -600, -1200]);
    const blur = useTransform(progress, [emerge, focus, recede, ghost], ["20px", "0px", "6px", "15px"]);
    
    // Typography Motion
    const letterSpacing = useTransform(progress, [emerge, focus, recede], ["1em", "-0.05em", "0.4em"]);
    const skew = useTransform(progress, [emerge, focus, recede], [15, 0, -15]);
    const y = useTransform(progress, [emerge, focus, recede], [150, 0, -200]);

    // Narrative Info transitions
    const infoOpacity = useTransform(progress, [focus - step/3, focus, focus + step/3], [0, 1, 0]);
    const infoY = useTransform(progress, [focus - step/3, focus + step/3], [40, -40]);

    return (
        <motion.div 
            style={{ opacity, scale, filter: blur, zIndex: 100 - index }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-[2000px]"
        >
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full px-8 lg:px-24 max-w-[1900px]">
                
                {/* --- CENTER: MONOLITHIC PERSPECTIVE TYPOGRAPHY --- */}
                <div className="lg:col-span-8 flex flex-col justify-center">
                    <motion.div style={{ letterSpacing, skewX: skew, y }} className="relative text-center lg:text-left">
                        <div className="flex items-center gap-6 mb-12 justify-center lg:justify-start">
                            <Radio size={14} className="text-[#3CFF8F] animate-pulse" />
                            <span className="text-[10px] font-black text-accent tracking-[1em] uppercase">
                                NEXUS_OS_ARCHIVE_{service.id}
                            </span>
                        </div>
                        <h2 className="text-7xl md:text-[15vw] font-serif font-black italic text-accent leading-[0.6] tracking-tighter mix-blend-difference drop-shadow-[0_0_80px_rgba(255,255,255,0.05)]">
                            {service.title.split(" ").map((word, i) => (
                                <span key={i} className="block first:mb-[-0.1em] last:text-transparent" style={{ WebkitTextStroke: i === service.title.split(" ").length - 1 ? "1px rgba(255,255,255,0.2)" : "none" }}>{word}</span>
                            ))}
                        </h2>
                    </motion.div>
                </div>

                {/* --- RIGHT: STRATEGIC DATA CORE --- */}
                <div className="lg:col-span-4 flex flex-col justify-center pointer-events-auto">
                    <motion.div style={{ opacity: infoOpacity, y: infoY }} className="space-y-16 text-right lg:text-left">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 justify-end lg:justify-start">
                                <service.icon size={24} className="text-[#3CFF8F] opacity-60" />
                                <span className="text-[11px] font-black text-[#3CFF8F]/60 tracking-[0.6em] uppercase">{service.tagline}</span>
                            </div>
                            <p className="text-2xl md:text-3xl text-accent font-serif italic font-medium leading-tight max-w-sm ml-auto lg:ml-0">
                                {service.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3 justify-end lg:justify-start">
                            <span className="text-[9px] font-black text-accent tracking-widest px-6 py-2 border border-white/5 rounded-full uppercase hover:text-accent transition-colors">ARCHIVE_ACCESS</span>
                            <span className="text-[9px] font-black text-accent tracking-widest px-6 py-2 border border-white/5 rounded-full uppercase hover:text-accent transition-colors">SYSTEM_v5</span>
                        </div>

                        <button className="group relative flex items-center gap-8 py-6 px-12 border border-white/5 rounded-full overflow-hidden ml-auto lg:ml-0">
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="relative z-10 text-[10px] font-black tracking-[0.6em] uppercase group-hover:text-black transition-colors">Enter Experience</span>
                            <ArrowUpRight size={20} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 group-hover:text-black" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default function NexusOSServices() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

    return (
        <section ref={containerRef} className="relative bg-[#030305] h-[1200vh] overflow-hidden">
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center">
                
                {/* 1. 3D Warp Starfield */}
                <StarfieldCanvas progress={smoothProgress} />

                {/* 2. Billion-Dollar Nexus HUD */}
                <div className="absolute inset-0 pointer-events-none z-[101] p-12 flex flex-col justify-between mix-blend-difference border-x border-white/[0.02]">
                    <div className="flex justify-between items-start">
                        <div className="flex gap-20 items-start">
                            <Boxes size={20} className="text-[#3CFF8F]/40 animate-spin-slow" />
                            <div className="space-y-1">
                                <div className="text-[10px] font-black text-accent tracking-[1em] uppercase">NEXUS_OS // CORE_SYSTEM_v5.2</div>
                                <div className="text-[10px] font-black text-[#3CFF8F]/40 tracking-[1em] uppercase animate-pulse">OPERATIONAL_PROTOCOL_STABLE</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <Activity size={16} className="text-accent" />
                            <span className="text-[10px] font-black text-accent tracking-[0.8em] uppercase">EST. APRIL 2026</span>
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-end">
                        <div className="flex gap-24">
                            <div className="space-y-1">
                                <div className="text-[8px] font-black text-accent tracking-[0.5em] uppercase">TELEMETRY</div>
                                <div className="text-[10px] font-black text-accent tracking-[0.2em] uppercase">28°36'50"N // 77°12'32"E</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-[8px] font-black text-accent tracking-[0.5em] uppercase">ENCRYPTION</div>
                                <div className="text-[10px] font-black text-[#3CFF8F]/60 tracking-[0.2em] uppercase">SHA-256_ACTIVE</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="w-2 h-2 rounded-full bg-[#3CFF8F] shadow-[0_0_15px_#3CFF8F]" />
                            <span className="text-[11px] font-black text-accent tracking-[1.2em] uppercase">NEXUS_ASCENT</span>
                        </div>
                    </div>
                </div>

                {/* 3. Dynamic Service Index (Vertical Navigator) */}
                <div className="absolute left-12 top-1/2 -translate-y-1/2 z-[101] hidden lg:flex flex-col gap-12">
                    {manifest.map((s, i) => {
                        const focus = i / manifest.length;
                        return (
                            <div key={i} className="flex items-center gap-8 group">
                                <div className="flex flex-col items-center gap-3">
                                    <span className="text-[9px] font-black text-accent">{s.id}</span>
                                    <motion.div 
                                        style={{ 
                                            height: useTransform(smoothProgress, [focus - 0.1, focus, focus + 0.1], ["4px", "32px", "4px"]),
                                            backgroundColor: useTransform(smoothProgress, [focus - 0.1, focus, focus + 0.1], ["rgba(255,255,255,0.05)", "#3CFF8F", "rgba(255,255,255,0.05)"]),
                                            width: "2px"
                                        }}
                                        className="rounded-full shadow-[0_0_10px_rgba(60,255,143,0.2)]"
                                    />
                                </div>
                                <span className="text-[10px] font-black text-accent group-hover:text-accent tracking-[0.6em] uppercase transition-all duration-500 group-hover:translate-x-2">{s.title}</span>
                            </div>
                        );
                    })}
                </div>

                {/* 4. The Continuous Experience Tunnel (Nexus Engine) */}
                <div className="relative h-full w-full">
                    {manifest.map((service, i) => (
                        <ServiceModule 
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
