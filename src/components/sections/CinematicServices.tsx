"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Fingerprint, Binary, Sparkles, Orbit, Plus } from "lucide-react";
import Image from "next/image";

// --- Service Pillars ---
const pillars = [
    {
        number: "01",
        title: "MARKETING",
        subtitle: "PERCEPTION ENGINE",
        description: "We don't just run ads. We engineer biological responses. Turning attention into inevitable revenue through high-velocity growth systems.",
        image: "/work/branding/define 1.webp",
        tags: ["META ARCHIVE", "GROWTH VECTOR", "DATA STRATA"],
        accent: "#3CFF8F"
    },
    {
        number: "02",
        title: "WEB DESIGN",
        subtitle: "DIGITAL NEXUS",
        description: "Architecture for the infinite. High-speed, interactive platforms that manifest brand authority through clinical UX and reactive code.",
        image: "/work/branding/nexa 4.webp",
        tags: ["INTERACTIVE", "NEXT.JS", "SYSTEMIC CORE"],
        accent: "#00F0FF"
    },
    {
        number: "03",
        title: "SHOOTS",
        subtitle: "VISUAL ANTHEM",
        description: "Capturing the soul of the machine. High-end photography and cinematography that manifest prestige and instant brand recognition.",
        image: "/work/shoots/youtube_JBCoKvifIyo.webp",
        tags: ["CULTURAL ASSETS", "CINEMA TIER", "PRODUCTION"],
        accent: "#FF007A"
    },
    {
        number: "04",
        title: "INFLUENCER",
        subtitle: "REACH DYNAMICS",
        description: "Strategic bridges between brands and cultural leaders. We coordinate influence to drive authentic growth and community dominance.",
        image: "/work/posts/instagram-home.webp",
        tags: ["TALENT SCOUT", "CAMPAIGN HUB", "CULTURAL REACH"],
        accent: "#FFD600"
    },
    {
        number: "05",
        title: "VIDEOS",
        subtitle: "PRODUCTION HUB",
        description: "Every frame is a manifesto. We produce cinematic video content that stops the scroll and starts the global conversation.",
        image: "/work/branding/nexa 8.webp",
        video: "/work/videos/shoes.mov",
        tags: ["COMMERCIALS", "SOCIAL IMPACT", "BRAND STORY"],
        accent: "#FF3D00"
    },
    {
        number: "06",
        title: "POST-PROD",
        subtitle: "EDITING PROTOCOL",
        description: "Precision where it matters most. High-end color grading, sound design, and motion graphics to elevate every digital second.",
        image: "/work/ai content/IMG_5054.webp",
        tags: ["COLOR GRADE", "SOUND FX", "MOTION ASSETS"],
        accent: "#7000FF"
    }
];

