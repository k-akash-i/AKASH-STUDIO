import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, Download, Share2, Eye, Heart } from 'lucide-react';
import { MASTERPIECES } from '../constants';
import { Masterpiece } from '../types';
import { useWishlist } from '../context/WishlistContext';

interface VaultProps {
  onProposeExchange: (id: string) => void;
  onEnterZenMode: (artwork: Masterpiece) => void;
}

const ProgressiveImage = ({ preview, src, alt }: { preview: string, src: string, alt: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFullLoaded, setIsFullLoaded] = useState(false);

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Preview - High quality optimized image */}
      <img
        src={preview}
        alt={alt}
        className={`w-full h-full object-cover grayscale transition-all duration-700 ${
          isFullLoaded && isHovered ? 'scale-110 opacity-50' : 'opacity-80'
        }`}
        referrerPolicy="no-referrer"
      />
      
      {/* High Detail - Ultra high-res on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            src={src}
            alt={alt}
            onLoad={() => setIsFullLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover grayscale z-10 scale-105"
            referrerPolicy="no-referrer"
          />
        )}
      </AnimatePresence>

      {/* Detail Indicator */}
      <div className={`absolute bottom-4 left-4 z-20 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <span className="text-[8px] uppercase tracking-[0.3em] bg-white text-ink px-2 py-1 font-bold">
          {isFullLoaded ? 'Masterpiece Detail' : 'Loading Detail...'}
        </span>
      </div>

      {/* Loading Indicator for Full Res */}
      {isHovered && !isFullLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-20">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default function Vault({ onProposeExchange, onEnterZenMode }: VaultProps) {
  const [selectedWork, setSelectedWork] = useState<Masterpiece | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleShare = (title: string) => {
    const url = window.location.href;
    navigator.clipboard.writeText(`${url}\nCheck out this masterpiece: ${title}`);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleDownload = (title: string) => {
    // In a real app this would trigger a high-res file download
    alert(`Initiating high-fidelity download for: ${title}`);
  };

  return (
    <div className="pt-40 pb-24 px-6 md:px-24 bg-ink min-h-screen relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12 border-b border-white/5 pb-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-sm uppercase tracking-[0.4em] mb-4 text-parchment/30 font-sans">Repository 01</h2>
              <h1 className="text-6xl md:text-8xl mb-8 leading-[0.9] text-parchment font-serif">The <br /><span className="italic">Vault</span></h1>
            </motion.div>
            <p className="text-lg md:text-xl text-parchment/60 leading-relaxed font-light font-sans">
              Traditional graphite studies archived at 600 DPI. Every line, every smudge of lead is a testament to presence and technical discipline.
            </p>
          </div>
          <div className="flex space-x-12 text-[10px] uppercase tracking-[0.4em] font-medium text-parchment/30">
            <div className="space-y-2">
              <p>Curated</p>
              <p className="text-parchment">VARANASI</p>
            </div>
            <div className="space-y-2">
              <p>Collection</p>
              <p className="text-parchment font-serif italic normal-case tracking-normal text-sm">Studies in Silence</p>
            </div>
          </div>
        </header>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">
          {MASTERPIECES.map((work, index) => (
            <motion.article
              key={work.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
              onClick={() => setSelectedWork(work)}
            >
              <div className="relative aspect-[3/4] bg-white/5 overflow-hidden border border-white/5 group-hover:border-white/20 transition-all duration-700 shadow-2xl">
                <ProgressiveImage
                  preview={work.previewUrl}
                  src={work.imageUrl}
                  alt={work.title}
                />
                
                {/* Meta Indicator */}
                <div className="absolute top-8 left-8 mix-blend-difference flex flex-col gap-4">
                   <span className="text-[9px] uppercase tracking-[0.4em] text-white/50">{index + 1} / {MASTERPIECES.length}</span>
                </div>

                <div className="absolute top-8 right-8 mix-blend-difference">
                   <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(work.id);
                    }}
                    className={`p-2 transition-transform hover:scale-110 ${isInWishlist(work.id) ? 'text-accent' : 'text-white/30 hover:text-white'}`}
                   >
                     <Heart size={18} fill={isInWishlist(work.id) ? "currentColor" : "none"} />
                   </button>
                </div>

                {/* Status Badge */}
                <div className="absolute bottom-8 right-8">
                  <div className="bg-ink/80 backdrop-blur-md px-4 py-2 border border-white/10 rounded-full flex items-center gap-3">
                    <div className={`w-1 h-1 rounded-full ${work.status === 'available' ? 'bg-accent' : 'bg-white/20'}`} />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-mono font-bold text-white/80">
                      {work.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-between items-start">
                <div className="max-w-md">
                  <h3 className="text-3xl md:text-4xl text-parchment mb-4 font-serif italic leading-none group-hover:pl-4 transition-all duration-500">
                    {work.title}
                  </h3>
                  <p className="text-parchment/40 text-sm leading-relaxed max-w-xs">{work.description}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[10px] opacity-20 uppercase tracking-widest">{work.technicalSpecs.split(',')[1]}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Loupe / Zoom Modal */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 overflow-hidden"
          >
             <button
              onClick={() => setSelectedWork(null)}
              className="absolute top-8 right-8 text-parchment hover:rotate-90 transition-transform p-4 z-10"
            >
              <X size={40} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-7xl h-full items-center overflow-auto md:overflow-hidden pb-12 md:pb-0">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="lg:col-span-7 h-[50vh] md:h-full flex items-center justify-center p-4"
              >
                <div className="relative group/zoom cursor-crosshair overflow-hidden rounded-lg shadow-2xl bg-white/5 border border-white/10">
                  <img
                    src={selectedWork.imageUrl}
                    alt={selectedWork.title}
                    className="max-h-[85vh] w-auto grayscale transition-transform duration-300 group-hover/zoom:scale-150"
                    style={{ transformOrigin: 'center center' }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-black/40 text-white/60 text-[10px] px-3 py-1 uppercase tracking-widest pointer-events-none rounded-full border border-white/10">
                    600 DPI Precision Viewer
                  </div>
                </div>
              </motion.div>

              <div className="lg:col-span-5 text-parchment flex flex-col justify-center space-y-12">
                <div>
                  <span className="text-white/40 uppercase tracking-[0.5em] text-xs block mb-4">Masterpiece No. {selectedWork.id}</span>
                  <h2 className="text-5xl md:text-7xl mb-8 leading-tight">{selectedWork.title}</h2>
                  <p className="text-xl text-white/60 leading-relaxed font-light">{selectedWork.description}</p>
                </div>

                <div className="space-y-8 border-t border-white/10 pt-12">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <span className="text-[10px] uppercase tracking-widest text-white/30">Medium</span>
                       <p className="text-sm font-mono">{selectedWork.technicalSpecs.split(',')[0]}</p>
                    </div>
                    <div className="space-y-2">
                       <span className="text-[10px] uppercase tracking-widest text-white/30">Resolution</span>
                       <p className="text-sm font-mono italic">8K (600 DPI Scanned)</p>
                    </div>
                  </div>

                  {selectedWork.status === 'exchanged' ? (
                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                       <span className="text-[10px] uppercase tracking-widest text-white/30 block mb-4 italic">Exchange History</span>
                       <p className="text-lg italic leading-relaxed text-white/80">"{selectedWork.exchangeValue}"</p>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-4">
                      <p className="text-sm text-white/40 uppercase tracking-widest">Available for barter exchange</p>
                      <button 
                        onClick={() => {
                          onProposeExchange(selectedWork.id);
                          setSelectedWork(null);
                        }}
                        className="bg-parchment text-ink px-10 py-5 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-white transition-colors flex items-center justify-center space-x-4 group"
                      >
                        <span>Propose Value Exchange</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex space-x-6 text-white/40 pt-4 relative">
                  <button 
                    onClick={() => toggleWishlist(selectedWork.id)}
                    className={`transition-colors group relative ${isInWishlist(selectedWork.id) ? 'text-accent' : 'hover:text-white'}`}
                  >
                    <Heart size={20} fill={isInWishlist(selectedWork.id) ? "currentColor" : "none"} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-ink text-[10px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-tighter">
                      {isInWishlist(selectedWork.id) ? 'In Wishlist' : 'Add to Wishlist'}
                    </span>
                  </button>
                  <button 
                    onClick={() => {
                      onEnterZenMode(selectedWork);
                      setSelectedWork(null);
                    }}
                    className="hover:text-white transition-colors group relative"
                  >
                    <Eye size={20} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-ink text-[8px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-tighter italic font-bold">Silence (Zen Mode)</span>
                  </button>
                  <button 
                    onClick={() => handleDownload(selectedWork.title)}
                    className="hover:text-white transition-colors group relative"
                  >
                    <Download size={20} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-ink text-[8px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-tighter">Download Study</span>
                  </button>
                  <button 
                    onClick={() => handleShare(selectedWork.title)}
                    className="hover:text-white transition-colors group relative"
                  >
                    <Share2 size={20} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-ink text-[10px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-tighter">
                      {copyFeedback ? 'Link Copied' : 'Share Work'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const ArrowRight = ({ size, className }: { size: number, className: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
