'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Manifesto() {
    const textRef = useRef<HTMLDivElement>(null);
    
    // Map scroll progress (0 to 1) across the section to color changes for each line
    const { scrollYProgress } = useScroll({
        target: textRef,
        offset: ["start center", "end center"]
    });

    const color1 = useTransform(scrollYProgress, [0, 0.16], ["#ffffff", "#3CFF8F"]);
    const color2 = useTransform(scrollYProgress, [0.16, 0.33], ["#ffffff", "#3CFF8F"]);
    const color3 = useTransform(scrollYProgress, [0.33, 0.5], ["#ffffff", "#3CFF8F"]);
    const color4 = useTransform(scrollYProgress, [0.5, 0.66], ["rgba(255,255,255,0.2)", "#3CFF8F"]);
    const color5 = useTransform(scrollYProgress, [0.66, 0.83], ["rgba(255,255,255,0.2)", "#3CFF8F"]);
    const color6 = useTransform(scrollYProgress, [0.83, 1], ["rgba(255,255,255,0.2)", "#3CFF8F"]);

    return (
        <section id="manifesto" className="relative w-full bg-transparent pt-0 pb-32 md:pb-64 lg:pb-[700px] mb-32 md:mb-64 -mt-16 md:-mt-32 overflow-hidden flex items-center justify-center">
            
            {/* Absolute Images - Floating effect */}
            {/* Top Left Image - Overlaps Text */}
            <motion.img 
                initial={{ opacity: 0, y: 50, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop" 
                alt="Floating visual 1"
                className="absolute top-[10%] left-[5%] md:left-[15%] w-[35vw] md:w-[350px] aspect-square object-cover z-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] grayscale hover:grayscale-0 transition-all duration-500"
            />
            
            {/* Middle Left Image - Under Text */}
            <motion.img 
                initial={{ opacity: 0, y: 50, rotate: 5 }}
                whileInView={{ opacity: 1, y: 0, rotate: -2 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
                src="/work/branding/branding-new-cover.jpg" 
                alt="Floating visual 2"
                className="absolute top-[40%] md:top-[50%] left-[-5%] md:left-[5%] w-[40vw] md:w-[450px] aspect-[4/3] object-cover z-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500"
            />
            
            {/* Bottom Right Image - AI Cover */}
            <motion.img 
                initial={{ opacity: 0, y: 50, rotate: -15 }}
                whileInView={{ opacity: 1, y: 0, rotate: -5 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                src="/work/ai content/ai-content-new-cover.jpg" 
                alt="Floating visual 4"
                className="absolute top-[10%] md:top-[15%] right-[-5%] md:right-[0%] w-[45vw] md:w-[450px] aspect-[3/4] object-cover z-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500"
            />

            {/* Typography Container */}
            <div ref={textRef} className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-[100vw] mx-auto whitespace-nowrap pointer-events-none px-4">
                
                {/* Solid Text */}
                <motion.span 
                    style={{ color: color1 }}
                    className="text-[12vw] md:text-[9rem] lg:text-[13rem] font-universo font-black uppercase inline-block leading-[0.8] tracking-normal drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-colors duration-200"
                >
                    WE ENGINEER
                </motion.span>
                <motion.span 
                    style={{ color: color2 }}
                    className="text-[12vw] md:text-[9rem] lg:text-[13rem] font-universo font-black uppercase inline-block leading-[0.8] tracking-normal mt-0 md:mt-2 lg:mt-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-colors duration-200"
                >
                    DOMINANCE
                </motion.span>
                <motion.span 
                    style={{ color: color3 }}
                    className="text-[12vw] md:text-[9rem] lg:text-[13rem] font-universo font-black uppercase inline-block leading-[0.8] tracking-normal mt-0 md:mt-2 lg:mt-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-colors duration-200"
                >
                    FOR BRANDS
                </motion.span>

                {/* Faded Text (Low Opacity) */}
                <motion.span 
                    style={{ color: color4 }}
                    className="text-[12vw] md:text-[9rem] lg:text-[13rem] font-universo font-black uppercase inline-block leading-[0.8] tracking-normal mt-0 md:mt-2 lg:mt-4 transition-colors duration-200"
                >
                    THAT REFUSE
                </motion.span>
                <motion.span 
                    style={{ color: color5 }}
                    className="text-[12vw] md:text-[9rem] lg:text-[13rem] font-universo font-black uppercase inline-block leading-[0.8] tracking-normal mt-0 md:mt-2 lg:mt-4 transition-colors duration-200"
                >
                    TO SETTLE
                </motion.span>
                <motion.span 
                    style={{ color: color6 }}
                    className="text-[12vw] md:text-[9rem] lg:text-[13rem] font-universo font-black uppercase inline-block leading-[0.8] tracking-normal mt-0 md:mt-2 lg:mt-4 transition-colors duration-200"
                >
                    FOR LESS.
                </motion.span>

            </div>

        </section>
    );
}