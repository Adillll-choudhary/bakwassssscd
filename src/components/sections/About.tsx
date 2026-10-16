"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { usePerformance } from "@/hooks/usePerformance";

const PHASES = [
    {
        id: "01",
        title: "Genesis",
        subtitle: "The Spark",
        description: "A rebellion against the static. We found beauty in the chaos of code and nature, planting the seeds of a digital revolution.",
        image: "/bg/IMG_4657.webp",
        color: "bg-emerald-500",
        accent: "text-emerald-400"
    },
    {
        id: "02",
        title: "Alchemy",
        subtitle: "The Forge",
        description: "Forging raw potential into kinetic reality. We bridge the gap between art and engineering, turning abstract concepts into tangible magic.",
        video: "/bg/WhatsApp Video 2026-02-21 at 10.48.50 PM.mp4",
        poster: "/bg/phase2.webp",
        color: "bg-blue-500",
        accent: "text-blue-400"
    },
    {
        id: "03",
        title: "Horizon",
        subtitle: "The Legacy",
        description: "Beyond pixels. Building digital empires that stand the test of time. We don't just create websites; we architect experiences.",
        video: "/bg/WhatsApp Video 2026-02-21 at 10.51.37 PM.mp4",
        poster: "/bg/phase3.webp",
        color: "bg-purple-500",
        accent: "text-purple-400"
    }
];

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { isMobile } = usePerformance();
    const [mounted, setMounted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [audioAllowed, setAudioAllowed] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const yTitle = useTransform(scrollYProgress, [0, 0.2], [150, 0]);
    const opacityTitle = useTransform(scrollYProgress, [0, 0.05, 0.25, 0.3], [0, 1, 1, 0]);

    // Immersive Audio Logic
    useEffect(() => {
        audioRef.current = new Audio("/audio/main_theme.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0;

        const handleInteraction = () => setAudioAllowed(true);
        window.addEventListener('click', handleInteraction, { once: true });
        window.addEventListener('scroll', handleInteraction, { once: true });

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('scroll', handleInteraction);
        };
    }, []);

    useEffect(() => {
        if (!audioRef.current || !audioAllowed) return;

        const unsubscribe = scrollYProgress.on("change", (v) => {
            if (!audioRef.current) return;

            // Volume Curve: Fades in during entrance, stays full, fades out during exit
            let volume = 0;
            if (v < 0.2) volume = (v / 0.2) * 0.4;
            else if (v < 0.8) volume = 0.4;
            else volume = ((1 - v) / 0.2) * 0.4;

            audioRef.current.volume = Math.max(0, Math.min(0.4, volume));

            if (volume > 0.01 && audioRef.current.paused) {
                audioRef.current.play().catch(() => { });
            } else if (volume <= 0.01 && !audioRef.current.paused) {
                audioRef.current.pause();
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress, audioAllowed]);

    return (
        <section ref={containerRef} id="about" className="relative pt-8 pb-32 md:pt-12 md:pb-48 flex flex-col bg-transparent overflow-hidden">

            {/* Cinematic Background Layer */}
            <div className="sticky top-0 h-screen w-full overflow-hidden z-0 pointer-events-none" aria-hidden="true">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-10" />

                {/* Floating Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(172,200,162,0.1),transparent)] opacity-40" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center text-center z-20 mb-40 md:mb-64 pointer-events-none"
                >
                    <div className="relative group">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className="absolute -top-12 left-0 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"
                        />

                        <h2 className="text-[12vw] md:text-[8vw] leading-[0.7] font-siestha font-light tracking-normal relative overflow-visible py-4 flex flex-col items-center">
                            <span className="italic block transform -rotate-1 translate-y-2 text-transparent bg-clip-text bg-gradient-to-r from-[#A8BEA4] via-[#00ff88] to-[#A8BEA4] drop-shadow-[0_0_20px_rgba(0,255,136,0.4)] px-8 py-8 -mx-8 -my-8 leading-normal">
                                The
                            </span>
                            <span className="relative inline-block mt-0">
                                <span className="absolute inset-0 blur-[100px] bg-accent/20 -z-10 rounded-full scale-150" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A8BEA4] via-[#00ff88] to-[#A8BEA4] drop-shadow-[0_0_20px_rgba(0,255,136,0.4)] inline-block px-8 py-8 -mx-8 -my-8 leading-normal">
                                    Story
                                </span>
                            </span>
                        </h2>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="flex flex-col items-center gap-4 mt-12"
                        >
                            <div className="w-[1px] h-32 bg-gradient-to-b from-accent/40 to-transparent" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Scrollytelling Phases */}
                <div className="w-full space-y-[50vh] mt-[-30vh]">
                    {PHASES.map((phase, index) => (
                        <StoryPhase key={phase.id} phase={phase} index={index} isMobile={isMobile} />
                    ))}
                </div>

                {/* Founder Legacy Section */}
                <div className="h-screen flex items-center justify-center w-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2 }}
                        className="relative group p-1 rounded-[3rem] bg-gradient-to-tr from-accent/20 via-transparent to-accent/10 backdrop-blur-2xl border border-white/10 overflow-hidden"
                    >
                        <div className="relative z-10 px-8 py-10 md:px-16 md:py-16 flex flex-col md:flex-row items-center gap-12">
                            <div className="flex -space-x-8 pl-1">
                                {[
                                    { src: "/founders/jamal-adil.webp", name: "Jamal Adil" },
                                    { src: "/founders/IMG_3498.webp", name: "Arslan" }
                                ].map((founder, i) => (
                                    <div key={i} className="relative w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-[#030305] overflow-hidden bg-black shadow-[0_0_50px_rgba(0,0,0,0.5)] group-hover:z-10 transition-transform duration-500 hover:scale-110">
                                        <Image
                                            src={founder.src}
                                            alt={founder.name}
                                            fill
                                            className="object-cover saturate-0 group-hover:saturate-100 transition-all duration-700"
                                            style={{ objectPosition: founder.name === "Jamal Adil" ? "center 8%" : "center" }}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col text-center md:text-left">
                                <h3 className="text-3xl md:text-5xl font-serif italic text-accent mb-2 group-hover:text-accent transition-colors">
                                    Jamal Adil & Arslan
                                </h3>
                                <p className="text-accent italic text-sm">The Visionaries</p>
                            </div>
                        </div>

                        {/* Background Light Beam */}
                        <motion.div
                            animate={{ x: ['-200%', '200%'] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-12"
                        />
                    </motion.div>
                </div>

            </div>
        </section>
    );
}

function StoryPhase({ phase, index, isMobile }: { phase: any, index: number, isMobile: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 === 0 ? 100 : -100, 0, index % 2 === 0 ? -100 : 100]);
    const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.8, 1, 0.8]);

    // Lazy load video only when visible
    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    // Play/pause video based on visibility
    useEffect(() => {
        if (!videoRef.current || !isVisible) return;
        const video = videoRef.current;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(video);
        return () => observer.disconnect();
    }, [isVisible]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale }}
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 relative z-10 w-full max-w-6xl mx-auto`}
        >
            {/* Visual Media Content */}
            <div className="flex-1 relative aspect-[4/5] md:aspect-square w-full rounded-[2rem] overflow-hidden group shadow-[0_32px_128px_rgba(0,0,0,0.4)] border border-white/5 bg-white/[0.02]">
                {phase.image ? (
                    <Image
                        src={phase.image}
                        alt={phase.title}
                        fill
                        className="object-cover grayscale brightness-50 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[1.5s]"
                        loading="lazy"
                    />
                ) : isMobile ? (
                    /* Mobile: Static poster image instead of video */
                    <Image
                        src={phase.poster || "/bg/IMG_3704.webp"}
                        alt={phase.title}
                        fill
                        className={`object-cover grayscale brightness-50 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[1.5s] ${phase.subtitle === "The Legacy" ? 'scale-[1.15]' : ''}`}
                        loading="lazy"
                    />
                ) : isVisible ? (
                    <video
                        ref={videoRef}
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        poster={phase.poster}
                        className={`w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[1.5s] ${phase.subtitle === "The Legacy" ? 'scale-[1.15]' : ''}`}
                    >
                        <source src={phase.video} type="video/mp4" />
                    </video>
                ) : (
                    /* Placeholder before video loads */
                    <div className="w-full h-full bg-surface" />
                )}

                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 border border-white/10 rounded-[2rem] pointer-events-none" />
            </div>

            {/* Textual Narrative */}
            <motion.div
                style={{ x }}
                className="flex-1 flex flex-col gap-8 text-center md:text-left items-center md:items-start"
            >
                <div>
                    <h3 className="text-4xl md:text-7xl font-serif italic text-accent font-bold tracking-tight">
                        {phase.title}
                    </h3>
                </div>

                <p className="text-xl md:text-2xl text-[var(--text-muted)] font-light leading-relaxed max-w-xl">
                    {phase.description}
                </p>

            </motion.div>
        </motion.div>
    );
}
