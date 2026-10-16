"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";

interface Particle {
    id: number;
    x: number;
    y: number;
    driftX: number;
    size: number;
    rotation: number;
    type: 'smoke' | 'sparkle' | 'lightning';
}

export default function Cursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const lastParticleTime = useRef(0);
    const particleIdCounter = useRef(0);

    // Detect if device has a mouse (fine pointer)
    useEffect(() => {
        const checkPointer = () => {
            const hasMouse = window.matchMedia("(pointer: fine)").matches;
            setIsTouchDevice(!hasMouse);
        };
        checkPointer();
        const mediaQuery = window.matchMedia("(pointer: fine)");
        mediaQuery.addEventListener('change', checkPointer);
        return () => mediaQuery.removeEventListener('change', checkPointer);
    }, []);

    // Liquid Smooth Spring Physics
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 35, stiffness: 1200, mass: 0.1 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Particle Logic - Optimized Frequency
            const now = Date.now();
            if (now - lastParticleTime.current > 50) {
                lastParticleTime.current = now;
                const rand = Math.random();
                let type: 'smoke' | 'sparkle' | 'lightning' = 'smoke';

                if (rand > 0.95) type = 'lightning';
                else if (rand > 0.7) type = 'sparkle';
                else type = 'smoke';

                const newParticle: Particle = {
                    id: particleIdCounter.current++,
                    x: e.clientX,
                    y: e.clientY,
                    driftX: Math.random() * 40 - 20,
                    size: type === 'lightning' ? Math.random() * 12 + 8 : (type === 'sparkle' ? Math.random() * 3 + 1 : Math.random() * 8 + 4),
                    rotation: Math.random() * 360,
                    type: type
                };
                setParticles((prev) => [...prev.slice(-15), newParticle]);
            }

            // Hover Check
            const target = e.target as HTMLElement;
            if (target && typeof target.closest === 'function') {
                const isClickable = target.closest('a, button, [role="button"], .group');
                setIsHovering(!!isClickable);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Cleanup old particles
    useEffect(() => {
        const cleanupInterval = setInterval(() => {
            if (particles.length > 0) {
                setParticles((prev) => prev.slice(1));
            }
        }, 60);

        return () => clearInterval(cleanupInterval);
    }, [particles.length]);

    if (isTouchDevice) return null;

    return (
        <>
            {/* 1. PRIMARY SPOTLIGHT - Micro-Dot Size */}
            <motion.div
                className="fixed top-0 left-0 w-5 h-5 bg-[#3CFF8F] rounded-full pointer-events-none z-[99999] shadow-[0_0_20px_rgba(60,255,143,0.9),0_0_40px_rgba(60,255,143,0.5)]"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 0 : 1,
                    opacity: isHovering ? 0 : 1,
                }}
                transition={{ duration: 0.15 }}
            />

            {/* 2. PARTICLE ENGINE - Subtler Trail */}
            <AnimatePresence>
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        initial={{ opacity: 0.4, scale: 0.5 }}
                        animate={{
                            opacity: 0,
                            scale: particle.type === 'smoke' ? 2 : 1,
                            y: particle.y - 80,
                            x: particle.x + particle.driftX,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="fixed pointer-events-none z-[9999]"
                        style={{
                            left: particle.x,
                            top: particle.y,
                            width: particle.size,
                            height: particle.size,
                            backgroundColor: particle.type === 'sparkle' ? '#FFF' : '#3CFF8F',
                            boxShadow: `0 0 10px ${particle.type === 'sparkle' ? '#FFF' : '#3CFF8F'}`,
                            borderRadius: particle.type === 'lightning' ? '0%' : '50%',
                            filter: particle.type === 'smoke' ? 'blur(4px)' : 'none',
                        }}
                    >
                        {particle.type === 'lightning' && (
                            <svg viewBox="0 0 24 24" fill="white" className="w-full h-full text-[#3CFF8F] opacity-50">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
        </>
    );
}
