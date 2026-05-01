/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Shield, Heart, Zap, MapPin, GraduationCap } from 'lucide-react';
import Landing from './components/Landing';
import Vault from './components/Vault';
import Exchange from './components/Exchange';
import Path from './components/Path';
import Academy from './components/Academy';
import ZenOverlay from './components/ZenOverlay';
import AuthModal from './components/AuthModal';
import { Masterpiece } from './types';
import { WishlistProvider, useWishlist } from './context/WishlistContext';
import { useAuth } from './context/AuthContext';

export type Page = 'landing' | 'vault' | 'exchange' | 'path' | 'academy';

export default function App() {
  const { wishlist } = useWishlist();
  const { user, loading, signOut } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [exchangeContext, setExchangeContext] = useState<string | null>(null);
  const [zenArtwork, setZenArtwork] = useState<Masterpiece | null>(null);

  // Smooth scroll to top on page change
  useEffect(() => {
    if (!zenArtwork) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage, zenArtwork]);

  const navigateToExchange = (masterpieceId?: string) => {
    if (masterpieceId) setExchangeContext(masterpieceId);
    setCurrentPage('exchange');
  };

  const handleAcademyNavigation = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      setCurrentPage('academy');
    }
  };

  const navigationItems = [
    { id: 'landing', label: 'The Zero' },
    { id: 'vault', label: 'The Vault' },
    { id: 'exchange', label: 'The Exchange' },
    { id: 'academy', label: 'The Academy', private: true },
    { id: 'path', label: 'The Path' },
  ];

  return (
    <div className="relative min-h-screen bg-ink text-parchment selection:bg-parchment selection:text-ink overflow-x-hidden">
        {/* Zen Mode Overlay */}
        <AnimatePresence>
          {zenArtwork && (
            <ZenOverlay 
              artwork={zenArtwork} 
              onExit={() => setZenArtwork(null)} 
            />
          )}
        </AnimatePresence>

        {!zenArtwork && (
          <>
            {/* Background Subtle Texture */}
            <div className="fixed inset-0 bg-dot-pattern pointer-events-none z-0" />
            
            {/* Color Mesh Gradient */}
            <div className="fixed inset-0 bg-mesh-gradient pointer-events-none z-0" />

            {/* Decorative Background Typography */}
            <div className="fixed -bottom-20 -left-20 text-[240px] font-extrabold opacity-[0.03] pointer-events-none select-none z-0 font-serif text-saffron">
              MUSEUM
            </div>

            {/* Left Vertical Rail */}
            <div className="fixed left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-8 z-30 mix-blend-difference pointer-events-none">
              <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-saffron/40 to-transparent"></div>
              <span className="rotate-180 [writing-mode:vertical-lr] text-[10px] tracking-[0.5em] uppercase opacity-30 text-white">Varanasi — India</span>
              <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-saffron/40 to-transparent"></div>
            </div>

            {/* Right Vertical Rail */}
            <div className="fixed right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-8 z-30 mix-blend-difference pointer-events-none">
              <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-indigo/40 to-transparent"></div>
              <span className="[writing-mode:vertical-lr] text-[10px] tracking-[0.5em] uppercase opacity-30 text-white">Precision & Presence</span>
              <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-indigo/40 to-transparent"></div>
            </div>
          </>
        )}

        {/* Navigation Overlay */}
        <AnimatePresence>
          {isNavOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-50 bg-clay text-parchment flex flex-col justify-center px-8 md:px-24 overflow-hidden"
            >
              {/* Animated decorative background circle */}
              <div className="absolute -top-1/4 -right-1/4 w-[80vw] h-[80vw] rounded-full bg-saffron/10 blur-[120px] pointer-events-none" />
              <div className="absolute -bottom-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-indigo/10 blur-[100px] pointer-events-none" />

              <button
                onClick={() => setIsNavOpen(false)}
                className="absolute top-8 right-8 p-4 hover:rotate-90 transition-transform duration-300"
              >
                <X size={32} />
              </button>

              <nav className="space-y-8 md:space-y-12 relative z-10">
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      if (item.id === 'academy') {
                        handleAcademyNavigation();
                      } else {
                        setCurrentPage(item.id as Page);
                      }
                      setIsNavOpen(false);
                      if (item.id === 'exchange') setExchangeContext(null);
                    }}
                    className={`text-5xl md:text-8xl font-serif text-left block w-full transition-all duration-500 hover:pl-8 group relative ${
                      currentPage === item.id ? 'opacity-100 italic text-accent' : 'opacity-40 hover:opacity-100 hover:text-saffron'
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      {item.label}
                      {item.private && <GraduationCap size={24} className="opacity-40" />}
                      {item.id === 'vault' && wishlist.length > 0 && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-accent text-ink text-xs md:text-sm font-sans not-italic font-bold w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center translate-y-2 md:translate-y-4"
                        >
                          {wishlist.length}
                        </motion.span>
                      )}
                    </span>
                  </motion.button>
                ))}

                {user && (
                  <motion.button
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navigationItems.length * 0.1 }}
                    onClick={() => {
                      signOut();
                      setIsNavOpen(false);
                      setCurrentPage('landing');
                    }}
                    className="text-5xl md:text-8xl font-serif text-left block w-full transition-all duration-500 hover:pl-8 group relative opacity-40 hover:opacity-100 text-crimson"
                  >
                    Disconnect
                  </motion.button>
                )}
              </nav>

              <div className="absolute bottom-12 left-8 md:left-24 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 text-sm uppercase tracking-widest opacity-60">
                <span className="opacity-40">Varanasi, India</span>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">Instagram</a>
                <a href="mailto:akashdeepnarayan@gmail.com" className="hover:opacity-100 transition-opacity">Contact</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Header */}
        {!zenArtwork && (
          <header className="fixed top-0 left-0 w-full z-40 p-6 md:p-10 flex justify-between items-center mix-blend-difference pointer-events-none">
            <button
              onClick={() => setCurrentPage('landing')}
              className="pointer-events-auto text-parchment uppercase tracking-[0.3em] font-medium text-xs md:text-sm group"
            >
              <span className="block overflow-hidden h-4">
                <span className="block group-hover:-translate-y-full transition-transform duration-500">Shrine of the Witness</span>
                <span className="block group-hover:-translate-y-full transition-transform duration-500">Back to Silence</span>
              </span>
            </button>

            <button
              onClick={() => setIsNavOpen(true)}
              className="pointer-events-auto text-parchment p-2 hover:scale-110 transition-transform duration-300 relative group"
            >
              <Menu size={24} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-ink text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                  {wishlist.length}
                </span>
              )}
            </button>
          </header>
        )}

        {/* Page Content */}
        <main className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              {currentPage === 'landing' && <Landing onEnter={() => setCurrentPage('vault')} />}
              {currentPage === 'vault' && (
                <Vault 
                  onProposeExchange={navigateToExchange} 
                  onEnterZenMode={(artwork) => setZenArtwork(artwork)}
                />
              )}
              {currentPage === 'exchange' && <Exchange preselectedId={exchangeContext} />}
              {currentPage === 'path' && <Path />}
              {currentPage === 'academy' && <Academy />}
            </motion.div>
          </AnimatePresence>
        </main>

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />

        {/* Footer (Except on Landing) */}
        {currentPage !== 'landing' && !zenArtwork && (
          <footer className="bg-ink text-parchment py-24 px-8 md:px-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
              <div>
                <h2 className="text-4xl md:text-6xl mb-8 leading-tight">
                  Every line is a <span className="italic text-saffron">witness</span> to the moment.
                </h2>
                <p className="opacity-60 max-w-md text-lg leading-relaxed">
                  Starting from <span className="text-indigo">zero</span> near the ghats of Varanasi. Building a bridge between traditional mastery and spiritual presence.
                </p>
              </div>
              <div className="flex flex-col justify-between items-start md:items-end uppercase tracking-widest text-xs space-y-12">
                <div className="flex space-x-12">
                  <div className="space-y-4">
                    <p className="opacity-40 text-saffron">Location</p>
                    <p>Varanasi, India</p>
                  </div>
                  <div className="space-y-4">
                    <p className="opacity-40 text-indigo">Contact</p>
                    <a href="mailto:akashdeepnarayan@gmail.com" className="hover:text-accent transition-colors underline decoration-white/20 underline-offset-4">akash@akash.studio</a>
                  </div>
                </div>
                <p className="opacity-20 italic">Designed with precision & intent.</p>
              </div>
            </div>
          </footer>
        )}
      </div>
  );
}
