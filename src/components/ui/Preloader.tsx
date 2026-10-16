"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

    // Intelligent Asset-Aware Loading
    useEffect(() => {
        setIsMounted(true);

        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        document.body.style.overflow = "hidden";
        
        let heroProgress = 0;
        let isHeroComplete = false;
        let fakeProgress = 0;
        let isForceCompleted = false;

        const forceComplete = () => {
            if (isForceCompleted) return;
            isForceCompleted = true;
            
            setProgress(100);
            setIsZooming(true);
            
            setTimeout(() => {
                setIsLoading(false);
                document.body.style.overflow = "";
                (window as any).preloaderDone = true;
                window.dispatchEvent(new Event('preloader-complete'));
            }, 600);
        };

        const safetyTimeout = setTimeout(() => {
            forceComplete();
        }, 3000); // Slightly longer for cinematic impact

        const handleHeroProgress = (e: any) => {
            heroProgress = e.detail;
        };

        const handleHeroComplete = () => {
            isHeroComplete = true;
        };

        window.addEventListener('hero-load-progress', handleHeroProgress);
        window.addEventListener('hero-load-complete', handleHeroComplete);

        const interval = setInterval(() => {
            if (isForceCompleted) {
                clearInterval(interval);
                return;
            }

            if (fakeProgress < 90) fakeProgress += Math.random() * 2;
            const totalProgress = (heroProgress * 0.7) + (fakeProgress * 0.3);
            setProgress(Math.min(totalProgress, 99));
            
            if (isHeroComplete || (heroProgress > 98)) {
                clearTimeout(safetyTimeout);
                forceComplete();
                clearInterval(interval);
            }
        }, 80);

        return () => {
            clearTimeout(safetyTimeout);
            clearInterval(interval);
            window.removeEventListener('hero-load-progress', handleHeroProgress);
            window.removeEventListener('hero-load-complete', handleHeroComplete);
            window.removeEventListener('resize', checkMobile);
            document.body.style.overflow = "";
        };
    }, []);

  if (!isMounted) return null;

  const words = ["COLDUNE", "STUDIO"];

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[20000] flex flex-col items-center justify-center bg-[#08090B]"
        >
          {/* Main Logo */}
          <div className="relative z-20 flex flex-col items-center">
            <motion.div 
                animate={isZooming ? { scale: 1.1, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeIn" }}
                className="flex flex-col items-center"
            >
                <h1 className="text-3xl md:text-5xl font-universo font-black uppercase tracking-widest text-white mb-8">
                    Coldune Studio
                </h1>
                
                {/* Minimal Loading Bar */}
                <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-[#3CFF8F] rounded-full drop-shadow-[0_0_8px_rgba(60,255,143,0.8)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

