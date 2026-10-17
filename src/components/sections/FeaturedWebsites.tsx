"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Project } from "@/data/work";
import { ArrowUpRight, X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, MotionValue } from "framer-motion";
import ParticleLinesScene from "@/components/canvas/ParticleLinesScene";

interface FeaturedWebsitesProps {
    projects: Project[];
}

// Fallback curated web showcases if projects array is small
const DEFAULT_WEB_PROJECTS: Partial<Project>[] = [
    {
        id: 7001,
        title: "Outland Architecture",
        brand: "Outland",
        file: "websites/outlandd.png",
        link: "https://www.outland.pt/",
        category: "Architecture & Quiet Luxury",
        description: "A high-end architectural platform redefined for the modern wanderer, emphasizing prefab housing into the realm of Quiet Luxury."
    },
    {
        id: 7002,
        title: "Isharya Luxury Jewelry",
        brand: "Isharya",
        file: "websites/isharya-cover.jpg",
        link: "https://isharya.com/",
        category: "E-Commerce & High Fashion",
        description: "Modern Indian design meets bold luxury with luminous UI anchors and high-vibrancy product manifestation."
    },
    {
        id: 7011,
        title: "Creet Nitro Cold Brew",
        brand: "Creet",
        file: "websites/creaaaattttt.png",
        link: "https://stupendous-otter-b1cc05.netlify.app/",
        category: "Beverage & Consumer Goods",
        description: "Kinetic visual architecture designed for next-generation craft nitro cold brew experiences."
    },
    {
        id: 7007,
        title: "UMA Solar",
        brand: "UMA Solar",
        file: "websites/umaaaaa solar.png",
        link: "https://cool-souffle-79dadb.netlify.app/",
        category: "CleanTech & Energy",
        description: "Cutting-edge digital architecture and interactive WebGL experiences engineered for solar transition."
    },
    {
        id: 7006,
        title: "Leetcore",
        brand: "Leetcore",
        file: "websites/leeeeeeeeeeettttttttttcoree.png",
        link: "https://rococo-nasturtium-660c33.netlify.app/",
        category: "Developer Infrastructure",
        description: "High-performance developer tooling platform crafted with brutalist precision and instant responsiveness."
    },
    {
        id: 7010,
        title: "FOU Italian Dining",
        brand: "FOU",
        file: "websites/fou-cover.jpg",
        link: "https://splendid-piroshki-fc5e2b.netlify.app/",
        category: "Gastronomy & Hospitality",
        description: "Sensory gastronomy portal celebrating authentic artisanal Italian dining with immersive storytelling."
    },
    {
        id: 7014,
        title: "Kohsar Kashmiri Craft",
        brand: "Kohsar",
        file: "websites/kohsar-cover.jpg",
        link: "https://heartfelt-maamoul-a20330.netlify.app/",
        category: "Heritage & Artisanal Craft",
        description: "Timeless Kashmiri artisanal textiles and craft preserved through editorial-grade visual design."
    },
    {
        id: 7012,
        title: "Rivaaz Couture",
        brand: "Rivaaz",
        file: "websites/rivaaz-cover.jpg",
        link: "https://storied-semifreddo-0e64a6.netlify.app/",
        category: "Couture & Festive Apparel",
        description: "Contemporary festive bridal couture presented through fluid motion systems and rich visual physics."
    },
    {
        id: 7013,
        title: "Silver House Jewellers",
        brand: "Silver House",
        file: "websites/silverhouse-cover.jpg",
        link: "https://lambent-queijadas-fa2ddb.netlify.app/",
        category: "Fine Silver Jewelry",
        description: "Heritage silver crafted for modern royalty, pairing classic legacy with minimalist typography."
    },
    {
        id: 7015,
        title: "Aurus Life",
        brand: "Aurus Life",
        file: "websites/aurus-life-only.jpg",
        link: "https://auruslifee.netlify.app/",
        category: "Real Estate & Living",
        description: "A high-performance digital infrastructure project engineered with clean lines and immersive transitions."
    },
    {
        id: 7019,
        title: "Aurus Life Luxury",
        brand: "Aurus Life Luxury",
        file: "websites/aurus-life-luxury-cover.jpg",
        link: "https://gentle-puffpuff-76aad5.netlify.app/",
        category: "Ultra-Luxury Real Estate",
        description: "Bespoke digital residence platform tailored for high-net-worth real estate developments."
    },
    {
        id: 7018,
        title: "Future Digital",
        brand: "Future",
        file: "websites/future-cover.jpg",
        link: "https://6aaaf08ffa78fb4a8dfdc114--creative-capybara-bbc696.netlify.app/",
        category: "Creative Technology",
        description: "Exploration of spatial web computing, speculative interfaces, and computational aesthetics."
    },
    {
        id: 7020,
        title: "Daylight Capital",
        brand: "Daylight",
        file: "websites/daylight-capital-cover.webp",
        link: "https://daylight-capital.netlify.app/",
        category: "Venture & Growth",
        description: "Private investment firm platform engineered with restrained prestige and institutional weight."
    },
    {
        id: 7000,
        title: "Wearth Living",
        brand: "Wearth",
        file: "websites/wearth-living-cover.jpg",
        link: "https://wearth-living.com/",
        category: "Eco-Luxury & Wellness",
        description: "Mindful living and sustainable luxury catalog with organic textures and zero-friction navigation."
    }
];

