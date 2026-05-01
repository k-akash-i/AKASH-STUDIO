import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Pencil, Eye, Wind, RotateCcw } from 'lucide-react';

export default function Path() {
  return (
    <div className="pt-40 pb-24 px-8 md:px-24 bg-ink min-h-screen relative z-10">
      <div className="max-w-4xl mx-auto space-y-32 text-parchment">
        {/* Header */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] uppercase tracking-[0.5em] mb-4 text-saffron opacity-60 block">Manifesto</span>
            <h1 className="text-7xl md:text-[10vw] font-serif leading-[0.8] mb-12 text-parchment">The <br /><span className="italic text-indigo">Path</span></h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-12 text-[9px] uppercase tracking-[0.4em] font-medium text-parchment/30"
          >
            <div className="flex items-center space-x-3">
              <MapPin size={12} className="text-saffron" />
              <span>Varanasi</span>
            </div>
            <div className="flex items-center space-x-3">
              <Wind size={12} className="text-indigo" />
              <span>Presence • Discipline • Zero</span>
            </div>
          </motion.div>
        </section>

        {/* Narrative */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
           <div className="md:col-span-8 space-y-16">
             <div className="space-y-10 text-xl md:text-2xl text-parchment/80 leading-relaxed font-light font-sans">
                <p>
                  I live at the intersection of technical <span className="text-indigo font-medium">logic</span> and artistic <span className="italic text-saffron font-serif font-medium">soul</span>. For me, the pencil is not just a tool; it is a tool for witnessing. 
                </p>
                <p>
                  Rooted in the stillness of the Buddha and the celebration of Osho, every anatomical hatching is a <span className="text-accent italic font-serif">meditation</span>. When the technical precision reaches its peak, the "self" vanishes.
                </p>
             </div>

             <div className="relative aspect-video overflow-hidden rounded-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1542125387-c7128488903c?q=80&w=1600&auto=format&fit=crop" 
                  alt="Varanasi Vibe"
                  className="w-full h-full object-cover transition-transform duration-2000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-ink/20 group-hover:bg-indigo/10 transition-colors duration-1000" />
                <div className="absolute bottom-8 left-8 text-white uppercase tracking-widest text-[10px] italic bg-saffron/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  The Ghats of Varanasi • My Silent Muse
                </div>
             </div>

             <div className="space-y-8 text-xl md:text-2xl text-parchment/80 leading-relaxed font-light">
                <p>
                  Building from zero is a spiritual practice. It requires the "Beginner's Mind"—a state of constant learning and raw presence. Whether it is coding framework-free, high-performance engines or rendering the exact tension of a muscle, the goal is the same: absolute fidelity to the truth of the moment.
                </p>
                <p>
                  My vision is to establish a gallery that isn't just a shop, but a <span className="italic">Satsang</span>—a gathering of truth. Where value is exchanged through intent, craft, and connection, rather than just currency.
                </p>
             </div>
           </div>

           <aside className="md:col-span-4 sticky top-40 space-y-16">
              <div className="space-y-8 border-l border-white/10 pl-8">
                 <h3 className="text-xs uppercase tracking-widest font-bold text-saffron opacity-50 italic">Principles</h3>
                 <ul className="space-y-8">
                    {[
                      { icon: Eye, title: 'Witnessing', desc: 'The dissolution of the doer into the work.', color: 'text-indigo' },
                      { icon: Pencil, title: 'Precision', desc: 'The technical anchor that forces awareness.', color: 'text-saffron' },
                      { icon: RotateCcw, title: 'Zero State', desc: 'Constant renewal through the beginner\'s mind.', color: 'text-accent' }
                    ].map((item, index) => (
                      <motion.li 
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-2"
                      >
                         <div className="flex items-center space-x-3 text-parchment">
                            <item.icon size={18} className={item.color} />
                            <span className="text-sm font-serif italic">{item.title}</span>
                         </div>
                         <p className="text-xs text-parchment/40 leading-relaxed uppercase tracking-tighter">{item.desc}</p>
                      </motion.li>
                    ))}
                 </ul>
              </div>

              <div className="bg-white/5 p-8 rounded-3xl space-y-6 border border-white/5">
                 <h3 className="text-xs uppercase tracking-widest font-bold text-parchment/30 italic">Technical Archive</h3>
                 <div className="space-y-4 font-mono text-[10px] uppercase tracking-wider text-parchment/60">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span>Resolution</span>
                      <span>600 DPI</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span>Stack</span>
                      <span>Vanilla JS / React</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span>Medium</span>
                      <span>Graphite / Ink</span>
                    </div>
                 </div>
              </div>
           </aside>
        </section>

        {/* Conclusion */}
        <section className="text-center py-24 border-t border-white/5 relative">
          {/* Decorative blurs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo/5 blur-[100px] pointer-events-none" />
          
          <h2 className="text-5xl md:text-8xl font-serif italic mb-12 text-parchment">Join the <span className="text-saffron">journey</span>.</h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12 uppercase tracking-widest text-[10px] font-bold">
             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo transition-colors flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
               Instagram Portfolio
             </a>
             <div className="hidden md:block w-2 bg-white/10 h-2 rounded-full" />
             <a href="mailto:akashdeepnarayan@gmail.com" className="hover:text-saffron transition-colors flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-indigo" />
               Email the Witness
             </a>
          </div>
        </section>
      </div>
    </div>
  );
}
