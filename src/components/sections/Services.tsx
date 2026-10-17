"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Caveat } from "next/font/google";
import ServicesScene from "@/components/canvas/ServicesScene";
import ParticleConnectors from "@/components/canvas/ParticleConnectors";
import { useScramble } from "@/hooks/useScramble";

const caveat = Caveat({ subsets: ["latin"], weight: "400" });

const allServices = [
    { title: "Website Design and\nDevelopment", category: "Core", index: "01" },
    { title: "Branding and Identity", category: "Core", index: "02" },
    { title: "Social Media\nManagement", category: "Core", index: "03" },
    { title: "SEO Growth", category: "Core", index: "04" },
    { title: "Performance Marketing", category: "Core", index: "05" },
    { title: "AI Automations", category: "Core", index: "06" },
];

function HudServiceItem({ 
    title, 
    index, 
    align, 
    setRef, 
    onHover, 
    onLeave 
}: { 
    title: string; 
    index: number; 
    align: 'left' | 'right' | 'center'; 
    setRef: (el: HTMLElement | null) => void; 
    onHover: () => void; 
    onLeave: () => void; 
}) {
    const { scrambledText, scramble, reset } = useScramble(title);
    
    const isCenter = align === 'center';

    return (
        <motion.div 
            ref={setRef as any}
            initial={{ opacity: 0, x: isCenter ? 0 : (align === 'left' ? -20 : 20), y: isCenter ? 20 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            style={isCenter ? {} : { 
                transform: `translateX(${align === 'left' ? Math.sin(index * 2.5) * 40 + (index === 1 ? 120 : 0) : Math.sin(index * 2.5) * -40 - (index === 3 ? 120 : 0)}px)`,
                marginTop: index === 0 ? '-120px' : (index === 5 || index === 2 ? '120px' : '0px'),
                marginBottom: index === 0 ? '60px' : (index === 5 || index === 2 ? '-60px' : '0px')
            }}
            className={`flex items-center gap-4 md:gap-8 group cursor-crosshair ${align === 'right' ? 'flex-row-reverse' : ''} ${isCenter ? 'justify-center w-full py-4' : ''}`}
            onMouseEnter={() => { scramble(); onHover(); }}
            onMouseLeave={() => { reset(); onLeave(); }}
        >
            <span 
                className={`font-universo uppercase text-xl md:text-lg lg:text-xl tracking-wider text-[#A8BEA4]/70 group-hover:text-[#A8BEA4] group-hover:drop-shadow-[0_0_10px_rgba(168,190,164,0.6)] transition-all duration-300 flex flex-col ${isCenter ? 'text-center' : ''}`}
            >
                {scrambledText.split('\n').map((line, i) => (
                    <span key={i} className={`whitespace-nowrap ${i > 0 && !isCenter ? (align === 'left' ? 'text-right' : 'text-left') : ''}`}>
                        {line}
                    </span>
                ))}
            </span>
            {!isCenter && (
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.05)] group-hover:border-[#00ff88]/60 group-hover:shadow-[0_0_15px_rgba(0,255,136,0.6)] transition-all duration-300 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/20 group-hover:bg-[#00ff88] transition-colors duration-300 group-hover:shadow-[0_0_10px_#00ff88]" />
                </div>
            )}
        </motion.div>
    );
}

export default function Services() {
    const containerRef = useRef<HTMLDivElement>(null);
    const serviceRefs = useRef<(HTMLElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            setIsMobile(true);
        }
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax: Logo moves down while scrolling down
    const logoY = useTransform(scrollYProgress, [0, 1], [-300, 300]);

    return (
        <section 
            id="services" 
            ref={containerRef}
            className="relative bg-transparent w-full h-screen font-sans overflow-visible z-10"
        >

            {/* --- IMMERSIVE CINEMATIC OVERLAP ZONE --- */}
            {/* 1. Deep Emerald Atmospheric Haze (Begins 1000px early) */}
            <div 
                className="absolute top-[-1000px] left-0 w-full h-[2500px] pointer-events-none z-0"
                style={{
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(6,78,59,0.05) 30%, rgba(0,255,136,0.1) 50%, transparent 80%)'
                }}
            />

            {/* 2. Soft Volumetric Light Diffusion (Wide Spread) */}
            <div 
                className="absolute top-[-800px] left-1/2 -translate-x-1/2 w-[150vw] h-[2000px] pointer-events-none opacity-40 hidden md:block"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(99,232,29,0.1) 0%, rgba(6,78,59,0.05) 40%, transparent 70%)',
                }}
            />

            {/* 3. Core Brighter Services Glow (Centered above Logo) */}
            <div 
                className="absolute top-[-500px] left-1/2 -translate-x-1/2 w-[100vw] h-[1500px] pointer-events-none opacity-40 hidden md:block"
                style={{
                    background: 'radial-gradient(circle at center, rgba(99,232,29,0.1) 0%, transparent 60%)',
                }}
            />

            {/* Ambient Glow Bleeding Downwards into Spectrum */}
            <div className="absolute bottom-[-500px] left-1/2 -translate-x-1/2 w-[1200px] h-[1000px] bg-accent/5 rounded-full pointer-events-none z-50 opacity-30 hidden md:block" />

            {/* The active WebGL particle ring sitting in the exact center */}
            {!isMobile && (
                <motion.div style={{ y: logoY }} className="absolute inset-0 z-10 flex items-center justify-center">
                    {/* Bright Glowing Aura Blur behind the logo */}
                    <div 
                        className="absolute w-[600px] h-[600px] pointer-events-none rounded-full"
                        style={{
                            background: 'radial-gradient(circle at center, rgba(0, 255, 136, 0.05) 0%, transparent 70%)',
                        }}
                    />
                    <ServicesScene scrollProgress={1} />
                </motion.div>
            )}

            {/* The Neural Network Particle Connectors */}
            {!isMobile && (
                <ParticleConnectors targets={serviceRefs} activeTargetIndex={activeIndex} logoY={logoY} />
            )}

            {/* Top Left Title */}
            {/* --- GIANT ABSOLUTE TITLE --- */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="absolute -top-24 md:-top-32 lg:-top-64 left-0 w-full z-30 pointer-events-none flex flex-col items-start gap-0 whitespace-nowrap ml-[2%] -mt-[10%]"
            >
                <span className="text-[11vw] md:text-[8rem] lg:text-[11rem] font-universo font-black uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] inline-block leading-[0.8] -translate-y-2 md:-translate-y-4 lg:-translate-y-6">
                    The
                </span>
                <div className="flex items-end justify-start gap-4 md:gap-8 -mt-2 md:-mt-6 lg:-mt-8">
                    <span className="text-[11vw] md:text-[8rem] lg:text-[11rem] font-universo font-black uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] inline-block leading-[0.8]">
                        Intersection
                    </span>
                </div>
                <div className="flex items-end justify-start gap-4 md:gap-8 -mt-2 md:-mt-6 lg:-mt-8">
                    <span className="text-[11vw] md:text-[8rem] lg:text-[11rem] font-universo font-black uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] inline-block leading-[0.8]">
                        Of Art
                    </span>
                    <span className="text-[16vw] md:text-[8rem] lg:text-[11rem] font-siestha normal-case text-[#3CFF8F] -rotate-[8deg] inline-block px-4 py-4 -mx-4 -my-4 leading-none md:-translate-y-4 tracking-tighter" style={{ textShadow: "0 4px 30px rgba(60,255,143,0.4)" }}>
                        Strategy
                    </span>
                </div>
            </motion.div>
            {/* HUD Typography Container (Frames the logo) */}
            <div className="absolute inset-0 z-20 pointer-events-none p-6 md:px-8 lg:px-12 xl:px-20 flex flex-col md:flex-row justify-center md:justify-between items-center h-full pt-32 md:pt-0">
                
                {/* Mobile Single Column View */}
                <div className="flex md:hidden flex-col items-center gap-8 pointer-events-auto w-full">
                    {allServices.map((service, index) => (
                        <HudServiceItem 
                            key={index} 
                            title={service.title} 
                            index={index} 
                            align="center" 
                            setRef={(el) => (serviceRefs.current[index] = el)}
                            onHover={() => setActiveIndex(index)}
                            onLeave={() => setActiveIndex(null)}
                        />
                    ))}
                </div>

                {/* Left Column HUD (Desktop) */}
                <div className="hidden md:flex flex-col items-start gap-16 md:gap-24 lg:gap-32 pointer-events-auto mt-16">
                    {allServices.slice(0, 3).map((service, index) => (
                        <HudServiceItem 
                            key={index} 
                            title={service.title} 
                            index={index} 
                            align="left" 
                            setRef={(el) => (serviceRefs.current[index] = el)}
                            onHover={() => setActiveIndex(index)}
                            onLeave={() => setActiveIndex(null)}
                        />
                    ))}
                </div>

                {/* Right Column HUD (Desktop) */}
                <div className="hidden md:flex flex-col items-end gap-16 md:gap-24 lg:gap-32 pointer-events-auto mt-16">
                    {allServices.slice(3, 6).map((service, index) => (
                        <HudServiceItem 
                            key={index + 3} 
                            title={service.title} 
                            index={index + 3} 
                            align="right" 
                            setRef={(el) => (serviceRefs.current[index + 3] = el)}
                            onHover={() => setActiveIndex(index + 3)}
                            onLeave={() => setActiveIndex(null)}
                        />
                    ))}
                </div>

            </div>

        </section>
    );
}
