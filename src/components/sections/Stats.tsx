"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

const stats = [
    { value: 13, suffix: "+", label: "Brands Served" },
    { value: 40, suffix: "+", label: "Projects Delivered" },
    { value: 18, suffix: "", label: "Months of Excellence" },
    { value: 4, suffix: "", label: "Cities Across India" }
];

function StatItem({ stat, index }: { stat: typeof stats[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [displayValue, setDisplayValue] = useState(0);

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 50,
        stiffness: 100
    });

    useEffect(() => {
        if (isInView) {
            motionValue.set(stat.value as number);
        }
    }, [isInView, motionValue, stat.value]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            setDisplayValue(Math.round(latest));
        });
    }, [springValue]);

    return (
        <div 
            ref={ref}
            className={`flex flex-col items-center justify-center p-8 md:p-16 border-[#1c1c1c]
                ${index === 0 || index === 2 ? 'border-r' : ''} 
                ${index === 0 || index === 1 ? 'border-b md:border-b-0' : ''}
                md:border-r md:last:border-r-0`}
        >
            <div className="flex items-baseline">
                <span className="text-[120px] leading-none font-siestha tracking-normal text-white">
                    {displayValue}
                </span>
                <span className="text-[80px] leading-none font-siestha tracking-normal text-accent ml-2">
                    {stat.suffix}
                </span>
            </div>
            <span className="mt-8 text-sm md:text-base font-sans font-medium tracking-wider text-white/70 uppercase text-center">
                {stat.label}
            </span>
        </div>
    );
}

export default function Stats() {
    return (
        <section className="w-full bg-transparent py-32 flex flex-col items-center">
            {/* Eyebrow */}
            <div className="mb-16">
                <span className="font-siestha text-3xl md:text-5xl tracking-normal normal-case text-transparent bg-clip-text bg-gradient-to-r from-[#A8BEA4] via-[#00ff88] to-[#A8BEA4] drop-shadow-[0_0_20px_rgba(0,255,136,0.4)] inline-block px-8 py-6 -mx-8 -my-6">
                    The Numbers
                </span>
            </div>

            {/* Stats Grid */}
            <div className="w-full max-w-7xl mx-auto px-0 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 w-full border-t border-b border-[#1c1c1c] md:border-none">
                    {stats.map((stat, index) => (
                        <StatItem key={index} stat={stat} index={index} />
                    ))}
                </div>
            </div>

            {/* Footer Text */}
            <div className="mt-20">
                <p className="text-accent/50 font-serif text-xl md:text-2xl italic text-center px-4">
                    And we're just getting started.
                </p>
            </div>
        </section>
    );
}
