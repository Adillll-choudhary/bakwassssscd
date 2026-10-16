"use client";

import { useEffect, useRef } from "react";

interface ParticleConnectorsProps {
    targets: React.MutableRefObject<(HTMLElement | null)[]>;
    activeTargetIndex: number | null;
    logoY?: any; // Framer Motion Value
}

// Helper to get a point on a cubic bezier curve
function getBezierPoint(t: number, p0: number, p1: number, p2: number, p3: number) {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * t;

    return uuu * p0 + 3 * uu * t * p1 + 3 * u * tt * p2 + ttt * p3;
}

export default function ParticleConnectors({ targets, activeTargetIndex, logoY }: ParticleConnectorsProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const lastSplashTimeRef = useRef<number>(0);

    // Initialize the procedural liquid splash synthesizer
    useEffect(() => {
        const initAudio = () => {
            if (!audioCtxRef.current) {
                const Ctx = window.AudioContext || (window as any).webkitAudioContext;
                audioCtxRef.current = new Ctx();
            } else if (audioCtxRef.current.state === 'suspended') {
                audioCtxRef.current.resume();
            }
        };

        window.addEventListener('mousemove', initAudio, { once: true });
        window.addEventListener('click', initAudio, { once: true });
        
        return () => {
            if (audioCtxRef.current) {
                audioCtxRef.current.close();
            }
        };
    }, []);

    // Cinematic "Ancient Energy Core Awakening" Engine
    const triggerCoreAwakening = (intensity: number) => { 
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
        const now = Date.now();
        // 800ms cooldown ensures it sounds like a grand, sacred awakening rather than a spammy ui sound
        if (now - lastSplashTimeRef.current < 800) return; 
        lastSplashTimeRef.current = now;

        const ctx = audioCtxRef.current;
        const duration = 0.8; // 800ms duration
        
        // Master Gain to keep the entire effect very subtle and premium
        const masterGain = ctx.createGain();
        masterGain.gain.value = Math.min(intensity * 0.1, 0.4); 
        masterGain.connect(ctx.destination);

        // 1. Deep Atmospheric Undertone (Magnetic Low Frequency Hum)
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'sine'; // Deep, pure bass
        subOsc.frequency.setValueAtTime(45, ctx.currentTime); 
        subOsc.frequency.exponentialRampToValueAtTime(65, ctx.currentTime + duration); // Magnetic pull upward
        
        subGain.gain.setValueAtTime(0, ctx.currentTime);
        subGain.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 0.3); // Soft, powerful awakening
        subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        
        subOsc.connect(subGain);
        subGain.connect(masterGain);
        subOsc.start(ctx.currentTime);
        subOsc.stop(ctx.currentTime + duration);

        // 2. Harmonic Resonance (Sacred Choir-like Texture)
        const harmOsc1 = ctx.createOscillator();
        const harmOsc2 = ctx.createOscillator();
        const harmGain = ctx.createGain();
        
        harmOsc1.type = 'sine';
        harmOsc2.type = 'triangle'; // Adds slight richness to the harmonics
        
        // Perfect fifth interval (A4 and E5) creates a sacred, cinematic feel
        harmOsc1.frequency.value = 440.00;
        harmOsc2.frequency.value = 659.25; 
        
        // Slight detune for ethereal, wide chorusing
        harmOsc1.detune.value = 4;
        harmOsc2.detune.value = -4;
        
        harmGain.gain.setValueAtTime(0, ctx.currentTime);
        harmGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.4); // Slow harmonic swell
        harmGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        
        harmOsc1.connect(harmGain);
        harmOsc2.connect(harmGain);
        harmGain.connect(masterGain);
        harmOsc1.start(ctx.currentTime);
        harmOsc2.start(ctx.currentTime);
        harmOsc1.stop(ctx.currentTime + duration);
        harmOsc2.stop(ctx.currentTime + duration);

        // 3. Delicate Crystalline Frequencies (High Shimmer)
        const shimmerOsc = ctx.createOscillator();
        const shimmerGain = ctx.createGain();
        shimmerOsc.type = 'sine';
        shimmerOsc.frequency.setValueAtTime(1760, ctx.currentTime); // High pitched crystal sound
        shimmerOsc.frequency.exponentialRampToValueAtTime(2637, ctx.currentTime + duration); // Sweeping up
        
        shimmerGain.gain.setValueAtTime(0, ctx.currentTime);
        shimmerGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.2); // Delicate attack
        shimmerGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6); // Quick decay
        
        shimmerOsc.connect(shimmerGain);
        shimmerGain.connect(masterGain);
        shimmerOsc.start(ctx.currentTime);
        shimmerOsc.stop(ctx.currentTime + duration);

        // 4. Ethereal Air Movement (Filtered Noise)
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1; // White noise
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        
        // Bandpass filter to sculpt the noise into soft "wind" or "air"
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(300, ctx.currentTime);
        noiseFilter.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + duration); // Swell of air
        noiseFilter.Q.value = 1.0;
        
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0, ctx.currentTime);
        noiseGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.3); // Soft breath
        noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(masterGain);
        noise.start(ctx.currentTime);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resize);
        resize();

        // Track global mouse position for interactive dodging
        const mouse = { x: -1000, y: -1000 };
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        window.addEventListener("mousemove", handleMouseMove);

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let totalInteractionForce = 0;

            const currentLogoYOffset = logoY ? logoY.get() : 0;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2 + currentLogoYOffset;
            const time = performance.now();

            if (targets.current) {
                targets.current.forEach((el, index) => {
                    if (!el) return;
                    
                    const rect = el.getBoundingClientRect();
                    const canvasRect = canvas.getBoundingClientRect();
                    const halfLength = Math.max(1, Math.floor(targets.current.length / 2));
                    const isLeft = index < halfLength;
                    
                    // Perfectly ordered vertical spread (no criss-crossing) dynamically based on item count
                    const indexOnSide = index % halfLength;
                    const verticalSpread = halfLength > 1 ? (indexOnSide / (halfLength - 1) - 0.5) * 2 : 0; 
                    
                    // Match the exact start positions of the scaled-down 80% logo
                    const logoRadiusX = 140;
                    const logoRadiusY = 160; 
                    
                    let startX = centerX + (isLeft ? -logoRadiusX : logoRadiusX);
                    let startY = centerY + (verticalSpread * logoRadiusY);
                    
                    // User Request: Cut a little bit of the connector for "Branding & Identity" (index 1) near the logo particle
                    if (index === 1) {
                        startX -= 80; // Push the start point 80px away from the logo
                    }
                    
                    // User Request: Extend the connector for "Social Media Management" (index 2) closer towards the logo particle
                    if (index === 2) {
                        startX += 60; // Pull the start point 60px inward towards the logo
                    }
                    
                    const iconRadius = window.innerWidth >= 768 ? 16 : 12; 
                    
                    // Lock the target coordinates mathematically into the exact center of the HTML circle
                    const targetX = (isLeft ? rect.right - iconRadius : rect.left + iconRadius) - canvasRect.left;
                    const targetY = (rect.top + rect.height / 2) - canvasRect.top;
                    
                    // Force all wires to be permanently 'active/hovered' as requested
                    const isActive = true;
                    const energyLevel = isActive ? 1 : 0.4;
                    
                    // Massive Organic S-Curve with live-wire 'wiggle/giggle' effect
                    const curveStrength = Math.abs(targetX - startX) * 0.4;
                    const wiggle = Math.sin(time / 250 + index * 10) * 20; // Creates the dynamic wobble
                    
                    // Introduce a strong vertical wave to create the S-curve
                    const waveHeight = 120 + Math.sin(index) * 40;
                    const waveDir = index % 2 === 0 ? 1 : -1;
                    
                    const cp1x = startX + (isLeft ? -curveStrength : curveStrength);
                    const cp1y = startY + (waveHeight * waveDir) + wiggle;
                    
                    const cp2x = targetX + (isLeft ? curveStrength : -curveStrength);
                    const cp2y = targetY - (waveHeight * waveDir) - wiggle;

                    const drawPath = () => {
                        ctx.beginPath();
                        ctx.moveTo(startX, startY);
                        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, targetX, targetY);
                    };

                    ctx.lineJoin = "round";
                    ctx.lineCap = "round";
                    ctx.globalCompositeOperation = "screen";

                    // Spark block removed per user request

                    // --- VOLUMETRIC GREEN SMOKE EMITTING FROM LOGO ---
                    // Creating thick, blurry plasma smoke to make it look highly realistic
                    const smokeSpeed = time / 2000;
                    const smokeRadius = 150 + Math.sin(smokeSpeed + index) * 50;
                    const smokeX = centerX + Math.cos(smokeSpeed + index * 45) * 100;
                    const smokeY = centerY + Math.sin(smokeSpeed + index * 45) * 100;
                    
                    ctx.beginPath();
                    ctx.arc(smokeX, smokeY, smokeRadius, 0, Math.PI * 2);
                    const smokeGlow = ctx.createRadialGradient(smokeX, smokeY, 0, smokeX, smokeY, smokeRadius);
                    smokeGlow.addColorStop(0, `rgba(0, 255, 136, ${energyLevel * 0.05})`);
                    smokeGlow.addColorStop(1, "rgba(0, 255, 136, 0)");
                    ctx.fillStyle = smokeGlow;
                    ctx.fill();

                    // --- DRAW AMBIENT PLASMA TENDRILS (Smoke roots) ---
                    const drawTendrilPath = () => {
                        ctx.beginPath();
                        const steps = 30;
                        for(let i=0; i<=steps; i++) {
                            const t = i / steps;
                            const px = getBezierPoint(t, startX, cp1x, cp2x, targetX);
                            const py = getBezierPoint(t, startY, cp1y, cp2y, targetY);
                            const wave = Math.sin(t * Math.PI * 3 + time/500 + index) * 60;
                            const fade = Math.sin(t * Math.PI); 
                            const finalY = py + wave * fade;
                            if (i === 0) ctx.moveTo(px, finalY);
                            else ctx.lineTo(px, finalY);
                        }
                    };
                    drawTendrilPath();
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = `rgba(0, 255, 136, ${energyLevel * 0.2})`;
                    ctx.stroke();

                    // --- MAIN SMOOTH WIRES (ORGANIC VARIABLE THICKNESS) ---
                    // Custom function to draw wires that are thick in some places and thin in others ("kahin moti, kahin patli")
                    const drawVariableWirePolygon = (baseWidth: number, maxAddedWidth: number, color: string, addShadow: boolean) => {
                        const segments = 50;
                        const topPoints = [];
                        const bottomPoints = [];
                        
                        // OPTIMIZATION: Only apply heavy shadow blurs to the single active wire. 
                        // Blurring all 16 wires every frame crushes the GPU on lower-end devices.
                        if (addShadow && isActive) {
                            ctx.shadowColor = '#00ff88';
                            ctx.shadowBlur = 25;
                        } else {
                            ctx.shadowBlur = 0;
                        }

                        for(let i=0; i <= segments; i++) {
                            const t = i / segments;
                            const px = getBezierPoint(t, startX, cp1x, cp2x, targetX);
                            const py = getBezierPoint(t, startY, cp1y, cp2y, targetY);
                            
                            // Calculate normal angle
                            let tNext = Math.min(1, t + 0.01);
                            let pxNext = getBezierPoint(tNext, startX, cp1x, cp2x, targetX);
                            let pyNext = getBezierPoint(tNext, startY, cp1y, cp2y, targetY);
                            
                            let angle = Math.atan2(pyNext - py, pxNext - px);
                            if (t === 1) { // End of curve fallback
                                const tPrev = t - 0.01;
                                const pxPrev = getBezierPoint(tPrev, startX, cp1x, cp2x, targetX);
                                const pyPrev = getBezierPoint(tPrev, startY, cp1y, cp2y, targetY);
                                angle = Math.atan2(py - pyPrev, px - pxPrev);
                            }
                            
                            const normal = angle + Math.PI / 2;
                            
                            // User Request: No wires at all for the first section, just particles!
                            // Taper the wire width to exactly 0 for the first 15% of the path, then grow to full width
                            let fadeMultiplier = 1;
                            if (t < 0.3) {
                                fadeMultiplier = (t - 0.15) / 0.15; // 0 at t=0.15, 1 at t=0.3
                                if (fadeMultiplier <= 0) continue; // Skip drawing polygon points entirely before t=0.15
                            }
                            
                            // Organic pulsing thickness
                            // Using sine waves mapped to the curve's 't' value and time creates moving thick/thin nodes
                            const thicknessPulse = Math.sin(t * Math.PI * 6 - time / 400 + index * 2);
                            const widthMod = Math.max(0, thicknessPulse); 
                            const currentWidth = (baseWidth + widthMod * maxAddedWidth) * fadeMultiplier;
                            
                            topPoints.push({ x: px + Math.cos(normal) * currentWidth, y: py + Math.sin(normal) * currentWidth });
                            bottomPoints.push({ x: px - Math.cos(normal) * currentWidth, y: py - Math.sin(normal) * currentWidth });
                        }
                        
                        ctx.beginPath();
                        ctx.moveTo(topPoints[0].x, topPoints[0].y);
                        for(let i=1; i < topPoints.length; i++) {
                            ctx.lineTo(topPoints[i].x, topPoints[i].y);
                        }
                        // Draw bottom edge backward to close the polygon
                        for(let i=bottomPoints.length - 1; i >= 0; i--) {
                            ctx.lineTo(bottomPoints[i].x, bottomPoints[i].y);
                        }
                        ctx.closePath();
                        // User Request: Make the solid wire fade in, so it looks like the individual particles are forming the wire!
                        const gradient = ctx.createLinearGradient(startX, startY, targetX, targetY);
                        const baseColorMatch = color.match(/rgba\((\d+,\s*\d+,\s*\d+),\s*([\d.]+)\)/);
                        if (baseColorMatch) {
                            const rgb = baseColorMatch[1];
                            const alpha = baseColorMatch[2];
                            gradient.addColorStop(0, `rgba(${rgb}, 0)`); // Completely invisible at start (particles only)
                            gradient.addColorStop(0.3, `rgba(${rgb}, ${alpha})`); // Fully formed wire at 30% mark
                            gradient.addColorStop(1, `rgba(${rgb}, ${alpha})`);
                            ctx.fillStyle = gradient;
                        } else {
                            ctx.fillStyle = color;
                        }
                        
                        ctx.fill();
                    };

                    // Emerald Core Glow (Variable Thickness) - BOLDER
                    drawVariableWirePolygon(
                        isActive ? 3.0 : 1.0, // Base thin width (increased)
                        isActive ? 6.0 : 2.5, // Max added thickness (increased)
                        `rgba(0, 255, 136, ${isActive ? 0.9 : 0.5})`,
                        true
                    );

                    // Blinding White-Hot Electric Wire Core (Variable Thickness) - BOLDER
                    drawVariableWirePolygon(
                        isActive ? 1.5 : 0.6, // Base thin width (increased)
                        isActive ? 3.0 : 1.2, // Max added thickness (increased)
                        `rgba(255, 255, 255, ${energyLevel * 0.9})`,
                        false
                    );

                    // --- GLOWING PLANETARY ORBS ALONG THE WIRE ---
                    const numOrbs = isActive ? 7 : 4;
                    for (let o = 1; o < numOrbs; o++) {
                        const t = o / numOrbs;
                        const px = getBezierPoint(t, startX, cp1x, cp2x, targetX);
                        const py = getBezierPoint(t, startY, cp1y, cp2y, targetY);
                        
                        // Solid bright core
                        ctx.beginPath();
                        ctx.arc(px, py, isActive ? 2.5 : 1.5, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(255, 255, 255, ${energyLevel})`;
                        ctx.fill();
                    }

                    // --- SUBTLE LIGHTNING / ELECTRIC ARCS ---
                    // Randomly draw jagged, high-voltage electricity crackling over the wire
                    if (Math.random() > (isActive ? 0.2 : 0.8)) {
                        ctx.beginPath();
                        const arcSteps = 15;
                        for(let i=0; i<=arcSteps; i++) {
                            const t = i / arcSteps;
                            const px = getBezierPoint(t, startX, cp1x, cp2x, targetX);
                            const py = getBezierPoint(t, startY, cp1y, cp2y, targetY);
                            
                            // Sharp, random jagged offsets simulating electricity
                            const jaggedX = (Math.random() - 0.5) * (isActive ? 15 : 5);
                            const jaggedY = (Math.random() - 0.5) * (isActive ? 15 : 5);
                            
                            // Keep endpoints strictly attached to logo and node
                            const isEnd = i === 0 || i === arcSteps;
                            const finalX = px + (isEnd ? 0 : jaggedX);
                            const finalY = py + (isEnd ? 0 : jaggedY);
                            
                            if (i === 0) ctx.moveTo(finalX, finalY);
                            else ctx.lineTo(finalX, finalY);
                        }
                        ctx.shadowBlur = 8;
                        ctx.shadowColor = '#00ff88';
                        ctx.lineWidth = isActive ? 1.5 : 0.5;
                        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * (isActive ? 0.8 : 0.3)})`;
                        ctx.stroke();
                        ctx.shadowBlur = 0; // reset
                    }

                    // --- CONTINUOUS STREAM OF INDIVIDUAL PARTICLES ---
                    // Draw individual tiny particles flowing consistently along the wire (no grouped clusters)
                    const numParticles = isActive ? 45 : 15; // High volume of individual particles
                    for (let p = 0; p < numParticles; p++) {
                        const offset = p / numParticles; // Distribute them perfectly along the path
                        
                        // Add slight speed variance so they organically drift past each other
                        const speedBase = isActive ? 3500 : 5500;
                        const speedVar = (Math.sin(p * 123.45) * 1000); 
                        const speed = speedBase + speedVar;
                        
                        let t = ((time / speed) + offset + (index * 0.13)) % 1;
                        
                        const px = getBezierPoint(t, startX, cp1x, cp2x, targetX);
                        const py = getBezierPoint(t, startY, cp1y, cp2y, targetY);
                        
                        const fade = Math.sin(t * Math.PI); 
                        const alpha = fade * (isActive ? 1 : 0.8);

                        // Spread them slightly around the core wire so they look like a physical stream
                        const spreadRadius = isActive ? 8 : 3;
                        const driftX = Math.cos(time / 600 + p * 10) * spreadRadius;
                        const driftY = Math.sin(time / 600 + p * 10) * spreadRadius;
                        
                        let finalX = px + driftX;
                        let finalY = py + driftY;
                        
                        // --- CURSOR INTERACTION (Dodging/Repelling) ---
                        const dx = mouse.x - finalX;
                        const dy = mouse.y - finalY;
                        const distToMouse = Math.sqrt(dx * dx + dy * dy);
                        
                        let interactGlow = 1;
                        const interactRadius = 80; // How close the mouse needs to be to trigger interaction
                        
                        if (distToMouse < interactRadius) {
                            const force = (interactRadius - distToMouse) / interactRadius;
                            totalInteractionForce += force;
                            // Push the particle away organically (repel)
                            finalX -= (dx / distToMouse) * force * 35; 
                            finalY -= (dy / distToMouse) * force * 35;
                            
                            // Flare up brightly when they dodge the cursor
                            interactGlow = 1 + force * 2;
                        }

                        // Tiny size exactly matching the 3D logo particles (1px to 2.5px)
                        const size = (Math.abs(Math.cos(p * 543.21)) * 1.5 + 1) * interactGlow;

                        ctx.beginPath();
                        ctx.arc(finalX, finalY, size, 0, Math.PI * 2);
                        
                        // Mix white and emerald particles just like the 3D logo structure
                        ctx.fillStyle = p % 3 === 0 
                            ? `rgba(0, 255, 136, ${alpha})` 
                            : `rgba(255, 255, 255, ${alpha})`;
                        ctx.fill();
                    }

                    // Connection node impact point on the text
                    ctx.beginPath();
                    ctx.arc(targetX, targetY, isActive ? 6 : 3, 0, Math.PI * 2);
                    ctx.fillStyle = isActive ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 255, 136, 0.5)";
                    ctx.fill();
                    
                    ctx.beginPath();
                    ctx.arc(targetX, targetY, isActive ? 15 : 8, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(0, 255, 136, ${isActive ? 0.4 : 0.2})`;
                    ctx.fill();
                });

                // --- DRAW CENTRAL REACTOR AURA (Volumetric Light Rays) ---
                const reactorGlow = ctx.createRadialGradient(centerX, centerY, 80, centerX, centerY, 400);
                reactorGlow.addColorStop(0, "rgba(0, 255, 136, 0.4)");
                reactorGlow.addColorStop(0.2, "rgba(0, 255, 136, 0.15)");
                reactorGlow.addColorStop(0.5, "rgba(0, 255, 136, 0.05)");
                reactorGlow.addColorStop(1, "rgba(0, 255, 136, 0)");
                
                ctx.globalCompositeOperation = "screen";
                ctx.fillStyle = reactorGlow;
                ctx.fillRect(centerX - 400, centerY - 400, 800, 800);
                ctx.globalCompositeOperation = "source-over"; // reset
            }

            // Hover sound removed as requested
            // (The distToLogo logic is kept empty or removed)

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [targets, activeTargetIndex]);

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full pointer-events-none z-15"
            style={{ mixBlendMode: 'screen' }} 
        />
    );
}
