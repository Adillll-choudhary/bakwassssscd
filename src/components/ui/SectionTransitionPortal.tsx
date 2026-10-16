"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface SectionTransitionPortalProps {
    nextSectionId: string;
    chapterNumber: string;
    title: string;
    subtitle: string;
}

export default function SectionTransitionPortal({
    nextSectionId,
    chapterNumber,
    title,
    subtitle,
}: SectionTransitionPortalProps) {
    const handleScrollToNext = () => {
        const el = document.getElementById(nextSectionId);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="relative w-full py-16 md:py-24 flex flex-col items-center justify-center overflow-visible select-none z-20">
            {/* Background Emerald Diffusion Flare */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[650px] h-[220px] bg-[radial-gradient(ellipse_at_center,rgba(60,255,143,0.08)_0%,rgba(6,78,59,0.03)_50%,transparent_75%)] pointer-events-none blur-2xl" />

            {/* Top Connector Laser Stream */}
            <div className="w-[1px] h-16 md:h-24 bg-gradient-to-b from-transparent via-[#3CFF8F]/40 to-[#3CFF8F] relative overflow-hidden">
                <motion.div
                    animate={{ y: ["-100%", "200%"] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-full h-12 bg-white drop-shadow-[0_0_8px_#ffffff]"
                />
            </div>

            {/* Interactive Next Chapter Badge */}
            <motion.button
                onClick={handleScrollToNext}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group relative my-4 px-6 md:px-8 py-3.5 rounded-full bg-[#080B10]/90 backdrop-blur-xl border border-white/10 hover:border-[#3CFF8F]/60 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(60,255,143,0.15)] hover:shadow-[0_0_35px_rgba(60,255,143,0.35)] flex items-center gap-3.5 transition-all cursor-pointer"
            >
                {/* Glowing Green Dot with Radar Ping */}
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3CFF8F] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3CFF8F]" />
                </span>

                <div className="flex flex-col items-start text-left">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono tracking-[0.25em] text-[#3CFF8F] uppercase font-semibold">
                            {chapterNumber}
                        </span>
                        <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                            {"// TRANSITION"}
                        </span>
                    </div>
                    <span className="text-xs md:text-sm font-universo font-black uppercase text-white group-hover:text-[#3CFF8F] transition-colors tracking-wide">
                        {title}
                    </span>
                </div>

                <div className="ml-2 w-7 h-7 rounded-full bg-white/5 border border-white/10 group-hover:border-[#3CFF8F] group-hover:bg-[#3CFF8F] flex items-center justify-center text-white/60 group-hover:text-black transition-all">
                    <ArrowDown size={13} className="stroke-[2.5] group-hover:translate-y-0.5 transition-transform" />
                </div>
            </motion.button>

            {/* Subtext */}
            <span className="text-[11px] font-mono tracking-widest text-white/35 uppercase">
                {subtitle}
            </span>

            {/* Bottom Connector Laser Stream */}
            <div className="w-[1px] h-16 md:h-24 bg-gradient-to-b from-[#3CFF8F] via-[#3CFF8F]/40 to-transparent relative overflow-hidden mt-2">
                <motion.div
                    animate={{ y: ["-100%", "200%"] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 0.9 }}
                    className="absolute top-0 left-0 w-full h-12 bg-white drop-shadow-[0_0_8px_#ffffff]"
                />
            </div>
        </div>
    );
}
