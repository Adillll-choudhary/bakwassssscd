"use client";

import { useEffect, useState, useRef, useSyncExternalStore, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Sparkles, ChevronRight } from "lucide-react";

interface StorySectionInfo {
    id: string;
    chapter: string;
    tag: string;
    nextTitle: string;
    nextDesc: string;
    nextId: string;
}

const STORY_SECTIONS: StorySectionInfo[] = [
    {
        id: "hero",
        chapter: "01 / 06",
        tag: "UP NEXT // CLIENT COLLABORATIONS",
        nextTitle: "Next: Trusted Collaborations & Proven Impact",
        nextDesc: "Discover the visionary brands and global referrals engineered by Coldune",
        nextId: "clients"
    },
    {
        id: "clients",
        chapter: "02 / 06",
        tag: "UP NEXT // WHAT WE OFFER",
        nextTitle: "Next You Will See What We Offer You — The Services",
        nextDesc: "Explore Website Architecture, Cinematic Branding, & Autonomous AI Systems",
        nextId: "services"
    },
    {
        id: "services",
        chapter: "03 / 06",
        tag: "UP NEXT // DIGITAL SHOWCASE",
        nextTitle: "Next You Will Experience: 14 Live Web Works",
        nextDesc: "Interactive 3D carousel featuring Creet, FOU, Leetcore, Isharya & Outland",
        nextId: "websites"
    },
    {
        id: "websites",
        chapter: "04 / 06",
        tag: "UP NEXT // THE PHILOSOPHY",
        nextTitle: "Next You Will Discover: The Coldune Manifesto",
        nextDesc: "Why we refuse mediocrity and design for undeniable market dominance",
        nextId: "manifesto"
    },
    {
        id: "manifesto",
        chapter: "05 / 06",
        tag: "UP NEXT // INITIATE IMPACT",
        nextTitle: "Next: Turn Your Vision Into Digital Dominance",
        nextDesc: "Direct line to founders Jamal & Arslan — Start your project today",
        nextId: "contact"
    },
    {
        id: "contact",
        chapter: "06 / 06",
        tag: "UP NEXT // RETURN TO TOP",
        nextTitle: "Coldune Studio — Creative Engineering",
        nextDesc: "Experience the nexus of high-fidelity visual production & digital strategy",
        nextId: "hero"
    }
];

// Swirling Particle Orbit Canvas inside the HUD badge
function MiniParticleOrb({ progress }: { progress: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const count = 28;
        const particles: Array<{
            angle: number;
            speed: number;
            radiusX: number;
            radiusY: number;
            tilt: number;
            size: number;
            isSpark: boolean;
            phase: number;
        }> = [];

        for (let i = 0; i < count; i++) {
            particles.push({
                angle: Math.random() * Math.PI * 2,
                speed: 0.025 + Math.random() * 0.035,
                radiusX: 14 + Math.random() * 10,
                radiusY: 6 + Math.random() * 6,
                tilt: -0.4 + Math.random() * 0.8,
                size: Math.random() > 0.75 ? 2.2 : 1.2,
                isSpark: Math.random() > 0.78,
                phase: Math.random() * Math.PI * 2
            });
        }

        let animId: number;
        let t = 0;

        const render = () => {
            t += 0.016;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            // Central pulsing nucleus
            const pulse = 1.0 + Math.sin(t * 3.5) * 0.25;
            const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 10 * pulse);
            coreGrad.addColorStop(0, "rgba(60, 255, 143, 0.95)");
            coreGrad.addColorStop(0.5, "rgba(34, 211, 238, 0.5)");
            coreGrad.addColorStop(1, "rgba(60, 255, 143, 0)");
            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, 10 * pulse, 0, Math.PI * 2);
            ctx.fill();

            // Particles revolve faster as progress increases
            const speedBoost = 1.0 + (progress / 100) * 1.8;

            particles.forEach((p) => {
                p.angle += p.speed * speedBoost;

                const cosA = Math.cos(p.angle);
                const sinA = Math.sin(p.angle);

                // Rotated ellipse orbit
                const x0 = cosA * p.radiusX;
                const y0 = sinA * p.radiusY;

                const x = cx + x0 * Math.cos(p.tilt) - y0 * Math.sin(p.tilt);
                const y = cy + x0 * Math.sin(p.tilt) + y0 * Math.cos(p.tilt);

                // Depth scaling
                const depth = (sinA + 1.0) * 0.5;
                const alpha = Math.max(0.25, depth * 0.95);
                const size = p.size * (0.8 + depth * 0.6);

                ctx.fillStyle = p.isSpark 
                    ? `rgba(255, 255, 255, ${alpha})` 
                    : `rgba(60, 255, 143, ${alpha})`;
                
                ctx.shadowColor = p.isSpark ? "#ffffff" : "#3CFF8F";
                ctx.shadowBlur = p.isSpark ? 8 : 6;

                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            });

            animId = requestAnimationFrame(render);
        };

        animId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animId);
    }, [progress]);

    return (
        <canvas
            ref={canvasRef}
            width={58}
            height={58}
            className="w-11 h-11 md:w-12 md:h-12 shrink-0 pointer-events-none"
        />
    );
}

