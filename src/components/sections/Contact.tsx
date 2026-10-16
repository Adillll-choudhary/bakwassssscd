"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, FormEvent } from "react";
import { Send, CheckCircle2, Loader2, MessageSquare, Sparkles, MapPin, Mail, Phone, ChevronDown } from "lucide-react";
import RevealHeading from "../ui/RevealHeading";
import RevealText from "../ui/RevealText";

const servicesByCategory = {
    "Creative & Design": ["Graphic Designing", "Branding", "Garments Designing", "YouTube Thumbnails", "Posts & Creatives", "Song Composer"],
    "Technology & Development": ["Web Designs", "Mobile Apps", "AI Automations", "Web Hosting"],
    "Growth & Marketing": ["Marketing Strategy", "Video Editing", "Social Media", "SEO Growth", "Influencer Marketing", "Video Shoots"]
};

export default function Contact() {
    const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [mounted, setMounted] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: ""
    });
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (isDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setFormState("loading");
        
        try {
            const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzdXzUtepW3nBF3F5Gjy7YrnJQe9X1robNBYmRzIH9sHrCu946842BbFLqZ2bohXI1c3A/exec";
            
            const formDataToSubmit = new URLSearchParams();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSubmit.append(key, value);
            });
            formDataToSubmit.append("source", "Section Form");

            await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                body: formDataToSubmit
            });


            setFormState("success");
            setFormData({ name: "", email: "", phone: "", service: "", message: "" });
        } catch (error) {
            // Form submission error
            setFormState("error");
            setTimeout(() => setFormState("idle"), 4000);
        }
    };

    return (
        <section id="contact" className="py-24 md:py-44 relative bg-transparent overflow-hidden">
            {/* Cinematic Background Engine */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[180px] opacity-40" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[140px] opacity-30" />

                {/* Ghost Typography Backdrop */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none">
                    <h2 className="text-[35vw] font-serif font-black tracking-tighter uppercase leading-none transform rotate-12 -translate-y-20">
                        CONNECT
                    </h2>
                </div>

                {/* Tactical Grid */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(circle, #ACC8A2 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-end gap-16 mb-24 md:mb-40">
                    <div className="max-w-4xl w-full">
                        <div className="space-y-10">
                            <motion.h2 
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true, amount: 0.5 }}
                                className="text-[14vw] md:text-[9vw] lg:text-[10rem] font-universo font-black uppercase leading-[0.85] tracking-tighter text-white relative flex flex-col items-start whitespace-nowrap mb-6"
                            >
                                <motion.span variants={{ initial: { y: "50%", opacity: 0 }, animate: { y: 0, opacity: 1 } }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} className="inline-block">START YOUR</motion.span>
                                <motion.span variants={{ initial: { y: "50%", opacity: 0 }, animate: { y: 0, opacity: 1 } }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }} className="relative flex items-center inline-block mt-0 md:-mt-4">
                                    <span className="font-siestha normal-case text-[#3CFF8F] text-[22vw] md:text-[14vw] lg:text-[15rem] leading-none z-10 px-4 py-4 -mx-4 -my-4" style={{ textShadow: "0 4px 40px rgba(60,255,143,0.5)" }}>
                                        Legacy
                                    </span>
                                </motion.span>
                            </motion.h2>
                            <RevealText delay={0.2} className="text-lg md:text-xl text-text-secondary max-w-xl font-light leading-relaxed border-l-2 border-accent/30 pl-6 md:pl-8">
                                We are currently accepting new high-impact partnerships. Secure your digital dominance today.
                            </RevealText>
                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    {/* Left: Contact Credentials */}
                    <div className="lg:col-span-5 space-y-12 md:space-y-16 order-2 lg:order-1">
                        <div className="space-y-8 md:space-y-10">
                            {[
                                { icon: MapPin, label: "Studio Core", value: "Greater Noida, UP, India" },
                                { icon: Mail, label: "Encrypted Mail", value: "hello@coldunestudio.com" },
                                { icon: Phone, label: "Direct Line", value: "+91 9310024091" }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="group flex items-start gap-6 md:gap-8"
                                >
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-black transition-all duration-500">
                                        <item.icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <div className="space-y-1.5 mt-2 overflow-hidden">
                                        <p className="text-xl md:text-2xl font-serif font-bold text-accent tracking-tight break-words">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social HUD */}
                        <div className="pt-12 md:pt-16 border-t border-white/5 flex flex-wrap gap-6 md:gap-8">
                            {[
                                { name: 'Instagram', href: "https://www.instagram.com/iadillchoudhary17?igsh=d212djhra3kzM2Vk&utm_source=qr" },
                                { name: 'Linkedin', href: "https://www.linkedin.com/in/adil-choudhary-831a7035a?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
                                { name: 'Twitter', href: "#" }
                            ].map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-accent uppercase tracking-[0.2em] italic transition-colors hover:text-accent hover:-translate-y-1 transform duration-300"
                                >
                                    {social.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right: Engagement Terminal (Custom Form) */}
                    <div className="lg:col-span-7 w-full order-1 lg:order-2">
                        {mounted ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="relative bg-[#0E1116]/60 border border-white/5 rounded-3xl md:rounded-[4rem] p-6 md:p-12 lg:p-16 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.5)] w-full overflow-hidden"
                            >
                                <AnimatePresence mode="wait">
                                    {formState === "success" ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-8"
                                        >
                                            <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                                <CheckCircle2 size={48} className="animate-in zoom-in duration-500" />
                                            </div>
                                            <div className="space-y-4">
                                                <h3 className="text-3xl md:text-4xl font-serif font-bold text-accent tracking-tight">Message Sent Successfully</h3>
                                                <p className="text-sm md:text-base text-accent tracking-wide max-w-sm mx-auto">Thanks! We'll reach out to you within 24 hours.</p>
                                            </div>
                                            <button
                                                onClick={() => setFormState("idle")}
                                                className="px-8 py-3 rounded-full border border-white/10 text-[10px] text-accent uppercase tracking-[0.3em] hover:text-accent hover:border-accent/40 transition-all font-bold"
                                            >
                                                Send Another Message
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            key="form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onSubmit={handleSubmit}
                                            className="space-y-8"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-3">
                                                    <label className="text-[10px] text-accent uppercase tracking-[0.4em] font-bold block ml-2">Name</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        suppressHydrationWarning
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl md:rounded-3xl p-5 md:p-6 text-accent text-base md:text-lg focus:outline-none focus:border-accent/40 focus:bg-white/[0.05] transition-all placeholder:text-accent"
                                                        placeholder="Alexander Knight"
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[10px] text-accent uppercase tracking-[0.4em] font-bold block ml-2">Email</label>
                                                    <input
                                                        type="email"
                                                        required
                                                        suppressHydrationWarning
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl md:rounded-3xl p-5 md:p-6 text-accent text-base md:text-lg focus:outline-none focus:border-accent/40 focus:bg-white/[0.05] transition-all placeholder:text-accent"
                                                        placeholder="alex@vision.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-3">
                                                    <label className="text-[10px] text-accent uppercase tracking-[0.4em] font-bold block ml-2">Phone</label>
                                                    <input
                                                        type="tel"
                                                        required
                                                        suppressHydrationWarning
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl md:rounded-3xl p-5 md:p-6 text-accent text-base md:text-lg focus:outline-none focus:border-accent/40 focus:bg-white/[0.05] transition-all placeholder:text-accent"
                                                        placeholder="+91 98765 43210"
                                                    />
                                                </div>
                                                <div className="space-y-3 relative" ref={dropdownRef}>
                                                    <label className="text-[10px] text-accent uppercase tracking-[0.4em] font-bold block ml-2">Service</label>
                                                    <div className="relative">
                                                        <button
                                                            type="button"
                                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                            className={`w-full bg-white/[0.03] border ${isDropdownOpen ? 'border-accent/60 bg-white/[0.05]' : 'border-white/5'} rounded-2xl md:rounded-3xl p-5 md:p-6 text-accent text-base md:text-lg text-left flex items-center justify-between transition-all outline-none`}
                                                        >
                                                            <span className={formData.service ? "text-accent" : "text-accent"}>
                                                                {formData.service || "Select a Service"}
                                                            </span>
                                                            <ChevronDown className={`w-5 h-5 text-accent transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                                        </button>

                                                        <AnimatePresence>
                                                            {isDropdownOpen && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                                    className="absolute top-full left-0 w-full mt-3 bg-[#0E1116] border border-white/10 rounded-3xl shadow-2xl z-[100] overflow-hidden backdrop-blur-3xl max-h-80 overflow-y-auto"
                                                                >
                                                                    {Object.entries(servicesByCategory).map(([category, services]) => (
                                                                        <div key={category} className="p-3">
                                                                            <div className="px-4 py-2 text-[10px] font-serif italic text-accent/50 uppercase tracking-widest">{category}</div>
                                                                            {services.map((service) => (
                                                                                <button
                                                                                    key={service}
                                                                                    type="button"
                                                                                    onClick={() => {
                                                                                        setFormData({ ...formData, service });
                                                                                        setIsDropdownOpen(false);
                                                                                    }}
                                                                                    className={`w-full px-5 py-4 rounded-2xl text-left text-base transition-all flex items-center justify-between group
                                                                                        ${formData.service === service 
                                                                                            ? 'bg-[#064E3B] text-accent font-bold shadow-[0_0_20px_rgba(6,78,59,0.3)]' 
                                                                                            : 'text-accent hover:bg-[#064E3B]/40 hover:text-accent'}`}
                                                                                >
                                                                                    {service}
                                                                                    {formData.service === service && <CheckCircle2 size={16} />}
                                                                                </button>
                                                                            ))}
                                                                        </div>
                                                                    ))}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-[10px] text-accent uppercase tracking-[0.4em] font-bold block ml-2">Project Details</label>
                                                <textarea
                                                    required
                                                    rows={5}
                                                    suppressHydrationWarning
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    className="w-full bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-6 md:p-8 text-accent text-base md:text-lg focus:outline-none focus:border-accent/40 focus:bg-white/[0.05] transition-all placeholder:text-accent resize-none"
                                                    placeholder="Briefly describe your digital ambitions..."
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={formState === "loading"}
                                                className="w-full py-6 md:py-8 bg-[#064E3B] text-accent font-black text-[11px] uppercase tracking-[0.4em] rounded-full hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_60px_rgba(6,78,59,0.3)] flex items-center justify-center gap-4 group"
                                            >
                                                {formState === "loading" ? <Loader2 size={24} className="animate-spin" /> : (
                                                    <>
                                                        Send Message
                                                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>
                                            {formState === "error" && (
                                                <p className="text-red-400 text-[10px] font-serif italic uppercase tracking-[0.4em] text-center mt-4">
                                                    Error Sending Message // Please Retry
                                                </p>
                                            )}
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <div className="relative bg-[#0E1116]/60 border border-white/5 rounded-3xl md:rounded-[4rem] p-6 md:p-12 lg:p-16 w-full h-[600px] flex items-center justify-center">
                                <span className="text-accent text-xs uppercase tracking-widest animate-pulse font-bold">Connecting...</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Spacer */}
                <div className="mt-24 md:mt-40" />
            </div>
        </section>
    );
}
