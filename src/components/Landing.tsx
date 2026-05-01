import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface LandingProps {
  onEnter: () => void;
}

export default function Landing({ onEnter }: LandingProps) {
  return (
    <section className="h-screen w-full flex flex-col justify-center items-center px-8 bg-[#080808] relative overflow-hidden">
      {/* Background Subtle Atmosphere */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 3 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <img
          src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2000&auto=format&fit=crop"
          alt="Atmosphere"
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Threshold Information (Design Layout) */}
      <div className="absolute top-10 left-10 md:top-24 md:left-24 z-10 flex flex-col mix-blend-difference pointer-events-none">
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 0.4, x: 0 }}
          className="text-[10px] tracking-[0.4em] uppercase mb-2 text-parchment"
        >
          Traditional Artist & Coder
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-light tracking-tighter leading-none text-parchment"
        >
          AKASH<span className="opacity-30">.STUDIO</span>
        </motion.h1>
      </div>

      <div className="absolute top-10 right-10 md:top-24 md:right-24 z-10 hidden md:block mix-blend-difference pointer-events-none">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          className="text-[10px] tracking-[0.3em] uppercase text-parchment"
        >
          Established in Varanasi
        </motion.span>
      </div>

      {/* Central Piece Section */}
      <div className="relative group scale-75 md:scale-100 lg:scale-110">
        {/* Main Artwork Frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-[320px] h-[440px] md:w-[420px] md:h-[560px] bg-[#111] border border-white/5 relative overflow-hidden shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1200&auto=format&fit=crop"
            alt="Hero Study"
            className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 transition-transform duration-3000"
            referrerPolicy="no-referrer"
          />
          {/* Subtle Paper Texture Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        </motion.div>

        {/* Floating Captions */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute -right-12 md:-right-32 top-12 text-left md:text-right mix-blend-difference pointer-events-none"
        >
          <h2 className="text-4xl md:text-[54px] font-serif italic font-light leading-none mb-4 text-parchment">
            The Silent<br />Witness
          </h2>
          <p className="text-[10px] tracking-[0.2em] uppercase opacity-50 text-parchment">
            Graphite on Paper<br />Anatomical Precision
          </p>
        </motion.div>

        {/* 600 DPI Loupe Simulation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute -left-12 -bottom-10 w-40 h-40 md:w-48 md:h-48 rounded-full border border-white/20 bg-[#080808] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center z-20 pointer-events-none"
        >
          <div className="absolute inset-0 bg-[#151515] opacity-50" />
          <div className="relative text-center">
            <p className="text-[8px] tracking-[0.4em] uppercase opacity-40 mb-1">Threshold</p>
            <p className="text-[14px] font-serif italic text-white/80 tracking-wide leading-none">600 DPI Scan</p>
            <div className="mt-4 flex justify-center opacity-30">
               <svg width="40" height="40" viewBox="0 0 40 40">
                  <path d="M0 20 H40 M20 0 V40" stroke="white" strokeWidth="0.5" />
                  <circle cx="20" cy="20" r="12" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
               </svg>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Footer */}
      <div className="absolute bottom-10 left-0 w-full px-10 md:px-24 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        <div className="flex gap-6 items-center mix-blend-difference">
          <div className="w-12 h-[1px] bg-white/20"></div>
          <p className="text-[11px] tracking-[0.2em] uppercase font-light text-parchment">
            A DIGITAL <span className="font-bold opacity-100">MUSEUM</span> OF PRESENCE
          </p>
        </div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          onClick={onEnter}
          className="px-12 py-4 border border-white/10 hover:border-white/40 hover:bg-white hover:text-black transition-all duration-700 text-[10px] tracking-[0.4em] uppercase bg-white/5 backdrop-blur-md rounded-full shadow-2xl group"
        >
          <span className="flex items-center gap-4">
            Enter the Vault
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </motion.button>
      </div>
    </section>
  );
}
