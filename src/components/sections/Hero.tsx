"use client";

import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { usePerformance } from "@/hooks/usePerformance";
import BackgroundScrollSequence from "../canvas/BackgroundScrollSequence";
import GreenParticles from "../ui/GreenParticles";
import { useContactModal } from "@/context/ContactModalContext";
import RevealHeading from "../ui/RevealHeading";
import RevealText from "../ui/RevealText";

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const { isMobile } = usePerformance();
    const { openModal } = useContactModal();
    const [hasPreloaded, setHasPreloaded] = useState(false);

    useEffect(() => {
        const handleComplete = () => {
            setHasPreloaded(true);
        };
        window.addEventListener('preloader-complete', handleComplete);
        if ((window as any).preloaderDone) {
            setHasPreloaded(true);
        }
        
        // Failsafe to ensure text appears if preloader is somehow skipped (set to 6s to allow the 4s preloader to finish normally)
        const timer = setTimeout(() => setHasPreloaded(true), 6000);

        return () => {
            window.removeEventListener('preloader-complete', handleComplete);
            clearTimeout(timer);
        };
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // Final Choreography (Restored):
    // - Scroll Hint: Image 0 to 12
    // - Hero Text: Appears at Image 10, Stays until the absolute end (1.0)
    // - Static: No Y-movement or shrinking during scroll
    // Mapping frames to progress (Total Frames: 80)
    // Frame 40 = 0.5 progress
    // Frame 60 = 0.75 progress
    
    // Line 1: Fades out as scroll begins
    const line1Opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    
    // Line 2: Fades out on scroll, then RE-APPEARS between frame 40 and 60
    const line2Opacity = useTransform(scrollYProgress, [0, 0.1, 0.4, 0.55, 0.75, 0.98], [1, 0, 0, 1, 1, 0]);

    // Hero background fades to black at end of scroll section
    const heroOpacity = useTransform(scrollYProgress, [0.97, 1], [1, 0]);

    return (
        <section ref={sectionRef} className="relative w-full h-[250vh] bg-transparent">
            {/* 1. Background Scroll Sequence (Sticky) */}
            <motion.div style={{ opacity: heroOpacity }} className="fixed inset-0 z-0 pointer-events-none">
                <BackgroundScrollSequence hasPreloaded={hasPreloaded} scrollProgress={scrollYProgress} />
            </motion.div>

            {/* Overlay Layers for Depth */}
            <motion.div style={{ opacity: heroOpacity }} className="fixed inset-0 z-10 pointer-events-none" aria-hidden="true">
                {/* Dynamic WebGL Particle Engine (Desktop Only) */}
                <div className="absolute inset-0 z-0 pointer-events-none hidden md:block opacity-60">
                    <GreenParticles />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#08090B]/60 via-transparent to-[#08090B]/90 z-10" />
                
                {/* Majestic Light Core Glow (Hidden on Mobile for performance) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] hidden md:block" />
                
                {/* HUD Frame */}
                <div className="absolute inset-4 md:inset-10 border border-white/[0.03] rounded-[3rem]" />
            </motion.div>

            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-40">
                {/* Center Content Container */}
                <div className="relative w-full px-6 flex flex-col items-start justify-center text-left">
                    
                    {/* Cinematic Hook: Elite Hybrid Typography */}
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-start w-full gap-2 md:gap-4 py-10 px-6 md:px-12 mt-12 md:mt-24 text-left">
                        <motion.div style={{ opacity: line1Opacity }}>
                            <RevealText 
                                triggerOnScroll={false} 
                                active={hasPreloaded}
                                delay={0.2}
                                className="text-3xl md:text-5xl lg:text-7xl font-universo font-black text-white uppercase tracking-[0.2em] leading-[0.9] text-left"
                            >
                                ARE YOU<br />BORED WITH<br />BEING
                            </RevealText>
                        </motion.div>
                        
                        <motion.div style={{ opacity: line1Opacity }} className="transform translate-y-4 md:translate-y-8 -translate-x-4 md:-translate-x-[380px] -rotate-[6deg]">
                            <RevealHeading 
                                preset="A" 
                                triggerOnScroll={false} 
                                active={hasPreloaded}
                                delay={0.4}
                                className="text-6xl md:text-[7rem] font-siestha font-light tracking-normal whitespace-nowrap"
                            >
                                <span className="relative inline-block px-4">
                                    <span className="text-[#3CFF8F] drop-shadow-[0_0_20px_rgba(60,255,143,0.4)] inline-block leading-normal">
                                        Ordinary?
                                    </span>
                                    {/* Curved Swoosh Line */}
                                    <svg
                                        viewBox="0 0 300 30"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="absolute -bottom-1 md:-bottom-3 left-0 w-full h-auto pointer-events-none"
                                        aria-hidden="true"
                                    >
                                        <motion.path
                                            d="M5 18 Q150 -2, 295 16"
                                            stroke="#3CFF8F"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            fill="none"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={hasPreloaded ? { pathLength: 1, opacity: 1 } : {}}
                                            transition={{ duration: 1.5, delay: 1.0, ease: "easeInOut" }}
                                        />
                                    </svg>
                                </span>
                            </RevealHeading>
                        </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={hasPreloaded ? { opacity: 1, y: 0 } : {}}
                        style={{ opacity: line1Opacity }}
                        transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                        className="mt-24 md:mt-32 w-full px-6 md:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-start gap-6"
                    >
                        {/* Check Our Work Button */}
                        <div className="pointer-events-auto">
                            <button
                                onClick={() => document.getElementById('spectrum')?.scrollIntoView({ behavior: 'smooth' })}
                                className="flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-[#3CFF8F] hover:bg-[#3CFF8F]/10 transition-colors rounded-sm text-[#3CFF8F] font-universo font-black text-lg md:text-xl tracking-wider uppercase shadow-lg"
                            >
                                <span>Check Our Work</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter" className="-mt-1">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </button>
                        </div>

                        {/* Discovery Call Button */}
                        <div className="pointer-events-auto">
                            <button
                                onClick={() => window.open('https://calendly.com/coldunestudio/30min', '_blank', 'noopener,noreferrer')}
                                className="flex items-center gap-3 px-8 py-4 bg-[#3CFF8F] hover:bg-[#3CFF8F]/90 transition-colors rounded-sm text-black font-universo font-black text-lg md:text-xl tracking-wider uppercase shadow-lg"
                            >
                                <span>Book a Discovery Call</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter" className="-mt-1">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>

                </div>

                <motion.div
                    suppressHydrationWarning
                    style={{ opacity: line1Opacity }}
                    className="absolute bottom-16 flex flex-col items-center pointer-events-none"
                >
                    <span className="text-[10px] md:text-xs font-serif uppercase tracking-[0.5em] text-accent mb-4">
                        Unlock The Experience
                    </span>
                    <div className="w-px h-12 bg-gradient-to-b from-accent/50 to-transparent" />
                </motion.div>

                {/* Bottom Right Manifesto */}
                <motion.div
                    suppressHydrationWarning
                    style={{ opacity: line1Opacity }}
                    className="absolute bottom-16 right-6 md:right-12 hidden md:flex flex-col items-end text-right pointer-events-none"
                >
                    <RevealText 
                        triggerOnScroll={false}
                        active={hasPreloaded}
                        delay={1.2}
                        className="text-lg md:text-xl font-universo font-black text-white uppercase tracking-wide"
                    >
                        Built Different
                    </RevealText>
                    <RevealText
                        triggerOnScroll={false}
                        active={hasPreloaded}
                        delay={1.4}
                        className="text-lg md:text-xl font-universo font-black text-white uppercase tracking-wide"
                    >
                        Measured Relentlessly
                    </RevealText>
                </motion.div>
            </div>
        </section>
    );
}
