/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Masterpiece } from '../types';

interface ZenOverlayProps {
  artwork: Masterpiece;
  onExit: () => void;
}

export default function ZenOverlay({ artwork, onExit }: ZenOverlayProps) {
  const [showExit, setShowExit] = useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Initial subtle hint that UI is hidden
    setShowExit(true);
    timerRef.current = setTimeout(() => setShowExit(false), 3000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onExit]);

  // Show exit button on mouse move
  const handleMouseMove = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowExit(true);
    timerRef.current = setTimeout(() => setShowExit(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[200] bg-ink flex items-center justify-center cursor-none"
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
      
      {/* Background color glow */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none" />
      
      <motion.div 
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="relative w-full h-full flex items-center justify-center p-8 md:p-24"
      >
        <div className="absolute w-[50vh] h-[50vh] bg-saffron/10 blur-[150px] rounded-full pointer-events-none" />
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="max-w-full max-h-full object-contain shadow-[0_0_100px_rgba(226,125,96,0.15)] z-10"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Subtle Exit Indicator */}
      <AnimatePresence>
        {showExit && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={onExit}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 group cursor-pointer z-50"
          >
            <div className="w-10 h-10 rounded-full border border-saffron/20 flex items-center justify-center backdrop-blur-md bg-saffron/5 group-hover:border-saffron/60 transition-colors">
              <X size={18} className="text-saffron group-hover:text-white transition-colors" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-saffron/40 group-hover:text-saffron transition-colors">
              Esc to Exit Silence
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
