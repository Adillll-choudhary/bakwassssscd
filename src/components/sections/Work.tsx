"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Project, workProjects } from "@/data/work";
import { usePerformance } from "@/hooks/usePerformance";
import RevealHeading from "../ui/RevealHeading";

const MediaCard = ({ item }: { item: Project }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [shouldLoad, setShouldLoad] = useState(false);

    // Compute URLs directly to avoid state loops
    const videoUrl = item.type === "video" ? `/work/${item.file}` : "";
    const imageUrl = item.type !== "video" ? `/work/${item.file}` : "";

    // Lazy load video source only when near viewport
    useEffect(() => {
        if (item.type !== "video" || !cardRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "600px" } 
        );
        observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, [item.type, item.file]);

    // Play/pause video based on visibility
    useEffect(() => {
        if (!videoRef.current || !shouldLoad || !videoUrl) return;
        const video = videoRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(video);
        return () => observer.disconnect();
    }, [shouldLoad, videoUrl]);

    return (
        <div 
            ref={cardRef} 
            className="w-full relative bg-[#0A0A0A] select-none pointer-events-none mb-4 md:mb-6 rounded-lg md:rounded-2xl overflow-hidden border border-white/5 py-0"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 24px 100%, 0 calc(100% - 24px))' }}
        >
            {item.type === "video" && shouldLoad ? (
                <video
                    ref={videoRef}
                    src={videoUrl}
                    className="w-full h-auto block"
                    muted
                    loop
                    playsInline
                    preload="auto"
                />
            ) : item.type === "video" ? (
                <div className="w-full aspect-video bg-white/5 animate-pulse" />
            ) : (
                <img 
                    src={imageUrl} 
                    alt={item.title} 
                    className="w-full h-auto block"
                    loading="lazy"
                    decoding="async"
                />
            )}
        </div>
    );
};

export default function Work() {
    const [mounted, setMounted] = useState(false);
    const [cols, setCols] = useState(5);

    useEffect(() => {
        setMounted(true);
        const updateCols = () => {
            const width = window.innerWidth;
            if (width >= 1024) setCols(5);
            else if (width >= 768) setCols(3);
            else setCols(1); // Single column on mobile for better stability
        };
        updateCols();
        window.addEventListener('resize', updateCols);
        return () => window.removeEventListener('resize', updateCols);
    }, []);

    if (!mounted) return (
        <section id="work" className="relative w-full bg-black pt-32 pb-24 min-h-screen" />
    );

    return (
        <section id="work" className="relative w-full bg-black pt-32 pb-24">
            <div className="w-full">
                <div className="mb-20 px-4 md:px-12 overflow-visible">
                    <div className="flex flex-col gap-0 max-w-full">
                        <div className="text-5xl md:text-8xl lg:text-[9rem] font-siestha font-light text-accent italic tracking-tighter leading-none py-4 mb-0">
                            <RevealHeading preset="A">Selected</RevealHeading>
                            <RevealHeading preset="A" delay={0.1}>
                                <span className="text-transparent stroke-text opacity-30">Works</span>
                            </RevealHeading>
                        </div>
                        <style jsx>{`
                            .stroke-text {
                                -webkit-text-stroke: 1px white;
                            }
                        `}</style>

                    </div>
                </div>
                
                <motion.div 
                    className="w-full px-4 md:px-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    style={{ 
                        columnCount: cols,
                        columnGap: "1.5rem",
                    }}
                >
                    {[...workProjects]
                        .sort((a, b) => {
                            const isAWebsite = a.category?.toLowerCase() === "websites";
                            const isBWebsite = b.category?.toLowerCase() === "websites";
                            if (isAWebsite && !isBWebsite) return -1;
                            if (!isAWebsite && isBWebsite) return 1;
                            return 0;
                        })
                        .filter(project => 
                            project.category?.toLowerCase() === "websites" ||
                            project.type === "video" || 
                            project.brand?.toLowerCase().includes("nexa") || 
                            project.brand?.toLowerCase().includes("define")
                        )
                        .map((project) => (
                        <div key={project.id} className="break-inside-avoid mb-6">
                            <MediaCard 
                                item={project as Project} 
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>

    );
}
