"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Linkedin, Instagram, ExternalLink, Sparkles, Send, Briefcase, Users, Timer } from "lucide-react";
import { useContactModal } from "@/context/ContactModalContext";

const profiles = [
    {
        name: "Jamal Adil",
        role: "Founder & Creative Director",
        image: "/bg/IMG_3748.webp",
        stats: [
            { label: "Projects", value: "120+", icon: Briefcase },
            { label: "Clients", value: "45+", icon: Users },
            { label: "Experience", value: "4+ Yrs", icon: Timer },
        ],
        socials: {
            linkedin: "https://www.linkedin.com/in/adil-choudhary-831a7035a",
            instagram: "https://www.instagram.com/iadillchoudhary17",
            behance: "#"
        }
    },
    {
        name: "Arslan",
        role: "Tech & Innovation Lead",
        image: "/bg/IMG_3749.webp",
        stats: [
            { label: "Projects", value: "100+", icon: Briefcase },
            { label: "Clients", value: "35+", icon: Users },
            { label: "Experience", value: "4+ Yrs", icon: Timer },
        ],
        socials: {
            linkedin: "https://www.linkedin.com/in/adil-choudhary-831a7035a",
            instagram: "https://www.instagram.com/_arshlan_18",
            behance: "#"
        }
    }
];

