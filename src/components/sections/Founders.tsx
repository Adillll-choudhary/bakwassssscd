"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Sparkles, Quote, Instagram, Linkedin, Twitter, Users } from "lucide-react";
import { usePerformance } from "@/hooks/usePerformance";
import { useContactModal } from "@/context/ContactModalContext";

const founders = [
    {
        name: "Jamal Adil",
        role: "Founder & CEO",
        age: 19,
        image: "/founders/jamal-adil.webp",
        badge: "The Visionary",
        objectPosition: "center 8%",
        bio: [
            <span key="1">At just 19 years old, <span className="text-4xl md:text-5xl font-serif font-bold text-accent not-italic">J</span>amal <span className="text-4xl md:text-5xl font-serif font-bold text-accent not-italic">A</span>dil represents the new generation of creative entrepreneurs.</span>,
            <span key="2">Col<span className="text-4xl md:text-5xl font-serif font-bold text-accent not-italic">d</span>une Studio was born from a dream where creativity meets professionalism.</span>,
            <span key="3">In every project, his v<span className="text-4xl md:text-5xl font-serif font-bold text-accent not-italic">i</span>sion creates a story worth telling.</span>,
            <span key="4">He is not just running a studio, he is bui<span className="text-4xl md:text-5xl font-serif font-bold text-accent not-italic">l</span>ding a legacy.</span>
        ],
        quote: "Age is not a limitation when passion and hard work walk together.",
        signature: "Jamal Adil",
        accent: "#ACC8A2",
        socials: {
            instagram: "https://www.instagram.com/iadillchoudhary17?igsh=d212djhra3kzM2Vk&utm_source=qr",
            linkedin: "https://www.linkedin.com/in/adil-choudhary-831a7035a?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
            twitter: "#"
        }
    },
    {
        name: "Arslan",
        role: "Co-Founder",
        age: 19,
        image: "/founders/IMG_3498.webp",
        badge: "The Visual Maestro",
        objectPosition: "center",
        bio: [
            <span key="1"><span className="text-4xl md:text-5xl font-serif font-bold text-accent not-italic">A</span>rslan is a highly skilled creative professional specializing in visual production.</span>,
            <span key="2">Raw cinematic moments a<span className="text-4xl md:text-5xl font-serif font-bold text-accent not-italic">r</span>e his expertise, communicating emotion in every frame.</span>,
            <span key="3">With a <span className="text-4xl md:text-5xl font-serif font-bold text-accent not-italic">s</span>oulful approach, he commands cameras with instinctive precision.</span>,
            <span key="4">Contro<span className="text-4xl md:text-5xl font-serif font-bold text-accent not-italic">l</span>ling light and shadow to deliver maximum impact.</span>,
            <span key="5"><span className="text-4xl md:text-5xl font-serif font-bold text-accent not-italic">A</span>rtistry is his language, speaking fluently through every edit.</span>,
            <span key="6">Defined by u<span className="text-4xl md:text-5xl font-serif font-bold text-accent not-italic">n</span>seen details and a relentless pursuit of perfection.</span>
        ],
        quote: "Every frame tells a story, every story deserves perfection.",
        signature: "Arslan",
        accent: "#EDEFF2",
        socials: {
            instagram: "https://www.instagram.com/_arshlan_18?igsh=M205ZGc2aHBxY2F0",
            linkedin: "https://www.linkedin.com/in/adil-choudhary-831a7035a?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
            twitter: "#"
        }
    }
];

