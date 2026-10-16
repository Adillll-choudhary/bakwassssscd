"use client";

import React, { useRef } from "react";
import { useMotionValue, useSpring, useVelocity, useAnimationFrame } from "framer-motion";

export function LiquidText() {
    const textRef = useRef<HTMLHeadingElement>(null);

    // Mouse tracking for interaction
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Track velocity of mouse to simulate "force" of touch
    const mouseXVelocity = useVelocity(mouseX);
    const mouseYVelocity = useVelocity(mouseY);

    // Smooth out the velocity for the distortion effect
    const smoothVelocity = useSpring(0, { damping: 20, stiffness: 200 });

    // SVG Filter Refs
    const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
    const displacementRef = useRef<SVGFEDisplacementMapElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        // Update mouse position values so velocity hooks catch it
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    // Update smooth velocity based on mouse movement
    useAnimationFrame((t) => {
        const vx = mouseXVelocity.get();
        const vy = mouseYVelocity.get();
        const speed = Math.sqrt(vx * vx + vy * vy);

        // Target distortion based on speed (more speed = more ripple)
        // Divide speed to get reasonable scale values (e.g., speed 1000px/s -> scale 50)
        smoothVelocity.set(speed * 0.05);


        if (!turbulenceRef.current || !displacementRef.current) return;

        // Base liquid movement (calm water)
        const baseFreqX = 0.002 + Math.sin(t * 0.001) * 0.001;
        const baseFreqY = 0.01 + Math.cos(t * 0.002) * 0.005;

        // Add disturbance from mouse velocity
        const disturbance = smoothVelocity.get();

        // Cap disturbance to avoid glitching
        const safeDisturbance = Math.min(disturbance, 100);

        // When disturbed, distortion scale increases
        // Base scale 0 (perfect glass) -> expands to 50+ on fast movement
        const currentScale = safeDisturbance;

        turbulenceRef.current.setAttribute("baseFrequency", `${baseFreqX} ${baseFreqY}`);
        displacementRef.current.setAttribute("scale", `${currentScale}`);
    });

    return (
        <div
            className="relative w-full py-48 flex justify-center items-center overflow-hidden cursor-default select-none"
            onMouseMove={handleMouseMove}
        >
            {/* SVG Filter Definition */}
            <svg className="absolute w-0 h-0">
                <defs>
                    <filter id="liquid-glass-filter">
                        {/* Smooth Noise for Glassy Surface */}
                        <feTurbulence
                            ref={turbulenceRef}
                            type="turbulence"
                            baseFrequency="0.002 0.01"
                            numOctaves="3"
                            result="warp"
                        />
                        <feDisplacementMap
                            ref={displacementRef}
                            xChannelSelector="R"
                            yChannelSelector="G"
                            scale="0"
                            in="SourceGraphic"
                            in2="warp"
                        />
                    </filter>
                </defs>
            </svg>

            <div className="relative z-10 mix-blend-overlay opacity-90">
                <h1
                    ref={textRef}
                    className="text-[13vw] md:text-[15vw] font-black leading-[0.8] text-center tracking-tighter text-transparent bg-clip-text"
                    style={{ filter: "url(#liquid-glass-filter)" }}
                >
                    {/* Glassy, Metallic Gradient */}
                    <span className="block bg-gradient-to-b from-white/90 via-white/40 to-white/10">
                        COLDUNE
                    </span>
                    <span className="block bg-gradient-to-t from-white/80 via-white/30 to-white/5 pt-2">
                        STUDIO
                    </span>
                </h1>
            </div>

            {/* Background Light/Glow for reflection */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                <div className="w-[60vw] h-[20vw] bg-accent/10 rounded-full blur-[120px] opacity-40" />
            </div>
        </div>
    );
}