export function GlassProfileFooter() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { openModal } = useContactModal();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

    return (
        <section ref={containerRef} className="relative w-full py-20 md:py-32 px-6 overflow-hidden bg-[#0A1A0F]">
            {/* Premium Cool Green Gradient Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Base Dark/Green Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1B3A22] via-[#0D1F13] to-[#0A1A0F]" />

                {/* Soft Glowing Green Accents */}
                <motion.div
                    animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-20 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(172,200,162,1) 0%, transparent 70%)' }}
                />
                <motion.div
                    animate={{ opacity: [0.4, 0.8, 0.4], scale: [1.2, 0.9, 1.2] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-10%] left-[-10%] w-[70vw] h-[70vw] rounded-full opacity-30 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(104,155,95,1) 0%, transparent 70%)' }}
                />

                {/* Subtle tech grid or noise overlay for texture */}
                <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" />
            </div>

            <motion.div
                style={{ opacity, scale }}
                className="container mx-auto relative z-10 flex justify-center"
            >
                {/* Water-like Floating Glass Panel */}
                <div className="relative group p-[1.5px] rounded-[3.5rem] bg-white/[0.03] backdrop-blur-[10px] shadow-[0_32px_128px_rgba(0,0,0,0.3)] border border-white/20 overflow-hidden max-w-4xl w-full">

                    {/* Water Surface Shine & Caustics */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--glow-soft-gold)]/10 via-white/10 to-white/30 pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
                    <div className="absolute inset-0 bg-[var(--bg-shadow)]/20 rounded-[3.5rem] -z-10" />

                    {/* Liquid Shimmer Effect */}
                    <motion.div
                        animate={{
                            opacity: [0.1, 0.3, 0.1],
                            backgroundPosition: ['0% 0%', '100% 100%']
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)] bg-[length:200%_200%] pointer-events-none"
                    />

                    {/* Animated Olive Wave */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 -z-5">
                        <motion.svg
                            viewBox="0 0 1440 320"
                            className="absolute bottom-0 w-[200%] h-full"
                            animate={{
                                x: ["-50%", "0%"],
                            }}
                            transition={{
                                duration: 15,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <path
                                fill="var(--bg-light-moss)"
                                fillOpacity="0.2"
                                d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                            />
                        </motion.svg>
                        <motion.svg
                            viewBox="0 0 1440 320"
                            className="absolute bottom-0 w-[200%] h-full"
                            style={{ x: "-50%" }}
                            animate={{
                                x: ["0%", "-50%"],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <path
                                fill="var(--bg-light-moss)"
                                fillOpacity="0.1"
                                d="M0,224L60,202.7C120,181,240,139,360,117.3C480,96,600,96,720,122.7C840,149,960,203,1080,218.7C1200,235,1320,213,1380,202.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                            />
                        </motion.svg>
                    </div>

                    {/* Content Container */}
                    <div className="relative z-10 p-4 md:p-8 flex flex-col md:flex-row gap-4 md:gap-0">
                        {profiles.map((profile, idx) => (
                            <ProfileCard key={profile.name} profile={profile} isLast={idx === profiles.length - 1} />
                        ))}
                    </div>

                    {/* Footer CTA Section */}
                    <div className="relative z-10 px-8 pb-12 md:px-16 md:pb-16 flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-12 gap-8 bg-white/[0.02]">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                                <Sparkles size={20} className="text-[var(--text-olive)] drop-shadow-[0_0_8px_rgba(232,227,162,0.5)]" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-[10px] font-mono text-[var(--text-muted)]/40 uppercase tracking-[0.4em] font-bold">Coldune_Global // Creative Nexus</p>
                                <p className="text-sm text-[var(--text-soft)] font-medium tracking-tight">Crafting the digital future, one pixel at a time.</p>
                            </div>
                        </div>

                        <motion.button
                            onClick={openModal}
                            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(172,200,162,0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-12 py-4.5 rounded-full bg-gradient-to-r from-[#ACC8A2] to-[#064E3B] text-accent font-bold text-sm uppercase tracking-[0.2em] flex items-center gap-3 transition-all duration-500 shadow-[0_8px_24px_rgba(0,0,0,0.2)] overflow-hidden"
                        >
                            <span className="relative z-10">Contact Us</span>
                            <Send size={16} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />

                            {/* Button Shine Animation */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-12 translate-x-[-200%]"
                                animate={{ x: ['200%', '-200%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.button>
                    </div>

                    {/* Micro parallax light sweep */}
                    <div className="absolute top-0 -inset-x-full h-full w-[200%] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out pointer-events-none" />
                </div>
            </motion.div>
        </section>
    );
}

function ProfileCard({ profile, isLast }: { profile: typeof profiles[0], isLast?: boolean }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 100, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 100, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(0.5); mouseY.set(0.5); }}
            className={`flex-1 flex flex-col items-center gap-10 relative ${!isLast ? 'md:border-r border-white/10' : ''}`}
            style={{ perspective: "1200px" }}
        >
            {/* Profile Section with Hover Depth */}
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="flex flex-col items-center gap-6"
            >
                {/* Circular Photo with Glow Ring */}
                <div className="relative p-1 rounded-full bg-gradient-to-br from-[var(--icon-glow)]/40 via-white/10 to-transparent shadow-2xl">
                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-[var(--glass-edge)]/20 relative z-10 group/img bg-[var(--bg-soft-olive)]">
                        <Image
                            src={profile.image}
                            alt={profile.name}
                            fill
                            priority
                            unoptimized
                            className="object-cover object-top transition-transform duration-1000 group-hover/img:scale-110 saturate-[0.9] contrast-[1.05]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>
                    {/* Soft Glow Ring */}
                    <div className="absolute -inset-2 bg-[#ACC8A2]/10 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                </div>

                {/* Name & Title */}
                <div className="text-center space-y-1">
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-accent tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">{profile.name}</h3>
                    <p className="text-[var(--text-olive)] font-mono text-[8px] uppercase tracking-[0.4em] font-black drop-shadow-[0_0_8px_rgba(172,200,162,0.3)]">{profile.role}</p>
                </div>
            </motion.div>

            {/* Stats Section - Small Glass Boxes */}
            <div className="flex gap-3 px-4 w-full max-w-sm justify-center">
                {profile.stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5, backgroundColor: "rgba(185, 197, 138, 0.15)" }}
                        className="flex-1 p-3 rounded-2xl bg-[var(--glass-base)]/10 border border-[var(--glass-edge)]/10 backdrop-blur-[6px] flex flex-col items-center gap-1.5 transition-colors duration-300"
                    >
                        <stat.icon size={14} className="text-[var(--text-muted)]/60" />
                        <div className="text-center">
                            <p className="text-sm font-bold text-accent leading-none">{stat.value}</p>
                            <p className="text-[7px] font-mono text-[var(--text-muted)]/40 uppercase tracking-widest mt-1">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Social Icons - Glass Style */}
            <div className="flex items-center gap-4">
                {Object.entries(profile.socials).map(([key, url]) => {
                    const colors: { [key: string]: { text: string, glow: string } } = {
                        instagram: { text: "group-hover:text-[#E4405F]", glow: "group-hover:shadow-[0_0_15px_rgba(228,64,95,0.4)]" },
                        linkedin: { text: "group-hover:text-[#0077B5]", glow: "group-hover:shadow-[0_0_15px_rgba(0,119,181,0.4)]" },
                        behance: { text: "group-hover:text-[#053EFF]", glow: "group-hover:shadow-[0_0_15px_rgba(5,62,255,0.4)]" }
                    };
                    const theme = colors[key as keyof typeof colors] || { text: "group-hover:text-accent", glow: "" };

                    return (
                        <motion.a
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{
                                y: -10,
                                scale: 1.2,
                                rotate: key === 'instagram' ? 8 : -8,
                                transition: { type: "spring", stiffness: 400, damping: 10 }
                            }}
                            whileTap={{ scale: 0.9 }}
                            className={`group w-12 h-12 rounded-[1.2rem] bg-[var(--icon-bg)]/10 border border-[var(--icon-shadow)]/30 flex items-center justify-center text-[var(--text-muted)]/60 transition-all duration-500 backdrop-blur-xl ${theme.text} ${theme.glow} shadow-xl relative overflow-hidden`}
                        >
                            {/* Crystalline Gloss Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                {key === 'instagram' && <Instagram size={22} strokeWidth={1} />}
                                {key === 'linkedin' && <Linkedin size={22} strokeWidth={1} />}
                                {key === 'behance' && <ExternalLink size={22} strokeWidth={1} />}
                            </div>

                            {/* Internal Light Sweep */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
                        </motion.a>
                    );
                })}
            </div>
        </div>
    );
}
