"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const caseStudies = [
    {
        id: "bimbra-4x4",
        title: "Bimbra 4x4",
        category: "Automotive Branding",
        description: "Engineering a premium automotive presence through high-impact digital experiences. We transformed product visuals into a trust-building performance engine.",
        link: "/case-studies/bimbra-4x4",
        image: "/case-studies/bimbra/b-2.webp",
        color: "from-white/10 to-white/5",
        accent: "text-accent"
    },
    {
        id: "arjun-fauzdarr",
        title: "Arjun Fauzdarr",
        category: "Personal Branding",
        description: "From raw content to 18M+ views. We engineered a personal brand narrative that focuses on high-retention storytelling and authoritative presence.",
        link: "/case-studies/arjun-fauzdarr",
        image: "/case-studies/arjun/reel-4.webp",
        color: "from-accent/20 to-accent/5",
        accent: "text-accent"
    }
];

export default function CaseStudies() {
    const sectionRef = useRef<HTMLElement>(null);
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    return (
        <section id="case-studies" ref={sectionRef} className="relative w-full bg-transparent py-32 md:py-60 overflow-hidden group/section">
            {mounted && (
                <>
                    {/* Cinematic Mouse Spotlight */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/section:opacity-100 transition-opacity duration-1000 z-0"
                        style={{
                            background: `radial-gradient(1200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(60, 255, 143, 0.03), transparent 80%)`
                        }}
                    />

                    {/* Artistic Background Elements */}
                    <div className="absolute top-[10%] left-[-10%] w-[60%] h-[60%] bg-[#3CFF8F]/5 blur-[150px] rounded-full pointer-events-none animate-pulse" />
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")', backgroundSize: '100px 100px' }} />

                    <div 
                        className="container mx-auto px-6 relative z-10"
                        onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            e.currentTarget.parentElement?.style.setProperty('--mouse-x', `${x}px`);
                            e.currentTarget.parentElement?.style.setProperty('--mouse-y', `${y}px`);
                        }}
                    >
                        <div className="flex flex-col mb-32 md:mb-48 w-full">
                            <div className="flex flex-col lg:flex-row gap-12 items-end justify-between w-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="relative z-20 flex flex-col items-start mb-8 gap-0 whitespace-nowrap -ml-10 md:-ml-24 lg:-ml-48"
                                >
                                    <span className="text-[11vw] md:text-[8rem] lg:text-[11rem] font-universo font-black uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] inline-block leading-[0.8]">
                                        The Stories Of
                                    </span>
                                    <div className="flex items-end justify-start gap-4 md:gap-8 mt-2">
                                        <span className="text-[11vw] md:text-[8rem] lg:text-[11rem] font-universo font-black uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] inline-block leading-[0.8]">
                                            Brands We
                                        </span>
                                    </div>
                                    <div className="flex items-end justify-start gap-4 md:gap-8 mt-2">
                                        <span className="text-[11vw] md:text-[8rem] lg:text-[11rem] font-universo font-black uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] inline-block leading-[0.8]">
                                            Helped Turn
                                        </span>
                                    </div>
                                    <div className="flex items-end justify-start gap-4 md:gap-8 mt-2">
                                        <span className="text-[11vw] md:text-[8rem] lg:text-[11rem] font-universo font-black uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] inline-block leading-[0.8]">
                                            Into
                                        </span>
                                        <span className="text-[12vw] md:text-[6rem] lg:text-[7rem] font-siestha normal-case text-[#3CFF8F] -rotate-[8deg] inline-block px-4 py-4 -mx-4 -my-4 leading-none md:-translate-y-4 tracking-tighter" style={{ textShadow: "0 4px 30px rgba(60,255,143,0.4)" }}>
                                            Something Bigger
                                        </span>
                                    </div>
                                </motion.div>
                                
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                            {caseStudies.map((study, index) => (
                                <ProjectCard key={study.id} study={study} index={index} />
                            ))}
                        </div>

                    </div>
                </>
            )}
        </section>
    );
}

function ProjectCard({ study, index }: { study: any, index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -50 : 50]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? 2 : -2]);

    return (
        <motion.div
            ref={cardRef}
            style={{ y, rotateZ: rotate }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="group block relative"
        >
            <Link href={study.link} className="block relative h-full w-full overflow-hidden rounded-[2.5rem] md:rounded-[4rem] bg-[#0A0A0A] border border-white/5 hover:border-[#3CFF8F]/50 transition-all duration-1000 aspect-[4/5] shadow-2xl">
                {/* Background Image with sophisticated zoom */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent z-10 transition-opacity duration-1000 group-hover:opacity-40" />
                    <img 
                        src={study.image} 
                        alt={study.title} 
                        className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110 opacity-70 group-hover:opacity-100 grayscale-[30%] group-hover:grayscale-0"
                        loading="lazy"
                    />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 p-10 md:p-16 flex flex-col justify-end bg-gradient-to-t from-[#030305]/80 via-transparent to-transparent">
                    {/* Reveal on Hover Elements */}
                    <div className="mb-8 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                        <div className="w-12 h-px bg-[#3CFF8F] mb-6" />
                    </div>

                    <h3 className="text-5xl md:text-7xl font-serif font-black text-accent italic mb-6 tracking-tighter leading-none group-hover:text-[#3CFF8F] transition-colors duration-700">
                        {study.title}
                    </h3>
                    
                    <p className="text-accent text-lg md:text-xl mb-10 max-w-sm font-light leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                        {study.description}
                    </p>
                    
                    <div className="flex items-center gap-6 group/btn">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#3CFF8F] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
                            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#3CFF8F] group-hover:border-[#3CFF8F] transition-all duration-700 relative z-10">
                                <ArrowRight size={24} className="text-accent group-hover:text-black transform -rotate-45 transition-all duration-500 group-hover:scale-110" />
                            </div>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent group-hover:text-accent transition-all duration-500">Launch Project</span>
                    </div>
                </div>

                {/* Glass Glare Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-30"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)'
                    }}
                />
            </Link>
        </motion.div>
    );
}
