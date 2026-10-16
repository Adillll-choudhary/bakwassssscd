"use client";

import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { usePerformance } from "@/hooks/usePerformance";

export default function ScrollFramesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const frameCount = 50;
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const lastRenderedFrame = useRef<number>(-1);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    const imagePaths = useMemo(() => {
        return Array.from({ length: frameCount }, (_, i) => {
            const index = (i + 1).toString().padStart(3, '0');
            return "/bg/ezgif-frame-" + index + ".png";
        });
    }, [frameCount]);

    const renderFrame = useCallback((frameIndex: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        const img = imagesRef.current[frameIndex];
        if (!img || !img.complete) return;

        if (lastRenderedFrame.current === frameIndex) return;
        
        const updateCanvas = () => {
            const displayWidth = window.innerWidth;
            const displayHeight = window.innerHeight;
            
            if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
                canvas.width = displayWidth;
                canvas.height = displayHeight;
            }

            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);
            
            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                img, 
                0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
            );
            
            lastRenderedFrame.current = frameIndex;
        };

        requestAnimationFrame(updateCanvas);
    }, []);

    useEffect(() => {
        let loaded = 0;
        let hasError = false;
        const imgs: HTMLImageElement[] = [];

        imagePaths.forEach((src, i) => {
            const img = new Image();
            img.onload = () => {
                if (hasError) return;
                loaded++;
                if (loaded === frameCount) {
                    setImagesLoaded(true);
                    setTimeout(() => renderFrame(0), 50);
                }
            };
            img.onerror = () => {
                console.error("Failed to load frame:", src);
                hasError = true;
                // Still try to render what we have
                setImagesLoaded(true);
                renderFrame(0);
            };
            img.src = src;
            imgs[i] = img;
        });
        imagesRef.current = imgs;
    }, [imagePaths, renderFrame]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!imagesLoaded) return;
        const frameIndex = Math.min(
            frameCount - 1,
            Math.max(0, Math.floor(latest * frameCount))
        );
        renderFrame(frameIndex);
    });

    useEffect(() => {
        if (!imagesLoaded) return;
        const handleResize = () => {
            const currentFrame = lastRenderedFrame.current > -1 ? lastRenderedFrame.current : 0;
            lastRenderedFrame.current = -1;
            renderFrame(currentFrame);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [imagesLoaded, renderFrame]);

    const yTransform = useTransform(scrollYProgress, [0, 1], ["0vh", "200vh"]);

    return (
        <section ref={sectionRef} className="relative bg-black w-full" style={{ height: "300vh" }}>
            <motion.div 
                style={{ y: yTransform }}
                className="absolute top-0 left-0 h-[100svh] w-full overflow-hidden flex items-center justify-center"
            >
                
                {!imagesLoaded && (
                    <div className="absolute inset-0 bg-black flex items-center justify-center z-50">
                        <div className="w-8 h-8 border-t-2 border-[#3CFF8F] rounded-full animate-spin"></div>
                    </div>
                )}

                <canvas 
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

                <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center px-4">
                    {/* Empty container */}
                </div>
            </motion.div>
        </section>
    );
}
