"use client";

import { motion } from "framer-motion";
import { TrendingUp, Car, ArrowRight, Zap, Target, CheckCircle2, Layout, Award, Settings, Instagram, Play } from "lucide-react";
import Link from "next/link";

const bimbraVisuals = [
    { id: 1, title: "Modified Thar Heritage", views: "513K", file: "b-1.webp" },
    { id: 2, title: "Hilux Proman Build", views: "Elite", file: "b-2.webp" },
    { id: 3, title: "Gangster Endeavour", views: "443K", file: "b-3.webp" },
    { id: 4, title: "Showroom Presence", views: "134K", file: "b-4.webp" },
];

export default function BimbraCaseStudy() {
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
                    href="https://www.instagram.com/bimbra4x4?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-3 md:gap-4 pl-4 md:pl-6 pr-6 md:pr-8 py-3 md:py-4 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-full hover:bg-orange-600 hover:border-orange-600 hover:scale-105 transition-all duration-500 shadow-2xl"
                >
                    <div className="absolute inset-0 rounded-full bg-orange-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
                    <Instagram size={20} className="text-accent group-hover:text-black transition-colors" />
                    <span className="text-accent font-mono text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-black group-hover:text-black transition-colors">Bimbra's Live Channel</span>
                </a>
            </motion.div>

            {/* 1. HERO */}
            <header className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black shadow-2xl">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    preload="none"
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/work/videos/SaveVid.Net_AQOwElUBsIiE3K71pxCRLZ3uPOV3Wd_chAs-MZqXz8_YaBqLgoZZ7ff3_aHLqk7EouZnBxMH_hyxPd2SMSa4-K3ncyArWlEUqSjEOUo.mp4" type="video/mp4" />
                </video>
                
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#030305] z-10" />
                <div className="absolute inset-0 border-[3vw] border-[#030305]/20 pointer-events-none" />
                
                <div className="container mx-auto px-6 relative z-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-600/20 backdrop-blur-xl border border-orange-600/30 mb-8"
                    >
                        <Car size={14} className="text-orange-500 animate-pulse" />
                        <span className="text-orange-500 font-mono text-[10px] tracking-[0.4em] uppercase font-bold">Automotive Excellence</span>
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-7xl md:text-[12rem] font-serif font-black text-accent italic tracking-tighter leading-[0.75] mb-12 drop-shadow-2xl"
                    >
                        Engineering a <br /> 
                        <span className="text-accent">Premium Presence</span>
                    </motion.h1>
                    <p className="text-accent font-mono text-xs uppercase tracking-[0.5em] font-black">Performance built. Digitalized.</p>
                </div>
            </header>

            {/* 2. OVERVIEW & PROBLEM */}
            <section className="py-24 md:py-40 border-b border-white/5 relative bg-white/[0.01]">
                <div className="container mx-auto px-6 md:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <span className="text-[10px] text-accent font-mono uppercase tracking-[0.5em] block mb-4">__Client Core</span>
                                <p className="text-5xl font-serif font-black text-accent italic tracking-tighter leading-tight pr-12">
                                    Bimbra 4x4 is India’s leading name in premium off-road vehicle modifications and custom builds.
                                </p>
                            </div>
                            <p className="text-xl text-accent leading-relaxed italic border-l-2 border-orange-500/20 pl-8 font-light">
                                Specializing in Mahindra Thar, Toyota Hilux, and off-road engineering, they turn stock vehicles into legendary performance machines.
                            </p>
                        </div>
                        <div className="space-y-12 p-12 bg-white/[0.03] border border-white/5 backdrop-blur-3xl rounded-[4rem] group hover:border-orange-600/20 transition-all">
                            <div className="space-y-4">
                                <span className="text-[10px] text-orange-500 font-mono uppercase tracking-[0.5em] block mb-4 font-black">__Critical Friction</span>
                                <h4 className="text-3xl font-serif font-black text-accent italic tracking-tighter">The Visual Disconnect</h4>
                                <p className="text-accent text-lg leading-relaxed">
                                    Despite world-class engineering, their digital visuals didn't command premium authority. Low-res content and inconsistent storytelling were diluted the perceived value of their high-end custom builds.
                                </p>
                            </div>
                            <div className="flex flex-col gap-6 pt-12 border-t border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                        <Zap size={14} className="text-orange-500" />
                                    </div>
                                    <span className="text-[10px] text-accent font-mono uppercase tracking-[0.2em] font-bold">Goal: Command Premium Pricing Recognition</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. STRATEGY & SOLUTION */}
            <section className="py-24 md:py-40 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,165,0,0.03),transparent_60%)]" />
                <div className="container mx-auto px-6 md:px-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
                        <div className="space-y-8">
                            <div className="w-12 h-1 bg-orange-600 mb-8 shadow-[0_0_15px_rgba(255,165,0,0.4)]" />
                            <h2 className="text-5xl font-serif font-black italic text-accent tracking-tighter leading-none pr-12">The <br /> Visual <br /> Engineering</h2>
                            <p className="text-sm text-accent font-mono tracking-widest uppercase">Systematic Strategy // 02</p>
                        </div>
                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {[
                                { title: "Cinematic Narratives", desc: "Shifting from 'product shots' to cinematic experiences that highlight luxury and ruggedness.", img: "c-1.webp", xShift: "-60%" },
                                { title: "Detail Fidelity", desc: "Macro-visuals of welding, upholstery, and finishing to emphasize world-class quality.", img: "c-2.webp", xShift: "-50%" },
                                { title: "Standardized Identity", desc: "A unified visual language across all platforms to build institutional authority.", img: "c-3.webp", xShift: "-50%" },
                                { title: "Trust Vectors", desc: "Showcasing real transformation stories that prove engineering durability.", img: "c-4.webp", xShift: "-50%" },
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-12 pt-20 bg-white/[0.02] border border-white/5 rounded-[3.5rem] shadow-2xl relative group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-orange-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[3.5rem]" />
                                    <div className={`absolute -top-16 left-1/2 w-[140%] h-48 flex items-center justify-center pointer-events-none z-20`} style={{ transform: `translateX(${item.xShift})` }}>
                                        <motion.img 
                                            src={`/case-studies/bimbra/${item.img}`}
                                            loading="lazy"
                                            className="w-full h-full object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.8)] filter brightness-110 group-hover:brightness-125 transition-all duration-700"
                                            animate={{ 
                                                y: [0, -15, 0],
                                                rotate: [0, 3, 0],
                                                scale: [1, 1.05, 1]
                                            }}
                                            transition={{
                                                duration: 5,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: i * 0.5
                                            }}
                                        />
                                    </div>
                                    <div className="relative z-10">
                                        <h4 className="text-2xl font-serif font-black text-accent italic mb-4 tracking-tighter group-hover:text-orange-500 transition-colors uppercase">{item.title}</h4>
                                        <p className="text-sm text-accent leading-relaxed font-light">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. VISUAL SHOWCASE */}
            <section className="py-24 md:py-40 bg-black border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <span className="text-[10px] text-accent font-mono uppercase tracking-[0.5em] block mb-4">__Build Archive</span>
                        <h2 className="text-6xl font-serif font-black text-accent italic tracking-tighter leading-tight drop-shadow-2xl">Elite <span className="text-orange-600">Transformations</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {bimbraVisuals.map((visual, idx) => (
                            <motion.div 
                                key={visual.id}
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group/visual relative aspect-[9/16] rounded-3xl overflow-hidden border border-white/5 shadow-2xl cursor-pointer"
                            >
                                <img 
                                    src={`/case-studies/bimbra/${visual.file}`} 
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover/visual:scale-110 opacity-70 group-hover/visual:opacity-100"
                                    alt={visual.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover/visual:opacity-100 transition-opacity" />
                                <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col gap-2">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-600/20 backdrop-blur-xl border border-orange-600/20 w-fit">
                                        <Play size={8} className="fill-orange-500 text-orange-500" />
                                        <span className="text-[10px] font-bold text-orange-500 font-mono tracking-tighter">{visual.views} Views</span>
                                    </div>
                                    <p className="text-[10px] text-accent font-medium font-mono uppercase tracking-widest line-clamp-1 opacity-100 translate-y-0 group-hover/visual:translate-y-[-4px] transition-transform">{visual.title}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. GROWTH & GRAPH */}
            <section className="py-24 md:py-40 bg-white/[0.01]">
                <div className="container mx-auto px-6 md:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-12 order-2 lg:order-1">
                            <div className="p-8 md:p-16 bg-white/[0.03] border border-white/5 backdrop-blur-3xl rounded-[3rem] md:rounded-[5rem] shadow-3xl relative group overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,165,0,0.1),transparent_50%)]" />
                                <div className="space-y-8 md:y-12 relative z-10">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-2">
                                            <p className="text-[10px] text-orange-500 font-mono uppercase tracking-[0.4em] font-black italic">Market Perception Index</p>
                                            <h3 className="text-4xl md:text-6xl font-black text-accent tracking-tighter font-serif italic">Premium Edge</h3>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-orange-500 text-2xl md:text-3xl font-mono font-bold tracking-tighter">+400%</p>
                                        </div>
                                    </div>
                                    <div className="h-32 md:h-40 w-full relative">
                                        <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none" className="overflow-visible">
                                            <defs>
                                                <linearGradient id="growthGradBimbra" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#FB923C" stopOpacity="0.2" />
                                                    <stop offset="100%" stopColor="#FB923C" stopOpacity="1" />
                                                </linearGradient>
                                            </defs>
                                            <motion.path 
                                                d="M 0 90 Q 50 85 100 80 T 200 60 T 300 20 T 400 0"
                                                fill="none"
                                                stroke="url(#growthGradBimbra)"
                                                strokeWidth="6"
                                                strokeLinecap="round"
                                                initial={{ pathLength: 0 }}
                                                whileInView={{ pathLength: 1 }}
                                                transition={{ duration: 2.5, ease: "easeInOut" }}
                                                viewport={{ once: true }}
                                                className="drop-shadow-[0_0_20px_rgba(251,146,60,0.6)]"
                                            />
                                        </svg>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
                                        <div className="text-center group-hover:scale-110 transition-transform">
                                            <p className="text-[9px] text-accent font-mono uppercase mb-2">Awareness</p>
                                            <p className="text-accent font-black text-xl tracking-tighter">High</p>
                                        </div>
                                        <div className="text-center group-hover:scale-110 transition-transform">
                                            <p className="text-[9px] text-accent font-mono uppercase mb-2">Perception</p>
                                            <p className="text-orange-500 font-black text-xl tracking-tighter">Premium+</p>
                                        </div>
                                        <div className="text-center group-hover:scale-110 transition-transform">
                                            <p className="text-[9px] text-accent font-mono uppercase mb-2">Conversion</p>
                                            <p className="text-accent font-black text-xl tracking-tighter">Surge</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-12 order-1 lg:order-2">
                            <h2 className="text-6xl md:text-8xl font-serif font-black italic text-accent tracking-tighter leading-[0.8] pr-12 drop-shadow-2xl">Perception <br /> <span className="text-orange-600">Re-Engineered</span></h2>
                            <div className="space-y-6 max-w-lg">
                                <p className="text-xl text-accent leading-relaxed italic border-l-2 border-white/10 pl-8">
                                    Metrics went beyond views—the quality of inquiries shifted from "cheap fixes" to "high-end turn-key builds", validating the cinematic visual strategy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. RESULTS */}
            <section className="py-24 md:py-40 bg-black border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-6xl mx-auto">
                        {[
                            { label: "Market Trust", val: "Elite", desc: "Top-tier custom build authority" },
                            { label: "Product Engagement", val: "+200%", desc: "Direct product feature interest" },
                            { label: "Avg. Build Price", val: "Premium", desc: "High-end perception established" },
                        ].map((stat, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="space-y-6"
                            >
                                <div className="text-orange-600 font-mono text-[10px] uppercase tracking-[0.4em] font-black">{stat.label}</div>
                                <h4 className="text-6xl font-serif font-black italic text-accent tracking-tighter">{stat.val}</h4>
                                <p className="text-xs text-accent font-light max-w-[200px] mx-auto">{stat.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. CTA */}
            <footer className="py-32 md:py-64 relative text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.03),transparent_70%)]" />
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        <h3 className="text-5xl md:text-[7rem] font-serif font-black italic text-accent tracking-tighter leading-[0.85] max-w-5xl mx-auto drop-shadow-3xl">
                            Let’s build your next <br /> <span className="text-orange-600 underline decoration-orange-600/20">high-performance digital experience</span>
                        </h3>
                        <Link href="/#contact" className="inline-flex items-center gap-6 group pt-12">
                            <span className="text-2xl font-serif font-black italic text-accent tracking-tighter group-hover:text-orange-500 transition-colors">Initiate Architecture</span>
                            <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center group-hover:border-orange-500 transition-all group-hover:scale-110 shadow-3xl bg-orange-600/5">
                                <ArrowRight size={28} className="text-accent group-hover:text-orange-500 transition-colors" />
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </footer>
        </section>
    );
}
