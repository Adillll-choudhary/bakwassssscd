"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [status, setStatus] = useState<"idle" | "accepted" | "declined">("idle");
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1200);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAction = async (choice: "accepted" | "declined") => {
        setStatus(choice);
        await new Promise(resolve => setTimeout(resolve, 800));
        localStorage.setItem("cookie-consent", choice);
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 150, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ 
                        y: 200, 
                        opacity: 0, 
                        scale: 0.8,
                        transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] } 
                    }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    className="fixed bottom-10 left-0 right-0 z-[9999] px-6"
                >
                    <div className="max-w-4xl mx-auto relative group">
                        {/* THE MODULE */}
                        <div className="bg-[#08080A]/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
                            {/* Texture & Glow */}
                            <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none" />
                            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#3CFF8F]/10 blur-[100px] rounded-full" />
                            
                            <div className="relative z-10 px-10 py-8 md:py-7 flex flex-col md:flex-row items-center gap-10">
                                
                                {/* Status Indicator Section */}
                                <div className="flex items-center gap-6 md:border-r border-white/5 md:pr-10">
                                    <div className="relative">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                            <Cookie className="w-6 h-6 text-[#3CFF8F]" />
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#3CFF8F] rounded-full border-2 border-[#08080A] animate-pulse" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-syne font-bold text-[10px] uppercase tracking-[0.3em] text-accent">Cookie Settings</h4>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full bg-[#3CFF8F]" />
                                            <span className="text-[8px] font-syne font-medium uppercase tracking-widest text-[#3CFF8F]/60">Active</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 text-center md:text-left">
                                    <p className="text-accent text-[11px] md:text-xs leading-relaxed font-sans tracking-wide">
                                        We use cookies to enhance your experience, analyze site traffic, and deliver high-performance visual impact. By clicking &quot;Accept All&quot;, you agree to our data standards.
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-4 shrink-0">
                                    <motion.button 
                                        whileHover={{ x: -5, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleAction("declined")}
                                        className="px-6 py-3 font-syne font-bold text-[9px] uppercase tracking-[0.2em] text-accent hover:text-accent transition-colors"
                                    >
                                        Decline
                                    </motion.button>
                                    
                                    <motion.button 
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleAction("accepted")}
                                        disabled={status !== "idle"}
                                        className={`
                                            relative px-10 py-3.5 rounded-xl font-syne font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-500
                                            ${status === "accepted" ? 'bg-[#3CFF8F] text-black' : 'bg-white text-black hover:bg-[#3CFF8F]'}
                                        `}
                                    >
                                        {status === "accepted" ? 'Accepted' : 'Accept All'}
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        {/* Creative Shadow/Glow under the pill */}
                        <div className="absolute inset-x-12 -bottom-2 h-px bg-gradient-to-r from-transparent via-[#3CFF8F]/30 to-transparent blur-sm" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
