"use client";

import { useEffect, useRef } from "react";

interface StreamParticle {
    u: number;             // progress along path [0, 1]
    speedMult: number;     // individual speed variance
    size: number;          // particle radius in px
    colorType: "neon" | "white" | "teal";
    spread: number;        // distance from stream center
    phase: number;         // offset for organic breathing
    alpha: number;         // opacity
}

interface StreamLine {
    baseYRatio: number;    // screen height ratio [0, 1]
    direction: 1 | -1;     // 1 = left to right, -1 = right to left
    baseSpeed: number;     // base transit speed
    freq1: number;         // primary wave frequency
    freq2: number;         // secondary wave frequency
    amp1: number;          // primary wave amplitude
    amp2: number;          // secondary wave amplitude
    phaseSpeed: number;    // wave animation speed
    phase: number;         // wave phase offset
    wireAlpha: number;     // alpha of the core stream filament
    particles: StreamParticle[];
    nodes: { u: number; speed: number; size: number }[]; // bright moving energy nodes
}

export default function ParticleStreams() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;
        let dpr = 1;

        // Interactive mouse tracking
        const mouse = { x: -2000, y: -2000, targetX: -2000, targetY: -2000 };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.targetX = e.clientX - rect.left;
            mouse.targetY = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.targetX = -2000;
            mouse.targetY = -2000;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        // 8 Multi-directional horizontal particle streams
        const streamConfigs = [
            { baseYRatio: 0.12, direction: 1 as const,  baseSpeed: 0.00038, amp1: 32, amp2: 14, wireAlpha: 0.22 },
            { baseYRatio: 0.24, direction: -1 as const, baseSpeed: 0.00045, amp1: 42, amp2: 18, wireAlpha: 0.26 },
            { baseYRatio: 0.36, direction: 1 as const,  baseSpeed: 0.00042, amp1: 38, amp2: 16, wireAlpha: 0.28 },
            { baseYRatio: 0.48, direction: -1 as const, baseSpeed: 0.00050, amp1: 48, amp2: 20, wireAlpha: 0.32 },
            { baseYRatio: 0.60, direction: 1 as const,  baseSpeed: 0.00040, amp1: 36, amp2: 15, wireAlpha: 0.28 },
            { baseYRatio: 0.72, direction: -1 as const, baseSpeed: 0.00046, amp1: 44, amp2: 18, wireAlpha: 0.26 },
            { baseYRatio: 0.84, direction: 1 as const,  baseSpeed: 0.00039, amp1: 34, amp2: 14, wireAlpha: 0.22 },
            { baseYRatio: 0.94, direction: -1 as const, baseSpeed: 0.00048, amp1: 30, amp2: 12, wireAlpha: 0.18 },
        ];

        let streams: StreamLine[] = [];

        const initStreams = () => {
            streams = streamConfigs.map((cfg, index) => {
                const particleCount = 85 + (index % 4) * 15; // 85 to 130 particles per stream
                const particles: StreamParticle[] = [];

                for (let i = 0; i < particleCount; i++) {
                    const rand = Math.random();
                    const colorType: "neon" | "white" | "teal" = 
                        rand > 0.45 ? "neon" : (rand > 0.18 ? "white" : "teal");

                    particles.push({
                        u: Math.random(),
                        speedMult: 0.75 + Math.random() * 0.55,
                        size: colorType === "white" 
                            ? (0.9 + Math.random() * 1.5) 
                            : (1.2 + Math.random() * 2.2),
                        colorType,
                        spread: (Math.random() - 0.5) * 18, // cross-sectional thickness
                        phase: Math.random() * Math.PI * 2,
                        alpha: 0.4 + Math.random() * 0.6,
                    });
                }

                // 4 to 6 luminous pulse nodes per stream
                const nodes = Array.from({ length: 5 }, (_, nIdx) => ({
                    u: (nIdx / 5) + Math.random() * 0.1,
                    speed: 0.8 + Math.random() * 0.4,
                    size: 3.5 + Math.random() * 2.5,
                }));

                return {
                    baseYRatio: cfg.baseYRatio,
                    direction: cfg.direction,
                    baseSpeed: cfg.baseSpeed,
                    freq1: 0.0011 + (index * 0.00022),
                    freq2: 0.0026 + (index * 0.00031),
                    amp1: cfg.amp1,
                    amp2: cfg.amp2,
                    phaseSpeed: 0.00075 * cfg.direction,
                    phase: index * 1.73,
                    wireAlpha: cfg.wireAlpha,
                    particles,
                    nodes,
                };
            });
        };

        const resize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
            height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.scale(dpr, dpr);
            initStreams();
        };

        window.addEventListener("resize", resize);
        resize();

        let lastTime = performance.now();

        const render = (now: number) => {
            const dt = Math.min(now - lastTime, 40); // clamp delta to prevent massive jumps on tab blur
            lastTime = now;

            // Smooth mouse interpolation
            mouse.x += (mouse.targetX - mouse.x) * 0.1;
            mouse.y += (mouse.targetY - mouse.y) * 0.1;

            ctx.clearRect(0, 0, width, height);

            const bleed = 140; // extra margins beyond screen so lines glide seamlessly
            const totalWidth = width + bleed * 2;

            streams.forEach((stream) => {
                const baseY = stream.baseYRatio * height;

                // Function to calculate stream Y coordinate at any X position
                const getStreamY = (x: number): number => {
                    const wave1 = Math.sin(x * stream.freq1 + now * stream.phaseSpeed + stream.phase) * stream.amp1;
                    const wave2 = Math.cos(x * stream.freq2 - now * stream.phaseSpeed * 1.4 + stream.phase * 1.3) * stream.amp2;
                    let y = baseY + wave1 + wave2;

                    // Interactive mouse avoidance: push stream away when cursor is near
                    const dx = x - mouse.x;
                    const dy = y - mouse.y;
                    const distSq = dx * dx + dy * dy;
                    const maxDist = 200;
                    if (distSq < maxDist * maxDist && distSq > 0) {
                        const dist = Math.sqrt(distSq);
                        const force = (1 - dist / maxDist) * 35;
                        y += (dy > 0 ? 1 : -1) * force;
                    }

                    return y;
                };

                // --- 1. DRAW LUMINOUS PARTICLE FILAMENT (CORE HIGHWAY SPINE) ---
                ctx.save();
                ctx.beginPath();
                const step = 20;
                let started = false;

                for (let x = -bleed; x <= width + bleed; x += step) {
                    const y = getStreamY(x);
                    if (!started) {
                        ctx.moveTo(x, y);
                        started = true;
                    } else {
                        ctx.lineTo(x, y);
                    }
                }

                // Outer neon green aura of the line
                ctx.shadowColor = "#3CFF8F";
                ctx.shadowBlur = 10;
                ctx.strokeStyle = `rgba(60, 255, 143, ${stream.wireAlpha * 0.6})`;
                ctx.lineWidth = 1.8;
                ctx.stroke();

                // Inner white-hot wire core
                ctx.shadowBlur = 3;
                ctx.shadowColor = "#FFFFFF";
                ctx.strokeStyle = `rgba(255, 255, 255, ${stream.wireAlpha * 0.8})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
                ctx.restore();

                // --- 2. DRAW FLOWING PULSE NODES (LARGER BRIGHT ENERGY ORBS) ---
                stream.nodes.forEach((node) => {
                    // Update node progress along line
                    const moveDelta = stream.baseSpeed * node.speed * stream.direction * dt * 0.06;
                    node.u = (node.u + moveDelta) % 1;
                    if (node.u < 0) node.u += 1;

                    const nodeX = -bleed + node.u * totalWidth;
                    const nodeY = getStreamY(nodeX);

                    // Fade out at extreme screen edges
                    const edgeFade = Math.sin(node.u * Math.PI);

                    if (edgeFade > 0.05) {
                        ctx.save();
                        // Outer glowing aura
                        ctx.beginPath();
                        ctx.arc(nodeX, nodeY, node.size * 2.2, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(60, 255, 143, ${0.18 * edgeFade})`;
                        ctx.fill();

                        // Inner brilliant orb
                        ctx.beginPath();
                        ctx.arc(nodeX, nodeY, node.size, 0, Math.PI * 2);
                        ctx.shadowColor = "#3CFF8F";
                        ctx.shadowBlur = 14;
                        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * edgeFade})`;
                        ctx.fill();
                        ctx.restore();
                    }
                });

                // --- 3. DRAW DENSE STREAM OF GLOWING PARTICLES WITH SPEED STREAKS ---
                stream.particles.forEach((p) => {
                    // Advance particle along path
                    const pMove = stream.baseSpeed * p.speedMult * stream.direction * dt * 0.06;
                    p.u = (p.u + pMove) % 1;
                    if (p.u < 0) p.u += 1;

                    const px = -bleed + p.u * totalWidth;
                    const streamCenterY = getStreamY(px);

                    // Organic breathing & lateral spread around the filament
                    const breathe = Math.sin(now * 0.002 + p.phase);
                    const py = streamCenterY + p.spread * (0.8 + breathe * 0.4);

                    // Fade at entry/exit screen borders
                    const edgeFade = Math.sin(p.u * Math.PI);
                    if (edgeFade <= 0.02) return;

                    const finalAlpha = p.alpha * edgeFade;

                    // Particle velocity trail / streak indicating transit direction ("kahin jaa rahe hai")
                    const streakLength = (stream.direction === 1 ? -1 : 1) * (p.size * 4.5 * p.speedMult);
                    const tailX = px + streakLength;
                    const tailY = getStreamY(tailX) + p.spread * (0.8 + breathe * 0.4);

                    ctx.save();
                    // Directional streak gradient
                    const trailGrad = ctx.createLinearGradient(tailX, tailY, px, py);
                    if (p.colorType === "white") {
                        trailGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
                        trailGrad.addColorStop(1, `rgba(255, 255, 255, ${finalAlpha * 0.85})`);
                    } else if (p.colorType === "teal") {
                        trailGrad.addColorStop(0, "rgba(0, 230, 180, 0)");
                        trailGrad.addColorStop(1, `rgba(0, 230, 180, ${finalAlpha * 0.9})`);
                    } else {
                        trailGrad.addColorStop(0, "rgba(60, 255, 143, 0)");
                        trailGrad.addColorStop(1, `rgba(60, 255, 143, ${finalAlpha})`);
                    }

                    ctx.beginPath();
                    ctx.moveTo(tailX, tailY);
                    ctx.lineTo(px, py);
                    ctx.strokeStyle = trailGrad;
                    ctx.lineWidth = p.size * 0.9;
                    ctx.stroke();

                    // Leading particle head (glowing circle)
                    ctx.beginPath();
                    ctx.arc(px, py, p.size, 0, Math.PI * 2);
                    if (p.colorType === "white") {
                        ctx.shadowColor = "#FFFFFF";
                        ctx.shadowBlur = 8;
                        ctx.fillStyle = `rgba(255, 255, 255, ${finalAlpha})`;
                    } else if (p.colorType === "teal") {
                        ctx.shadowColor = "#00FFB2";
                        ctx.shadowBlur = 9;
                        ctx.fillStyle = `rgba(0, 255, 178, ${finalAlpha})`;
                    } else {
                        ctx.shadowColor = "#3CFF8F";
                        ctx.shadowBlur = 10;
                        ctx.fillStyle = `rgba(60, 255, 143, ${finalAlpha})`;
                    }
                    ctx.fill();
                    ctx.restore();
                });
            });

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
            style={{ display: "block" }}
        />
    );
}
