"use client";

import { motion, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Check, Diamond, Zap, Focus, Sparkles, Hexagon } from "lucide-react";
import { MouseEvent, useState } from "react";
import RevealHeading from "../ui/RevealHeading";
import RevealText from "../ui/RevealText";

const plans = [
    {
        id: "01",
        name: "Standard",
        tagline: "The Foundation",
        price: "$1,500",
        period: "MONTH USD",
        image: "/work/branding/branding-hero-final.webp",
        icon: Focus,
        description: "Essential systems for brands establishing their digital footprint through clinical precision.",
        features: ["Standard Branding", "5 Social Posts", "Web Presence", "Email Support", "Brand Vision Call"],
        color: "rgba(255, 255, 255, 0.1)",
        glow: "rgba(255, 255, 255, 0.05)"
    },
    {
        id: "02",
        name: "Professional",
        tagline: "The Catalyst",
        price: "$3,000",
        period: "MONTH USD",
        image: "/svg/2 pricing.webp",
        icon: Zap,
        description: "Comprehensive scaling architecture for high-velocity growth and market dominance.",
        features: ["Full Identity System", "15 Social Posts", "Dynamic Interactive Web", "Priority Response", "SEO & Growth Engine"],
        color: "rgba(172, 200, 162, 0.2)",
        glow: "rgba(172, 200, 162, 0.1)",
        featured: true,
        popular: true
    },
    {
        id: "03",
        name: "Elite",
        tagline: "The Pinnacle",
        price: "$5,500",
        period: "MONTH USD",
        image: "/svg/4 pricing.webp",
        icon: Diamond,
        description: "Unrestricted creative firepower. The complete visual engine for industry leaders.",
        features: ["3D Visuals & Motion", "30 Social Posts", "Bespoke App Dev", "24/7 Priority Access", "Cinematic Video Production"],
        color: "rgba(255, 255, 255, 0.15)",
        glow: "rgba(255, 255, 255, 0.05)"
    }
];

function SpotlightCard({ plan, index }: { plan: typeof plans[0]; index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    // 3D Tilt Physics based on mouse position
    const rotateX = useTransform(mouseY, [0, 600], [10, -10]);
    const rotateY = useTransform(mouseX, [0, 400], [-10, 10]);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        if (typeof window !== 'undefined' && window.innerWidth < 768) return;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 1.15, y: 30 }}
            whileInView={{ opacity: 1, scale: plan.featured ? 1.05 : 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => { if (typeof window !== 'undefined' && window.innerWidth >= 768) setIsHovered(true); }}
            onMouseLeave={() => setIsHovered(false)}
            style={{ 
                rotateX: isHovered ? rotateX : 0, 
                rotateY: isHovered ? rotateY : 0,
                transformStyle: isHovered ? "preserve-3d" : "flat",
                willChange: "transform, opacity"
            }}
            className={`group relative flex flex-col justify-between w-full h-full rounded-[2.5rem] border overflow-hidden transition-all duration-700 ease-out
                ${plan.featured 
                    ? 'bg-transparent border-accent/30 z-10 shadow-[0_20px_80px_rgba(172,200,162,0.2),inset_0_1px_2px_rgba(172,200,162,0.6)]' 
                    : 'bg-transparent border-white/10 z-0 shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)]'}
            `}
        >
            {/* Crystal Clear Background Image Layer */}
            <div 
                className="absolute inset-0 z-[-2] opacity-80 md:group-hover:opacity-100 md:group-hover:scale-105 transition-all duration-1000 bg-cover bg-center"
                style={{ backgroundImage: `url('${plan.image}')` }}
            />
            {/* Soft Dark Gradient to keep text completely readable */}
            <div className="absolute inset-0 z-[-1] bg-gradient-to-t from-[#050608]/90 via-[#050608]/60 to-transparent pointer-events-none" />

            {/* Organic Edge Refraction Glow */}
            <div className={`absolute inset-0 rounded-[2.5rem] opacity-0 md:group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-0 
                ${plan.featured ? 'shadow-[inset_0_0_50px_rgba(172,200,162,0.15)]' : 'shadow-[inset_0_0_50px_rgba(255,255,255,0.05)]'}`} />

            {/* Sweeping Liquid Sheen Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-1000 -translate-x-[100%] md:group-hover:translate-x-[100%] z-0 pointer-events-none ease-in-out" />

            {/* Dynamic Spotlight Effect on Hover */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-500 md:group-hover:opacity-100 z-0 mix-blend-screen hidden md:block"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              800px circle at ${mouseX}px ${mouseY}px,
              ${plan.color},
              transparent 60%
            )
          `,
                }}
            />

            {/* Animated Scanner Line */}
            {plan.featured && (
                <div className="absolute inset-0 overflow-hidden rounded-2xl z-0 pointer-events-none opacity-50">
                    <div className="w-full h-[2px] bg-accent shadow-[0_0_15px_rgba(172,200,162,1)] animate-[scan_3s_ease-in-out_infinite_alternate]" />
                </div>
            )}

            <div className="relative z-10 p-8 md:p-10 flex flex-col h-full" style={{ transform: isHovered ? "translateZ(30px)" : "translateZ(0px)", transition: "transform 0.5s ease-out" }}>
                {/* Popular Badge */}
                {plan.popular && (
                    <div className="absolute top-0 right-8 -translate-y-1/2 flex items-center gap-2 bg-accent text-black text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-sm shadow-[0_0_20px_rgba(172,200,162,0.4)] before:content-[''] before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-white/50">
                        <Hexagon size={10} className="animate-spin-slow" />
                        SYSTEM PREFERRED
                    </div>
                )}

                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div className="space-y-3">
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-[0.3em] ${plan.featured ? 'text-accent drop-shadow-[0_0_8px_rgba(172,200,162,0.5)]' : 'text-white/40'}`}>
                            {plan.tagline}
                        </span>
                        <h3 className={`text-4xl font-serif font-light italic tracking-tight ${plan.featured ? 'text-white' : 'text-white/80'}`}>
                            {plan.name}
                        </h3>
                    </div>
                </div>

                {/* Pricing Display */}
                <div className="mb-12 flex items-baseline gap-2">
                    <span className={`text-7xl font-siestha tracking-normal ${plan.featured ? 'text-accent drop-shadow-[0_0_15px_rgba(172,200,162,0.3)]' : 'text-white/90'}`}>
                        {plan.price}
                    </span>
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                        / {plan.period}
                    </span>
                </div>

                <div className="flex-grow">
                    {/* Features List */}
                    <ul className="space-y-5 mb-14">
                        {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-4 group/li">
                                <div className={`flex items-center justify-center w-5 h-5 rounded border ${plan.featured ? 'border-accent/30 text-accent bg-accent/5' : 'border-white/10 text-white/20 bg-white/5'} md:group-hover/li:scale-110 md:group-hover/li:border-accent md:group-hover/li:text-accent transition-all duration-300`}>
                                    <Check size={12} strokeWidth={3} />
                                </div>
                                <span className={`text-xs font-mono uppercase tracking-wider transition-colors ${plan.featured ? 'text-white/70' : 'text-white/50'} md:group-hover/li:text-white`}>
                                    {feature}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CTA Button */}
                <motion.a 
                    href="https://calendar.app.google/UaQiAVppTGjXFPv17"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`group/btn w-full relative py-5 flex justify-center items-center gap-3 overflow-hidden transition-all duration-500 rounded-xl border
                        ${plan.featured ? 'bg-accent/10 border-accent/50 text-accent hover:bg-accent hover:text-black shadow-[0_0_30px_rgba(172,200,162,0.2)]' : 'bg-transparent border-white/10 text-white/70 hover:bg-white hover:text-black'}
                    `}
                >
                    <span className="text-xs font-black uppercase tracking-widest z-10">
                        Acquire Plan
                    </span>
                    <ArrowRight size={14} className="z-10 md:group-hover/btn:translate-x-2 transition-transform duration-300" />
                </motion.a>
            </div>
        </motion.div>
    );
}

