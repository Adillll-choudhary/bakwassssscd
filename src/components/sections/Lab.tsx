"use client";

import { motion, useMotionValue } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { usePerformance } from "@/hooks/usePerformance";
import dynamic from "next/dynamic";

const InteractiveParticles = dynamic(() => import("@/components/canvas/InteractiveParticles"), { ssr: false });

const processSteps = [
    {
        num: "01",
        title: "Discovery",
        desc: "We get on a call, understand your goals, your brand, and your market."
    },
    {
        num: "02",
        title: "Strategy",
        desc: "We build a custom plan — no templates, no guesswork, just what works for you."
    },
    {
        num: "03",
        title: "Execution",
        desc: "We move fast. Design, development, content — all delivered with precision."
    },
    {
        num: "04",
        title: "Results",
        desc: "We track, optimize, and make sure your investment performs."
    }
];

export default function Lab() {
    const { isMobile } = usePerformance();
    const containerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Mouse tilt effect (kept to not break existing particle interaction container setup)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <section id="lab" className="py-12 md:py-16 relative bg-[#030304] overflow-hidden flex flex-col justify-center min-h-screen" ref={containerRef} onMouseMove={handleMouseMove}>

            {/* Interactive 3D Particles Background */}
            <div className="absolute inset-0 z-0">
                {/* Massive Atmospheric Green Glow */}
                <div className="absolute top-1/2 right-0 md:-right-[10%] -translate-y-1/2 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-[#00FF55]/10 md:bg-[#00FF55]/15 blur-[100px] md:blur-[200px] rounded-full pointer-events-none z-0"></div>

                {mounted && !isMobile ? (
                    <InteractiveParticles />
                ) : (
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0c1f10] via-[#030304] to-[#030304]" />
                )}
                <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#030304] to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#030304] to-transparent z-10 pointer-events-none" />
            </div>

            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 opacity-[0.03]" 
                     style={{ 
                         backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                         backgroundSize: '80px 80px' 
                     }} 
                />
            </div>

            <div className="w-full px-6 md:px-12 xl:px-24 relative z-10 flex flex-col">
                <div className="max-w-[900px] xl:-ml-4">
                    {/* Header */}
                    <div className="flex flex-col items-start text-left mb-8 md:mb-10 relative mt-8 md:mt-12">
                        {/* Decorative line */}
                        <div className="absolute -left-6 md:-left-12 top-2 w-[2px] h-16 bg-gradient-to-b from-accent to-transparent opacity-50 hidden md:block" />

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-5xl md:text-6xl lg:text-7xl font-light tracking-normal leading-[0.9] mb-4 drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                        >
                            <span className="font-sans text-white font-medium uppercase tracking-tight mr-4">How We</span>
                            <span className="font-siestha text-transparent bg-clip-text bg-gradient-to-r from-[#A8BEA4] via-[#00ff88] to-[#A8BEA4] drop-shadow-[0_0_20px_rgba(0,255,136,0.4)] inline-block px-8 py-8 -mx-8 -my-8 leading-normal">Work</span>
                        </motion.h2>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="text-accent/80 text-base md:text-lg font-light leading-relaxed font-sans max-w-2xl pl-0 md:pl-8 border-l-0 md:border-l border-white/5"
                        >
                            We believe in a structured yet adaptable approach. Our process is designed to eliminate guesswork, align with your core goals, and execute with precision, turning complex challenges into streamlined digital experiences.
                        </motion.p>
                    </div>
                </div>

                {/* 4 Process Steps in 2x2 Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-1/2 border-y md:border-r border-white/[0.1] backdrop-blur-[2px]">
                    {processSteps.map((step, index) => {
                        let borderClasses = "";
                        if (index === 0) borderClasses = "border-b md:border-r border-white/[0.1]";
                        else if (index === 1) borderClasses = "border-b border-white/[0.1]";
                        else if (index === 2) borderClasses = "border-b md:border-b-0 md:border-r border-white/[0.1]";

                        return (
                            <motion.div 
                                key={step.num}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                                className={`relative flex flex-col p-5 md:p-8 xl:p-10 group hover:bg-white/[0.03] transition-colors duration-500 overflow-hidden ${borderClasses}`}
                            >
                            {/* Hover Glow Effect */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-0 transition-all duration-700 ease-out" />
                            <div className="absolute -inset-px bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-none pointer-events-none" />

                            <div className="flex items-end justify-between mb-6 relative z-10">
                                <span className="font-mono text-accent/40 group-hover:text-accent text-xs md:text-sm tracking-widest transition-colors duration-500">
                                    // 0{index + 1}
                                </span>
                            </div>

                            <h3 className="font-siestha text-white text-3xl md:text-4xl mb-4 group-hover:text-accent transition-colors duration-500 relative z-10">
                                {step.title}
                            </h3>
                            
                            <p className="font-sans text-white/50 group-hover:text-white/80 text-xs md:text-sm leading-relaxed font-light transition-colors duration-500 relative z-10">
                                {step.desc}
                            </p>
                        </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
