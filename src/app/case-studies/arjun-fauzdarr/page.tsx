"use client";

import { motion } from "framer-motion";
import { TrendingUp, Play, ArrowRight, Zap, Target, Activity, Instagram } from "lucide-react";
import Link from "next/link";

const arjunReels = [
    { id: 1, views: "7M", title: "Viral Storytelling", file: "reel-4.webp" },
    { id: 2, views: "2.7M", title: "Social Interaction", file: "reel-1.webp" },
    { id: 3, views: "1.6M", title: "Personal Narrative", file: "reel-5.webp" },
    { id: 4, views: "159K", title: "Creative Concept", file: "reel-2.webp" },
    { id: 5, views: "110K", title: "Daily Life", file: "reel-3.webp" },
];

export default function ArjunCaseStudy() {
    return (
        <section className="bg-[#030305] text-accent min-h-screen relative overflow-hidden font-sans">
            {/* FLOATING INSTAGRAM BUTTON */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.5, x: 100 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                className="fixed right-6 md:right-8 bottom-24 md:bottom-12 z-[9999]"
            >
                <a 
                    href="https://www.instagram.com/arjunfauzdarr?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-3 md:gap-4 pl-4 md:pl-6 pr-6 md:pr-8 py-3 md:py-4 bg-white/10 backdrop-blur-3xl border border-white/10 rounded-full hover:bg-accent hover:border-accent hover:scale-105 transition-all duration-500 shadow-2xl"
                >
                    <div className="absolute inset-0 rounded-full bg-accent/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
                    <Instagram size={20} className="text-accent group-hover:text-black transition-colors" />
                    <span className="text-accent font-mono text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-black group-hover:text-black transition-colors">Arjun's Live Channel</span>
                </a>
            </motion.div>

            {/* 1. HERO */}
            <header className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden border-b border-white/5 shadow-2xl">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    preload="none"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
                >
                    <source src="/work/videos/SaveVid.Net_AQOKcuG-l-XStZlqMxTPNMlXMTLxb_pN4qpMndgz7IMFAT5ZYaulIrPt5yJPIHf-DoRnq7ohIIRLuQYMqZg3RW8ky1YBAgeb29U2zN4.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-[#030305] z-10" />
                
                <div className="container mx-auto px-6 relative z-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/20 backdrop-blur-xl border border-accent/20 mb-8"
                    >
                        <Zap size={14} className="text-accent animate-pulse" />
                        <span className="text-accent font-mono text-[10px] tracking-[0.4em] uppercase font-bold">Scaling Influencer Impact</span>
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-7xl md:text-[10rem] font-serif font-black text-accent italic tracking-tighter leading-[0.8] mb-12"
                    >
                        Building a brand <br /> 
                        <span className="text-accent">people can't ignore</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-center"
                    >
                        <Link 
                            href="https://www.instagram.com/arjunfauzdarr?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                            target="_blank"
                            className="group relative flex items-center justify-center gap-4 px-10 py-5 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full hover:bg-accent/10 hover:border-accent/40 transition-all duration-300"
                        >
                            <div className="absolute inset-0 rounded-full bg-accent/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                            <TrendingUp size={20} className="text-accent" />
                            <span className="text-accent font-mono text-sm tracking-[0.4em] uppercase font-black">Live Growth Channel →</span>
                        </Link>
                    </motion.div>
                </div>
            </header>

            {/* 2. OVERVIEW & PROBLEM */}
            <section className="py-24 md:py-40 bg-black/40 border-b border-white/5">
                <div className="container mx-auto px-6 md:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <span className="text-[10px] text-accent font-mono uppercase tracking-[0.5em] block mb-4">__Client Overview</span>
                                <p className="text-4xl font-serif font-black text-accent leading-tight pr-12 drop-shadow-xl">
                                    Arjun Fauzdarr is a rising digital creator focused on high-impact storytelling and relatable personal branding.
                                </p>
                            </div>
                            <div className="space-y-4 border-l-2 border-red-500/30 pl-8 bg-red-500/5 py-4 rounded-r-3xl pr-8">
                                <span className="text-[10px] text-red-400 font-mono uppercase tracking-[0.5em] block mb-4">__The Problem</span>
                                <p className="text-xl text-accent leading-relaxed italic">
                                    Arjun had the content but lacked the structural authority. His views were inconsistent, and the brand identity didn't match the quality of his storytelling, leading to missed growth opportunities.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8 p-12 bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[3.5rem] shadow-2xl overflow-hidden relative group">
                            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="space-y-2 relative z-10">
                                <h4 className="text-5xl font-black text-accent tracking-tighter">20K</h4>
                                <p className="text-[9px] text-accent font-mono uppercase tracking-widest font-bold">Initial Peak Views</p>
                            </div>
                            <div className="space-y-2 relative z-10">
                                <h4 className="text-5xl font-black text-red-400 tracking-tighter">Low</h4>
                                <p className="text-[9px] text-accent font-mono uppercase tracking-widest font-bold">Retention Rate</p>
                            </div>
                            <div className="col-span-2 space-y-4 pt-12 mt-12 border-t border-white/5">
                                <div className="flex items-center gap-3">
                                    <Target className="text-accent" size={16} />
                                    <span className="text-[10px] text-accent font-mono uppercase tracking-[0.4em] font-bold">Objective Set // 1M+ Views</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. STRATEGY & SOLUTION */}
            <section className="py-24 md:py-40 relative overflow-hidden overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-accent/5 blur-[200px] pointer-events-none" />
                <div className="container mx-auto px-6 md:px-24 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-24 items-start">
                        <div className="lg:w-1/3">
                            <h2 className="text-6xl font-serif font-black italic text-accent tracking-tighter mb-8 leading-[0.8]">The <br /> Strategy</h2>
                            <div className="w-16 h-1 bg-accent mb-12 shadow-[0_0_15px_rgba(172,200,162,0.8)]" />
                            <p className="text-accent font-mono text-[10px] uppercase tracking-[0.3em] font-bold">System Architecture</p>
                        </div>
                        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
                            {[
                                { title: "Algorithmic Precision", desc: "Redefining content hooks and pacing to match audience retention patterns.", icon: <Activity className="text-accent" /> },
                                { title: "Brand Identity", desc: "Standardizing typography, color palettes, and tone of voice for peak recognition.", icon: <Target className="text-accent" /> },
                                { title: "Virality Vectors", desc: "Creating conversational content 'hacks' designed for massive shareability.", icon: <Zap className="text-accent" /> },
                                { title: "Consistency Core", desc: "Implementing a strict production workflow to ensure multi-weekly high-perf releases.", icon: <Target className="text-accent" /> },
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-10 bg-white/[0.03] border border-white/5 hover:border-accent/30 transition-all rounded-[2.5rem] shadow-xl group border-l-[4px] border-l-transparent hover:border-l-accent"
                                >
                                    <div className="mb-6">{item.icon}</div>
                                    <h4 className="text-xl font-serif font-black text-accent italic mb-4 tracking-tighter group-hover:text-accent transition-colors">{item.title}</h4>
                                    <p className="text-sm text-accent leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. VISUAL SHOWCASE */}
            <section className="py-24 md:py-40 bg-black/60 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <span className="text-[10px] text-accent font-mono uppercase tracking-[0.5em] block mb-4">__Content Grid</span>
                        <h2 className="text-6xl font-serif font-black text-accent italic tracking-tighter leading-tight drop-shadow-2xl">Visual Masterpieces</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-7xl mx-auto">
                        {arjunReels.map((reel, idx) => (
                            <motion.div 
                                key={reel.id}
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group/reel relative aspect-[9/16] rounded-3xl overflow-hidden border border-white/5 shadow-2xl cursor-pointer"
                            >
                                <img 
                                    src={`/case-studies/arjun/${reel.file}`} 
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover/reel:scale-110 opacity-70 group-hover/reel:opacity-100"
                                    alt={reel.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover/reel:opacity-100 transition-opacity" />
                                <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col gap-2">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 backdrop-blur-xl border border-accent/20 w-fit">
                                        <Play size={8} className="fill-accent text-accent" />
                                        <span className="text-[10px] font-bold text-accent font-mono tracking-tighter">{reel.views} Views</span>
                                    </div>
                                    <p className="text-[10px] text-accent font-medium font-mono uppercase tracking-widest line-clamp-1 opacity-100 translate-y-0 group-hover/reel:translate-y-[-4px] transition-transform">{reel.title}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. GROWTH & GRAPH */}
            <section className="py-24 md:py-40 relative">
                <div className="container mx-auto px-6 md:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-12">
                            <h2 className="text-7xl font-serif font-black italic text-accent tracking-tighter leading-[0.85] pr-12 drop-shadow-2xl">Exponential <br /> <span className="text-accent underline decoration-accent/20">Growth Path</span></h2>
                            <p className="text-xl text-accent font-light max-w-lg leading-relaxed italic border-l-2 border-accent/40 pl-8">
                                Within 12 weeks of strategy implementation, metrics surged by over 1000%, transforming a creator into a brand power-house.
                            </p>
                        </div>
                        <div className="p-8 md:p-16 bg-white/[0.03] border border-white/5 backdrop-blur-3xl rounded-[3rem] md:rounded-[4rem] shadow-2xl relative group overflow-hidden text-left">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(172,200,162,0.1),transparent_50%)]" />
                            <div className="space-y-8 md:space-y-12 relative z-10">
                                <div className="flex justify-between items-end">
                                    <div className="space-y-2">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-md mb-4 md:mb-8">
                                            <Zap size={10} className="text-accent animate-pulse" />
                                            <span className="text-accent font-mono text-[9px] tracking-[0.4em] uppercase font-bold text-glow">Verified Impact</span>
                                        </div>
                                        <p className="text-[10px] text-accent font-mono uppercase tracking-[0.3em] font-bold">Scale Matrix</p>
                                        <h3 className="text-4xl md:text-6xl font-black text-accent tracking-tighter">10x Engagement</h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-accent text-xl md:text-2xl font-mono font-bold text-glow">7M+ Peak</p>
                                    </div>
                                </div>
                                <div className="h-24 md:h-40 w-full relative group-hover/graph:opacity-100 grayscale hover:grayscale-0 transition-all">
                                    <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none" className="overflow-visible">
                                        <defs>
                                            <linearGradient id="growthGradArjun" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#ACC8A2" stopOpacity="0.2" />
                                                <stop offset="100%" stopColor="#ACC8A2" stopOpacity="1" />
                                            </linearGradient>
                                        </defs>
                                        <motion.path 
                                            d="M 0 95 Q 50 90 100 85 T 200 65 T 300 25 T 400 5"
                                            fill="none"
                                            stroke="url(#growthGradArjun)"
                                            strokeWidth="5"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0 }}
                                            whileInView={{ pathLength: 1 }}
                                            transition={{ duration: 2.5, ease: "easeInOut" }}
                                            viewport={{ once: true }}
                                            className="drop-shadow-[0_0_20px_rgba(172,200,162,0.8)]"
                                        />
                                        {[100, 200, 300, 400].map((x, i) => (
                                            <motion.circle 
                                                key={i} 
                                                cx={x} 
                                                cy={x === 400 ? 5 : (x === 300 ? 25 : (x === 200 ? 65 : 85))} 
                                                r={x === 400 ? 6 : 4} 
                                                fill={i === 3 ? "#ACC8A2" : "rgba(172,200,162,0.4)"} 
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                transition={{ delay: 1 + i * 0.4 }}
                                                viewport={{ once: true }}
                                            />
                                        ))}
                                    </svg>
                                </div>
                                <div className="flex justify-between text-[10px] font-mono text-accent uppercase tracking-widest font-black border-t border-white/5 pt-8">
                                    <span>Phase 01: 20K - 80K</span>
                                    <span>Phase 02: 7M+ Views</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. RESULTS */}
            <section className="py-24 md:py-40 bg-black/40 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
                        {[
                            { label: "Viral Pieces", val: "5+", desc: "Reels exceeded 1M+ views" },
                            { label: "Engagement", val: "10x", desc: "Total interaction growth" },
                            { label: "Peak Views", val: "7M+", desc: "For single content release" },
                            { label: "Follower Base", val: "200K+", desc: "Consistent scaling core" },
                        ].map((stat, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="space-y-4 p-8 glass-card border border-white/5 rounded-3xl group hover:border-accent transition-colors"
                            >
                                <h4 className="text-5xl font-serif font-black italic text-accent drop-shadow-2xl group-hover:text-accent transition-colors">{stat.val}</h4>
                                <p className="text-[10px] text-accent font-mono uppercase tracking-widest font-bold">{stat.label}</p>
                                <div className="w-8 h-[1px] bg-white/20 mx-auto" />
                                <p className="text-xs text-accent">{stat.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. CTA */}
            <footer className="py-32 md:py-64 relative text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(172,200,162,0.05),transparent_70%)]" />
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        <h3 className="text-5xl md:text-8xl font-serif font-black italic text-accent tracking-tighter leading-tight max-w-4xl mx-auto drop-shadow-2xl">
                            Let’s build your next <br /> <span className="text-accent underline decoration-accent/20">high-performance digital experience</span>
                        </h3>
                        <Link href="/#contact" className="inline-flex items-center gap-6 group">
                            <span className="text-2xl font-serif font-black italic text-accent tracking-tighter group-hover:text-accent transition-colors">Start Project Architecture</span>
                            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent transition-all group-hover:scale-110 shadow-xl bg-white/5">
                                <ArrowRight size={24} className="text-accent group-hover:text-accent transition-colors" />
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </footer>
            
            <style jsx>{`
                .glass-card {
                    background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%);
                    backdrop-filter: blur(8px);
                }
                .text-glow {
                    text-shadow: 0 0 15px rgba(172, 200, 162, 0.4);
                }
            `}</style>
        </section>
    );
}
