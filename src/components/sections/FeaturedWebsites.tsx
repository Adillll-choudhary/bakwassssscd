"use client";

import { useRef } from "react";
import { Project } from "@/data/work";
import { ArrowUpRight, Crosshair, Plus } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

interface FeaturedWebsitesProps {
    projects: Project[];
}

export default function FeaturedWebsites({ projects }: FeaturedWebsitesProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });
    
    // Rotate 2 full circles (720 degrees) over the 800vh scroll
    const rawRotate = useTransform(scrollYProgress, [0, 1], [0, -720]);
    const rotate = useSpring(rawRotate, { damping: 60, stiffness: 100, mass: 0.8 });

    if (!projects.length) return <div className="h-screen bg-black" />;

    return (
        <section 
            ref={sectionRef} 
            className="relative bg-[#020202] w-full" 
            style={{ height: "800vh" }}
        >
            <div 
                className="sticky top-0 left-0 h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center"
            >
                {/* NEW TOP PORTFOLIO SECTION */}
                <motion.div 
                    className="absolute top-0 left-0 w-full h-[60%] z-10 flex flex-col items-center justify-center pointer-events-none"
                >
                    {/* Grid + Marks */}
                    <div className="absolute inset-0 w-full h-full p-8 md:p-16 flex flex-col justify-between">
                        {/* Top Row */}
                        <div className="flex justify-between items-start w-full">
                            <div className="relative">
                                <Plus size={16} className="absolute -top-2 -left-2 text-white/20" />
                                <p className="font-sans font-bold uppercase text-[10px] md:text-sm text-[#F4F0E5] tracking-widest leading-tight ml-4">
                                    Welcome <br/> To My
                                </p>
                            </div>
                            <div className="relative">
                                <Plus size={16} className="absolute -top-2 -right-2 text-white/20" />
                                <Crosshair size={24} className="text-[#F4F0E5] mr-4" />
                            </div>
                        </div>

                        {/* Middle Side Arrows */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-8 w-0 h-0 border-t-4 border-t-transparent border-l-8 border-l-[#F4F0E5] border-b-4 border-b-transparent opacity-30"></div>
                        <div className="absolute top-1/2 -translate-y-1/2 right-8 w-0 h-0 border-t-4 border-t-transparent border-r-8 border-r-[#F4F0E5] border-b-4 border-b-transparent opacity-30"></div>

                        {/* Bottom Row */}
                        <div className="flex justify-between items-end w-full">
                            <div className="relative">
                                <Plus size={16} className="absolute -bottom-2 -left-2 text-white/20" />
                                <p className="font-sans font-bold uppercase text-[8px] md:text-xs text-white/40 tracking-widest ml-4">
                                    Coldune Studio
                                </p>
                            </div>
                            <div className="relative">
                                <Plus size={16} className="absolute -bottom-2 -right-2 text-white/20" />
                                <p className="font-sans font-bold uppercase text-[8px] md:text-xs text-white/40 tracking-widest mr-4">
                                    Web Experiences
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Rotating Ring with Inverse Parallax */}
                <motion.div 
                    style={{ rotate }}
                    className="absolute top-[100%] left-1/2 w-0 h-0 flex items-center justify-center z-20"
                >
                    {projects.map((proj, i) => {
                        const angle = (360 / projects.length) * i;
                        const finalAngle = angle - 90;
                        
                        return (
                            <div
                                key={proj.id}
                                className="absolute w-0 h-0 flex items-center justify-center"
                                style={{
                                    transform: `rotate(${finalAngle}deg) translateY(clamp(-500px, -28vw, -200px))`
                                }}
                            >
                                <motion.a
                                    href={proj.link || "#"}
                                    target={proj.link ? "_blank" : undefined}
                                    className="block shrink-0 rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5 group cursor-pointer bg-[#0A0A0A] relative"
                                    style={{
                                        width: "clamp(160px, 22vw, 300px)",
                                        height: "clamp(220px, 30vw, 420px)",
                                    }}
                                    whileHover={{ scale: 1.15, zIndex: 50 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <img 
                                        src={(proj.thumbnail ? (proj.thumbnail.startsWith('/') ? proj.thumbnail : `/work/${proj.thumbnail}`) : `/work/${proj.file}`)} 
                                        alt={proj.title} 
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-30 group-hover:scale-110 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]" 
                                    />
                                    
                                    <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[#020202]/90 via-[#020202]/30 to-transparent">
                                        
                                        {/* Top section: Status Tag & Arrow */}
                                        <div className="flex justify-between items-start w-full translate-y-[-15px] group-hover:translate-y-0 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                                            <div className="px-2 py-1 rounded bg-[#3CFF8F]/10 border border-[#3CFF8F]/30 text-[#3CFF8F] text-[8px] md:text-[9px] font-sans font-bold uppercase tracking-widest">
                                                {proj.link?.includes('netlify.app') ? 'Ongoing Project' : 'Live Platform'}
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 text-white">
                                                <ArrowUpRight size={14} />
                                            </div>
                                        </div>

                                        {/* Bottom section: Title & Details */}
                                        <div className="flex flex-col items-start text-left w-full translate-y-[15px] group-hover:translate-y-0 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                                            <h3 className="text-white font-serif font-black italic text-base md:text-2xl leading-none mb-2 drop-shadow-lg">
                                                {proj.brand || proj.title}
                                            </h3>
                                            <p className="text-white/70 font-sans text-[8px] md:text-[10px] uppercase tracking-widest leading-tight">
                                                {proj.link?.includes('netlify.app') ? 'Development Phase • Beta Build' : 'Premium Digital Identity'}
                                            </p>
                                        </div>
                                    </div>
                                </motion.a>
                            </div>
                        )
                    })}
                </motion.div>

                {/* Compass / ME element at bottom center */}
                <motion.div 
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-30 pointer-events-none"
                >
                    <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-6 border-b-[#F4F0E5] mb-2"></div>
                    <p className="font-sans font-black uppercase text-[#F4F0E5] text-xs tracking-[0.3em]">ME</p>
                    {/* SVG circular text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-20 animate-[spin_20s_linear_infinite]">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                            <text className="text-[10px] font-sans font-bold uppercase tracking-[0.2em]" fill="#F4F0E5">
                                <textPath href="#circlePath">PORTFOLIO • COLDUNE • PORTFOLIO • COLDUNE •</textPath>
                            </text>
                        </svg>
                    </div>
                </motion.div>
                
            </div>
        </section>
    );
}
