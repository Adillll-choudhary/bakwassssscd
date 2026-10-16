"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const tracks = [
    {
        title: "Coldune Anthem",
        artist: "Official Soundscape",
        image: "/bg/IMG_3705.webp",
        url: "/audio/main_theme.mp3",
        duration: "01:24"
    },
    {
        title: "Dune Theme",
        artist: "Ambient Mix",
        image: "/bg/IMG_3704.webp",
        url: "/audio/dune_theme.mp3",
        duration: "02:15"
    },
    {
        title: "Sci-Fi Core",
        artist: "Legacy Track",
        image: "/coldune-studio-logo-3.webp",
        url: "/audio/scifi_theme.mp3",
        duration: "03:10"
    }
];

export function MusicPlayerFooter() {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio(tracks[currentTrackIndex].url);
            audioRef.current.onended = () => setIsPlaying(false);
        }

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(() => {});
        }
        setIsPlaying(!isPlaying);
    };

    const nextTrack = () => {
        const nextIndex = (currentTrackIndex + 1) % tracks.length;
        setCurrentTrackIndex(nextIndex);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = tracks[nextIndex].url;
            if (isPlaying) audioRef.current.play().catch(() => {});
        }
    };

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const track = tracks[currentTrackIndex];

    return (
        <section className="relative w-full py-24 px-4 m-0 overflow-hidden flex justify-center items-center">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-transparent">
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full -translate-y-1/2 animate-pulse opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(172,200,162,1) 0%, transparent 70%)' }} />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full animate-pulse delay-1000 opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(59,130,246,1) 0%, transparent 70%)' }} />
            </div>

            {/* Solid Olive Green Card Container */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-5xl md:h-[600px] bg-[#1A2118] border border-[#ACC8A2]/10 rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
                {/* Left Content (Text & Player) */}
                <div className="flex-1 p-8 md:p-16 flex flex-col justify-center relative z-20">
                    <div className="inline-block px-4 py-2 rounded-full bg-[#ACC8A2]/20 border border-[#ACC8A2]/20 w-fit mb-8">
                        <span className="text-[#ACC8A2] text-xs font-bold tracking-widest uppercase">The Minds Behind //</span>
                    </div>

                    <div className="space-y-4 mb-12">
                        <h2 className="text-5xl md:text-7xl font-bold text-accent tracking-tighter leading-none">
                            FOUNDERS
                        </h2>
                        <div className="flex flex-col gap-1">
                            <p className="text-xl md:text-2xl text-accent font-serif italic">
                                Jamal Adil & Arslan
                            </p>
                            <p className="text-sm text-accent font-mono tracking-widest uppercase">
                                Coldune Studio
                            </p>
                        </div>
                    </div>

                    {/* Integrated Mini Player */}
                    <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 max-w-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[#030305]">
                                <Image src={track.image} alt="Track Art" fill className={`object-cover ${track.image.includes('logo') ? 'mix-blend-screen' : ''}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-accent text-sm font-bold truncate tracking-tight">{track.title}</h4>
                                <p className="text-[#ACC8A2] text-[10px] font-mono uppercase tracking-widest truncate">{track.artist}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={togglePlay}
                                    className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-black hover:scale-110 transition-transform"
                                >
                                    {isPlaying ? (
                                        <div className="flex gap-1">
                                            <div className="w-1 h-3 bg-black animate-pulse" />
                                            <div className="w-1 h-3 bg-black animate-pulse delay-75" />
                                        </div>
                                    ) : (
                                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-black border-b-[6px] border-b-transparent translate-x-0.5" />
                                    )}
                                </button>
                                <button
                                    onClick={nextTrack}
                                    className="text-accent hover:text-accent transition-colors"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M6 18L14.5 12L6 6V18ZM16 6V18H18V6H16Z" />
                                    </svg>
                                </button>
                            </div>
                            <span className="text-accent text-[10px] font-mono">{track.duration}</span>
                        </div>
                    </div>
                </div>

                {/* Right Content (Dual Images) */}
                <div className="flex-1 relative h-[400px] md:h-full w-full md:w-1/2 overflow-hidden flex items-end justify-center">
                    {/* Background Gradients for Blending (Olive) */}
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#1A2118] z-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A2118] via-[#1A2118]/20 to-transparent z-20" />

                    {/* Combined Image Container */}
                    <div className="relative w-[400px] md:w-[600px] h-full flex items-end">
                        <div className="absolute left-0 bottom-0 w-[240px] h-[430px] md:w-[350px] md:h-[530px] z-50 md:z-10">
                            <Image
                                src="/bg/IMG_3704.webp"
                                alt="Arslan - Founder"
                                fill
                                className="object-cover object-top drop-shadow-2xl md:drop-shadow-none md:mix-blend-screen md:saturate-0 md:contrast-125"
                                priority
                            />
                        </div>
                        <div className="absolute right-0 bottom-0 w-[260px] h-[450px] md:w-[360px] md:h-[550px] z-0 md:z-0 md:opacity-90">
                            <Image
                                src="/bg/IMG_3705.webp"
                                alt="Jamal Adil - Founder"
                                fill
                                className="object-cover object-top drop-shadow-2xl md:drop-shadow-none md:mix-blend-screen md:saturate-0 md:contrast-125"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
