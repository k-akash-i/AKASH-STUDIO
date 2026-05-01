import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signIn, signInWithEmail, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      await signIn();
      onClose();
    } catch (error) {
      console.error('Sign in failed:', error);
      setError('Google Sign-in failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (isSignUp) {
        if (!name) throw new Error('Name is required');
        await signUp(email, password, name);
      } else {
        await signInWithEmail(email, password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
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
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-saffron via-accent to-indigo" />
            
            <div className="p-8 md:p-12 relative z-10">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-saffron/10 border border-saffron/20 flex items-center justify-center">
                  <ShieldCheck className="text-saffron" size={24} />
                </div>
              </div>

              <div className="text-center space-y-2 mb-8">
                <h2 className="text-2xl font-serif italic text-parchment">{isSignUp ? 'Join the Academy' : 'Academy Access'}</h2>
                <p className="text-[10px] uppercase tracking-[0.2em] text-parchment/40">
                  {isSignUp ? 'Create your witness profile' : 'Enter the private domain'}
                </p>
              </div>

              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-4 bg-parchment text-ink py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-all mb-8 shadow-lg shadow-black/20"
              >
                <Mail size={16} />
                Connect with Google
              </button>
              
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-parchment/20"><span className="bg-clay px-4">OR</span></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                    <input
                      type="text"
                      placeholder="YOUR NAME"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-xs text-parchment outline-none focus:border-saffron/50 transition-all placeholder:text-parchment/20"
                    />
                  </div>
                )}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-xs text-parchment outline-none focus:border-saffron/50 transition-all placeholder:text-parchment/20"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-xs text-parchment outline-none focus:border-saffron/50 transition-all placeholder:text-parchment/20"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-crimson text-[10px] uppercase tracking-widest bg-crimson/10 p-3 rounded-lg border border-crimson/20">
                    <AlertCircle size={14} />
                    {error}
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] uppercase tracking-[0.3em] font-bold text-parchment hover:bg-white hover:text-ink transition-all"
                >
                  {isSignUp ? 'Initialize' : 'Authorize'}
                </button>
              </form>

              <div className="mt-8 text-center">
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-[10px] uppercase tracking-widest text-parchment/40 hover:text-saffron transition-colors"
                >
                  {isSignUp ? 'Already have an account? Sign In' : 'New to the Academy? Create Profile'}
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 text-center">
                <p className="text-[8px] uppercase tracking-[0.3em] text-parchment/20">
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
