"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { ArrowUpRight, Plus, Fingerprint, Binary, Sparkles, Orbit } from "lucide-react";
import Image from "next/image";

// --- Service Pillar Configuration ---
const pillars = [
    {
        id: "01",
        title: "STRATEGIC",
        highlight: "GROWTH",
        subtitle: "PERCEPTION ARCHITECTURE",
        description: "We don't just run ads. We engineer biological responses. Our growth systems are designed to turn attention into inevitable revenue through high-velocity algorithmic arbitrage.",
        image: "/work/branding/define 1.webp",
        tags: ["META_ARCHIVE", "CONVERSION_CORE", "DATA_STRATA"],
        color: "#3CFF8F"
    },
    {
        id: "02",
        title: "WEB",
        highlight: "DESIGN",
        subtitle: "DIGITAL NEXUS",
        description: "Architecture for the infinite. We build high-speed, interactive platforms that manifest brand authority through clinical UX and reactive code. Not just websites—digital first impressions.",
        image: "/work/branding/nexa 4.webp",
        tags: ["INTERACTIVE_UX", "NEXT.JS_CORE", "SYSTEMIC_ENGINEERING"],
        color: "#00F0FF"
    },
    {
        id: "03",
        title: "VISUAL",
        highlight: "SHOOTS",
        subtitle: "AESTHETIC PROTOCOL",
        description: "Capturing the soul of the machine. High-end photography and cinematography that manifest prestige and instant brand recognition. Every frame is a manifesto of taste.",
        image: "/work/shoots/youtube_JBCoKvifIyo.webp",
        tags: ["CINEMA_TIER", "PRODUCTION_HUB", "CULTURAL_ASSETS"],
        color: "#FF007A"
    },
    {
        id: "04",
        title: "CONTENT",
        highlight: "VIDEOS",
        subtitle: "PRODUCTION MANIFEST",
        description: "Every second is engineered for impact. We produce cinematic video content that stops the scroll and starts the global conversation. High-production value meets strategic reach.",
        image: "/work/branding/nexa 8.webp",
        video: "/work/videos/shoes.mov",
        tags: ["COMMERCIALS", "SOCIAL_IMPACT", "BRAND_STORY"],
        color: "#FFD600"
    },
    {
        id: "05",
        title: "INFLUENCER",
        highlight: "REACH",
        subtitle: "DYNAMICS ENGINE",
        description: "Strategic bridges between brands and cultural leaders. We coordinate influence to drive authentic growth and community dominance through high-trust partnerships.",
        image: "/work/posts/instagram-home.webp",
        tags: ["TALENT_SCOUT", "CAMPAIGN_HUB", "REACH_PROTOCOL"],
        color: "#FF3D00"
    },
    {
        id: "06",
        title: "POST",
        highlight: "PRODUCTION",
        subtitle: "EDITING NEXUS",
        description: "Precision where it matters most. High-end color grading, sound design, and motion graphics to elevate every digital second. The edit is where the soul manifests.",
        image: "/work/ai content/IMG_5054.webp",
        tags: ["COLOR_GRADE", "SOUND_FX", "MOTION_MANIFEST"],
        color: "#7000FF"
    }
];

