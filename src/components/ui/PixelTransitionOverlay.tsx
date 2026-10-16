"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

export default function PixelTransitionOverlay() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const handleTrigger = (e: any) => {
            if (isActive) return;
            const target = e.detail?.target;
            
            // Lock Scroll (Lenis)
            if ((window as any).__lenis) {
                (window as any).__lenis.stop();
            }

            setIsActive(true);
            animateTransition(target);
        };

        window.addEventListener("trigger-pixel-transition", handleTrigger);
        return () => window.removeEventListener("trigger-pixel-transition", handleTrigger);
    }, [isActive]);

    const animateTransition = (target: HTMLElement | null) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        // Setup Canvas Size
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);

        const w = window.innerWidth;
        const h = window.innerHeight;
        
        // Settings - slightly larger blocks for that solid pixel look
        const blockSize = w < 768 ? 20 : 35;
        const cols = Math.ceil(w / blockSize);
        const rows = Math.ceil(h / blockSize);
        
        // Generate Blocks with Bottom-to-Top strict progression + noise
        const blocks: {x: number, y: number, delay: number}[] = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                // strict bottom to top progression
                const verticalProgress = (rows - r) / rows; 
                // Add horizontal noise to create the jagged "wave" look
                const randomNoise = Math.random() * 0.3;
                blocks.push({
                    x: c,
                    y: r,
                    delay: verticalProgress * 0.7 + randomNoise
                });
            }
        }

        const anim = { progress: 0 };
        ctx.clearRect(0, 0, w, h);
        
        let hasSnapped = false;

        const render = () => {
            ctx.clearRect(0, 0, w, h);
            
            // Snap the user to the target section when the screen is fully black (progress ~0.5)
            if (anim.progress >= 0.5 && !hasSnapped && target) {
                if ((window as any).__lenis) {
                    (window as any).__lenis.scrollTo(target, { immediate: true, force: true });
                }
                hasSnapped = true;
            }
            
            blocks.forEach((b) => {
                let blockP = 0;
                
                // Phase 1: Appear (wave goes up)
                if (anim.progress <= 0.45) {
                    const phaseProgress = anim.progress / 0.45;
                    blockP = Math.max(0, Math.min(1, (phaseProgress - b.delay) * 4));
                } 
                // Phase 2: Hold full mask
                else if (anim.progress <= 0.55) {
                    blockP = 1;
                }
                // Phase 3: Dissolve (wave continues up, so bottom clears first)
                else {
                    const phaseProgress = (anim.progress - 0.55) / 0.45;
                    // Reverse the delay logic so bottom blocks disappear first
                    blockP = 1 - Math.max(0, Math.min(1, (phaseProgress - b.delay) * 4));
                }

                // If block is active at all
                if (blockP > 0) {
                    // Tightly packed, no gap, no scale offset
                    // We just draw the block if it passes a certain threshold (binary drawing for brutalist look)
                    // Or we can scale it fully. Binary drawing creates that exact glitch wave from the image!
                    if (blockP > 0.1) {
                        // The burning active edge (blocks that just appeared or are just about to disappear)
                        if (blockP < 0.9) {
                            ctx.fillStyle = "#3CFF8F";
                        } else {
                            ctx.fillStyle = "#030305"; // Solid background color
                        }
                        
                        // Draw perfectly packed block (add 1px to overlap and prevent sub-pixel gaps)
                        ctx.fillRect(
                            b.x * blockSize, 
                            b.y * blockSize, 
                            blockSize + 1, 
                            blockSize + 1
                        );
                    }
                }
            });
        };

        // Smooth sweeping wipe
        gsap.to(anim, {
            progress: 1,
            duration: 1.8, // Faster, punchy wave
            ease: "power2.inOut",
            onUpdate: render,
            onComplete: () => {
                ctx.clearRect(0, 0, w, h);
                setIsActive(false);
                
                // Unlock Scroll (Lenis)
                if ((window as any).__lenis) {
                    (window as any).__lenis.start();
                }
            }
        });
    };

    return (
        <div className={`fixed inset-0 z-[9999] pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
            <canvas 
                ref={canvasRef} 
                className="absolute inset-0 w-full h-full"
                style={{ width: '100vw', height: '100vh' }}
            />
            
            {/* Overlay Grain for analog feel */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")', backgroundSize: '100px 100px' }} />
        </div>
    );
}