function Card3D({
    project,
    index,
    centerIndex,
    isActive,
    onSelect
}: {
    project: Project;
    index: number;
    centerIndex: MotionValue<number>;
    isActive: boolean;
    onSelect: () => void;
}) {
    // Relative distance in card slots from the center of the viewport
    const distFromCenter = useTransform(centerIndex, (c: number) => index - c);

    // Horizontal positioning along the expanded sweeping amphitheater circle with spacious card gaps
    const x = useTransform(distFromCenter, d => {
        const sign = d < 0 ? -1 : 1;
        const absD = Math.abs(d);
        return sign * (absD * 280 + Math.pow(absD, 1.5) * 60);
    });

    // 3D rotation: cards angle progressively inward like a concave amphitheater cyclorama
    // Left cards (d < 0) rotate positive (+Y, facing center/right); Right cards (d > 0) rotate negative (-Y, facing center/left)
    const rotateY = useTransform(distFromCenter, d => {
        const clamped = Math.max(-4, Math.min(4, d));
        return -clamped * 11.5;
    });

    // Scale expands dramatically outward: center card is larger (0.88), outer cards expand up to ~1.40
    const scale = useTransform(distFromCenter, d => {
        const absD = Math.abs(d);
        return 0.88 + Math.pow(Math.min(3.6, absD) / 3, 1.45) * 0.52;
    });

    // Z-depth: center card sits back in depth (-120px), outer cards curve forward toward viewer (+145px)
    const z = useTransform(distFromCenter, d => {
        const absD = Math.abs(d);
        return -120 + Math.pow(Math.min(3.6, absD) / 3, 1.4) * 265;
    });

    // Center cards vertically along the horizon so taller outer cards expand symmetrically up and down
    const y = useTransform(distFromCenter, () => 0);

    // Opacity: full visibility across the prominent amphitheater cards, smoothly bleeding at extreme edges
    const opacity = useTransform(distFromCenter, d => {
        const absD = Math.abs(d);
        if (absD > 4.6) return 0;
        if (absD > 3.6) return Math.max(0, 4.6 - absD);
        return 1;
    });

    const imgPath = project.thumbnail 
        ? (project.thumbnail.startsWith('/') ? project.thumbnail : `/work/${project.thumbnail}`)
        : (project.file.startsWith('/') ? project.file : `/work/${project.file}`);

    return (
        <motion.div
            style={{
                x,
                y,
                z,
                rotateY,
                scale,
                opacity,
                transformStyle: "preserve-3d",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none group z-30"
        >
            <a 
                href={project.link || "#"}
                target={project.link ? "_blank" : undefined}
                rel="noopener noreferrer"
                onClick={(e) => {
                    onSelect();
                    if (!project.link) e.preventDefault();
                }}
                title={`Visit ${project.title}`}
                className={`block relative w-[210px] sm:w-[250px] md:w-[285px] aspect-[3/4.2] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#121212] transition-all duration-300 cursor-pointer ${
                    isActive 
                        ? "ring-2 ring-[#3CFF8F] shadow-[0_0_35px_rgba(60,255,143,0.35)]" 
                        : "shadow-[0_20px_50px_rgba(0,0,0,0.45)] hover:border-[#3CFF8F]/50 hover:shadow-[0_0_25px_rgba(60,255,143,0.2)]"
                }`}
            >
                <img
                    src={encodeURI(imgPath)}
                    alt={project.title}
                    className="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-700 ease-out"
                    decoding="async"
                    loading="eager"
                    style={{
                        imageRendering: "-webkit-optimize-contrast",
                        WebkitBackfaceVisibility: "hidden",
                        backfaceVisibility: "hidden",
                        transform: "translateZ(0)"
                    }}
                />

                {/* Hover Quick Visit Pill Indicator */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 pointer-events-none">
                    <span className="bg-white/95 text-black px-3.5 py-1.5 rounded-full font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-2xl group-hover:scale-110 transition-transform">
                        <span>Visit Site</span>
                        <ArrowUpRight size={13} className="stroke-[2.5]" />
                    </span>
                </div>

                {/* Bottom Card Title Overlay: Tight gradient at base only for text readability without obscuring image */}
                <div className="absolute bottom-0 inset-x-0 h-16 p-3 sm:p-3.5 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end text-white pointer-events-none">
                    <h3 className="text-xs font-universo font-black uppercase tracking-tight text-white line-clamp-1 drop-shadow-md">
                        {project.title}
                    </h3>
                </div>
            </a>
        </motion.div>
    );
}

export default function FeaturedWebsites({ projects }: FeaturedWebsitesProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);

    // Merge or fallback to ensure a rich panoramic ribbon of 13+ cards
    const displayProjects: Project[] = (projects && projects.length >= 7) 
        ? projects 
        : (DEFAULT_WEB_PROJECTS as Project[]);

    const totalCards = displayProjects.length;

    // Track scroll across container
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // Spring smoothed scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 90,
        damping: 24,
        mass: 0.6
    });

    // Center index moves through all projects sequentially from 0 to totalCards - 1
    const centerIndex = useTransform(
        smoothProgress,
        [0, 1],
        [0, Math.max(0, totalCards - 1)],
        { clamp: true }
    );

    // Update active project index whenever center card changes
    useEffect(() => {
        return centerIndex.on("change", (latest) => {
            const rounded = Math.round(latest);
            const clamped = Math.max(0, Math.min(totalCards - 1, rounded));
            setActiveIndex(clamped);
        });
    }, [centerIndex, totalCards]);

    const activeProject = displayProjects[activeIndex] || displayProjects[0];

    // Smooth scroll to a specific card index (supports 0 through totalCards - 1)
    const scrollToCard = useCallback((index: number) => {
        if (!sectionRef.current) return;
        const maxIndex = Math.max(1, totalCards - 1);
        const targetProgress = Math.max(0, Math.min(1, index / maxIndex));
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollDistance = sectionRef.current.offsetHeight - window.innerHeight;
        const targetY = window.scrollY + rect.top + (targetProgress * scrollDistance);
        window.scrollTo({ top: targetY, behavior: "smooth" });
    }, [totalCards]);

    return (
        <section
            id="websites"
            ref={sectionRef}
            className="relative bg-black w-full text-white selection:bg-[#3CFF8F] selection:text-black"
            style={{ height: "480vh" }}
        >
            {/* Sticky Viewport Container */}
            <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden flex flex-col justify-between pt-24 pb-4 px-4 md:pt-28 md:pb-6 md:px-8 select-none">
                
                {/* Background: Flowing Lines of Particles with Bloom (Exact Services Section Physics & Dynamic Theme Colors) */}
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none bg-black">
                    <ParticleLinesScene activeProject={activeProject} />
                </div>

                {/* 2. HEADLINE SECTION: FROM "WHAT IF?" TO "THAT'S IT." */}
                <div className="relative z-30 pt-1 md:pt-3 text-center pointer-events-none px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center justify-center max-w-4xl mx-auto"
                    >
                        <h1 className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-universo font-black uppercase text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] text-[clamp(1.75rem,3.6vw,3.4rem)] leading-[0.98] tracking-tight">
                            <span>FROM &ldquo;WHAT IF?&rdquo; TO</span>
                            <span 
                                className="font-siestha normal-case font-light text-[#3CFF8F] -rotate-[5deg] inline-block leading-none text-[1.18em] -translate-y-0.5 whitespace-nowrap"
                                style={{ textShadow: "0 0 30px rgba(60,255,143,0.7), 0 0 15px rgba(60,255,143,0.4)" }}
                            >
                                &ldquo;that&apos;s it.&rdquo;
                            </span>
                        </h1>
                        <p className="mt-1.5 md:mt-2 text-xs sm:text-sm md:text-[15px] text-white/65 font-sans font-light tracking-wide max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                            A look at the ideas, designs, and digital experiences we&apos;ve created with brands.
                        </p>
                    </motion.div>
                </div>

                {/* 3. 3D CURVED CAROUSEL RIBBON (AMPHITHEATER CYLINDER WRAP) */}
                <div 
                    className="relative w-full h-[430px] sm:h-[485px] md:h-[535px] flex items-center justify-center my-auto pointer-events-auto overflow-visible"
                    style={{
                        perspective: "1100px",
                        perspectiveOrigin: "50% 50%",
                        transformStyle: "preserve-3d"
                    }}
                >
                    {/* Left Carousel Arrow Button */}
                    <button
                        onClick={() => {
                            const prev = Math.max(0, activeIndex - 1);
                            scrollToCard(prev);
                        }}
                        disabled={activeIndex === 0}
                        aria-label="Previous Website"
                        className={`absolute left-2 sm:left-4 md:left-6 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-xl border border-white/15 hover:border-[#3CFF8F]/60 flex items-center justify-center text-white hover:text-[#3CFF8F] shadow-[0_8px_30px_rgba(0,0,0,0.8)] transition-all active:scale-90 ${
                            activeIndex === 0 ? "opacity-25 cursor-not-allowed" : "opacity-80 hover:opacity-100 hover:scale-105"
                        }`}
                    >
                        <ChevronLeft size={20} className="stroke-[2.5] -translate-x-0.5" />
                    </button>

                    {/* Right Carousel Arrow Button */}
                    <button
                        onClick={() => {
                            const next = Math.min(totalCards - 1, activeIndex + 1);
                            scrollToCard(next);
                        }}
                        disabled={activeIndex >= totalCards - 1}
                        aria-label="Next Website"
                        className={`absolute right-2 sm:right-4 md:right-6 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-xl border border-white/15 hover:border-[#3CFF8F]/60 flex items-center justify-center text-white hover:text-[#3CFF8F] shadow-[0_8px_30px_rgba(0,0,0,0.8)] transition-all active:scale-90 ${
                            activeIndex >= totalCards - 1 ? "opacity-25 cursor-not-allowed" : "opacity-80 hover:opacity-100 hover:scale-105"
                        }`}
                    >
                        <ChevronRight size={20} className="stroke-[2.5] translate-x-0.5" />
                    </button>

                    {displayProjects.map((project, i) => (
                        <Card3D
                            key={project.id || i}
                            project={project}
                            index={i}
                            centerIndex={centerIndex}
                            isActive={i === activeIndex}
                            onSelect={() => scrollToCard(i)}
                        />
                    ))}
                </div>



                {/* 5. FLOATING INTERACTIVE CONTROLS */}
                <div className="relative z-40 w-full flex items-end justify-between pointer-events-none pt-2">
                    {/* Bottom-Left: "↗ Visit site" Glass Pill */}
                    <div className="pointer-events-auto">
                        <a
                            href={activeProject?.link || "#"}
                            target={activeProject?.link ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="bg-black/60 hover:bg-black/85 backdrop-blur-xl border border-white/15 hover:border-[#3CFF8F]/50 px-5 sm:px-6 py-3 rounded-2xl flex items-center gap-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all group active:scale-95"
                        >
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#3CFF8F]/20 transition-all">
                                <ArrowUpRight size={17} className="text-white group-hover:text-[#3CFF8F] stroke-[2.5] transition-colors" />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-xs font-universo font-black uppercase tracking-wider text-white group-hover:text-[#3CFF8F] transition-colors flex items-center gap-1.5">
                                    Visit site
                                </span>
                                <span className="text-[10px] text-white/60 font-medium tracking-wide truncate max-w-[140px] sm:max-w-[180px]">
                                    {activeProject?.brand || activeProject?.title || "Explore Project"}
                                </span>
                            </div>
                        </a>
                    </div>

                    {/* Bottom-Right Spacer */}
                    <div className="w-12 pointer-events-none" />
                </div>
            </div>

            {/* 6. SPOTLIGHT FULLSCREEN MODAL */}
            <AnimatePresence>
                {isSpotlightOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0"
                            onClick={() => setIsSpotlightOpen(false)}
                        />

                        <motion.div
                            initial={{ scale: 0.92, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.92, opacity: 0, y: 20 }}
                            className="relative z-10 bg-[#121212] border border-white/10 rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl text-white flex flex-col md:flex-row max-h-[85vh]"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsSpotlightOpen(false)}
                                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-white/20 flex items-center justify-center text-white transition-all"
                            >
                                <X size={20} />
                            </button>

                            {/* Modal Left Preview Image */}
                            <div className="w-full md:w-3/5 h-64 md:h-auto bg-black relative flex items-center justify-center overflow-hidden">
                                <img
                                    src={encodeURI(activeProject?.thumbnail ? `/work/${activeProject.thumbnail}` : `/work/${activeProject.file}`)}
                                    alt={activeProject.title}
                                    className="w-full h-full object-cover"
                                    decoding="async"
                                    loading="eager"
                                    style={{
                                        imageRendering: "-webkit-optimize-contrast"
                                    }}
                                />
                            </div>

                            {/* Modal Right Details */}
                            <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between bg-[#141414] border-t md:border-t-0 md:border-l border-white/10">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#3CFF8F]">
                                        {activeProject.brand || "Coldune Studio"}
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-universo font-black uppercase tracking-tight text-white mt-1 mb-3">
                                        {activeProject.title}
                                    </h2>
                                    <p className="text-sm text-white/70 leading-relaxed font-sans mb-6">
                                        {activeProject.description || "A bespoke digital experience developed with modern performance standards and fluid interaction design."}
                                    </p>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-white/10">
                                    {activeProject.link && (
                                        <a
                                            href={activeProject.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-3 px-5 rounded-xl bg-[#3CFF8F] hover:bg-[#2EE67E] text-black font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(60,255,143,0.3)] active:scale-98"
                                        >
                                            <span>Visit Live Website</span>
                                            <ExternalLink size={16} />
                                        </a>
                                    )}

                                    {/* Navigation Between Projects */}
                                    <div className="flex justify-between items-center text-xs text-white/60 pt-2">
                                        <button
                                            onClick={() => {
                                                const prev = activeIndex > 0 ? activeIndex - 1 : totalCards - 1;
                                                setActiveIndex(prev);
                                                scrollToCard(prev);
                                            }}
                                            className="flex items-center gap-1 hover:text-white transition-colors"
                                        >
                                            <ChevronLeft size={16} /> Previous
                                        </button>
                                        <span className="font-mono text-[11px] text-white/40">
                                            {activeIndex + 1} / {totalCards}
                                        </span>
                                        <button
                                            onClick={() => {
                                                const next = activeIndex < totalCards - 1 ? activeIndex + 1 : 0;
                                                setActiveIndex(next);
                                                scrollToCard(next);
                                            }}
                                            className="flex items-center gap-1 hover:text-white transition-colors"
                                        >
                                            Next <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
