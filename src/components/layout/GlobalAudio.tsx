"use client";

import { useEffect, useRef, useState } from "react";
import { Headphones } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalAudio() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMuted, setIsMuted] = useState(true); // Always start muted to respect browser autoplay policies until user interacts
    const [isActiveZone, setIsActiveZone] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        // Initialize audio
        const audio = new Audio("/audio/Beneath_the_Old_Pines.mp3");
        audio.loop = true;
        audio.volume = 0.1;
        audioRef.current = audio;

        // Unlock audio on first user click anywhere on the page
        const handleFirstInteraction = () => {
            setHasInteracted(true);
            setIsMuted(false); // Unmute and play immediately
            window.removeEventListener("click", handleFirstInteraction);
            window.removeEventListener("touchstart", handleFirstInteraction);
        };

        window.addEventListener("click", handleFirstInteraction);
        window.addEventListener("touchstart", handleFirstInteraction);

        // Scroll listener to check if we are past the "Services" section
        const handleScroll = () => {
            const servicesSection = document.getElementById("services");
            if (servicesSection) {
                const rect = servicesSection.getBoundingClientRect();
                // If the bottom of the services section is less than 0, it means it has scrolled completely out of view (upwards)
                if (rect.bottom < 0) {
                    setIsActiveZone(false);
                } else {
                    setIsActiveZone(true);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Call it once to set initial state
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("click", handleFirstInteraction);
            window.removeEventListener("touchstart", handleFirstInteraction);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // Handle Play/Pause logic based on mute state and active zone
    const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

        if (isActiveZone && !isMuted) {
            audio.play().catch((e) => {
                // Audio play blocked by browser
                setIsMuted(true);
            });
            
            // Smoothly fade IN
            fadeIntervalRef.current = setInterval(() => {
                if (audio.volume < 0.08) {
                    audio.volume = Math.min(0.1, audio.volume + 0.02);
                } else {
                    audio.volume = 0.1;
                    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
                }
            }, 50);
        } else {
            // Smoothly fade OUT
            fadeIntervalRef.current = setInterval(() => {
                if (audio.volume > 0.02) {
                    audio.volume = Math.max(0, audio.volume - 0.02);
                } else {
                    audio.volume = 0;
                    audio.pause();
                    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
                }
            }, 50);
        }
    }, [isActiveZone, isMuted, hasInteracted]);

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering the global interaction listener again
        setIsMuted(!isMuted);
    };

    return (
        <>
            <audio ref={audioRef} loop preload="auto">
                <source src="/audio/coldunestudio.mp3" type="audio/mpeg" />
            </audio>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                onClick={toggleMute}
                className="fixed bottom-6 left-6 md:bottom-8 md:left-12 z-[999] flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label={isMuted ? "Unmute" : "Mute"}
            >
                {!isMuted ? (
                    <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-hidden">
                        <motion.g
                            animate={{ x: [0, -20] }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                            <path 
                                d="M -18 6 Q -13 0, -8 6 T 2 6 Q 7 0, 12 6 T 22 6 Q 27 0, 32 6 T 42 6" 
                                stroke="currentColor" 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                        </motion.g>
                    </svg>
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
                    sound {!isMuted ? "on" : "off"}
                </span>
            </motion.div>
        </>
    );
}
