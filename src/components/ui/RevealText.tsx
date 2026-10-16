"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface RevealTextProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    triggerOnScroll?: boolean;
    active?: boolean;
}

export default function RevealText({ 
    children, 
    className = "", 
    delay = 0,
    triggerOnScroll = true,
    active = true
}: RevealTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        
        if (!containerRef.current) return;

        // Preset C (Body text)
        if (isReducedMotion) {
            gsap.set(containerRef.current, { opacity: 0 });
        } else {
            gsap.set(containerRef.current, { y: 20, opacity: 0 });
        }

        const animProps = isReducedMotion 
            ? { opacity: 1, duration: 0.6, ease: "power2.out", delay }
            : { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay };

        if (triggerOnScroll) {
            gsap.to(containerRef.current, {
                ...animProps,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        } else if (active) {
            gsap.to(containerRef.current, animProps);
        }

    }, { scope: containerRef, dependencies: [active] });

    return (
        <div ref={containerRef} className={`${className} will-change-transform`}>
            {children}
        </div>
    );
}
