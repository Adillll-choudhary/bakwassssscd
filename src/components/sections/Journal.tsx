"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Newspaper, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const articles = [
  {
    title: "Project GR00T: NVIDIA's Vision for Humanoid Robotics",
    excerpt: "NVIDIA's foundation model for humanoid robots, GR00T, enables machines to understand natural language and emulate movements by observing human actions.",
    category: "Robotics",
    image: "/work/ai content/IMG_5054.webp",
    link: "https://developer.nvidia.com/isaac/gr00t",
    date: "MAR 10, 2026",
    readTime: "12 MIN",
    status: "SYSTEM_ONLINE"
  },
  {
    title: "OpenAI: The Strategic Pivot to Embodied Intelligence",
    excerpt: "Reports indicate OpenAI is actively manufacturing physical components for advanced humanoid systems, moving AGI from digital models to physical forms.",
    category: "AGI",
    image: "/work/ai content/IMG_5056.webp",
    link: "https://www.openai.com",
    date: "MAR 14, 2026",
    readTime: "7 MIN",
    status: "DATA_STABLE"
  },
  {
    title: "MIT HiP: Hierarchical Planning for Complex Tasks",
    excerpt: "MIT CSAIL's new system integrates LLMs and video diffusion to help robots execute complex human-centric tasks with unprecedented efficiency.",
    category: "Research",
    image: "/work/ai content/IMG_5085.webp",
    link: "https://www.csail.mit.edu",
    date: "MAR 05, 2026",
    readTime: "9 MIN",
    status: "UPLINK_LIVE"
  }
];

export default function Journal() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="journal" className="py-24 md:py-44 relative bg-[#08090B] overflow-hidden">
      {/* Editorial Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-[-10%] w-[70%] h-full bg-[#9CAB96]/5 blur-[200px] rounded-full opacity-30" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#5E5A45]/10 blur-[150px] rounded-full opacity-20" />
        
        {/* Ghost Typography Backdrop */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none">
            <h2 className="text-[30vw] font-serif font-black tracking-tighter uppercase leading-none transform -rotate-6">
                ARCHIVE
            </h2>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16 mb-24 md:mb-40">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <h2 className="text-6xl md:text-8xl lg:text-[10vw] font-serif font-bold text-accent leading-[0.85] tracking-tighter mb-10">
              Creative <br />
              <span className="text-accent italic">Archives.</span>
            </h2>
            <p className="text-2xl md:text-3xl text-accent max-w-xl font-serif italic font-light leading-tight tracking-tight">
              A curated anthology of breakthroughs in synthetic intelligence and digital evolution.
            </p>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="hidden lg:flex flex-col items-end gap-2 p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl"
          >
             <div className="text-right">
                <p className="text-5xl font-serif font-black text-accent italic tracking-tighter uppercase">Edition 04</p>
                <p className="text-[10px] font-serif italic text-accent uppercase tracking-[0.4em] mt-2">The Creative Era</p>
             </div>
          </motion.div>
        </div>

        {/* Global Research Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((article, index) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              {/* Card Media */}
              <div className="relative aspect-[16/11] rounded-[2rem] overflow-hidden mb-8 border border-white/5 shadow-2xl">
                <img loading="lazy" 
                  src={article.image} 
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[1.5s] ease-out shadow-inner"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-700" />
                
                {/* HUD Overlay */}
                <div className="absolute top-6 left-6 flex items-center gap-3">
                  <div className="px-4 py-1.5 bg-[#9CAB96] text-black rounded-full text-[9px] font-bold uppercase tracking-widest shadow-xl">
                    {article.category}
                  </div>
                </div>

                {/* Visit Source Link */}
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-accent opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-[#9CAB96] hover:text-black scale-90 group-hover:scale-100"
                >
                  <ArrowUpRight size={22} />
                </a>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-serif italic font-medium text-[#9CAB96] uppercase tracking-[0.2em]">{article.date}</span>
                  <div className="h-[1px] w-8 bg-white/10" />
                  <span className="text-[10px] font-serif italic text-accent uppercase tracking-[0.15em]">{article.readTime}</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-serif font-bold text-accent tracking-tighter leading-none group-hover:text-[#9CAB96] transition-colors duration-500">
                  {article.title}
                </h3>

                <p className="text-accent text-lg font-light leading-relaxed mb-8 group-hover:text-accent transition-colors duration-500 line-clamp-2">
                  {article.excerpt}
                </p>

                <a 
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-[10px] font-serif italic font-bold text-accent uppercase tracking-[0.3em] group/link border-b border-transparent hover:border-[#9CAB96] pb-1 transition-all"
                >
                  Read Full Research <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Intelligence Uplink Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 p-12 md:p-24 bg-[#0A0C0E] rounded-[3rem] border border-white/10 relative overflow-hidden group shadow-[0_0_100px_rgba(0,0,0,0.4)]"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[300px] bg-[#9CAB96]/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <h3 className="text-5xl md:text-8xl font-serif font-bold text-accent leading-none tracking-tighter mb-10">
              Stay <span className="text-[#9CAB96] italic">Synchronized.</span>
            </h3>
            <p className="text-xl text-accent max-w-2xl font-light mb-12 leading-relaxed">
              Join our network to receive peer-reviewed research fragments on High-Fidelity Synthetic Humanity and the emergence of sentient AGI directly in your inbox.
            </p>

            {mounted && (
              <form className="w-full max-w-2xl flex flex-col md:flex-row gap-6">
                <input 
                  type="email" 
                  placeholder="Enter your email address..."
                  className="flex-1 bg-white/[0.03] border border-white/10 rounded-3xl px-10 py-6 md:py-8 text-accent font-serif text-lg placeholder:text-accent focus:outline-none focus:border-[#9CAB96]/40 focus:bg-white/[0.05] transition-all"
                />
                <button className="bg-[#9CAB96] text-black font-black font-serif italic text-[12px] uppercase tracking-[0.3em] px-12 py-6 md:py-0 rounded-3xl hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-2xl">
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
