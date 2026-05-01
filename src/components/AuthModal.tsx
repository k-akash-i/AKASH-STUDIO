import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, LogIn, ShieldCheck, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn();
      onClose();
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/80 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-clay border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.1)]"
          >
            {/* Design accents */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-saffron via-accent to-indigo" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 blur-[80px] rounded-full" />
            
            <div className="p-8 md:p-12 relative z-10">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-saffron/10 border border-saffron/20 flex items-center justify-center">
                  <ShieldCheck className="text-saffron" size={32} />
                </div>
              </div>

              <div className="text-center space-y-4 mb-10">
                <h2 className="text-3xl font-serif italic text-parchment">Academy Access</h2>
                <p className="text-sm text-parchment/60 leading-relaxed max-w-[200px] mx-auto">
                  Enter the private domain of process and presence.
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleSignIn}
                  className="w-full flex items-center justify-center gap-4 bg-parchment text-ink py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Mail size={18} />
                  Connect with Google
                </button>
                
                <p className="text-center text-[10px] uppercase tracking-widest text-parchment/30 py-4">
                  or
                </p>

                <div className="space-y-4 opacity-50 cursor-not-allowed">
                  <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-parchment/40">
                    Email address
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-parchment/40">
                    Password
                  </div>
                  <button disabled className="w-full py-4 border border-white/10 rounded-xl text-[10px] uppercase tracking-widest font-bold">
                    Login (Coming Soon)
                  </button>
                </div>
              </div>

              <div className="mt-12 text-center">
                <p className="text-[9px] uppercase tracking-[0.3em] text-parchment/20">
                  Secured by the Witness Protocol
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
