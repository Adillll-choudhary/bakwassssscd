"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import RevealHeading from "../ui/RevealHeading";
import RevealText from "../ui/RevealText";

const workCategories = [
    { 
        name: "SHOOTS", 
        slug: "shoots", 
        oneLiner: "Frames that make brands unforgettable.", 
        image: "/work/shoots/shoots-new-cover.jpg",
        video: null,
    },
    { 
        name: "BRANDING", 
        slug: "branding", 
        oneLiner: "Identity systems for the next era.", 
        image: "/work/branding/branding-new-cover.jpg",
        video: null,
    },
    { 
        name: "EDITS", 
        slug: "edits", 
        oneLiner: "Every second engineered for attention.", 
        image: "/work/videos/shoes.mov",
        video: "/work/videos/shoes.mov",
    },
    { 
        name: "AI CONTENT", 
        slug: "ai-content", 
        oneLiner: "Content that doesn’t look AI. Performs better than humans.", 
        image: "/work/ai content/ai-content-new-cover.jpg",
        video: null,
    },
    { 
        name: "WEBSITES", 
        slug: "websites", 
        oneLiner: "Not websites. Digital first impressions.", 
        image: "/work/branding/branding-hero-final.webp",
        video: null,
    }
];

const OliverParallax = () => {
  const container = useRef(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const col1 = [workCategories[0], workCategories[3], workCategories[6], workCategories[9]].filter(Boolean);
  const col2 = [workCategories[1], workCategories[4], workCategories[7]].filter(Boolean);
  const col3 = [workCategories[2], workCategories[5], workCategories[8]].filter(Boolean);

  // Play videos dynamically based on viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  const renderCard = (cat: any, index: number) => (
    <div 
        key={cat.slug} 
        className="relative w-full aspect-[3/4] bg-[#0A0A0A] rounded-[2rem] overflow-hidden group shadow-2xl border border-white/5"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 40px 100%, 0 calc(100% - 40px))' }}
    >
      <Link href={`/work/${cat.slug}`} className="block w-full h-full relative cursor-pointer group">
        <div className="absolute inset-0 z-0 w-full h-full">
          {cat.video ? (
            <video 
              ref={(el) => { videoRefs.current[index] = el; }}
              muted
              loop
              playsInline
              preload="none"
              poster={cat.image}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            >
              <source src={cat.video} type="video/mp4" />
            </video>
          ) : (
            <img 
              src={cat.image} 
              alt={cat.name} 
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          )}
        </div>

        <div className="absolute inset-0 z-10 w-full h-full p-8 md:p-10 flex flex-col justify-end items-start text-left bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500">
          {/* Ambient Background Glow (Hidden on Mobile) */}
          <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
              <div 
                  className="absolute top-[30%] -right-[10%] w-[50vw] h-[50vw] rounded-[100%] opacity-20 animate-pulse hidden md:block" 
                  style={{ background: 'radial-gradient(circle, rgba(172,200,162,0.5) 0%, transparent 60%)' }}
              />
              <div 
                  className="absolute -bottom-[20%] -left-[10%] w-[40vw] h-[40vw] rounded-[100%] opacity-10 hidden md:block" 
                  style={{ background: 'radial-gradient(circle, rgba(172,200,162,0.5) 0%, transparent 60%)' }}
              />
          </div>
          <RevealHeading preset="B" className="mb-3" innerClassName="text-4xl md:text-5xl lg:text-6xl font-light font-siestha italic capitalize tracking-[-0.02em] leading-normal py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#A8BEA4] via-[#00ff88] to-[#A8BEA4] drop-shadow-[0_0_20px_rgba(0,255,136,0.4)] px-4">
              {cat.name.toLowerCase()}
          </RevealHeading>
          <RevealText delay={0.2} className="max-w-xs text-accent text-sm md:text-base font-medium italic leading-tight tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
              {cat.oneLiner}
          </RevealText>
        </div>

        <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black">
              <ArrowUpRight size={24} strokeWidth={3} />
          </div>
        </div>
      </Link>
    </div>
  );

  return (
    <div className="relative w-full overflow-visible flex justify-center py-20 lg:py-32" ref={container}>
      <div className="w-full max-w-[1600px] px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {/* Column 1 */}
        <motion.div style={{ y: y1 }} className="flex flex-col gap-6 md:gap-10 mt-10 md:mt-20">
          {col1.map((cat, i) => renderCard(cat, i))}
        </motion.div>
        {/* Column 2 */}
        <motion.div style={{ y: y2 }} className="flex flex-col gap-6 md:gap-10 -mt-10 md:-mt-32">
          {col2.map((cat, i) => renderCard(cat, i + 10))}
        </motion.div>
        {/* Column 3 */}
        <motion.div style={{ y: y3 }} className="flex flex-col gap-6 md:gap-10 mt-20 lg:mt-64 hidden lg:flex">
          {col3.map((cat, i) => renderCard(cat, i + 20))}
        </motion.div>
      </div>
    </div>
  );
};

export default function Spectrum() {
    return (
        <section id="spectrum" className="bg-transparent w-full">
            <div className="w-full pt-32 px-4 md:px-10">
                <header className="mb-12 text-center md:text-left max-w-[1400px] mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex flex-col items-start mb-8 gap-2 md:gap-6 whitespace-nowrap md:-ml-[15%]"
                    >
                        <span className="text-[11vw] md:text-[8rem] lg:text-[11rem] font-universo font-black uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] inline-block leading-[0.8]">
                            The Art Of
                        </span>
                        <div className="flex items-end justify-start gap-4 md:gap-8 -mt-2 md:-mt-6 lg:-mt-8">
                            <span className="text-[11vw] md:text-[8rem] lg:text-[11rem] font-universo font-black uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] inline-block leading-[0.8]">
                                Turning Ideas
                            </span>
                        </div>
                        <div className="flex items-end justify-start gap-4 md:gap-8 -mt-4 md:-mt-10 lg:-mt-14">
                            <span className="text-[11vw] md:text-[8rem] lg:text-[11rem] font-universo font-black uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] inline-block leading-[0.8]">
                                Into
                            </span>
                            <span className="text-[16vw] md:text-[8rem] lg:text-[11rem] font-siestha normal-case text-[#3CFF8F] -rotate-[8deg] inline-block px-4 py-4 -mx-4 -my-4 leading-none md:-translate-y-4" style={{ textShadow: "0 4px 30px rgba(60,255,143,0.4)" }}>
                                Impact
                            </span>
                        </div>
                    </motion.div>
                    <RevealText
                        delay={0.3}
                        className="max-w-xl text-[#A8BEA4]/50 text-xl md:text-2xl font-medium tracking-tight mx-auto md:mx-0"
                    >
                        We don't just provide services. We engineer digital dominance through a relentless blend of technology and aesthetic precision.
                    </RevealText>
                </header>
            </div>

            <OliverParallax />
            
            <div className="w-full pb-32 flex justify-center mt-12">
                <Link href="/case-studies">
                    <button className="px-12 py-5 rounded-full bg-accent text-[#030305] font-black uppercase tracking-[0.2em] hover:bg-white transition-colors duration-300 shadow-xl text-sm">
                        View Success Stories
                    </button>
                </Link>
            </div>
        </section>
    );
}
