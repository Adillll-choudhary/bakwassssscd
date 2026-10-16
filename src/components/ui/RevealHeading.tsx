"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface RevealHeadingProps {
    children: React.ReactNode;
    className?: string;
    innerClassName?: string;
    preset?: "A" | "B"; // A: Hero, B: Section
    triggerOnScroll?: boolean;
    delay?: number;
    active?: boolean;
}

export default function RevealHeading({ 
    children, 
    className = "", 
    innerClassName = "",
    preset = "B",
    triggerOnScroll = true,
    delay = 0,
    active = true
}: RevealHeadingProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        
        if (!containerRef.current) return;

        // Find all line masks we generated
        const lines = containerRef.current.querySelectorAll('.reveal-inner');
        
        if (lines.length === 0) return;

        // Set initial state
        if (isReducedMotion) {
            gsap.set(lines, { opacity: 0 });
        } else {
            gsap.set(lines, { y: "110%", opacity: 0 });
        }

        const duration = preset === "A" ? 1.0 : 0.8;
        const stagger = preset === "A" ? 0.08 : 0.05;
        const ease = "power3.out";

        const animProps = isReducedMotion 
            ? { opacity: 1, duration, stagger, ease, delay }
            : { y: "0%", opacity: 1, duration, stagger, ease, delay };

        if (triggerOnScroll) {
            gsap.to(lines, {
                ...animProps,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        } else if (active) {
            gsap.to(lines, animProps);
        }

    }, { scope: containerRef, dependencies: [active] });

    // Helper to wrap text into line masks
    const processChildren = (node: React.ReactNode): React.ReactNode => {
        if (typeof node === 'string') {
            // Split string by lines if explicit newlines are provided, otherwise just wrap the whole string
            const parts = node.split('\n');
            if (parts.length === 1) {
                return (
                    <span className="inline-block overflow-hidden align-bottom pb-4 -mb-4 pt-4 -mt-4 px-4 -mx-4">
                        <span className={`reveal-inner inline-block will-change-transform ${innerClassName}`}>{node}</span>
                    </span>
                );
            }
            return parts.map((part, i) => (
                <React.Fragment key={i}>
                    <span className="inline-block overflow-hidden align-bottom pb-4 -mb-4 pt-4 -mt-4 px-4 -mx-4">
                        <span className={`reveal-inner inline-block will-change-transform ${innerClassName}`}>{part}</span>
                    </span>
                    {i < parts.length - 1 && <br />}
                </React.Fragment>
            ));
        }

        // If it's a JSX element, we wrap the entire element as a single masked block
        return (
            <span className="inline-block overflow-hidden align-bottom pb-4 -mb-4 pt-4 -mt-4 px-4 -mx-4">
                <span className={`reveal-inner inline-block will-change-transform ${innerClassName}`}>{node}</span>
            </span>
        );
    };

    return (
        <div ref={containerRef} className={className}>
            {React.Children.map(children, processChildren)}
        </div>
    );
}
