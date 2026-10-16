"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Star, TrendingUp, Users, Zap, ArrowRight, Sparkles } from "lucide-react";

// Testimonials data
const testimonials = [
    {
        id: 1,
        brand: "Wonderhill",
        industry: "British University",
        location: "United Kingdom",
        image: "https://cdn-icons-png.flaticon.com/512/8066/8066607.webp",
        rating: 5,
        text: "Coldune Studio helped us modernize our university's recruitment campaign. The cinematic storytelling reached thousands of prospective students and truly elevated our academic brand.",
    },
    {
        id: 2,
        brand: "Faiqa",
        industry: "Fashion Boutique",
        location: "Mumbai",
        image: "https://cdn-icons-png.flaticon.com/512/3050/3050222.webp",
        rating: 5,
        text: "The creative team's vision for our latest collection campaign was nothing short of extraordinary. They don't just create content, they tell a story that resonates with our audience.",
    },
    {
        id: 3,
        brand: "Hotchix Kitchen",
        industry: "Culinary Chain",
        location: "Greater Noida",
        image: "https://cdn-icons-png.flaticon.com/512/3361/3361925.webp",
        rating: 5,
        text: "Coldune Studio's food photography and marketing strategy helped us launch our 5th branch successfully. The engagement on our social handles has never been higher!",
    },
    {
        id: 4,
        brand: "The Ideal Restaurant",
        industry: "Premium Dining",
        location: "New York",
        image: "https://cdn-icons-png.flaticon.com/512/2813/2813045.webp",
        rating: 5,
        text: "Exceptional service and unmatched creativity. The promo video they produced for our winter menu was viral across all platforms. Coldune is our go-to creative partner.",
    },
    {
        id: 5,
        brand: "GrowthLabs",
        industry: "Digital Growth",
        location: "London",
        image: "https://cdn-icons-png.flaticon.com/512/2620/2620608.webp",
        rating: 5,
        text: "Coldune Studio doesn't just create content—they create impact. Their strategic thinking combined with exceptional design skills delivered results beyond our expectations.",
    },
];

