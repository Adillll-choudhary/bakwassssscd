"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { ArrowUpRight, Plus, Cpu, Zap, Binary, Target, Layers, Globe, Camera, PenTool } from "lucide-react";
import Image from "next/image";

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

// --- Cinematic Background Canvas ---
const GalaxyBackground = ({ progress }: { progress: any }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let w: number, h: number;
        let stars: { x: number; y: number; z: number; o: number; color: string }[] = [];
        const colors = ["#ffffff", "#3CFF8F", "#00F0FF"];
        
        const init = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            stars = [];
            for(let i = 0; i < 300; i++) {
                stars.push({
                    x: Math.random() * w - w/2,
                    y: Math.random() * h - h/2,
                    z: Math.random() * w,
                    o: Math.random() * 0.5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }
        };

        const draw = () => {
            ctx.fillStyle = 'rgba(3, 3, 5, 0.1)';
            ctx.fillRect(0, 0, w, h);
            
            const scroll = progress.get();
            const speed = 1 + (scroll * 20);

            stars.forEach(s => {
                s.z -= speed;
                if(s.z <= 0) s.z = w;

                const x = s.x * (w / s.z) + w/2;
                const y = s.y * (w / s.z) + h/2;
                const size = (1 - s.z / w) * 2;

                ctx.fillStyle = s.color;
                ctx.globalAlpha = s.o;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
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

// --- Layered Service Layer Component ---
const ServiceLayer = ({ service, index, total, progress }: { service: typeof manifest[0], index: number, total: number, progress: any }) => {
    const step = 1 / total;
    const start = index * step;
    const peak = start + step / 2;
    const end = (index + 1) * step;

    // 1. Center: Huge Typography (Layered Stacking)
    const scale = useTransform(progress, [start - step, start, peak, end, end + step], [0.5, 1, 1.2, 0.8, 0.6]);
    const opacity = useTransform(progress, [start - step, start, peak, end, end + step], [0, 1, 1, 0.15, 0.05]);
    const zIndex = useTransform(progress, (p: number) => (p >= start && p <= end ? 50 : 50 - index));
    const y = useTransform(progress, [start - step, start, end, end + step], [100, 0, -100, -200]);
    const rotateX = useTransform(progress, [start - step, start, end, end + step], [20, 0, -20, -40]);
    const blur = useTransform(progress, [start, end, end + step], ["blur(0px)", "blur(2px)", "blur(8px)"]);
    
    // 2. Right: Narrative Control
    const infoOpacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
    const infoY = useTransform(progress, [start, end], [30, -30]);

    return (
        <motion.div 
            style={{ zIndex, opacity, scale, y, rotateX, filter: blur }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-[2000px]"
        >
            <div className="container mx-auto grid grid-cols-12 gap-8 items-center w-full px-8 lg:px-24">
                
                {/* --- CENTER: MASSIVE STACKED TYPOGRAPHY --- */}
                <div className="col-span-12 lg:col-span-8 flex flex-col justify-center text-center lg:text-left">
                    <motion.div className="relative">
                        <span className="text-[10px] font-black text-[#3CFF8F] tracking-[0.8em] uppercase block mb-4 lg:mb-8 opacity-40">
                            OPERATIONAL_MODULE_{service.id}
                        </span>
                        <h2 className="text-6xl md:text-[12vw] font-serif font-black italic text-accent leading-[0.75] tracking-tighter">
                            {service.title.split(" ").map((word, i) => (
                                <span key={i} className="block first:mb-[-0.1em]">{word}</span>
                            ))}
                        </h2>
                    </motion.div>
                </div>

                {/* --- RIGHT: PROTOCOL DATA --- */}
                <div className="col-span-12 lg:col-span-4 flex flex-col justify-center pointer-events-auto">
                    <motion.div style={{ opacity: infoOpacity, y: infoY }} className="space-y-12 text-right lg:text-left">
                        <div className="space-y-6 border-l lg:border-l-0 lg:border-r border-white/5 pr-0 lg:pr-12">
                            <div className="flex items-center gap-4 justify-end lg:justify-start">
                                <service.icon size={20} className="text-[#3CFF8F] opacity-40" />
                                <span className="text-[10px] font-black text-accent tracking-[0.5em] uppercase">{service.tagline}</span>
                            </div>
                            <p className="text-xl md:text-2xl text-accent font-serif italic font-medium leading-tight max-w-sm ml-auto lg:ml-0">
                                {service.description}
                            </p>
                        </div>

                        <button className="group flex items-center gap-6 py-4 px-8 border border-white/5 rounded-full hover:bg-white hover:text-black transition-all duration-500 ml-auto lg:ml-0">
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase">Engage Protocol</span>
                            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default function CommandCenterServices() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 30 });

    return (
        <section ref={sectionRef} className="relative bg-[#030305] h-[1000vh] overflow-hidden">
            <div className="sticky top-0 h-screen w-full">
                
                {/* 1. Galaxy Atmosphere */}
                <GalaxyBackground progress={smoothProgress} />

                {/* 2. Floating Command HUD */}
                <div className="absolute inset-0 pointer-events-none z-[100] p-12 flex flex-col justify-between mix-blend-difference">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <div className="text-[10px] font-black text-accent tracking-[1em] uppercase">SYSTEM.COMMAND_CENTER // V_06</div>
                            <div className="text-[10px] font-black text-[#3CFF8F]/40 tracking-[1em] uppercase">ALL_MODULES_ONLINE</div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <Binary size={14} className="text-accent" />
                            <span className="text-[10px] font-black text-accent tracking-[0.5em] uppercase">ARCHIVE_08_CORE</span>
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-end">
                        <div className="flex gap-20">
                            <div className="space-y-1">
                                <div className="text-[8px] font-black text-accent tracking-[0.4em] uppercase">DATA_STREAM</div>
                                <div className="text-[10px] font-black text-accent tracking-[0.2em] uppercase">ACTIVE_FLOW_ENABLED</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <Layers size={14} className="text-accent animate-pulse" />
                            <span className="text-[10px] font-black text-accent tracking-[1em] uppercase">STACK_DESCENT</span>
                        </div>
                    </div>
                </div>

                {/* 3. Left Side: Service Index Navigation */}
                <div className="absolute left-12 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-10">
                    {manifest.map((s, i) => {
                        const start = i / manifest.length;
                        const end = (i + 1) / manifest.length;
                        return (
                            <div key={i} className="flex items-center gap-6 group">
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-[8px] font-black text-accent">{s.id}</span>
                                    <motion.div 
                                        style={{ 
                                            width: useTransform(smoothProgress, [start, end], ["2px", "12px"]),
                                            backgroundColor: useTransform(smoothProgress, [start, end], ["rgba(255,255,255,0.1)", "#3CFF8F"]),
                                            height: "2px"
                                        }}
                                        className="rounded-full"
                                    />
                                </div>
                                <span className="text-[9px] font-black text-accent group-hover:text-accent tracking-[0.4em] uppercase transition-colors hidden lg:block">{s.title}</span>
                            </div>
                        );
                    })}
                </div>

                {/* 4. The Layered Experience Engine */}
                <div className="relative h-full w-full">
                    {manifest.map((service, i) => (
                        <ServiceLayer 
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
