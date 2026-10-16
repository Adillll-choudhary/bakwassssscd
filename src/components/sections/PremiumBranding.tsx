"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const projects = [
    {
        id: 1,
        title: "SnackStop",
        category: "Gourmet F&B",
        year: "2024",
        src: "/work/IMG_3588.webp",
        description: "Redefining crunchy cravings with bold, pop-art visuals.",
        color: "#1a1a1a"
    },
    {
        id: 2,
        title: "Joyolo",
        category: "Women's Beauty",
        year: "2024",
        src: "/work/IMG_3678.webp",
        description: "Soft, organic elegance for modern beauty rituals.",
        color: "#242424"
    },
    {
        id: 3,
        title: "Lumina",
        category: "Premium Skincare",
        year: "2025",
        src: "/work/IMG_3679.webp",
        description: "Minimalist luxury where science meets sophistication.",
        color: "#0f0f0f"
    },
    {
        id: 4,
        title: "Bento Buds",
        category: "Chinese Cuisine",
        year: "2025",
        src: "/work/IMG_3680.webp",
        description: "Heritage flavors remixed for a playful modern palate.",
        color: "#141414"
    },
    {
        id: 5,
        title: "Burp Up",
        category: "Beverage",
        year: "2026",
        src: "/work/IMG_3681.webp",
        description: "Explosive energy in a can. Designed to pop globally.",
        color: "#0a0a0a"
    }
];

const Card = ({ i, project, progress, range, targetScale }: { i: number, project: any, progress: MotionValue<number>, range: number[], targetScale: number }) => {

    const container = useRef(null);
    const [aspectRatio, setAspectRatio] = useState<number>(1);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]); // Subtle parallax
    const cardScale = useTransform(progress, range, [1, targetScale]); // Whole card shrinking

    // Calculate dimensions based on aspect ratio while staying within bounds
    // Max height is 70vh, width adjusts.
    const containerStyle = {
        height: '70vh',
        width: `calc(70vh * ${aspectRatio})`,
        maxWidth: '90vw'
    };

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{
                    scale: cardScale,
                    top: `calc(-5vh + ${i * 25}px)`,
                    ...containerStyle
                }}
                className="relative flex flex-col rounded-[2rem] md:rounded-[3rem] origin-top overflow-hidden border border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.9)] bg-transparent transform-gpu transition-all duration-300"
            >
                {/* Image Container */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <motion.div style={{ scale: imageScale }} className="relative w-full h-full">
                        <Image
                            fill
                            src={project.src}
                            alt={project.title}
                            className="object-contain"
                            onLoadingComplete={(img) => {
                                setAspectRatio(img.naturalWidth / img.naturalHeight);
                            }}
                        />
                    </motion.div>
                </div>

                {/* Highly Subtle Content Overlay - Only visible on hover or active */}
                <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-12 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    <div className="flex justify-between items-start">
                        <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                            <span className="text-accent text-xs italic tracking-widest">{project.category}</span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-serif text-accent mb-4 tracking-tighter">{project.title}</h2>
                            <p className="text-accent max-w-sm text-base font-light leading-relaxed">{project.description}</p>
                        </div>

                        <button className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                            <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

const DoubleCard = ({ i, projectA, projectB, progress, range, targetScale }: { i: number, projectA: any, projectB: any, progress: MotionValue<number>, range: number[], targetScale: number }) => {
    const container = useRef(null);
    const [aspectA, setAspectA] = useState<number>(1);
    const [aspectB, setAspectB] = useState<number>(1);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const cardScale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{
                    scale: cardScale,
                    top: `calc(-5vh + ${i * 25}px)`
                }}
                className="relative flex flex-row gap-4 md:gap-8 h-[60vh] md:h-[70vh] w-[95vw] md:w-[85vw] origin-top transform-gpu transition-all duration-300"
            >
                {/* Image A */}
                <div className="flex-1 relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl group">
                    <Image
                        fill
                        src={projectA.src}
                        alt={projectA.title}
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        onLoadingComplete={(img) => setAspectA(img.naturalWidth / img.naturalHeight)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                        <h2 className="text-2xl md:text-3xl font-serif text-accent">{projectA.title}</h2>
                        <p className="text-accent text-sm mt-2">{projectA.category}</p>
                    </div>
                </div>

                {/* Image B */}
                <div className="flex-1 relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl group">
                    <Image
                        fill
                        src={projectB.src}
                        alt={projectB.title}
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        onLoadingComplete={(img) => setAspectB(img.naturalWidth / img.naturalHeight)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                        <h2 className="text-2xl md:text-3xl font-serif text-accent">{projectB.title}</h2>
                        <p className="text-accent text-sm mt-2">{projectB.category}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default function PremiumBranding() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    // We have 5 items. 1-3 are single, 4-5 are a pair. Total 4 "slots".
    const firstThree = projects.slice(0, 3);
    const lastTwo = projects.slice(3, 5);

    return (
        <section className="bg-[#050505] relative w-full pt-20">


            {/* Sticky Cards Container */}
            <div ref={container} className="w-full relative px-4">
                {firstThree.map((project, i) => {
                    const targetScale = 1 - ((4 - i) * 0.05);
                    return <Card key={project.id} i={i} project={project} progress={scrollYProgress} range={[i * 0.25, 1]} targetScale={targetScale} />
                })}

                {/* The last two grouped side by side */}
                <DoubleCard
                    i={3}
                    projectA={lastTwo[0]}
                    projectB={lastTwo[1]}
                    progress={scrollYProgress}
                    range={[0.75, 1]}
                    targetScale={1}
                />
            </div>


        </section>
    );
}