const ServiceSlide = ({ pillar, index, total, progress }: { pillar: typeof pillars[0], index: number, total: number, progress: any }) => {
    const start = index / total;
    const end = (index + 1) / total;
    
    // Asymmetrical Transforms
    const opacity = useTransform(progress, [start, start + 0.02, end - 0.02, end], [0, 1, 1, 0]);
    const mainY = useTransform(progress, [start, end], [100, -100]);
    const imageScale = useTransform(progress, [start, end], [1.2, 1]);
    const imageRotate = useTransform(progress, [start, end], [5, -5]);
    const titleX = useTransform(progress, [start, end], [0, -100]);
    const subtitleX = useTransform(progress, [start, end], [-100, 100]);
    
    const isActive = useTransform(progress, (p: number) => p >= start && p <= end);

    return (
        <motion.div 
            style={{ opacity }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
            <div className="container mx-auto px-8 grid grid-cols-12 gap-4 h-full items-center relative">
                
                {/* 1. Large Vertical Title (Asymmetrical) */}
                <div className="col-span-12 lg:col-span-1 hidden lg:flex items-center justify-center">
                    <motion.div 
                        style={{ y: mainY }}
                        className="rotate-[-90deg] whitespace-nowrap"
                    >
                        <span className="text-[10rem] font-serif font-black italic text-accent/[0.03] tracking-[-0.05em]">
                            {pillar.title}
                        </span>
                    </motion.div>
                </div>

                {/* 2. Main Visual (Fractured Alignment) */}
                <div className="col-span-12 lg:col-span-6 lg:col-start-3 relative pointer-events-auto">
                    <motion.div 
                        style={{ scale: imageScale, rotate: imageRotate }}
                        className="relative aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-[1rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/10"
                    >
                        {pillar.video ? (
                            <video src={pillar.video} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
                        ) : (
                            <Image src={pillar.image} alt={pillar.title} fill className="absolute inset-0 w-full h-full object-cover grayscale brightness-75" />
                        )}
                        
                        {/* Interactive Scanline Overlay */}
                        <motion.div 
                            animate={{ y: ["-100%", "200%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-white/[0.05] to-transparent pointer-events-none"
                        />
                    </motion.div>

                    {/* Floating Data Badge */}
                    <motion.div 
                        style={{ x: subtitleX }}
                        className="absolute -top-12 -right-12 p-10 bg-[#0A0A0B] border border-white/10 rounded-full backdrop-blur-xl z-10 hidden md:block"
                    >
                        <div className="text-[10px] font-black text-[#3CFF8F] tracking-[0.5em] uppercase mb-1">STATED: ACTIVE</div>
                        <div className="text-xl font-serif italic text-accent font-black">{pillar.number}</div>
                    </motion.div>
                </div>

                {/* 3. Narrative Column (Shifted) */}
                <div className="col-span-12 lg:col-span-4 lg:col-start-9 space-y-12 text-left pointer-events-auto">
                    <div className="space-y-4">
                        <motion.span 
                            style={{ x: subtitleX }}
                            className="inline-block text-[10px] font-black tracking-[0.8em] text-accent uppercase"
                        >
                            {pillar.subtitle}
                        </motion.span>
                        <motion.h2 
                            style={{ x: titleX }}
                            className="text-6xl md:text-[8vw] font-serif font-black italic text-accent leading-[0.8] tracking-tighter"
                        >
                            {pillar.title.split(" ").map((word, i) => (
                                <span key={i} className="block last:text-transparent" style={{ WebkitTextStroke: i === pillar.title.split(" ").length - 1 ? "1px white" : "none" }}>{word}</span>
                            ))}
                        </motion.h2>
                    </div>

                    <p className="text-xl md:text-2xl text-accent font-serif italic leading-snug max-w-sm">
                        {pillar.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {pillar.tags.map((tag, i) => (
                            <span key={i} className="text-[8px] font-black tracking-[0.2em] px-4 py-2 border border-white/10 rounded-full text-accent uppercase">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <button className="group flex items-center gap-6 text-accent hover:text-[#3CFF8F] transition-colors duration-500">
                        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#3CFF8F]/50 transition-colors duration-500">
                            <Plus size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                        </div>
                        <span className="text-xs font-black tracking-[0.5em] uppercase">Protocol Details</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default function FracturedServices() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <section ref={containerRef} className="relative bg-[#030305] h-[800vh] overflow-hidden">
            {/* Global Background Elements */}
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center">
                
                {/* 1. Cinematic Dust/Grain Overlay */}
                <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                
                {/* 2. Abstract Grid Lines */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                     style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '10vw 10vw'}} />

                {/* 3. Floating HUD Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-12 left-12 right-12 flex justify-between items-start">
                        <div className="text-[10px] font-black text-accent tracking-[1em] uppercase">SYSTEM.06 // OPERATIONAL_CORE</div>
                        <div className="text-[10px] font-black text-accent tracking-[1em] uppercase">LAT: 28.6139 N // LONG: 77.2090 E</div>
                    </div>
                </div>

                {/* 4. Slides Engine */}
                <div className="relative h-full w-full">
                    {pillars.map((pillar, i) => (
                        <ServiceSlide key={i} pillar={pillar} index={i} total={pillars.length} progress={smoothProgress} />
                    ))}
                </div>
            </div>
        </section>
    );
}
