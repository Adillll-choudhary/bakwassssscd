"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { usePerformance } from "@/hooks/usePerformance";

const stats = [
    { label: "User Engagement", before: 15, after: 94, color: "from-[#A8BEA4] to-[#00ff88]", description: "Average session duration and interaction depth.", shadow: "rgba(0,255,136,0.5)", colSpan: "md:col-span-7" },
    { label: "Conversion Velocity", before: 2.1, after: 12.8, color: "from-white to-white/40", description: "Speed of user transition from lead to customer.", shadow: "rgba(255,255,255,0.4)", colSpan: "md:col-span-5" },
    { label: "Market Growth", before: 10, after: 180, color: "from-[#00ff88] to-[#00ff88]/50", suffix: "%", description: "Direct revenue increase post-deployment.", shadow: "rgba(0,255,136,0.6)", colSpan: "col-span-1 md:col-span-12" },
];

function AnimatedCounter({ value, suffix = "", duration = 2.5 }: { value: number; suffix?: string; duration?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, motionValue, value]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = `${latest.toFixed(value % 1 !== 0 ? 1 : 0)}${suffix}`;
            }
        });
    }, [springValue, suffix, value]);

    return <span ref={ref} className="tabular-nums">0{suffix}</span>;
}

function MagneticMetricCard({ stat, index, isMobile }: { stat: typeof stats[0], index: number, isMobile: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Magnetic pull variables
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const rotateX = useTransform(mouseY, [-50, 50], [isMobile ? "0deg" : "4deg", isMobile ? "0deg" : "-4deg"]);
    const rotateY = useTransform(mouseX, [-50, 50], [isMobile ? "0deg" : "-4deg", isMobile ? "0deg" : "4deg"]);
    
    // Smooth glare
    const glareX = useTransform(mouseX, [-50, 50], ["0%", "100%"]);
    const glareY = useTransform(mouseY, [-50, 50], ["0%", "100%"]);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!ref.current || isMobile) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Calculate distance from center
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        
        // Gentle magnetic pull (max 20px)
        x.set(distX * 0.1);
        y.set(distY * 0.1);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    }

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ x: mouseX, y: mouseY, rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={`perspective-[2000px] w-full h-full ${stat.colSpan}`}
        >
            <div className={`relative h-full bg-gradient-to-br from-white/[0.04] to-black/60 border transition-all duration-500 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] group hover:border-[#00ff88]/30 shadow-2xl overflow-hidden backdrop-blur-3xl ${isHovered ? 'border-[#00ff88]/40' : 'border-white/[0.05]'}`}>

                {/* Dynamic Lighting & Glare */}
                <motion.div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,136,0.1),transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen"
                    style={{ left: glareX, top: glareY, transform: "translate(-50%, -50%)", width: "200%", height: "200%" }}
                />
                
                <div className="flex flex-col h-full justify-between relative z-10" style={{ transform: "translateZ(30px)" }}>
                    <div className="space-y-4 max-w-sm mb-auto">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_10px_#00ff88]" />
                            <h3 className="text-3xl md:text-4xl font-siestha tracking-normal text-white drop-shadow-[0_0_10px_rgba(0,255,136,0.4)]">{stat.label}</h3>
                        </div>
                    </div>

                    <div className="text-left mt-8 md:mt-12" style={{ transform: "translateZ(40px)" }}>
                        <div className={`text-6xl md:text-7xl xl:text-[8rem] font-siestha tracking-normal mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-b ${stat.color} drop-shadow-[0_0_15px_rgba(0,255,136,0.3)] pr-6 pb-4 pt-6`}>
                            <AnimatedCounter value={stat.after} suffix={stat.suffix} />
                        </div>
                        <p className="text-[11px] font-sans text-white/50 uppercase tracking-[0.2em] font-medium leading-relaxed max-w-[90%]">{stat.description}</p>
                    </div>
                </div>

                {/* Animated Progress Bar */}
                <div className="relative h-2 bg-black/60 rounded-full border border-white/5 overflow-hidden shadow-inner mt-8" style={{ transform: "translateZ(20px)" }}>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.after}%` }}
                        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 + (index * 0.1) }}
                        viewport={{ once: true }}
                        className={`absolute top-0 bottom-0 left-0 bg-gradient-to-r ${stat.color} rounded-full z-10`}
                        style={{ boxShadow: `0 0 20px ${stat.shadow}` }}
                    />
                </div>
            </div>
        </motion.div>
    );
}

export default function Growth() {
    const { isMobile } = usePerformance();

    return (
        <section id="growth" className="py-24 md:py-40 relative bg-[#030304] overflow-hidden perspective-[1000px]">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-[#00ff88]/10 rounded-full blur-[150px] opacity-30 mix-blend-screen" />
                <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-[#A8BEA4]/10 rounded-full blur-[180px] opacity-20 mix-blend-screen" />

                {/* Ghost Typography Backdrop */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none z-0">
                    <h2 className="text-[35vw] font-siestha tracking-normal leading-none transform rotate-2 text-transparent stroke-white" style={{ WebkitTextStroke: '2px #A8BEA4' }}>
                        IMPACT
                    </h2>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* 1. Centered Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center mb-20 md:mb-32"
                >
                    <h2 className="text-6xl md:text-[8rem] font-siestha text-white leading-[0.9] tracking-normal drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] mb-8">
                        Measurable <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A8BEA4] via-[#00ff88] to-[#A8BEA4] drop-shadow-[0_0_20px_rgba(0,255,136,0.4)]">
                            Impact
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-white/70 font-sans max-w-2xl leading-relaxed">
                        We don't just optimize for beauty. We build high-performance systems mathematically designed to outperform the competition and print authority.
                    </p>
                </motion.div>

                {/* 2. Asymmetrical Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-6 md:mb-8 max-w-6xl mx-auto">
                    {stats.map((stat, index) => (
                        <MagneticMetricCard key={stat.label} stat={stat} index={index} isMobile={isMobile} />
                    ))}
                </div>

                {/* 3. Full-width Footer Banner */}
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                        className="relative w-full bg-gradient-to-r from-[#00ff88]/10 via-[#0a0a0a] to-[#A8BEA4]/5 border border-[#00ff88]/20 rounded-[2rem] md:rounded-[3rem] p-10 md:p-16 overflow-hidden group shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-3xl hover:border-[#00ff88]/40 transition-all duration-700 flex flex-col md:flex-row items-center justify-between"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(0,255,136,0.15),transparent_50%)] group-hover:scale-110 transition-transform duration-1000 mix-blend-screen" />
                        
                        <div className="relative z-10 max-w-2xl text-center md:text-left mb-10 md:mb-0">
                            <h3 className="text-5xl md:text-[5rem] font-siestha text-white mb-6 leading-[0.9] tracking-normal drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                Transform <br />
                                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#A8BEA4] pr-2">Authority</span>
                            </h3>
                            <p className="text-lg md:text-xl text-white/60 font-sans leading-relaxed border-l-2 border-[#00ff88]/30 pl-6 mx-auto md:mx-0">
                                We bridge the gap between creative ambition and technical performance, delivering assets that dominate globally.
                            </p>
                        </div>

                        <div className="relative z-10 grid grid-cols-2 gap-8 md:gap-12 shrink-0">
                            <div className="space-y-3 group/metric">
                                <div className="text-5xl md:text-6xl font-siestha text-white tracking-normal group-hover/metric:text-[#00ff88] transition-colors drop-shadow-[0_0_15px_rgba(0,255,136,0.3)]">
                                    <AnimatedCounter value={250} suffix="+" />
                                </div>
                                <div className="text-[11px] font-sans text-white/50 uppercase tracking-[0.2em] font-medium">Global Launches</div>
                            </div>
                            <div className="space-y-3 group/metric">
                                <div className="text-5xl md:text-6xl font-siestha text-white tracking-normal group-hover/metric:text-[#00ff88] transition-colors drop-shadow-[0_0_15px_rgba(0,255,136,0.3)]">
                                    <AnimatedCounter value={98} suffix="%" />
                                </div>
                                <div className="text-[11px] font-sans text-white/50 uppercase tracking-[0.2em] font-medium">Client Retention</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
