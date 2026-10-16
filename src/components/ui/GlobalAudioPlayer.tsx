"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function GlobalAudioPlayer() {
    const pathname = usePathname();
    const isCaseStudyPage = pathname?.startsWith("/case-studies");
    
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [userManuallyPaused, setUserManuallyPaused] = useState(false);
    const [isHeroVisible, setIsHeroVisible] = useState(true);
    const [isAudioSupported, setIsAudioSupported] = useState(true);

    // Initial Setup
    useEffect(() => {
        try {
            audioRef.current = new Audio("/audio/main_theme.mp3");
            audioRef.current.loop = true;
            audioRef.current.volume = 0.5;

            if (audioRef.current.canPlayType("audio/mpeg") === "") {
                setIsAudioSupported(false);
            }

            audioRef.current.addEventListener('error', () => setIsAudioSupported(false));

            // Try initial autoplay
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                }).catch(() => {
                    // Autoplay blocked, wait for interaction
                    // Autoplay blocked
                });
            }

        } catch (e) {
            setIsAudioSupported(false);
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // Scroll Listener for "Hero Audio" behavior
    useEffect(() => {
        const handleScroll = () => {
            const heroThreshold = window.innerHeight * 0.9;
            const isVisible = window.scrollY < heroThreshold;
            setIsHeroVisible(isVisible);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Manage Playback State based on Visibility & User Preference
    useEffect(() => {
        if (!audioRef.current || !isAudioSupported || isCaseStudyPage) {
            if (audioRef.current && isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
            return;
        }

        if (isHeroVisible && !userManuallyPaused) {
            // Should be playing
            if (!isPlaying) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => setIsPlaying(true)).catch(() => { });
                }
            }
        } else {
            // Should be paused
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }
    }, [isHeroVisible, userManuallyPaused, isAudioSupported, isCaseStudyPage]);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!audioRef.current || !isAudioSupported) return;

        if (isPlaying) {
            setUserManuallyPaused(true);
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            setUserManuallyPaused(false);
            if (isHeroVisible) {
                audioRef.current.play().catch(() => { });
                setIsPlaying(true);
            } else {
                // If user clicks play while scrolled away, scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    // Global Interaction Fallback
    useEffect(() => {
        const handleInteraction = () => {
            if (isHeroVisible && !userManuallyPaused && audioRef.current && audioRef.current.paused) {
                audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
            }
        };

        window.addEventListener('click', handleInteraction, { once: true });
        return () => window.removeEventListener('click', handleInteraction);
    }, [isHeroVisible, userManuallyPaused]);

    const [hovered, setHovered] = useState(false);

    // if (!isAudioSupported) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: isHeroVisible && !isCaseStudyPage ? 1 : 0,
                    scale: isHeroVisible && !isCaseStudyPage ? 1 : 0.8,
                    pointerEvents: isHeroVisible && !isCaseStudyPage ? 'auto' : 'none'
                }}
                className="fixed bottom-8 left-8 z-[100]"
            >
                <div className="relative">
                    <motion.button
                        onClick={togglePlay}
                        onHoverStart={() => setHovered(true)}
                        onHoverEnd={() => setHovered(false)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] transition-colors border border-white/5 shadow-xl cursor-pointer"
                        aria-label={isPlaying ? "Mute" : "Unmute"}
                    >
                        {isPlaying ? (
                            <motion.svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <motion.path 
                                    d="M2 6 Q 7 0, 12 6 T 22 6" 
                                    stroke="currentColor" 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </motion.svg>
                        ) : (
                            <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path 
                                    d="M2 6 L 22 6" 
                                    stroke="currentColor" 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                    opacity="0.5"
                                />
                            </svg>
                        )}
                        <span className="text-sm font-sans lowercase tracking-wide -mt-0.5" style={{ letterSpacing: "-0.02em" }}>
                            sound {isPlaying ? "on" : "off"}
                        </span>
                    </motion.button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