function FounderCard({ founder, index, isMobile }: { founder: typeof founders[0], index: number, isMobile: boolean }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Parallax Physics
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);
    const rotateX = useSpring(useTransform(y, [0, 1], [isMobile ? 0 : 10, isMobile ? 0 : -10]), { stiffness: 100, damping: 30 });
    const rotateY = useSpring(useTransform(x, [0, 1], [isMobile ? 0 : -10, isMobile ? 0 : 10]), { stiffness: 100, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width);
        y.set((e.clientY - rect.top) / rect.height);
    };

    return (
        <div
            className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 min-h-[80vh] py-20 ${index % 2 === 0 ? "" : "lg:flex-row-reverse"}`}
        >
            {/* Image Section with 3D Depth */}
            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => { x.set(0.5); y.set(0.5); setIsHovered(false); }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="w-full lg:w-1/2 relative group"
            >
                <div className="relative aspect-[4/5] w-full max-w-xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl bg-transparent">
                    <Image
                        src={founder.image}
                        alt={founder.name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        style={{ objectPosition: founder.objectPosition }}
                        priority={index === 0}
                    />

                    {/* Atmospheric Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent opacity-80" />

                    {/* Scanline Effect - Disable on mobile */}
                    {!isMobile && (
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] animate-pulse">
                            <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
                        </div>
                    )}

                </div>

                {/* Decorative Layers */}
                <div className="absolute -inset-10 bg-accent/20 blur-[120px] rounded-full -z-10 opacity-0 group-hover:opacity-30 transition-opacity duration-1000" />
            </motion.div>

            {/* Content Section */}
            <div className={`w-full lg:w-1/2 space-y-12 ${index % 2 === 0 ? "text-left" : "text-left lg:text-right"}`}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <h2 className="text-5xl sm:text-6xl md:text-[7vw] lg:text-[7.5rem] text-white tracking-tighter leading-[0.85]">
                        <span className="font-universo font-black uppercase">{founder.name}</span> <br />
                        <span className="block mt-2 md:mt-4 text-4xl md:text-6xl font-siestha normal-case font-light tracking-normal whitespace-nowrap leading-normal text-transparent bg-clip-text bg-gradient-to-r from-[#A8BEA4] via-[#00ff88] to-[#A8BEA4] drop-shadow-[0_0_20px_rgba(0,255,136,0.4)] inline-block px-8 py-8 -mx-8 -my-8">{founder.role}</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className={`space-y-6 max-w-xl ${index % 2 === 0 ? "" : "lg:ml-auto"}`}
                >
                    {founder.bio.map((p, i) => (
                        <p 
                            key={i} 
                            className="text-2xl md:text-3xl text-accent leading-[1.8] tracking-wider opacity-90"
                            style={{ fontFamily: 'var(--font-dancing), cursive' }}
                        >
                            {p}
                        </p>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className={`relative p-12 bg-white/[0.01] border border-white/5 rounded-[3.5rem] group overflow-hidden ${isMobile ? 'bg-black/40 backdrop-blur-md' : 'backdrop-blur-3xl'}`}
                >
                    <div className="absolute top-8 left-8 opacity-10 text-accent">
                        <Quote size={48} strokeWidth={1} />
                    </div>
                    <p className="text-2xl md:text-3xl font-serif text-accent italic leading-tight relative z-10 pr-10">
                        "{founder.quote}"
                    </p>
                </motion.div>


            </div >
        </div >
    );
}


export default function Founders() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { isMobile } = usePerformance();
    const { openModal } = useContactModal();

    return (
        <section id="founders" ref={containerRef} className="relative bg-transparent overflow-hidden pb-20">





            <div className="container mx-auto px-6 relative z-10 pt-24 md:pt-44">
                <div className="max-w-4xl mb-24 md:mb-40 -ml-2 md:-ml-10 lg:-ml-20 xl:-ml-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-10"
                    >
                        <motion.h2 
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true, amount: 0.5 }}
                            className="text-[12vw] md:text-[9.5vw] lg:text-[11rem] font-universo font-black uppercase leading-[0.8] tracking-tighter text-[#D4D4D4] relative flex flex-col items-start whitespace-nowrap"
                        >
                            <motion.span variants={{ initial: { y: "50%", opacity: 0 }, animate: { y: 0, opacity: 1 } }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} className="inline-block">ARCHITECTS OF</motion.span>
                            <motion.span variants={{ initial: { y: "50%", opacity: 0 }, animate: { y: 0, opacity: 1 } }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }} className="inline-block">BRANDS BUILT</motion.span>
                            <motion.span variants={{ initial: { y: "50%", opacity: 0 }, animate: { y: 0, opacity: 1 } }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }} className="relative flex items-center inline-block">
                                TO
                                <span className="absolute left-[80%] md:left-[110%] top-[-10%] md:top-[-20%] font-siestha normal-case text-[#3CFF8F] text-[22vw] md:text-[14vw] lg:text-[16rem] -rotate-[10deg] leading-none z-10" style={{ textShadow: "0 4px 40px rgba(60,255,143,0.5)" }}>
                                    Matter
                                </span>
                            </motion.span>
                        </motion.h2>
                    </motion.div>
                </div>

                <div className="space-y-32 md:space-y-60 pb-24 md:pb-44">
                    {founders.map((founder, index) => (
                        <FounderCard key={founder.name} founder={founder} index={index} isMobile={isMobile} />
                    ))}
                </div>


            </div>
        </section>
    );
}
