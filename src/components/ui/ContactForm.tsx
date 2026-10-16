"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle2, ChevronDown } from "lucide-react";

interface ContactFormProps {
    isOpen: boolean;
    onClose: () => void;
}

const servicesByCategory = {
    "Creative & Design": ["Graphic Designing", "Branding", "Garments Designing", "YouTube Thumbnails", "Posts & Creatives", "Song Composer"],
    "Technology & Development": ["Web Designs", "Mobile Apps", "AI Automations", "Web Hosting"],
    "Growth & Marketing": ["Marketing Strategy", "Video Editing", "Social Media", "SEO Growth", "Influencer Marketing", "Video Shoots"]
};

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzdXzUtepW3nBF3F5Gjy7YrnJQe9X1robNBYmRzIH9sHrCu946842BbFLqZ2bohXI1c3A/exec";
            
            const formDataToSubmit = new URLSearchParams();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSubmit.append(key, value);
            });
            formDataToSubmit.append("source", "Modal Form");

            await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                body: formDataToSubmit
            });

            setSubmitStatus("success");
            setFormData({ name: "", email: "", phone: "", service: "", message: "" });
            
            setTimeout(() => {
                onClose();
                setTimeout(() => setSubmitStatus("idle"), 500);
            }, 2500);

        } catch (error) {
            console.error("Submission error:", error);
            setSubmitStatus("error");
            setTimeout(() => setSubmitStatus("idle"), 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Dark Overlay Background */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[9999]"
                    />

                    {/* Centered Modal Popup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
                    >
                        <div className="relative w-full max-w-xl bg-[#0B0D10] border border-white/5 rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden">
                            
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(172,200,162,1) 0%, transparent 70%)' }} />
                            <div className="absolute bottom-0 left-0 w-48 h-48 opacity-[0.02] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, transparent 70%)' }} />

                            <div className="relative p-8 md:p-12">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-10">
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-accent tracking-tight leading-none">
                                            Start a <span className="text-accent italic">Project</span>
                                        </h2>
                                        <p className="text-sm text-accent italic mt-2">
                                            Let's start something great.
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center group"
                                    >
                                        <X className="w-5 h-5 text-accent group-hover:text-accent transition-colors" />
                                    </button>
                                </div>

                                <AnimatePresence mode="wait">
                                    {submitStatus === "success" ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="py-12 flex flex-col items-center justify-center text-center space-y-6"
                                        >
                                            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                                <CheckCircle2 size={40} className="animate-in zoom-in duration-500" />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-2xl font-serif font-bold text-accent tracking-tight">Message Sent Successfully</h3>
                                                <p className="text-sm text-accent tracking-wide max-w-[280px]">Thanks! We'll get back to you shortly.</p>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.form 
                                            key="form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onSubmit={handleSubmit} 
                                            className="space-y-5"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] text-accent uppercase tracking-widest pl-1 font-bold">Name</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        suppressHydrationWarning
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full px-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-accent text-sm md:text-base placeholder:text-accent focus:border-accent/40 focus:bg-white/[0.06] transition-all outline-none"
                                                        placeholder="Alexander Knight"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] text-accent uppercase tracking-widest pl-1 font-bold">Email</label>
                                                    <input
                                                        type="email"
                                                        required
                                                        suppressHydrationWarning
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        className="w-full px-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-accent text-sm md:text-base placeholder:text-accent focus:border-accent/40 focus:bg-white/[0.06] transition-all outline-none"
                                                        placeholder="alex@vision.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] text-accent uppercase tracking-widest pl-1 font-bold">Phone</label>
                                                    <input
                                                        type="tel"
                                                        required
                                                        suppressHydrationWarning
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        className="w-full px-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-accent text-sm md:text-base placeholder:text-accent focus:border-accent/40 focus:bg-white/[0.06] transition-all outline-none"
                                                        placeholder="+91 98765 43210"
                                                    />
                                                </div>
                                                <div className="space-y-2 relative" ref={dropdownRef}>
                                                    <label className="text-[10px] text-accent uppercase tracking-widest pl-1 font-bold">Service</label>
                                                    <div className="relative">
                                                        <button
                                                            type="button"
                                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                            className={`w-full px-6 py-4 bg-white/[0.03] border ${isDropdownOpen ? 'border-accent/60 bg-white/[0.08]' : 'border-white/5'} rounded-2xl text-accent text-sm md:text-base text-left flex items-center justify-between transition-all outline-none`}
                                                        >
                                                            <span className={formData.service ? "text-accent" : "text-accent"}>
                                                                {formData.service || "Select a Service"}
                                                            </span>
                                                            <ChevronDown className={`w-4 h-4 text-accent transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                                        </button>

                                                        <AnimatePresence>
                                                            {isDropdownOpen && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                                    className="absolute top-full left-0 w-full mt-2 bg-[#0B0D10] border border-white/10 rounded-2xl shadow-2xl z-[10001] overflow-hidden backdrop-blur-3xl max-h-60 overflow-y-auto"
                                                                >
                                                                    {Object.entries(servicesByCategory).map(([category, services]) => (
                                                                        <div key={category} className="p-2">
                                                                            <div className="px-3 py-2 text-[10px] font-mono text-accent/50 uppercase tracking-widest">{category}</div>
                                                                            {services.map((service) => (
                                                                                <button
                                                                                    key={service}
                                                                                    type="button"
                                                                                    onClick={() => {
                                                                                        setFormData({ ...formData, service });
                                                                                        setIsDropdownOpen(false);
                                                                                    }}
                                                                                    className={`w-full px-4 py-3 rounded-xl text-left text-sm transition-all flex items-center justify-between group
                                                                                        ${formData.service === service 
                                                                                            ? 'bg-[#064E3B] text-accent font-bold shadow-[0_0_20px_rgba(6,78,59,0.3)]' 
                                                                                            : 'text-accent hover:bg-[#064E3B]/40 hover:text-accent'}`}
                                                                                >
                                                                                    {service}
                                                                                    {formData.service === service && <CheckCircle2 size={14} />}
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

                                            <div className="space-y-2">
                                                <label className="text-[10px] text-accent uppercase tracking-widest pl-1 font-bold">Project Details</label>
                                                <textarea
                                                    rows={3}
                                                    suppressHydrationWarning
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    className="w-full px-6 py-4 bg-white/[0.03] border border-white/5 rounded-[2rem] text-accent text-sm md:text-base placeholder:text-accent focus:border-accent/40 focus:bg-white/[0.06] transition-all outline-none resize-none"
                                                    placeholder="Briefly describe your digital ambitions..."
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full px-8 py-5 mt-4 bg-[#064E3B] hover:bg-[#065F46] disabled:bg-[#064E3B]/30 text-accent font-mono font-bold text-xs uppercase tracking-[0.3em] rounded-full transition-all flex items-center justify-center gap-3 group shadow-[0_10px_30px_rgba(6,78,59,0.3)]"
                                            >
                                                {isSubmitting ? (
                                                    <Loader2 size={18} className="animate-spin" />
                                                ) : (
                                                    <>
                                                        Send Message
                                                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>

                                            {submitStatus === "error" && (
                                                <p className="text-red-400 text-[10px] uppercase tracking-widest text-center mt-4 font-bold">
                                                    Error Sending Message // Please Retry
                                                </p>
                                            )}
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
