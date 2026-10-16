"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { workProjects } from "@/data/work";
import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import { useRef } from "react";

export default function FracturedWebPortfolio() {
    const sectionRef = useRef<HTMLElement>(null);
    const websites = workProjects.filter(p => p.group === "websites");

    return (
        <section ref={sectionRef} className="py-60 bg-[#030305] px-8 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-screen" />
            
            <div className="container mx-auto max-w-[1600px] relative">
                {/* Asymmetrical Header */}
                <div className="grid grid-cols-12 gap-8 mb-40">
                    <div className="col-span-12 lg:col-span-7">
                        <motion.h2 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-[12vw] font-serif font-black italic text-accent leading-[0.75] tracking-[-0.05em]"
                        >
                            Digital <br /> <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>Archives.</span>
                        </motion.h2>
                    </div>
                    <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end">
                        <p className="text-xl md:text-3xl text-accent font-serif italic leading-tight">
                            A clinical breakdown of high-performance platforms manifested for the global elite.
                        </p>
                    </div>
                </div>

                {/* Layered Fractured Grid */}
                <div className="space-y-[20vh] md:space-y-[40vh]">
                    {websites.map((project, i) => (
                        <div key={project.id} className="grid grid-cols-12 gap-8 items-center">
                            {/* Visual Block */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9, rotate: i % 2 === 0 ? 2 : -2 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className={`col-span-12 lg:col-span-8 ${i % 2 === 0 ? "lg:col-start-1" : "lg:col-start-5 order-2"}`}
                            >
                                <a 
                                    href={project.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="group relative block aspect-[16/9] overflow-hidden rounded-[1rem] bg-[#0A0A0B] border border-white/10"
                                >
                                    <Image 
                                        src={`/work/${project.file}`}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-[2000ms] group-hover:scale-110 grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100"
                                    />
                                    
                                    {/* Scanline Effect */}
                                    <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(255,255,255,0.2)_50%),linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.2),rgba(255,255,255,0))] bg-[length:100%_2px,2px_100%] animate-pulse" />
                                </a>
                            </motion.div>

                            {/* Info Block */}
                            <motion.div 
                                initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className={`col-span-12 lg:col-span-4 ${i % 2 === 0 ? "lg:col-start-9" : "lg:col-start-1 order-1"}`}
                            >
                                <div className="space-y-8">
                                    <div className="flex items-center gap-6">
                                        <span className="text-[10px] font-black tracking-[0.8em] text-accent uppercase">PROTOCOL.{project.id}</span>
                                        <div className="h-px flex-1 bg-white/10" />
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <h3 className="text-5xl md:text-7xl font-serif font-black italic text-accent leading-none tracking-tighter">
                                            {project.title}
                                        </h3>
                                        <p className="text-lg text-accent font-serif italic leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-[8px] font-black tracking-widest px-4 py-2 border border-white/10 rounded-full text-accent uppercase">REACT ARCHIVE</span>
                                        <span className="text-[8px] font-black tracking-widest px-4 py-2 border border-white/10 rounded-full text-accent uppercase">HIGH-FI UI</span>
                                    </div>

                                    <a 
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-6 group text-accent hover:text-accent transition-colors duration-300"
                                    >
                                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors duration-300">
                                            <ArrowUpRight size={20} />
                                        </div>
                                        <span className="text-xs font-black tracking-[0.5em] uppercase">Enter Experience</span>
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
