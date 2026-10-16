"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import LegalModal from "../ui/LegalModal";
import RevealHeading from "../ui/RevealHeading";
import RevealText from "../ui/RevealText";

const headlines = [
  "something beautiful",
  "something original",
  "something impactful",
  "something iconic"
];

export default function Footer() {
    const [index, setIndex] = useState(0);
    const [legalState, setLegalState] = useState<{ isOpen: boolean; type: "privacy" | "terms" }>({
        isOpen: false,
        type: "privacy"
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % headlines.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const openLegal = (type: "privacy" | "terms") => {
        setLegalState({ isOpen: true, type });
    };

    return (
        <footer className="w-full bg-[#030305] text-accent py-24 md:py-40 relative">
            <LegalModal 
                isOpen={legalState.isOpen} 
                onClose={() => setLegalState(prev => ({ ...prev, isOpen: false }))} 
                type={legalState.type} 
            />

            <div className="container mx-auto px-6 md:px-12">
                
                {/* Top Section: Headline + Illustration */}
                <div className="flex flex-col lg:flex-row items-start justify-between gap-16 md:gap-24 mb-32 md:mb-48">
                    <div className="lg:w-7/12">
                        <h2 className="text-[12vw] md:text-[5.5rem] font-bold leading-[1] tracking-tight text-accent max-w-3xl">
                            <RevealHeading preset="B" className="inline-block">Let's make <span className="text-[#3CFF8F]">→</span></RevealHeading><br />
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={headlines[index]}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="block"
                                >
                                    {headlines[index]}
                                </motion.span>
                            </AnimatePresence>
                        </h2>
                    </div>

                    {/* Colorful Abstract Playful Illustration */}
                    <div className="lg:w-5/12 w-full flex justify-end">
                        <div className="relative w-full max-w-sm aspect-square">
                            <motion.svg 
                                viewBox="0 0 500 500" 
                                className="w-full h-full"
                                initial="initial"
                                animate="animate"
                            >
                                {/* Yellow Circle */}
                                <motion.circle
                                    cx="150" cy="180" r="80"
                                    fill="#FACC15"
                                    animate={{
                                        x: [0, 20, 0],
                                        y: [0, -20, 0],
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                />
                                {/* Cyan Loop/Shape */}
                                <motion.path
                                    d="M250,100 C350,100 450,200 450,300 C450,400 350,450 250,400 C150,350 150,200 250,100 Z"
                                    fill="#22D3EE"
                                    className="mix-blend-screen opacity-60"
                                    animate={{
                                        rotate: [0, 360],
                                        scale: [1, 0.9, 1]
                                    }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                />
                                {/* Magenta Organic Shape */}
                                <motion.path
                                    d="M100,300 Q150,200 300,350 T450,300 Q400,450 250,450 T100,300"
                                    fill="#F472B6"
                                    className="mix-blend-screen opacity-60"
                                    animate={{
                                        x: [0, -30, 0],
                                        y: [0, 30, 0]
                                    }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                />
                                {/* Playful Blobs */}
                                <motion.circle 
                                    cx="350" cy="150" r="30" fill="#3CFF8F"
                                    animate={{ y: [0, 40, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />
                            </motion.svg>
                        </div>
                    </div>
                </div>

                {/* Info & Locations Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-12 mb-32 border-t border-white/5 pt-16">
                    
                    {/* Left: Global Contact */}
                    <div className="space-y-8">
                        <div>
                            <RevealText className="text-accent text-xs uppercase tracking-[0.2em] mb-4">World View</RevealText>
                            <RevealHeading preset="B" className="text-xl md:text-2xl font-medium tracking-tight">🌍 We work globally</RevealHeading>
                        </div>
                        <div className="space-y-4">
                            <a href="#" className="flex items-center gap-2 group text-lg md:text-xl font-medium">
                                Submit a brief 
                                <span className="text-[#3CFF8F] group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                            <a href="mailto:hello@coldunestudio.com" className="block text-lg md:text-xl text-accent hover:text-accent transition-colors underline decoration-white/10 underline-offset-8">
                                hello@coldunestudio.com
                            </a>
                        </div>
                    </div>

                    {/* Middle: USA Location */}
                    <div className="space-y-8">
                        <div>
                            <RevealText className="text-accent text-xs uppercase tracking-[0.2em] mb-4">North America</RevealText>
                            <RevealHeading preset="B" className="text-xl md:text-2xl font-medium mb-1">USA</RevealHeading>
                            <RevealText delay={0.1} className="text-accent text-lg">Los Angeles, CA</RevealText>
                        </div>
                    </div>

                    {/* Middle/Right: India Location */}
                    <div className="space-y-4">
                        <div>
                            <RevealText className="text-accent text-xs uppercase tracking-[0.2em] mb-4">Asia Pacific</RevealText>
                            <RevealHeading preset="B" className="text-xl md:text-2xl font-medium mb-1">India</RevealHeading>
                            <RevealText delay={0.1} className="text-accent text-lg">India, UP, Gr. Noida</RevealText>
                        </div>
                        <div className="flex flex-col gap-2">
                            <a href="tel:+919310024091" className="block text-lg text-accent font-bold tracking-tight hover:text-[#3CFF8F] transition-colors">
                                +91 9310024091
                            </a>
                            <a href="tel:+918397083428" className="block text-lg text-accent font-bold tracking-tight hover:text-[#3CFF8F] transition-colors">
                                +91 8397083428
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-accent font-medium tracking-tight">
                    <div className="flex items-center gap-2">
                        <span>Coldune Studio © 2026</span>
                        <span className="w-1 h-1 bg-white/10 rounded-full" />
                        <button onClick={() => openLegal("privacy")} className="hover:text-accent transition-colors">Privacy</button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            { name: 'Twitter X', href: '#' },
                            { name: 'Instagram', href: 'https://www.instagram.com/coldune.studio/' },
                            { name: 'LinkedIn', href: '#' }
                        ].map((social) => (
                            <a key={social.name} href={social.href} className="flex items-center gap-2 group hover:text-accent transition-colors">
                                {social.name}
                                <span className="w-1.5 h-1.5 bg-[#3CFF8F]/40 group-hover:bg-[#3CFF8F] rounded-full transition-colors" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* ─── MASSIVE BRAND MARQUEE: TRULY EDGE-TO-EDGE ─── */}
            <div className="mt-40 md:mt-64 overflow-hidden select-none pointer-events-none w-full py-10">
                <div className="flex whitespace-nowrap">
                    <motion.h2 
                        initial={{ x: 0 }}
                        animate={{ x: "-50%" }}
                        transition={{ 
                            duration: 25, 
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                        className="text-[22vw] font-syne font-extrabold leading-[0.8] tracking-tighter text-accent uppercase opacity-90 flex gap-20 pr-20"
                    >
                        <span>Coldune Studio</span>
                        <span>Coldune Studio</span>
                    </motion.h2>
                </div>
            </div>
        </footer>
    );
}
