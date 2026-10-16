"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Car, User, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function CaseStudiesSelection() {
    const router = useRouter();
    const x = useMotionValue(0);
    const [isNavigating, setIsNavigating] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // 1. Navigation transforms (Hooks - MUST be at top level before any return)
    const leftScale = useTransform(x, [0, -150], [1, 1.4]);
    const rightScale = useTransform(x, [0, 150], [1, 1.4]);
    const leftOpacity = useTransform(x, [0, -100], [0.4, 1]);
    const rightOpacity = useTransform(x, [0, 100], [0.4, 1]);

    const handleBg = useTransform(x, [-100, 0, 100], [
        "rgba(251,146,60,0.5)", 
        "rgba(255,255,255,0.15)", 
        "rgba(172,200,162,0.5)"
    ]);

    const arrowLeftX = useTransform(x, [-100, -50, 0], [-10, -5, 0]);
    const arrowRightX = useTransform(x, [0, 50, 100], [0, 5, 10]);

    // This was the cause of the Hook error - moved to top level
    const statusLabelOpacity = useTransform(x, [-100, 0, 100], [1, 0, 1]);

    const handleDragEnd = () => {
        const currentPos = x.get();
        if (currentPos < -120) {
            setIsNavigating(true);
            router.push("/case-studies/bimbra-4x4");
        } else if (currentPos > 120) {
            setIsNavigating(true);
            router.push("/case-studies/arjun-fauzdarr");
        } else {
            x.set(0);
        }
    };

    // EARLY RETURN MUST BE AFTER ALL HOOKS
    if (!isMounted) {
        return <div className="h-screen w-full bg-[#020202]" />;
    }

    return (
        <main className="h-screen w-full flex flex-col items-center justify-center bg-[#020202] overflow-hidden relative touch-none select-none">
            {/* Tactical Grid Background */}
            <div 
                className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
            />
            <div className="absolute inset-0 bg-[#020202]/80 z-[5] pointer-events-none" />

            {/* Header HUD */}
            <header className="relative z-10 mb-20 md:mb-32 text-center px-6 pointer-events-none">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full mb-6 md:mb-10 backdrop-blur-3xl"
                >
                    <Sparkles size={10} className="text-accent" />
                    <span className="text-accent font-mono text-[9px] tracking-[0.4em] uppercase font-black italic">
                        Nexus Hub L1 // Selection
                    </span>
                </motion.div>
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-[8rem] font-serif font-black italic text-accent tracking-tighter leading-none"
                >
                    Slide to <span className="text-accent">Select</span>
                </motion.h1>
            </header>

            {/* Background Symbols (Desktop Only) */}
            <div className="hidden md:flex absolute inset-0 z-0 opacity-10 pointer-events-none items-center justify-between px-[5vw]">
                <Car size={500} strokeWidth={0.2} className="text-orange-500/30 -scale-x-100 rotate-[-10deg]" />
                <User size={500} strokeWidth={0.2} className="text-accent/30 rotate-[10deg]" />
            </div>

            {/* The Selection Interface */}
            <div className="relative z-20 w-full max-w-2xl px-6">
                
                {/* Brand Labels */}
                <div className="absolute inset-x-0 -top-20 md:-top-28 flex justify-between items-end px-10 md:px-16 pointer-events-none">
                    <motion.div style={{ scale: leftScale, opacity: leftOpacity }} className="text-left origin-bottom-left">
                        <p className="text-orange-500 font-mono text-[10px] md:text-[11px] tracking-[0.3em] font-black uppercase mb-2">Automotive /_</p>
                        <h4 className="text-2xl md:text-5xl text-accent font-serif italic font-black drop-shadow-2xl">Bimbra 4x4</h4>
                    </motion.div>
                    <motion.div style={{ scale: rightScale, opacity: rightOpacity }} className="text-right origin-bottom-right">
                        <p className="text-accent font-mono text-[10px] md:text-[11px] tracking-[0.3em] font-black uppercase mb-2">_/ Creator Path</p>
                        <h4 className="text-2xl md:text-5xl text-accent font-serif italic font-black drop-shadow-2xl">Arjun Fauzdarr</h4>
                    </motion.div>
                </div>

                {/* Glass Slider Track */}
                <div className="relative w-full h-[110px] md:h-[140px] bg-white/[0.04] border border-white/20 rounded-[55px] md:rounded-[70px] p-[6px] md:p-[8px] shadow-[0_0_100px_rgba(0,0,0,0.5)] flex items-center">
                    
                    {/* Track Watermark */}
                    <div className="absolute inset-x-0 flex justify-center pointer-events-none opacity-20">
                        <span className="text-[9px] font-mono tracking-[0.4em] uppercase font-black">Archive Navigation Ways</span>
                    </div>

                    {/* Draggable Handle */}
                    <div className="relative flex-1 h-full flex items-center justify-center">
                        <motion.div
                            drag="x"
                            dragConstraints={{ left: -140, right: 140 }}
                            dragElastic={0.05}
                            dragMomentum={false}
                            onDragEnd={handleDragEnd}
                            style={{ x, backgroundColor: handleBg }}
                            className="relative w-[98px] md:w-[124px] h-[98px] md:h-[124px] rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing border border-white/40 shadow-[0_0_50px_rgba(255,255,255,0.1)] backdrop-blur-2xl z-50 transform-gpu will-change-transform transition-colors active:scale-95 duration-200"
                        >
                            {/* Visual Arrows */}
                            <div className="flex items-center gap-[8px] md:gap-[12px] text-accent">
                                <motion.div style={{ x: arrowLeftX }}>
                                    <ArrowLeft size={24} strokeWidth={3} className="text-accent drop-shadow-[0_0_10px_rgba(251,146,60,0.4)]" />
                                </motion.div>
                                <div className="w-[2px] h-6 bg-white/10" />
                                <motion.div style={{ x: arrowRightX }}>
                                    <ArrowRight size={24} strokeWidth={3} className="text-accent drop-shadow-[0_0_10px_rgba(172,200,162,0.4)]" />
                                </motion.div>
                            </div>

                            {/* State Badge */}
                            <motion.div 
                                style={{ 
                                    opacity: statusLabelOpacity,
                                    y: -20
                                }}
                                className="absolute -top-14 px-4 py-1.5 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-full flex items-center gap-2 pointer-events-none"
                            >
                                <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />
                                <span className="text-[8px] font-mono tracking-widest uppercase font-black text-accent">Target Locked</span>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Footer Markers */}
            <footer className="absolute bottom-12 flex flex-col items-center gap-4 z-10 opacity-30 pointer-events-none">
                <p className="text-[9px] font-mono text-accent uppercase tracking-[0.5em] font-black italic">Coldune Visual Hub // Nexus Prototype</p>
            </footer>

            {/* Loading Cinematic Overlay */}
            {isNavigating && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-[#020202] z-[100] flex flex-col items-center justify-center p-24"
                >
                    <div className="w-16 h-16 rounded-full border-2 border-white/5 border-t-accent animate-spin mb-8" />
                    <h4 className="text-accent font-mono text-[9px] tracking-[1.5em] font-black uppercase animate-pulse">Establishing Narrative Connection...</h4>
                </motion.div>
            )}
        </main>
    );
}