// Success metrics
const metrics = [
    { label: "Lead Growth", value: "250%", icon: TrendingUp, color: "#ACC8A2" },
    { label: "Client Satisfaction", value: "98%", icon: Users, color: "#7FA876" },
    { label: "Engagement Rate", value: "340%", icon: Zap, color: "#ACC8A2" },
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Auto-scroll testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollRef.current) {
                const nextIndex = (currentIndex + 1) % testimonials.length;
                const card = cardRefs.current[nextIndex];
                if (card) {
                    scrollRef.current.scrollTo({
                        left: card.offsetLeft - (scrollRef.current.offsetWidth / 2) + (card.offsetWidth / 2),
                        behavior: "smooth"
                    });
                }
                setCurrentIndex(nextIndex);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const averageRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;

    return (
        <section id="testimonials" className="relative py-24 md:py-40 bg-transparent overflow-hidden">
            {/* Massive Atmospheric Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                        x: ['-10%', '10%', '-10%']
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-accent/20 rounded-full blur-[160px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.05, 0.15, 0.05],
                        x: ['10%', '-10%', '10%']
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent/10 rounded-full blur-[140px]"
                />
            </div>

            {/* Ghost Background Text */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none">
                <h2 className="text-[25vw] font-serif font-black tracking-tighter uppercase leading-none">
                    Trusted
                </h2>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-20 items-start pt-4">
                    {/* Left: Content Side */}
                    <div className="w-full lg:w-[40%] space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-5xl md:text-6xl lg:text-[5rem] font-universo font-black uppercase leading-[0.85] tracking-tighter text-white mb-8 overflow-visible flex flex-col items-start gap-y-2">
                                <span className="inline-block">TURNING BRANDS</span>
                                <span className="relative flex items-center inline-block">
                                    INTO
                                    <span className="absolute left-[70%] md:left-[90%] top-[-10%] md:top-[-20%] font-siestha normal-case font-light tracking-normal leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#A8BEA4] via-[#00ff88] to-[#A8BEA4] drop-shadow-[0_0_20px_rgba(0,255,136,0.4)] z-10 px-4 py-4 -mx-4 -my-4 whitespace-nowrap">
                                        Classics
                                    </span>
                                </span>
                            </h2>
                            <p className="text-xl text-text-secondary leading-relaxed max-w-md">
                                Don't just take our word for it. Discover how we've helped global brands redefine their impact in the digital age.
                            </p>
                        </motion.div>

                        {/* Stats Medal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-[#0B0D10]/60 backdrop-blur-2xl border border-white/5 hover:border-[#3CFF8F]/20 shadow-[0_8px_32px_rgba(0,0,0,0.8)] hover:shadow-[0_8px_32px_rgba(60,255,143,0.15)] rounded-[2.5rem] p-10 relative overflow-hidden group transition-all duration-500"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full" />
                            <div className="relative z-10 flex items-center justify-between">
                                <div className="space-y-2">
                                    <div className="flex gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-[#3CFF8F] text-[#3CFF8F] drop-shadow-[0_0_8px_rgba(60,255,143,0.5)]" />
                                        ))}
                                    </div>
                                    <p className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight drop-shadow-md">{averageRating.toFixed(1)}/5</p>
                                    <p className="text-xs md:text-sm text-[#3CFF8F] uppercase tracking-widest font-bold opacity-90">Client Satisfaction</p>
                                </div>
                                <div className="h-16 w-[1px] bg-white/10 hidden md:block" />
                                <div className="text-right space-y-2">
                                    <p className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight drop-shadow-md">98%</p>
                                    <p className="text-xs md:text-sm text-[#3CFF8F] uppercase tracking-widest font-bold opacity-90">Retention</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* High-Impact Metrics List */}
                        <div className="space-y-6">
                            {metrics.map((metric, i) => (
                                <motion.div
                                    key={metric.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    className="flex items-center gap-4 text-accent hover:translate-x-2 transition-transform cursor-pointer group"
                                >
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent/10 border border-accent/20 group-hover:bg-accent group-hover:text-black transition-all">
                                        <metric.icon size={18} />
                                    </div>
                                    <div>
                                        <span className="text-xs text-text-secondary uppercase tracking-widest block mb-0.5">{metric.label}</span>
                                        <span className="text-lg font-bold">{metric.value}+</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Modern Card Showcase */}
                    <div className="w-full lg:w-[60%] relative">
                        <div
                            ref={scrollRef}
                            className="flex gap-10 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 lg:px-0 lg:pr-[10vw] py-8"
                        >
                            {testimonials.map((test, i) => (
                                <motion.div
                                    key={test.id}
                                    ref={el => { cardRefs.current[i] = el; }}
                                    className="flex-shrink-0 w-[85vw] md:w-[420px] snap-center"
                                    whileHover={{ y: -15 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <div className="relative p-10 rounded-[3rem] bg-[#0A0C10]/80 backdrop-blur-2xl border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.8)] h-full group transition-all duration-700 hover:border-[#3CFF8F]/30 hover:bg-[#0F1318] hover:shadow-[0_20px_40px_rgba(60,255,143,0.1)]">
                                        {/* Premium Card Glow */}
                                        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                                        <div className="absolute -inset-[1px] rounded-[3rem] bg-gradient-to-br from-[#3CFF8F]/40 via-transparent to-[#3CFF8F]/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700" />
                                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#3CFF8F]/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#3CFF8F]/20 transition-all duration-700" />
                                        
                                        <div className="relative z-10 flex flex-col h-full items-center justify-between gap-10 text-center py-2">
                                            {/* Top: Badge */}
                                            <div className="px-5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white/80 tracking-wide font-medium backdrop-blur-md shadow-lg">
                                                #<span className="font-bold text-white">Client</span>Review
                                            </div>

                                            {/* Middle: Quote */}
                                            <p className="text-xl md:text-2xl font-sans text-white/90 leading-relaxed font-medium">
                                                "{test.text}"
                                            </p>

                                            {/* Author & Rating */}
                                            <div className="flex flex-col items-center gap-8 w-full">
                                                <div className="space-y-1">
                                                    <h4 className="text-lg font-bold text-white tracking-tight">{test.brand}</h4>
                                                    <p className="text-sm text-white/60 font-medium">
                                                        {test.industry}, {test.location}
                                                    </p>
                                                </div>

                                                <div className="space-y-3 flex flex-col items-center">
                                                    <span className="text-5xl font-bold text-white tracking-tighter drop-shadow-md">5.0</span>
                                                    <div className="flex gap-1.5">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className="w-5 h-5 fill-[#3CFF8F] text-[#3CFF8F] drop-shadow-[0_0_10px_rgba(60,255,143,0.6)]" />
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Footer Metrics */}
                                                <div className="flex items-center justify-center gap-3 md:gap-5 w-full pt-8 border-t border-white/10 text-center">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-[10px] md:text-xs uppercase tracking-wider text-white/60 font-medium">Quality</span>
                                                        <span className="text-sm font-bold text-white">5.0</span>
                                                    </div>
                                                    <div className="w-px h-8 bg-white/10" />
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-[10px] md:text-xs uppercase tracking-wider text-white/60 font-medium">Schedule</span>
                                                        <span className="text-sm font-bold text-white">5.0</span>
                                                    </div>
                                                    <div className="w-px h-8 bg-white/10" />
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-[10px] md:text-xs uppercase tracking-wider text-white/60 font-medium">Cost</span>
                                                        <span className="text-sm font-bold text-white">5.0</span>
                                                    </div>
                                                    <div className="w-px h-8 bg-white/10" />
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-[10px] md:text-xs uppercase tracking-wider text-white/60 font-medium">Refer</span>
                                                        <span className="text-sm font-bold text-white">5.0</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex justify-center items-center gap-6 mt-12">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        const card = cardRefs.current[i];
                                        if (card && scrollRef.current) {
                                            scrollRef.current.scrollTo({
                                                left: card.offsetLeft - (scrollRef.current.offsetWidth / 2) + (card.offsetWidth / 2),
                                                behavior: "smooth"
                                            });
                                            setCurrentIndex(i);
                                        }
                                    }}
                                    className={`relative h-1.5 transition-all duration-500 rounded-full ${i === currentIndex ? "w-12 bg-accent shadow-[0_0_15px_rgba(172,200,162,0.6)]" : "w-2 bg-white/20 hover:bg-white/40"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>


        </section>
    );
}