export default function Pricing() {
    return (
        <section id="pricing" className="relative bg-transparent w-full selection:bg-accent selection:text-black overflow-hidden py-24">
            
            {/* Aesthetic Ambient Glows */}
            <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
                <div 
                    className="absolute top-[20%] w-[80vw] h-[40vw] rounded-[100%] opacity-20 animate-pulse" 
                    style={{ background: 'radial-gradient(circle, rgba(172,200,162,0.3) 0%, transparent 70%)' }}
                />
            </div>

            <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
                {/* Majestic Header */}
                {/* Majestic Header */}
                <div className="flex flex-col items-start text-left mb-24 w-full md:-ml-[15%] lg:-ml-[25%]">
                    <RevealText 
                        className="text-accent font-sans font-bold text-xs uppercase tracking-[0.3em] mb-6 md:ml-[15%] lg:ml-[25%]"
                    >
                        Strategic Capital Deployment
                    </RevealText>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative z-20 flex flex-col items-start mb-8 gap-0 whitespace-nowrap"
                    >
                        <span className="text-[11vw] md:text-[8rem] lg:text-[11rem] font-universo font-black uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] inline-block leading-[0.8]">
                            The Investment
                        </span>
                        <div className="flex items-end justify-start gap-4 md:gap-8 mt-0 md:mt-0 lg:mt-1">
                            <span className="text-[11vw] md:text-[8rem] lg:text-[11rem] font-universo font-black uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] inline-block leading-[0.8]">
                                That Turns
                            </span>
                        </div>
                        <div className="flex items-end justify-start gap-4 md:gap-8 mt-0 md:mt-0 lg:mt-1">
                            <span className="text-[11vw] md:text-[8rem] lg:text-[11rem] font-universo font-black uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] inline-block leading-[0.8]">
                                Vision Into
                            </span>
                            <span className="text-[14vw] md:text-[7rem] lg:text-[9rem] font-siestha normal-case text-[#3CFF8F] -rotate-[8deg] inline-block px-4 py-4 -mr-4 -ml-12 md:-ml-20 lg:-ml-24 -my-4 leading-none md:-translate-y-4 tracking-tighter" style={{ textShadow: "0 4px 30px rgba(60,255,143,0.4)" }}>
                                Momentum
                            </span>
                        </div>
                    </motion.div>
                    
                    <RevealText
                        delay={0.2}
                        className="text-lg md:text-xl text-white/50 max-w-2xl font-medium md:ml-[15%] lg:ml-[25%]"
                    >
                        The era of generic agency retainers is dead. We offer precision-engineered deployments designed for total market capture.
                    </RevealText>
                </div>

                {/* 3-Column Glassmorphic Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
                    {plans.map((plan, index) => (
                        <SpotlightCard key={plan.id} plan={plan} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

