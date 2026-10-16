"use client";

import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { ArrowUpRight, Plus, Fingerprint, Binary, Sparkles, Orbit, MousePointer2, Cpu, Zap, ShieldCheck } from "lucide-react";
import Image from "next/image";

// --- Service Manifest (Billion-Dollar Tier) ---
const manifest = [
    {
        id: "01",
        title: "STRATEGIC",
        highlight: "GROWTH",
        tagline: "NEURAL_ARBITRAGE",
        description: "Engineering biological dominance. We manifest high-velocity growth ecosystems through proprietary algorithmic narrative structures.",
        image: "/work/branding/define 1.webp",
        tags: ["NEURAL_DATA", "CONVERSION_CORE", "STRATA_01"],
        accent: "#3CFF8F"
    },
    {
        id: "02",
        title: "WEB",
        highlight: "SYSTEMS",
        tagline: "DIGITAL_ARCHITECTURE",
        description: "The nexus of code and emotion. We architect high-performance interactive platforms that serve as monolithic brand anchors.",
        image: "/work/branding/nexa 4.webp",
        tags: ["INTERACTIVE_UX", "NEXT.JS_ELITE", "SYSTEMIC_CORE"],
        accent: "#00F0FF"
    },
    {
        id: "03",
        title: "VISUAL",
        highlight: "IDENTITY",
        tagline: "AESTHETIC_MANIFEST",
        description: "Capturing the frequency of authority. High-end visual production that translates raw brand truth into cinematic cultural capital.",
        image: "/work/shoots/youtube_JBCoKvifIyo.webp",
        tags: ["CINEMA_TIER", "PRESTIGE_PRODUCTION", "VISUAL_ASSETS"],
        accent: "#FF007A"
    },
    {
        id: "04",
        title: "CULTURAL",
        highlight: "REACH",
        tagline: "INFLUENCE_DYNAMICS",
        description: "Bridges between institutions and visionaries. We coordinate cultural reach to drive authentic authority and market dominance.",
        image: "/work/posts/instagram-home.webp",
        tags: ["TALENT_NEXUS", "CAMPAIGN_HUB", "REACH_PROTOCOL"],
        accent: "#FFD600"
    },
    {
        id: "05",
        title: "PRODUCTION",
        highlight: "CINEMA",
        tagline: "NARRATIVE_ENGINE",
        description: "Every frame is a strategic manifesto. We produce high-velocity cinematic content designed to hold 100% of the viewer's attention.",
        image: "/work/branding/nexa 8.webp",
        video: "/work/videos/shoes.mov",
        tags: ["COMMERCIALS", "IMPACT_STUDIO", "BRAND_STORY"],
        accent: "#FF3D00"
    },
    {
        id: "06",
        title: "POST",
        highlight: "PROTOCOL",
        tagline: "REFINEMENT_NEXUS",
        description: "Surgical precision in post-production. High-end color grading and motion graphics that elevate standard content to the cinema tier.",
        image: "/work/ai content/IMG_5054.webp",
        tags: ["COLOR_GRADE", "SOUND_FX", "MOTION_STRATA"],
        accent: "#7000FF"
    }
];

