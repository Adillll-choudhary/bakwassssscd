"use client";

import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { ArrowUpRight, Plus, Fingerprint, Binary, Sparkles, Orbit, MousePointer2 } from "lucide-react";
import Image from "next/image";

// --- Service Manifest (Dynamic Assets) ---
const manifest = [
    {
        id: "01",
        title: "STRATEGIC",
        highlight: "GROWTH",
        tagline: "ALGORITHMIC_ARBITRAGE",
        description: "We engineer biological responses. Our growth systems are designed to turn attention into inevitable revenue through high-velocity narrative engineering.",
        image: "/work/branding/define 1.webp",
        tags: ["META_ARCHIVE", "CONVERSION_CORE", "DATA_STRATA"],
        accent: "#3CFF8F"
    },
    {
        id: "02",
        title: "WEB",
        highlight: "DESIGN",
        tagline: "DIGITAL_NEXUS",
        description: "Architecture for the infinite. We build high-speed, interactive platforms that manifest brand authority through clinical UX and reactive code.",
        image: "/work/branding/nexa 4.webp",
        tags: ["INTERACTIVE_UX", "NEXT.JS_CORE", "SYSTEMIC_ENGINEERING"],
        accent: "#00F0FF"
    },
    {
        id: "03",
        title: "VISUAL",
        highlight: "SHOOTS",
        tagline: "AESTHETIC_PROTOCOL",
        description: "Capturing the soul of the machine. High-end photography and cinematography that manifest prestige and instant brand recognition.",
        image: "/work/shoots/youtube_JBCoKvifIyo.webp",
        tags: ["CINEMA_TIER", "PRODUCTION_HUB", "CULTURAL_ASSETS"],
        accent: "#FF007A"
    },
    {
        id: "04",
        title: "INFLUENCER",
        highlight: "REACH",
        tagline: "CULTURAL_DYNAMICS",
        description: "Strategic bridges between brands and cultural leaders. We coordinate influence to drive authentic growth and community dominance.",
        image: "/work/posts/instagram-home.webp",
        tags: ["TALENT_SCOUT", "CAMPAIGN_HUB", "REACH_PROTOCOL"],
        accent: "#FFD600"
    },
    {
        id: "05",
        title: "CINEMATIC",
        highlight: "VIDEOS",
        tagline: "PRODUCTION_MANIFEST",
        description: "Every second is engineered for impact. We produce cinematic video content that stops the scroll and starts the global conversation.",
        image: "/work/branding/nexa 8.webp",
        video: "/work/videos/shoes.mov",
        tags: ["COMMERCIALS", "SOCIAL_IMPACT", "BRAND_STORY"],
        accent: "#FF3D00"
    },
    {
        id: "06",
        title: "POST",
        highlight: "PROD",
        tagline: "EDITING_NEXUS",
        description: "Precision where it matters most. High-end color grading, sound design, and motion graphics to elevate every digital second.",
        image: "/work/ai content/IMG_5054.webp",
        tags: ["COLOR_GRADE", "SOUND_FX", "MOTION_MANIFEST"],
        accent: "#7000FF"
    }
];

