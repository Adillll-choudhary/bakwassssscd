"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent, useSpring, MotionValue } from "framer-motion";
import { usePerformance } from "@/hooks/usePerformance";

interface BackgroundScrollSequenceProps {
    hasPreloaded: boolean;
    scrollProgress: MotionValue<number>;
}

export default function BackgroundScrollSequence({ hasPreloaded, scrollProgress }: BackgroundScrollSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { isMobile, isLowPower } = usePerformance();
    const frameCount = 80;
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const lastRenderedFrame = useRef<number>(-1);
    const loadAttempts = useRef<number>(0);

    // Dynamic Image Resolution based on device
    const imagePaths = useMemo(() => {
        return Array.from({ length: frameCount }, (_, i) => {
            const index = i.toString().padStart(3, '0');
            // If mobile, try to load smaller versions (we assume these will be generated)
            // Fallback to original if mobile versions aren't available
            const prefix = '/bg/hero section_';
            const suffix = isMobile ? '.webp' : '_upscayl_4x_upscayl-standard-4x.webp';
            return `${prefix}${index}${suffix}`;
        });
    }, [isMobile]);

    // Frame Skipping logic for low-end devices
    // Only load every Nth frame if hardware is struggling
    const skipFactor = isLowPower ? 2 : 1;

    // Scroll mapping
    const frameIndex = useTransform(scrollProgress, [0, 1], [0, frameCount - 1], { clamp: true });
    
    // Ultra-smooth spring — low stiffness + high damping = buttery cinematic feel
    const smoothFrameIndex = useSpring(frameIndex, {
        stiffness: isMobile ? 60 : 100,
        damping: isMobile ? 25 : 45,
        mass: 0.5,
        restDelta: 0.0001
    });

    const drawImage = useCallback((index: number) => {
        const frame = Math.round(index);
        if (frame === lastRenderedFrame.current || !imagesRef.current[frame]) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d", { 
            alpha: false,
            desynchronized: true
        });
        if (!ctx) return;

        const img = imagesRef.current[frame];
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Cover fit — crisp, no blending
        const ratio = Math.max(canvasWidth / img.width, canvasHeight / img.height);
        const newWidth = img.width * ratio;
        const newHeight = img.height * ratio;
        const x = (canvasWidth - newWidth) / 2;
        const y = (canvasHeight - newHeight) / 2;

        ctx.drawImage(img, x, y, newWidth, newHeight);
        lastRenderedFrame.current = frame;
    }, []);

    // Optimized Preloading Strategy
    useEffect(() => {
        let loadedCount = 0;
        let completeDispatched = false;
        
        // 1. High Priority: First 10 frames for instant preview
        const priorityFrames = [0, 1, 2, 3, 4, 10, 20, 30, 40, 50, 60, 70];
        
        const loadFrame = (i: number) => {
            if (imagesRef.current[i]) return Promise.resolve();
            // Skip frames if low power
            if (isLowPower && i % skipFactor !== 0 && i !== 0 && i !== frameCount - 1) {
                return Promise.resolve();
            }

            return new Promise<void>((resolve) => {
                const img = new Image();
                img.src = imagePaths[i];
                
                const handleLoad = () => {
                    imagesRef.current[i] = img;
                    loadedCount++;
                    const progress = (loadedCount / (frameCount / skipFactor)) * 100;
                    window.dispatchEvent(new CustomEvent('hero-load-progress', { detail: progress }));
                    if (i === 0) {
                        setImagesLoaded(true);
                        // Force an immediate draw of the first frame so it appears without needing a scroll/click
                        requestAnimationFrame(() => drawImage(0));
                    }
                    
                    if (loadedCount >= (frameCount / skipFactor) - 2 && !completeDispatched) {
                        completeDispatched = true;
                        setImagesLoaded(true);
                        window.dispatchEvent(new Event('hero-load-complete'));
                    }
                    resolve();
                };

                const handleError = () => {
                    console.warn(`[Hero] Failed frame ${i}`);
                    resolve();
                };

                img.decode()
                    .then(handleLoad)
                    .catch(() => {
                        img.onload = handleLoad;
                        img.onerror = handleError;
                    });
            });
        };

        // Execute loading
        const startLoading = async () => {
            // Load priority frames first
            await Promise.all(priorityFrames.map(loadFrame));
            
            // Load the rest in chunks
            const rest = Array.from({ length: frameCount }, (_, i) => i)
                              .filter(i => !priorityFrames.includes(i));
            
            // Sequential chunk loading to avoid bandwidth exhaustion
            const chunkSize = isMobile ? 3 : 8;
            for (let i = 0; i < rest.length; i += chunkSize) {
                const chunk = rest.slice(i, i + chunkSize);
                await Promise.all(chunk.map(loadFrame));
            }
        };

        startLoading();
    }, [imagePaths, isLowPower, skipFactor, isMobile]);

    // Resize handling with Debounce
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const handleResize = () => {
            if (!canvasRef.current) return;
            const canvas = canvasRef.current;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            lastRenderedFrame.current = -1;
            drawImage(smoothFrameIndex.get());
        };

        const debouncedResize = () => {
            clearTimeout(timeout);
            timeout = setTimeout(handleResize, 100);
        };

        window.addEventListener("resize", debouncedResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", debouncedResize);
            clearTimeout(timeout);
        };
    }, [drawImage, smoothFrameIndex]);

    // Frame update emitter with requestAnimationFrame
    useMotionValueEvent(smoothFrameIndex, "change", (latest) => {
        if (imagesLoaded) {
            requestAnimationFrame(() => drawImage(latest));
        }
    });

    return (
        <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-black">
            <canvas
                ref={canvasRef}
                className={`w-full h-full object-cover transition-opacity duration-1000 ${hasPreloaded && imagesLoaded ? "opacity-100" : "opacity-0"}`}
                style={{ width: "100vw", height: "100vh", willChange: "transform" }}
            />
            {/* Cinematic Noise & Vignette */}
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
        </div>
    );
}
