"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#08090B] text-accent overflow-hidden">

            {/* 1. Atmospheric Background Gradient */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/bg/IMG_3509.webp"
                    alt="Coldune Background"
                    fill
                    className="object-cover opacity-20 mix-blend-overlay"
                />
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[150px] animate-pulse-slow" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[150px]" />
            </div>

            {/* 2. Grid Texture Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none z-0" />

            {/* 3. Main Content Container */}
            <div className="relative z-10 flex flex-col items-center text-center px-6">

                {/* Animated Glitch 404 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative"
                >
                    <h1 className="text-[15rem] md:text-[25rem] font-sans font-black leading-none tracking-tighter text-accent select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-sm">
                        404
                    </h1>
                    <h1 className="text-[10rem] md:text-[18rem] font-sans font-bold text-accent leading-none tracking-tighter mix-blend-overlay relative z-10">
                        404
                    </h1>
                </motion.div>

                {/* Status Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="flex items-center gap-3 mb-6"
                >
                    <AlertTriangle className="text-accent" size={20} />
                    <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase">
                        System Malfunction // Void Detected
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-3xl md:text-5xl font-serif font-medium mb-10 max-w-2xl mx-auto text-accent leading-tight"
                >
                    Lost in the digital void? <br />
                    <span className="text-text-secondary text-2xl md:text-3xl font-sans font-light mt-4 block">
                        Let's realign your trajectory.
                    </span>
                </motion.h2>

                {/* Return Button CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <Link
                        href="/"
                        className="group relative px-10 py-4 rounded-full overflow-hidden inline-flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent/40 transition-all duration-500"
                    >
                        <ArrowLeft size={18} className="text-accent group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent group-hover:text-accent transition-colors">
                            Return to Base
                        </span>
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </Link>
                </motion.div>
            </div>

            {/* 4. Footer Code */}
            <div className="absolute bottom-10 left-0 w-full text-center">
                <p className="font-mono text-[10px] text-accent tracking-[0.3em]">
                    ERR_CODE: 404_NOT_FOUND // COLDUNE_SYS_V.1.0
                </p>
            </div>

        </div>
    );
}