// --- WebGL-Inspired Fluid Dust Canvas ---
const FluidBackground = ({ progress }: { progress: any }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let w: number, h: number;
        let particles: { x: number; y: number; z: number; size: number; speed: number; opacity: number }[] = [];
        
        const init = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            particles = [];
            for(let i = 0; i < 200; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    z: Math.random() * 1000,
                    size: Math.random() * 1 + 0.5,
                    speed: Math.random() * 0.5 + 0.2,
                    opacity: Math.random() * 0.2
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            const scroll = progress.get();
            
            particles.forEach(p => {
                p.z -= 1 + (scroll * 10);
                if(p.z <= 0) p.z = 1000;

                const scale = 1000 / p.z;
                const px = (p.x - w/2) * scale + w/2;
                const py = (p.y - h/2) * scale + h/2;
                const pSize = p.size * scale;

                if(px > 0 && px < w && py > 0 && py < h) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * (1 - p.z/1000)})`;
                    ctx.beginPath();
                    ctx.arc(px, py, pSize, 0, Math.PI * 2);
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

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60 z-0" />;
};

// --- Cinematic Scene Component ---
const Scene = ({ service, index, total, progress }: { service: typeof manifest[0], index: number, total: number, progress: any }) => {
    const start = index / total;
    const end = (index + 1) / total;
    
    // 1. Scene Core
    const opacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
    const blur = useTransform(progress, [start, start + 0.1, end - 0.1, end], ["10px", "0px", "0px", "10px"]);
    
    // 2. Left: Kinetic Typography
    const titleX = useTransform(progress, [start, end], [50, -50]);
    const titleStretch = useTransform(progress, [start, end], ["0.1em", "0.25em"]);
    const titleSkew = useTransform(progress, [start, end], [10, -10]);

    // 3. Center: Media Mask
    const imageScale = useTransform(progress, [start, end], [1.3, 1]);
    const maskReveal = useTransform(progress, [start, start + 0.15, end - 0.15, end], [0.5, 1, 1, 0.5]);
    
    // 4. Right: Narrative
    const infoY = useTransform(progress, [start, end], [50, -50]);

    return (
        <motion.div 
            style={{ opacity, filter: `blur(${blur})` }}
            className="absolute inset-0 flex items-center justify-center p-6 md:p-12 lg:p-24 overflow-hidden"
        >
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full max-w-[1800px]">
                
                {/* --- LEFT: OVERSIZED TITLE --- */}
                <div className="lg:col-span-4 relative flex flex-col justify-center order-2 lg:order-1">
                    <motion.div style={{ x: titleX, letterSpacing: titleStretch, skewX: titleSkew }} className="relative z-10">
                        <span className="text-[10px] font-black text-accent tracking-[1em] block mb-6">MANIFEST_{service.id}</span>
                        <h2 className="text-7xl md:text-[12vw] font-serif font-black italic text-accent leading-[0.7] tracking-tighter mix-blend-difference">
                            {service.title}<br />
                            <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>{service.highlight}</span>
                        </h2>
                    </motion.div>
                </div>

                {/* --- CENTER: CINEMATIC SHOWCASE --- */}
                <div className="lg:col-span-5 relative flex items-center justify-center order-1 lg:order-2">
                    <motion.div 
                        style={{ scale: maskReveal }}
                        className="relative w-full aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-[0.5rem] shadow-[0_100px_200px_-50px_rgba(0,0,0,1)] group"
                    >
                        <motion.div style={{ scale: imageScale }} className="absolute inset-0">
                            {service.video ? (
                                <video src={service.video} autoPlay muted loop playsInline className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[2000ms]" />
                            ) : (
                                <Image src={service.image} alt={service.title} fill className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[2000ms]" />
                            )}
                        </motion.div>
                        
                        {/* Film Grain & Lighting */}
                        <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Floating HUD Tag */}
                        <div className="absolute bottom-8 left-8 flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />
                            <span className="text-[8px] font-black text-accent tracking-widest uppercase">{service.tagline}</span>
                        </div>
                    </motion.div>
                </div>

                {/* --- RIGHT: NARRATIVE PROTOCOL --- */}
                <div className="lg:col-span-3 flex flex-col justify-center space-y-16 order-3">
                    <motion.div style={{ y: infoY }} className="space-y-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-[1px] w-8 bg-white/10" />
                                <span className="text-[10px] font-black text-accent tracking-[0.5em] uppercase">PROTOCOL_INFO</span>
                            </div>
                            <p className="text-xl md:text-2xl text-accent font-serif italic font-medium leading-snug">
                                {service.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {service.tags.map((tag, i) => (
                                <span key={i} className="text-[8px] font-black text-accent tracking-widest px-4 py-2 border border-white/5 rounded-full uppercase">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <button className="group relative flex items-center gap-6 py-4 text-accent">
                            <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white transition-all duration-500">
                                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                            <span className="text-xs font-black tracking-[0.5em] uppercase">Enter Experience</span>
                        </button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default function StudioServices() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 25 });

    return (
        <section ref={sectionRef} className="relative bg-[#030305] h-[800vh] overflow-hidden">
            {/* --- IMMERSIVE LAYERS --- */}
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center">
                
                {/* 1. Fluid Starfield / Dust */}
                <FluidBackground progress={smoothProgress} />

                {/* 2. Brutalist Border HUD */}
                <div className="absolute inset-0 pointer-events-none z-10 p-12 border-x border-white/[0.02] flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <div className="text-[10px] font-black text-accent tracking-[0.6em] uppercase">COLDUNE_NEXUS // V_04</div>
                            <div className="text-[10px] font-black text-accent tracking-[0.6em] uppercase">OPERATIONAL_PROTOCOL_ENGAGED</div>
                        </div>
                        <div className="text-[10px] font-black text-accent tracking-[0.6em] uppercase">EST. APRIL 2026</div>
                    </div>
                    
                    <div className="flex justify-between items-end">
                        <div className="flex gap-12">
                            <div className="text-[10px] font-black text-accent tracking-[0.5em] uppercase">28.6139° N</div>
                            <div className="text-[10px] font-black text-accent tracking-[0.5em] uppercase">77.2090° E</div>
                        </div>
                        <div className="text-[10px] font-black text-accent tracking-[0.5em] uppercase animate-pulse">SCROLL_TO_DESCEND</div>
                    </div>
                </div>

                {/* 3. Central Experience Engine */}
                <div className="relative h-full w-full">
                    {manifest.map((service, i) => (
                        <Scene 
                            key={service.id} 
                            service={service} 
                            index={i} 
                            total={manifest.length} 
                            progress={smoothProgress} 
                        />
                    ))}
                </div>

                {/* 4. Asymmetrical Progress Index */}
                <div className="absolute left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8">
                    {manifest.map((s, i) => (
                        <div key={i} className="flex items-center gap-4 group">
                            <motion.div 
                                style={{ 
                                    scale: useTransform(smoothProgress, [i/manifest.length, (i+1)/manifest.length], [1, 2]),
                                    opacity: useTransform(smoothProgress, [i/manifest.length, (i+1)/manifest.length], [0.2, 1])
                                }}
                                className="w-1.5 h-1.5 rounded-full bg-white"
                            />
                            <span className="text-[9px] font-black text-accent group-hover:text-accent transition-colors uppercase tracking-widest">{s.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
