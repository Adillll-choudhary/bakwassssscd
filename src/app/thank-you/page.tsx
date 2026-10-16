"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Calendar, Clock, ArrowRight, Play, RefreshCcw, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function ThankYouPage() {
    return (
        <div className="min-h-screen bg-[#030305] text-accent selection:bg-[#3CFF8F]/30 selection:text-accent pt-40 pb-32 px-6 overflow-hidden relative">
            
            {/* ─── CINEMATIC BACKGROUND ENGINE ─── */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#3CFF8F]/10 blur-[160px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#064E3B]/20 blur-[140px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                
                {/* ─── HERO: THE EDITORIAL STATEMENT ─── */}
                <header className="mb-40">
                    <div className="relative">
                        <motion.h1 
                            initial={{ y: 60, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="font-serif italic text-6xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight mb-12 relative z-10"
                        >
                            You’re in. <br/>
                            <span className="bg-gradient-to-r from-white via-white/70 to-white/90 bg-clip-text text-transparent">Let’s build.</span>
                        </motion.h1>
                    </div>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="text-accent text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-12 font-sans"
                    >
                        Your discovery session is officially integrated. We have dispatched the meeting coordinates to your primary digital channel.
                    </motion.p>
                </header>

                {/* ─── NEXT STEPS: ARCHITECTURAL GRID ─── */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-48 border-t border-b border-white/5">
                    {[
                        {
                            num: "01",
                            title: "Dispatch",
                            text: "Formal confirmation and calendar assets have been dispatched to your inbox."
                        },
                        {
                            num: "02",
                            title: "Integration",
                            text: "Sync the session to your primary executive calendar to ensure perfect alignment."
                        },
                        {
                            num: "03",
                            title: "Execution",
                            text: "Join the secure link punctually. We prioritize high-performance strategic dialogue."
                        }
                    ].map((step, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className={`p-12 md:p-16 relative group ${i !== 2 ? 'md:border-r border-white/5' : ''}`}
                        >
                            <span className="absolute top-10 right-10 font-serif italic text-8xl text-accent/[0.03] group-hover:text-[#3CFF8F]/10 transition-colors duration-700 pointer-events-none">
                                {step.num}
                            </span>
                            <div className="relative z-10">
                                <span className="text-[#3CFF8F] font-syne font-bold text-[9px] uppercase tracking-[0.3em] block mb-12 opacity-50">Step {step.num}</span>
                                <h3 className="text-3xl font-serif italic mb-6 text-accent">{step.title}</h3>
                                <p className="text-accent text-sm leading-loose max-w-[260px] font-sans tracking-wide">{step.text}</p>
                            </div>
                            {/* Animated Line Accent */}
                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3CFF8F]/30 group-hover:w-full transition-all duration-1000 ease-out" />
                        </motion.div>
                    ))}
                </section>

                {/* ─── VALUE: MONOLITHIC STATEMENT ─── */}
                <section className="mb-64 border-t border-white/5 pt-32 text-center">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="font-syne font-bold text-[11px] uppercase tracking-[0.5em] text-accent mb-12 block"
                    >
                        The Coldune Standard
                    </motion.span>
                    <motion.h2 
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="font-serif italic text-6xl md:text-8xl lg:text-9xl mb-12 leading-[0.9] tracking-tighter"
                    >
                        Beyond <br/>
                        <span className="bg-gradient-to-r from-white via-[#3CFF8F] to-white bg-clip-text text-transparent italic">Execution.</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        className="text-accent text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-light font-sans"
                    >
                        We engineer digital legacies. You have initiated a partnership with an agency that prioritizes cinematic quality and strategic impact over the status quo. 
                    </motion.p>
                </section>

                {/* ─── FOOTER: THE AGENCY SEAL ─── */}
                <footer className="pt-24 border-t border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                        <div>
                            <h4 className="font-serif italic text-5xl mb-6 text-accent">Coldune Studio</h4>
                            <p className="font-syne font-bold text-[10px] uppercase tracking-[0.5em] text-accent">© 2026 Creative Engineering</p>
                        </div>
                        
                        <div className="flex flex-col items-start md:items-end gap-10">
                            <div className="flex gap-12">
                                <Link href="/" className="group flex items-center gap-2 font-syne font-bold text-[10px] uppercase tracking-[0.2em] text-accent hover:text-accent transition-colors">
                                    Return to Nexus
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </Link>
                                <button className="group flex items-center gap-2 font-syne font-bold text-[10px] uppercase tracking-[0.2em] text-accent hover:text-[#3CFF8F] transition-colors">
                                    Reschedule
                                    <RefreshCcw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-700" />
                                </button>
                            </div>
                            <div className="text-left md:text-right">
                                <p className="text-accent text-[10px] font-bold uppercase tracking-widest mb-2">Inquiries</p>
                                <a href="mailto:hello@coldunestudio.com" className="text-sm md:text-base font-sans text-accent hover:text-[#3CFF8F] transition-colors">hello@coldunestudio.com</a>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>

            {/* Background Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] contrast-150 brightness-50" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
        </div>
    );
}