function useClientMount() {
    return useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );
}

export default function SectionStoryHUD() {
    const isClient = useClientMount();
    const [currentIdx, setCurrentIdx] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isCompact, setIsCompact] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const lastScrollY = useRef(0);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Wake up notification on scroll
        setIsVisible(true);
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

        // Auto-compact if idle for 4.5 seconds
        hideTimeoutRef.current = setTimeout(() => {
            setIsCompact(true);
        }, 4500);

        // Find active section
        let activeIndex = 0;
        let sectionProgress = 0;

        for (let i = 0; i < STORY_SECTIONS.length; i++) {
            const sec = STORY_SECTIONS[i];
            const el = document.getElementById(sec.id);
            if (!el) continue;

            const rect = el.getBoundingClientRect();
            const elTop = rect.top + scrollY;
            const elHeight = el.offsetHeight;

            // If viewport is inside this section
            if (scrollY >= elTop - windowHeight * 0.35 && scrollY < elTop + elHeight - windowHeight * 0.35) {
                activeIndex = i;
                const scrollWithin = Math.max(0, scrollY - (elTop - windowHeight * 0.2));
                const totalSpan = Math.max(1, elHeight - windowHeight * 0.5);
                sectionProgress = Math.min(100, Math.max(0, Math.round((scrollWithin / totalSpan) * 100)));
                break;
            }
        }

        setCurrentIdx(activeIndex);
        setProgress(sectionProgress);
        lastScrollY.current = scrollY;
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        const frameId = requestAnimationFrame(handleScroll);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("scroll", handleScroll);
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        };
    }, [handleScroll]);

    const activeStory = STORY_SECTIONS[currentIdx] || STORY_SECTIONS[0];

    const scrollToNext = () => {
        const targetEl = document.getElementById(activeStory.nextId);
        if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth" });
        } else {
            window.scrollTo({
                top: window.scrollY + window.innerHeight * 0.85,
                behavior: "smooth"
            });
        }
    };

    if (!isClient) return null;

    return (
        <aside 
            aria-label="Story Navigation Notification"
            className="fixed bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 z-[850] max-w-[94vw] md:max-w-2xl select-none font-sans"
            onMouseEnter={() => {
                setIsHovered(true);
                setIsCompact(false);
            }}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence mode="wait">
                {isVisible && (
                    <motion.div
                        key={isCompact && !isHovered ? "compact-pill" : "expanded-hud"}
                        initial={{ opacity: 0, y: 25, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", damping: 26, stiffness: 280 }}
                        className="relative"
                    >
                        {/* Compact Floating Shimmer Pill */}
                        {isCompact && !isHovered ? (
                            <button
                                onClick={() => setIsCompact(false)}
                                className="group flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#080B10]/90 backdrop-blur-2xl border border-[#3CFF8F]/40 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(60,255,143,0.25)] hover:border-[#3CFF8F] hover:shadow-[0_0_35px_rgba(60,255,143,0.45)] transition-all cursor-pointer"
                            >
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3CFF8F] opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#3CFF8F]" />
                                </span>
                                <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/80 group-hover:text-white transition-colors">
                                    {activeStory.tag.replace("UP NEXT // ", "NEXT: ")}
                                </span>
                                <span className="text-[11px] font-mono font-bold text-[#3CFF8F]">
                                    {progress}%
                                </span>
                                <ChevronRight size={14} className="text-[#3CFF8F] group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        ) : (
                            /* Full High-End Cinematic HUD Notification */
                            <div className="relative rounded-2xl md:rounded-3xl bg-[#090C12]/92 backdrop-blur-2xl border border-white/10 hover:border-[#3CFF8F]/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(60,255,143,0.18)] transition-all duration-300 p-3 sm:p-4 overflow-hidden">
                                
                                {/* Background Shimmer Stream & Radial Glow */}
                                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#3CFF8F]/80 to-transparent animate-pulse" />
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-20 bg-[#3CFF8F]/10 blur-2xl rounded-full pointer-events-none" />

                                <div className="flex items-center gap-3 md:gap-4">
                                    {/* 1. Orbiting Particle Vortex */}
                                    <div className="relative shrink-0 flex items-center justify-center p-1 rounded-xl bg-white/[0.03] border border-white/5">
                                        <MiniParticleOrb progress={progress} />
                                    </div>

                                    {/* 2. Dynamic Catchy Storytelling Copy */}
                                    <div className="flex-1 min-w-0 pr-2">
                                        {/* Tagline & Chapter */}
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#3CFF8F]/15 border border-[#3CFF8F]/30 text-[9px] md:text-[10px] font-mono font-semibold tracking-[0.2em] text-[#3CFF8F] uppercase">
                                                <Sparkles size={10} className="stroke-[2.5]" />
                                                {activeStory.tag}
                                            </span>
                                            <span className="text-[9px] md:text-[10px] font-mono tracking-widest text-white/40">
                                                [{activeStory.chapter}]
                                            </span>
                                        </div>

                                        {/* Main Headline */}
                                        <h4 className="text-xs sm:text-sm md:text-[15px] font-universo font-black uppercase tracking-wide text-white leading-tight truncate">
                                            {activeStory.nextTitle}
                                        </h4>

                                        {/* Subtext description */}
                                        <p className="text-[10px] sm:text-xs text-white/50 tracking-normal line-clamp-1 mt-0.5 font-sans">
                                            {activeStory.nextDesc}
                                        </p>
                                    </div>

                                    {/* 3. Interactive Progress & Jump Action Button */}
                                    <div className="shrink-0 flex items-center gap-2.5 pl-2 border-l border-white/10">
                                        <div className="hidden sm:flex flex-col items-end">
                                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                                                LOAD
                                            </span>
                                            <span className="text-xs font-mono font-bold tabular-nums text-[#3CFF8F] drop-shadow-[0_0_8px_rgba(60,255,143,0.6)]">
                                                {progress}%
                                            </span>
                                        </div>

                                        <button
                                            onClick={scrollToNext}
                                            aria-label="Scroll to next section"
                                            className="group relative flex items-center gap-2 px-3.5 py-2.5 md:px-4 md:py-2.5 rounded-xl bg-[#3CFF8F] hover:bg-[#52ff9a] text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(60,255,143,0.5)] hover:shadow-[0_0_30px_rgba(60,255,143,0.8)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                                        >
                                            <span className="hidden md:inline">ENTER</span>
                                            <ArrowDown size={14} className="stroke-[3] group-hover:translate-y-0.5 transition-transform" />
                                        </button>
                                    </div>
                                </div>

                                {/* 4. Bottom Sleek Glowing Progress Bar */}
                                <div className="mt-2.5 w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-[#22d3ee] to-[#3CFF8F] rounded-full drop-shadow-[0_0_8px_rgba(60,255,143,0.9)]"
                                        style={{ width: `${progress}%` }}
                                        transition={{ duration: 0.15, ease: "easeOut" }}
                                    />
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </aside>
    );
}
