"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(useGSAP);
}

// A simple text splitter since we don't have the premium SplitText plugin.
const TextSplitter = ({ text }: { text: string }) => {
    return (
        <>
            {text.split(' ').map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-[0.2em] whitespace-nowrap overflow-visible">
                    {word.split('').map((char, charIndex) => (
                        <span key={charIndex} className="char inline-block origin-center transform-gpu">
                            {char}
                        </span>
                    ))}
                </span>
            ))}
        </>
    );
};

export default function EditorialTextMorph() {
    const container = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();
        
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            const ctx = gsap.context(() => {
                const chars = gsap.utils.toArray('.char') as HTMLElement[];
                const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

                // Set initial states
                gsap.set(imageRef.current, { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.05 });
                
                // PHASE 1: Hold readable text (0.0s - 1.2s)
                tl.to({}, { duration: 1.2 });

                // PHASE 2 & 3: Text Distortion -> Abstract Fragments (1.2s - 2.2s)
                tl.to(chars, {
                    duration: 1.0,
                    ease: "power4.inOut",
                    scaleX: () => gsap.utils.random(0.2, 3),
                    scaleY: () => gsap.utils.random(0.1, 0.5),
                    y: () => gsap.utils.random(-20, 20),
                    x: () => gsap.utils.random(-10, 10),
                    opacity: () => gsap.utils.random(0.1, 0.8),
                    filter: 'blur(2px)',
                    stagger: {
                        amount: 0.3,
                        from: "random"
                    }
                }, "text-distort");

                // PHASE 4: Image Reveal through mask (2.2s - 2.7s)
                tl.to(imageRef.current, {
                    duration: 1.5,
                    clipPath: 'inset(0% 0% 0% 0%)',
                    ease: "expo.out"
                }, "text-distort+=0.5");
                
                tl.to(imageRef.current, {
                    duration: 1.5,
                    scale: 1,
                    ease: "power3.out"
                }, "text-distort+=0.5");

                // PHASE 5: Image Hold (2.7s - 3.8s) -> handled by timeline pacing
                tl.to({}, { duration: 1.5 });

                // PHASE 6: Image -> Text Reconstruction (3.8s - 5.5s)
                tl.to(imageRef.current, {
                    duration: 1.2,
                    clipPath: 'inset(100% 0% 0% 0%)',
                    ease: "power4.inOut"
                }, "text-restore");

                tl.to(chars, {
                    duration: 1.5,
                    scaleX: 1,
                    scaleY: 1,
                    y: 0,
                    x: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    ease: "expo.out",
                    stagger: {
                        amount: 0.4,
                        from: "center"
                    }
                }, "text-restore+=0.2");

            }, container);
            return () => ctx.revert();
        });

        // Reduced motion fallback
        mm.add("(prefers-reduced-motion: reduce)", () => {
             const ctx = gsap.context(() => {
                const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
                gsap.set(imageRef.current, { opacity: 0 });
                
                tl.to(textRef.current, { opacity: 0, duration: 1, delay: 2 })
                  .to(imageRef.current, { opacity: 1, duration: 1 })
                  .to(imageRef.current, { opacity: 0, duration: 1, delay: 2 })
                  .to(textRef.current, { opacity: 1, duration: 1 });
             }, container);
             return () => ctx.revert();
        });

        return () => mm.revert();
    }, { scope: container });

    return (
        <section className="relative w-full py-24 md:py-40 flex justify-center items-center overflow-hidden">
            {/* Dark, blurred background */}
            <div className="absolute inset-0 bg-[#040608] z-0">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_50%,#0e3e33_0%,transparent_50%)] mix-blend-screen" />
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_80%,#112942_0%,transparent_50%)] mix-blend-screen" />
                <div className="absolute inset-0 backdrop-blur-[100px]" />
            </div>

            {/* Content Card */}
            <div 
                ref={container}
                className="relative z-10 w-[92%] md:w-[75%] max-w-[1200px] bg-[#f4f4f2] rounded-2xl md:rounded-3xl shadow-[0_30px_60px_-10px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden flex flex-col"
            >
                {/* Glow behind card */}
                <div className="absolute -inset-1 bg-gradient-to-tr from-[#3CFF8F]/20 to-[#0A84FF]/20 rounded-3xl blur-xl -z-10 opacity-50 pointer-events-none" />
                
                {/* Close Button */}
                <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-black/20 flex items-center justify-center z-50">
                    <div className="w-1.5 h-1.5 rounded-full bg-black/40" />
                </div>

                {/* Main Content Area */}
                <div className="relative w-full min-h-[400px] md:min-h-[600px] p-8 md:p-16 flex flex-col justify-center">
                    
                    {/* Text Container */}
                    <div ref={textRef} className="relative z-20 max-w-4xl">
                        <h3 className="font-universo font-black text-black text-3xl md:text-5xl lg:text-[4rem] leading-[0.9] tracking-tight uppercase">
                            <TextSplitter text="We shape digital experiences that transform brands" />
                        </h3>
                        <p className="mt-8 font-sans text-black/80 font-medium text-lg md:text-2xl leading-tight max-w-2xl">
                            <TextSplitter text="Our methodology combines cinematic aesthetics with precision engineering. We do not just build websites—we construct immersive digital environments." />
                        </p>
                    </div>

                    {/* Image Mask Reveal Container */}
                    <div 
                        ref={imageRef} 
                        className="absolute inset-0 z-30 pointer-events-none overflow-hidden"
                        style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                    >
                        <div className="w-full h-full relative">
                            <img 
                                src="/branding-new-cover.jpg" 
                                alt="Editorial Artwork" 
                                className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
                            />
                            <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
                        </div>
                    </div>
                </div>

                {/* CTA Area */}
                <div className="relative z-40 w-full p-6 bg-[#3CFF8F] flex justify-between items-center group cursor-pointer transition-colors duration-500 hover:bg-[#2adb78]">
                    <span className="font-universo font-black text-black uppercase tracking-wider text-xl md:text-2xl">
                        Explore the Archives
                    </span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="square" className="transform group-hover:translate-x-2 transition-transform duration-300">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
