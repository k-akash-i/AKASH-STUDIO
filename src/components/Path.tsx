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
            <span className="text-[10px] uppercase tracking-[0.5em] mb-4 text-parchment/30 block">Manifesto</span>
            <h1 className="text-7xl md:text-[10vw] font-serif leading-[0.8] mb-12">The <br /><span className="italic">Path</span></h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-12 text-[9px] uppercase tracking-[0.4em] font-medium text-parchment/30"
          >
            <div className="flex items-center space-x-3">
              <MapPin size={12} className="text-accent" />
              <span>Varanasi</span>
            </div>
            <div className="flex items-center space-x-3">
              <Wind size={12} className="text-accent" />
              <span>Presence • Discipline • Zero</span>
            </div>
          </motion.div>
        </section>

        {/* Narrative */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
           <div className="md:col-span-8 space-y-16">
             <div className="space-y-10 text-xl md:text-2xl text-parchment/80 leading-relaxed font-light font-sans">
                <p>
                  I live at the intersection of technical <span className="text-parchment">logic</span> and artistic <span className="italic text-parchment font-serif">soul</span>. For me, the pencil is not just a tool; it is a tool for witnessing. 
                </p>
                <p>
                  Rooted in the stillness of the Buddha and the celebration of Osho, every anatomical hatching is a meditation. When the technical precision reaches its peak, the "self" vanishes.
                </p>
             </div>

             <div className="relative aspect-video overflow-hidden rounded-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1542125387-c7128488903c?q=80&w=1600&auto=format&fit=crop" 
                  alt="Varanasi Vibe"
                  className="w-full h-full object-cover transition-transform duration-2000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/0 transition-colors duration-1000" />
                <div className="absolute bottom-8 left-8 text-parchment uppercase tracking-widest text-[10px] italic bg-ink/40 backdrop-blur-sm px-4 py-2 rounded-full">
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
                 <h3 className="text-xs uppercase tracking-widest font-bold text-parchment/30 italic">Principles</h3>
                 <ul className="space-y-8">
                    {[
                      { icon: Eye, title: 'Witnessing', desc: 'The dissolution of the doer into the work.' },
                      { icon: Pencil, title: 'Precision', desc: 'The technical anchor that forces awareness.' },
                      { icon: RotateCcw, title: 'Zero State', desc: 'Constant renewal through the beginner\'s mind.' }
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
                            <item.icon size={18} className="text-accent" />
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
        <section className="text-center py-24 border-t border-white/5">
          <h2 className="text-5xl md:text-8xl font-serif italic mb-12 text-parchment">Join the journey.</h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12 uppercase tracking-widest text-[10px] font-bold">
             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Instagram Portfolio</a>
             <div className="hidden md:block w-2 bg-white/10 h-2 rounded-full" />
             <a href="mailto:akashdeepnarayan@gmail.com" className="hover:text-accent transition-colors">Email the Witness</a>
          </div>
        </section>
      </div>
    </div>
  );
}
