"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => 1 - Math.pow(1 - t, 4),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.8,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Expose lenis instance globally for GSAP ScrollTrigger integration
        (window as any).__lenis = lenis;

        // Integrate Lenis directly with GSAP's ticker for perfect synchronization
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        
        // Prevent GSAP from trying to catch up on dropped frames (crucial for scroll synchronization)
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000);
            });
            (window as any).__lenis = null;
        };
    }, []);

    return <>{children}</>;
}