// --- WebGL-Inspired Particle Canvas ---
const ParticleBackground = ({ progress }: { progress: any }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let w: number, h: number;
        let particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];
        
        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            particles = [];
            for(let i = 0; i < 150; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    size: Math.random() * 1.5 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.3
                });
            }
        };

        window.addEventListener('resize', resize);
        resize();

        const animate = () => {
            ctx.clearRect(0, 0, w, h);
            const scrollVal = progress.get();
            
            particles.forEach(p => {
                p.x += p.speedX + (scrollVal * 2);
                p.y += p.speedY;

                if (p.x > w) p.x = 0;
                if (p.x < 0) p.x = w;
                if (p.y > h) p.y = 0;
                if (p.y < 0) p.y = h;

                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        animate();
        return () => window.removeEventListener('resize', resize);
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-40" />;
};

// --- Single Service Scene ---
const ServiceScene = ({ pillar, index, total, progress }: { pillar: typeof pillars[0], index: number, total: number, progress: any }) => {
    const start = index / total;
    const end = (index + 1) / total;
    
    // 1. Scene Transitions
    const opacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
    const scale = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0.9, 1, 1, 0.9]);
    
    // 2. Left Column: Massive Typography
    const titleY = useTransform(progress, [start, end], [100, -100]);
    const titleScale = useTransform(progress, [start, end], [0.8, 1.2]);
    const letterSpacing = useTransform(progress, [start, end], ["-0.05em", "0.05em"]);
    
    // 3. Center Column: Media Reveal
    const maskScale = useTransform(progress, [start, start + 0.2, end - 0.2, end], [0.4, 1, 1, 0.4]);
    const imageZoom = useTransform(progress, [start, end], [1.3, 1]);
    const imageRotate = useTransform(progress, [start, end], [10, -10]);
    
    // 4. Right Column: Info
    const infoX = useTransform(progress, [start, start + 0.2, end - 0.2, end], [50, 0, 0, -50]);

    return (
        <motion.div 
            style={{ opacity, scale }}
            className="absolute inset-0 flex items-center justify-center p-8 md:p-24"
        >
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
                
                {/* --- LEFT: MASSIVE TYPOGRAPHY --- */}
                <div className="lg:col-span-4 relative h-full flex flex-col justify-center overflow-hidden">
                    <motion.div style={{ y: titleY, scale: titleScale, letterSpacing }} className="space-y-0">
                        <span className="text-[12px] font-black font-mono text-accent tracking-[1em] block mb-4">PROTOCOL_{pillar.id}</span>
                        <h3 className="text-8xl md:text-[14vw] font-serif font-black italic text-accent leading-[0.7] tracking-tighter mix-blend-difference">
                            {pillar.title}<br />
                            <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>{pillar.highlight}.</span>
                        </h3>
                    </motion.div>
                </div>

                {/* --- CENTER: IMMERSIVE VISUAL --- */}
                <div className="lg:col-span-4 relative h-full flex items-center justify-center">
                    <motion.div 
                        style={{ scale: maskScale }}
                        className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_100px_200px_-50px_rgba(0,0,0,0.8)] border border-white/10 group cursor-none"
                    >
                        <motion.div style={{ scale: imageZoom, rotate: imageRotate }} className="absolute inset-0">
                            {pillar.video ? (
                                <video src={pillar.video} autoPlay muted loop playsInline className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" />
                            ) : (
                                <Image src={pillar.image} alt={pillar.title} fill className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" />
                            )}
                        </motion.div>

                        {/* Cinematic Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                        
                        {/* Interactive Data Tag */}
                        <div className="absolute top-12 left-12 flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-[#3CFF8F] animate-pulse" />
                            <span className="text-[10px] font-black text-accent tracking-widest uppercase">ENCODING_MANIFEST</span>
                        </div>
                    </motion.div>
                </div>

                {/* --- RIGHT: MINIMAL DESCRIPTION --- */}
                <div className="lg:col-span-4 h-full flex flex-col justify-center pl-0 lg:pl-24 space-y-16">
                    <motion.div style={{ x: infoX }} className="space-y-12">
                        <div className="space-y-4">
                            <span className="text-[10px] font-black text-[#3CFF8F] tracking-[0.8em] uppercase block">{pillar.subtitle}</span>
                            <p className="text-2xl md:text-3xl text-accent font-serif italic font-medium leading-tight">
                                {pillar.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {pillar.tags.map((tag, i) => (
                                <span key={i} className="text-[9px] font-black text-accent tracking-widest px-5 py-2 border border-white/5 rounded-full uppercase hover:text-accent transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <button className="group relative flex items-center gap-8 py-4 text-accent">
                            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#3CFF8F] transition-all duration-500">
                                <Plus size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-black tracking-[0.5em] text-accent uppercase block">Initiate Experience</span>
                                <span className="text-xl font-serif italic font-black uppercase">Start Project</span>
                            </div>
                        </button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default function EliteServices() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 25,
        restDelta: 0.001
    });

    return (
        <section 
            id="elite-services" 
            ref={containerRef} 
            className="relative bg-[#030305] h-[1000vh] overflow-hidden"
        >
            {/* Global Background Layer */}
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center">
                <ParticleBackground progress={smoothProgress} />
                
                {/* HUD Elements */}
                <div className="absolute inset-12 pointer-events-none z-10 flex flex-col justify-between border border-white/[0.03] rounded-[4rem]">
                    <div className="p-12 flex justify-between items-start">
                        <div className="space-y-1">
                            <div className="text-[10px] font-black text-accent tracking-[0.5em] uppercase">SYSTEM_STATE: IMMERSIVE</div>
                            <div className="text-[10px] font-black text-[#3CFF8F] tracking-[0.5em] uppercase">ARCHIVE_ACCESS: GRANTED</div>
                        </div>
                        <div className="text-[10px] font-black text-accent tracking-[0.5em] uppercase">©2026_COLDUNE_NEXUS</div>
                    </div>
                    
                    <div className="p-12 flex justify-between items-end">
                        <div className="flex gap-12">
                            <div className="text-[10px] font-black text-accent tracking-[0.5em] uppercase">LAT: 28.6139° N</div>
                            <div className="text-[10px] font-black text-accent tracking-[0.5em] uppercase">LONG: 77.2090° E</div>
                        </div>
                        <div className="text-[10px] font-black text-accent tracking-[0.5em] uppercase">SCROLL_TO_MANIFEST</div>
                    </div>
                </div>

                {/* Main Experience Engine */}
                <div className="relative h-full w-full">
                    {pillars.map((pillar, i) => (
                        <ServiceScene 
                            key={pillar.id} 
                            pillar={pillar} 
                            index={i} 
                            total={pillars.length} 
                            progress={smoothProgress} 
                        />
                    ))}
                </div>

                {/* Progress Visualizer */}
                <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                    {pillars.map((_, i) => {
                        const start = i / pillars.length;
                        const end = (i + 1) / pillars.length;
                        return (
                            <motion.div 
                                key={i}
                                className="w-1 h-8 rounded-full bg-white/10 overflow-hidden"
                            >
                                <motion.div 
                                    style={{ 
                                        height: useTransform(smoothProgress, [start, end], ["0%", "100%"]),
                                        backgroundColor: pillars[i].color 
                                    }}
                                    className="w-full"
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
