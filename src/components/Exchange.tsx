import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BARTER_WISHLIST, MASTERPIECES } from '../constants';
import { Shield, Gift, RotateCcw, Heart, Mail, User, BookOpen, Zap } from 'lucide-react';

interface ExchangeProps {
  preselectedId: string | null;
}

export default function Exchange({ preselectedId }: ExchangeProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    masterpiece: preselectedId || '',
    offer: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionDetails, setSubmissionDetails] = useState({ name: '', masterpieceTitle: '' });

  // Update initial form data if preselectedId changes
  React.useEffect(() => {
    if (preselectedId) {
      setFormData(prev => ({ ...prev, masterpiece: preselectedId }));
    }
  }, [preselectedId]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Identity is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Communication node is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid node address format';
    }
    if (!formData.masterpiece) newErrors.masterpiece = 'A target must be chosen';
    if (!formData.offer.trim()) newErrors.offer = 'The offering cannot be empty';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Capture details for confirmation before clearing/submitting
    const masterpiece = MASTERPIECES.find(m => m.id === formData.masterpiece);
    setSubmissionDetails({
      name: formData.name,
      masterpieceTitle: masterpiece?.title || 'Unknown Work'
    });

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="pt-40 pb-24 px-8 md:px-24 bg-ink min-h-screen relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1 }}
           className="space-y-16"
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.5em] mb-4 text-parchment/30 block">Economy of Intent</span>
            <h1 className="text-6xl md:text-9xl leading-none mb-12 italic font-serif text-parchment">The <br /> Exchange</h1>
            <p className="text-xl text-parchment/60 leading-relaxed font-light max-w-lg">
              In the spirit of <span className="italic">dakshina</span> and the barter traditions of Varanasi. I offer mastery for meaning.
            </p>
          </div>

          <div className="space-y-12">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold border-b border-white/10 pb-6 text-accent">Value Spectrum</h2>
            <ul className="space-y-8">
              {BARTER_WISHLIST.map((item, index) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-8 group"
                >
                  <span className="font-mono text-[9px] opacity-20 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
                  <span className="text-lg md:text-xl text-parchment/80 group-hover:text-parchment transition-colors">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1 }}
           className="bg-white/[0.02] border border-white/5 p-8 md:p-20 relative overflow-hidden backdrop-blur-3xl lg:translate-y-24"
        >
          {/* Subtle patterns */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl -mr-32 -mt-32 rounded-full" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 blur-3xl -ml-24 -mb-24 rounded-full" />

          {isSubmitted ? (
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="h-full flex flex-col items-center justify-center text-center space-y-8 py-24"
            >
              <div className="p-6 bg-parchment/10 rounded-full">
                <Heart className="text-parchment animate-pulse" size={48} fill="currentColor" />
              </div>
              <h2 className="text-4xl font-serif italic">Intent Received</h2>
              <div className="space-y-4">
                <p className="opacity-90 text-xl font-light">
                  Gratitude, <span className="text-accent font-medium">{submissionDetails.name}</span>.
                </p>
                <p className="opacity-60 max-w-sm mx-auto leading-relaxed">
                  Your proposal for <span className="italic">"{submissionDetails.masterpieceTitle}"</span> has been witnessed and recorded in the ledger. 
                  I will review it with presence and reach out soon.
                </p>
              </div>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-xs uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity flex items-center space-x-2 pt-12"
              >
                <RotateCcw size={14} />
                <span>Submit another offer</span>
              </button>
            </motion.div>
          ) : (
            <div className="relative z-10">
              <div className="mb-12">
                <h2 className="text-3xl font-serif mb-4 italic">Propose Exchange</h2>
                <p className="text-white/40 text-sm tracking-wide">
                  Describe what you offer in exchange for the artistry.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 flex items-center space-x-2">
                    <User size={12} />
                    <span>Your Identity</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className={`w-full bg-white/5 border-b outline-none py-3 text-lg font-light transition-all placeholder:text-white/10 ${
                      errors.name ? 'border-red-500/50' : 'border-white/20 focus:border-white/60'
                    }`}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({...formData, name: e.target.value});
                      if (errors.name) setErrors({...errors, name: ''});
                    }}
                  />
                  {errors.name && <p className="text-[10px] text-red-500 uppercase tracking-widest">{errors.name}</p>}
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 flex items-center space-x-2">
                    <Mail size={12} />
                    <span>Communication Node</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className={`w-full bg-white/5 border-b outline-none py-3 text-lg font-light transition-all placeholder:text-white/10 ${
                      errors.email ? 'border-red-500/50' : 'border-white/20 focus:border-white/60'
                    }`}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({...formData, email: e.target.value});
                      if (errors.email) setErrors({...errors, email: ''});
                    }}
                  />
                  {errors.email && <p className="text-[10px] text-red-500 uppercase tracking-widest">{errors.email}</p>}
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 flex items-center space-x-2">
                    <BookOpen size={12} />
                    <span>Target Masterpiece</span>
                  </label>
                  <select 
                    className={`w-full bg-white/5 border-b outline-none py-3 text-lg font-light transition-all appearance-none cursor-pointer ${
                      errors.masterpiece ? 'border-red-500/50' : 'border-white/20 focus:border-white/60'
                    }`}
                    value={formData.masterpiece}
                    onChange={(e) => {
                      setFormData({...formData, masterpiece: e.target.value});
                      if (errors.masterpiece) setErrors({...errors, masterpiece: ''});
                    }}
                  >
                    <option value="" className="bg-ink">Select a Work</option>
                    {MASTERPIECES.filter(m => m.status === 'available' || m.id === preselectedId).map(m => (
                      <option key={m.id} value={m.id} className="bg-ink italic">{m.title}</option>
                    ))}
                  </select>
                  {errors.masterpiece && <p className="text-[10px] text-red-500 uppercase tracking-widest">{errors.masterpiece}</p>}
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 flex items-center space-x-2">
                    <Zap size={12} />
                    <span>The Offering</span>
                  </label>
                  <textarea
                    placeholder="What will you trade for this precision?"
                    rows={4}
                    className={`w-full bg-white/5 border outline-none p-4 text-lg font-light transition-all placeholder:text-white/10 rounded-xl resize-none ${
                      errors.offer ? 'border-red-500/50' : 'border-white/20 focus:border-white/60'
                    }`}
                    value={formData.offer}
                    onChange={(e) => {
                      setFormData({...formData, offer: e.target.value});
                      if (errors.offer) setErrors({...errors, offer: ''});
                    }}
                  />
                  {errors.offer && <p className="text-[10px] text-red-500 uppercase tracking-widest">{errors.offer}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-6 rounded-xl uppercase tracking-[0.4em] text-xs font-bold transition-all flex items-center justify-center space-x-4 shadow-xl ${
                    isSubmitting 
                    ? 'bg-parchment/20 text-parchment/40 cursor-not-allowed' 
                    : 'bg-parchment text-ink hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  <span className={isSubmitting ? '' : 'group-hover:tracking-[0.6em] transition-all duration-500'}>
                    {isSubmitting ? 'Recording Intent...' : 'Initiate Exchange'}
                  </span>
                  {isSubmitting && <RotateCcw size={14} className="animate-spin" />}
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