// --- 3D Warp Field Canvas (Active Theory / Resn Style) ---
const WarpField = ({ progress }: { progress: any }) => {
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
            for(let i = 0; i < 400; i++) {
                stars.push({
                    x: Math.random() * w - w/2,
                    y: Math.random() * h - h/2,
                    z: Math.random() * w,
                    o: Math.random() * 0.5 + 0.1
                });
            }
        };

        const draw = () => {
            ctx.fillStyle = 'rgba(3, 3, 5, 0.2)'; // Faded trail
            ctx.fillRect(0, 0, w, h);
            
            const scroll = progress.get();
            const speed = 2 + (scroll * 40);

            ctx.strokeStyle = `rgba(255, 255, 255, 0.15)`;
            ctx.lineWidth = 1;

            stars.forEach(s => {
                s.z -= speed;
                if(s.z <= 0) s.z = w;

                const x = s.x * (w / s.z) + w/2;
                const y = s.y * (w / s.z) + h/2;
                const size = (1 - s.z / w) * 2;

                const prevX = s.x * (w / (s.z + speed)) + w/2;
                const prevY = s.y * (w / (s.z + speed)) + h/2;

                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(x, y);
                ctx.stroke();

                ctx.fillStyle = `rgba(255, 255, 255, ${s.o})`;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
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

// --- Holographic Scene Component ---
const HologramScene = ({ service, index, total, progress }: { service: typeof manifest[0], index: number, total: number, progress: any }) => {
    const start = index / total;
    const end = (index + 1) / total;
    
    // Scene Transitions
    const opacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
    const scale = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0.8, 1, 1, 0.8]);
    
    // Left: Kinetic Typography
    const titleY = useTransform(progress, [start, end], [150, -150]);
    const titleStretch = useTransform(progress, [start, end], ["-0.08em", "0.15em"]);
    const titleSkew = useTransform(progress, [start, end], [15, -15]);

    // Center: Holo-Media
    const imageZ = useTransform(progress, [start, end], [1.4, 1]);
    const maskExpansion = useTransform(progress, [start, start + 0.2, end - 0.2, end], [0.2, 1, 1, 0.2]);
    const imageTilt = useTransform(progress, [start, end], [5, -5]);

    return (
        <motion.div 
            style={{ opacity, scale }}
            className="absolute inset-0 flex items-center justify-center p-8 md:p-16 lg:p-32 overflow-hidden"
        >
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center h-full max-w-[1900px]">
                
                {/* --- LEFT: MONOLITHIC TYPOGRAPHY --- */}
                <div className="lg:col-span-4 relative flex flex-col justify-center order-2 lg:order-1">
                    <motion.div style={{ y: titleY, letterSpacing: titleStretch, skewY: titleSkew }} className="relative z-10 space-y-6">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-[#3CFF8F] tracking-[1em] uppercase">SYSTEM.PROTOCOL_{service.id}</span>
                            <div className="h-[1px] w-12 bg-white/10" />
                        </div>
                        <h2 className="text-8xl md:text-[14vw] font-serif font-black italic text-accent leading-[0.65] tracking-tighter">
                            {service.title}<br />
                            <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>{service.highlight}.</span>
                        </h2>
                    </motion.div>
                </div>

                {/* --- CENTER: HOLOGRAPHIC MEDIA --- */}
                <div className="lg:col-span-5 relative flex items-center justify-center order-1 lg:order-2">
                    <motion.div 
                        style={{ scale: maskExpansion }}
                        className="relative w-full aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-[1rem] bg-black/40 backdrop-blur-3xl shadow-[0_150px_300px_-100px_rgba(0,0,0,1)] border border-white/5 group"
                    >
                        <motion.div style={{ scale: imageZ, rotate: imageTilt }} className="absolute inset-0">
                            {service.video ? (
                                <video src={service.video} autoPlay muted loop playsInline className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[2500ms]" />
                            ) : (
                                <Image src={service.image} alt={service.title} fill className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[2500ms]" />
                            )}
                        </motion.div>
                        
                        {/* Holo Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
                        
                        {/* Scanline Interface */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(255,255,255,0.02) 50%)', backgroundSize: '100% 4px' }} />
                        
                        {/* Corner Accents */}
                        <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-white/20" />
                        <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-white/20" />
                    </motion.div>
                </div>

                {/* --- RIGHT: STRATEGIC DATA --- */}
                <div className="lg:col-span-3 flex flex-col justify-center space-y-20 order-3">
                    <div className="space-y-12">
                        <div className="space-y-8">
                            <motion.span 
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="text-[10px] font-black text-accent tracking-[0.8em] uppercase block"
                            >
                                {service.tagline}
                            </motion.span>
                            <p className="text-2xl md:text-3xl text-accent font-serif italic font-medium leading-tight">
                                {service.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {service.tags.map((tag, i) => (
                                <div key={i} className="flex items-center gap-4 group cursor-crosshair">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#3CFF8F] group-hover:shadow-[0_0_10px_#3CFF8F] transition-all" />
                                    <span className="text-[9px] font-black text-accent group-hover:text-accent tracking-widest uppercase transition-colors">{tag}</span>
                                </div>
                            ))}
                        </div>

                        <button className="group flex items-center gap-8 py-6 text-accent border-t border-white/5 w-full">
                            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-700">
                                <ArrowUpRight size={24} />
                            </div>
                            <div className="text-left">
                                <span className="text-[10px] font-black tracking-[0.5em] text-accent uppercase block mb-1">Engage Experience</span>
                                <span className="text-2xl font-serif italic font-black uppercase">Start Project</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default function NexusServices() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 25 });

    return (
        <section ref={sectionRef} className="relative bg-[#030305] h-[900vh] overflow-hidden">
            {/* --- THE NEXUS ENVIRONMENT --- */}
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center">
                
                {/* 1. 3D Warp Field */}
                <WarpField progress={smoothProgress} />

                {/* 2. Billion-Dollar HUD UI (Bento-inspired frame) */}
                <div className="absolute inset-0 pointer-events-none z-10">
                    {/* Top Bar */}
                    <div className="absolute top-12 left-12 right-12 flex justify-between items-start border-b border-white/[0.03] pb-12">
                        <div className="flex gap-16 items-center">
                            <Cpu size={16} className="text-[#3CFF8F]" />
                            <div className="space-y-1">
                                <div className="text-[10px] font-black text-accent tracking-[0.4em] uppercase">COLDUNE_NEXUS // CORE_v5.0</div>
                                <div className="text-[8px] font-black text-accent tracking-[0.4em] uppercase">SYSTEM_STABLE // 120FPS_EXPERIENCE</div>
                            </div>
                        </div>
                        <div className="flex gap-12 items-center text-[10px] font-black text-accent tracking-[1em] uppercase">
                            <Binary size={12} /> ENCODED_ARCHIVE
                        </div>
                    </div>

                    {/* Left Index */}
                    <div className="absolute left-12 top-1/2 -translate-y-1/2 space-y-12">
                        {manifest.map((s, i) => (
                            <div key={i} className="flex items-center gap-6 group">
                                <div className="text-[10px] font-black text-accent group-hover:text-accent transition-colors uppercase vertical-text tracking-widest">{s.highlight}</div>
                                <motion.div 
                                    style={{ 
                                        height: useTransform(smoothProgress, [i/manifest.length, (i+1)/manifest.length], [2, 40]),
                                        backgroundColor: useTransform(smoothProgress, [i/manifest.length, (i+1)/manifest.length], ["rgba(255,255,255,0.1)", "#3CFF8F"]),
                                        width: "2px"
                                    }}
                                    className="rounded-full"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Bottom Telemetry */}
                    <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/[0.03] pt-12">
                        <div className="flex gap-20">
                            <div className="space-y-1">
                                <div className="text-[8px] font-black text-accent tracking-[0.4em] uppercase">COORDINATES</div>
                                <div className="text-[10px] font-black text-accent tracking-[0.2em] uppercase">28° 36' 50" N // 77° 12' 32" E</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-[8px] font-black text-accent tracking-[0.4em] uppercase">SECURITY</div>
                                <div className="flex items-center gap-2 text-[10px] font-black text-[#3CFF8F] tracking-[0.2em] uppercase">
                                    <ShieldCheck size={10} /> ENCRYPTED_NEXUS
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <Zap size={14} className="text-[#FFD600] animate-pulse" />
                            <span className="text-[10px] font-black text-accent tracking-[0.8em] uppercase">ASCEND_THROUGH_SCROLL</span>
                        </div>
                    </div>
                </div>

                {/* 3. The Core Experience Engine */}
                <div className="relative h-full w-full">
                    {manifest.map((service, i) => (
                        <HologramScene 
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
