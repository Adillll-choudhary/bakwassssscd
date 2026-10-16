"use client";

import { useEffect, useState, useRef, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PreloaderLogoScene from "../canvas/PreloaderLogoScene";

// Safe client mount hook
function useClientMount() {
    return useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );
}

export default function Preloader() {
    const isMounted = useClientMount();
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isZooming, setIsZooming] = useState(false);

    const isFinishedRef = useRef(false);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        const startTime = Date.now();
        const duration = 2800; // Cinematic 2.8s organic assembly ("dheere dheere")
        let animId: number;

        const completePreloader = () => {
            if (isFinishedRef.current) return;
            isFinishedRef.current = true;

            setProgress(100);

            // Allow the user to admire the completed glowing Coldune logo mark for 420ms
            setTimeout(() => {
                setIsZooming(true);

                // Cinematic exit dispersal into the site
                setTimeout(() => {
                    setIsLoading(false);
                    document.body.style.overflow = "";
                    (window as unknown as { preloaderDone?: boolean }).preloaderDone = true;
                    window.dispatchEvent(new Event("preloader-complete"));
                }, 550);
            }, 420);
        };

        const updateProgress = () => {
            if (isFinishedRef.current) return;

            const elapsed = Date.now() - startTime;
            const t = Math.min(1.0, elapsed / duration);

            // Luxurious smoothstep cubic progression
            const easedT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            const currentP = Math.min(99, Math.round(easedT * 100));

            setProgress(currentP);

            if (t >= 1.0) {
                completePreloader();
            } else {
                animId = requestAnimationFrame(updateProgress);
            }
        };

        animId = requestAnimationFrame(updateProgress);

        // Fallback safety timeout
        const safetyTimer = setTimeout(() => {
            completePreloader();
        }, 4000);

        return () => {
            cancelAnimationFrame(animId);
            clearTimeout(safetyTimer);
            document.body.style.overflow = "";
        };
    }, []);

    if (!isMounted) return null;

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="coldune-preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[99999] bg-[#08090B] overflow-hidden select-none pointer-events-none"
                >
                    {/* Full-Screen 3D Blooming Particle Assembling Logo Scene (Edge-to-edge, zero bars/strips) */}
                    <PreloaderLogoScene progress={progress} isExiting={isZooming} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
