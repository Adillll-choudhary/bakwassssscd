"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);

    // Position values
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth springs - adjusted for ultra-smoothness
    const dotSpringConfig = { damping: 35, stiffness: 400, mass: 0.8 }; // Snappier dot
    const springConfig = { damping: 40, stiffness: 150, mass: 1.2 }; // Floatier outer circle

    const dotXSpring = useSpring(cursorX, dotSpringConfig);
    const dotYSpring = useSpring(cursorY, dotSpringConfig);
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isSelectable =
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("button") ||
                target.tagName === "H1" ||
                target.tagName === "H2" ||
                target.tagName === "H3" ||
                target.tagName === "P" ||
                target.tagName === "SPAN" ||
                target.style.cursor === "pointer";

            setIsHovered(!!isSelectable);
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleHover);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleHover);
        };
    }, [cursorX, cursorY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
            {/* Main Dot */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent rounded-full will-change-transform"
                style={{
                    x: dotXSpring,
                    y: dotYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />

            {/* Outer Circle */}
            <motion.div
                className="fixed top-0 left-0 border border-accent/40 rounded-full"
                animate={{
                    width: isHovered ? 16 : 8,
                    height: isHovered ? 16 : 8,
                    backgroundColor: isHovered ? "rgba(172, 200, 162, 0.15)" : "rgba(172, 200, 162, 0)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
        </div>
    );
}
