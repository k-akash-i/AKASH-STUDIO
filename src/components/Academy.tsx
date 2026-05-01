import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  MessageSquare, 
  Video, 
  Cpu, 
  Sparkles, 
  ChevronRight, 
  Play, 
  Users, 
  Lock,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AcademyChat from './AcademyChat';
import AcademyChatBot from './AcademyChatBot';

export default function Academy() {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'lessons' | 'community' | 'connect'>('lessons');
  const [showChatBot, setShowChatBot] = useState(false);

  const lessons = [
    {
      id: '1',
      title: 'The Anatomy of a Line',
      desc: 'Mastering the pressure and flow of graphite.',
      duration: '45 mins',
      level: 'Expert',
      thumb: 'https://images.unsplash.com/photo-1515516089376-88db1e26e9c0?q=80&w=800&auto=format'
    },
    {
      id: '2',
      title: 'Silence in Shading',
      desc: 'Using negative space to create presence.',
      duration: '1.2 hours',
      level: 'Master',
      thumb: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800&auto=format'
    },
    {
      id: '3',
      title: 'The Veda of Portraits',
      desc: 'Capturing the elder spirit at Manikarnika.',
      duration: '2 hours',
      level: 'Master',
      thumb: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format'
    }
  ];

  return (
    <div className="pt-32 pb-24 px-8 md:px-24">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Academy Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-saffron/20 text-saffron text-[10px] font-bold uppercase tracking-widest rounded-full border border-saffron/10">
                Academy Member
              </span>
              <span className="text-[10px] uppercase tracking-widest opacity-30">Varanasi Chapter</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif italic text-parchment leading-none">
              The <span className="text-accent">Learning</span> <br /> Process
            </h1>
          </motion.div>

          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('lessons')}
              className={`px-6 py-3 rounded-xl border transition-all flex items-center gap-2 text-xs uppercase tracking-widest font-bold ${activeTab === 'lessons' ? 'bg-saffron text-ink border-saffron shadow-lg shadow-saffron/20' : 'bg-white/5 border-white/10 text-parchment/60 hover:bg-white/10'}`}
            >
              <BookOpen size={16} />
              Curriculum
            </button>
            <button 
              onClick={() => setActiveTab('community')}
              className={`px-6 py-3 rounded-xl border transition-all flex items-center gap-2 text-xs uppercase tracking-widest font-bold ${activeTab === 'community' ? 'bg-indigo text-ink border-indigo shadow-lg shadow-indigo/20' : 'bg-white/5 border-white/10 text-parchment/60 hover:bg-white/10'}`}
            >
              <MessageSquare size={16} />
              Forum
            </button>
            <button 
              onClick={() => setActiveTab('connect')}
              className={`px-6 py-3 rounded-xl border transition-all flex items-center gap-2 text-xs uppercase tracking-widest font-bold ${activeTab === 'connect' ? 'bg-accent text-ink border-accent shadow-lg shadow-accent/20' : 'bg-white/5 border-white/10 text-parchment/60 hover:bg-white/10'}`}
            >
              <Video size={16} />
              Connect
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'lessons' && (
            <motion.div
              key="lessons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {lessons.map((lesson, index) => (
                <div key={lesson.id} className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-saffron/40 transition-all duration-700">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={lesson.thumb} alt={lesson.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/20 transition-colors" />
                    <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-saffron/90 backdrop-blur-sm flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform">
                        <Play fill="currentColor" size={24} />
                      </div>
                    </button>
                  </div>
                  <div className="p-8 space-y-4">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                      <span className="text-saffron">{lesson.level}</span>
                      <span className="opacity-40">{lesson.duration}</span>
                    </div>
                    <h3 className="text-2xl font-serif italic text-parchment">{lesson.title}</h3>
                    <p className="text-sm text-parchment/50 leading-relaxed">{lesson.desc}</p>
                  </div>
                </div>
              ))}
              
              <div className="bg-white/5 border border-white/10 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-6 opacity-40 hover:opacity-100 transition-opacity">
                <div className="p-4 rounded-full bg-white/10">
                  <Lock size={24} />
                </div>
                <div>
                   <h4 className="text-lg font-serif italic">Locked Modules</h4>
                   <p className="text-xs uppercase tracking-widest opacity-50 mt-2">Required completion of Intro to Zero</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'community' && (
            <motion.div
              key="community"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              <div className="lg:col-span-8">
                <AcademyChat />
              </div>
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-clay border border-white/10 rounded-3xl p-8 space-y-6">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-saffron">Trending Discussions</h3>
                  <div className="space-y-6">
                    {['Paper choice for Varanasi humidity?', 'The influence of Zen in anatomical studies', 'Correct way to hold a 6B pencil'].map((topic, i) => (
                      <div key={i} className="group cursor-pointer">
                        <p className="text-sm text-parchment/80 group-hover:text-accent transition-colors underline underline-offset-4 decoration-white/10">{topic}</p>
                        <div className="flex gap-4 mt-2 text-[9px] uppercase tracking-widest opacity-30">
                          <span>12 Replies</span>
                          <span>Active 2m ago</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'connect' && (
            <motion.div
              key="connect"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              <div className="bg-gradient-to-br from-indigo/20 to-clay border border-indigo/20 rounded-3xl p-12 space-y-8">
                <div className="flex justify-between items-start">
                   <div className="p-4 bg-indigo/20 rounded-2xl border border-indigo/30">
                      <Video className="text-indigo" size={32} />
                   </div>
                   <span className="text-[10px] uppercase tracking-widest bg-indigo/10 text-indigo px-3 py-1 rounded-full animate-pulse">Live Soon</span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-serif italic text-parchment">Ghat Session</h3>
                  <p className="text-parchment/60 leading-relaxed text-lg">
                    Join me live at Assi Ghat for a meditation and anatomy session. 22 participants already waiting.
                  </p>
                </div>
                <div className="flex items-center gap-6 pt-6">
                  <button className="flex-1 bg-indigo text-ink py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:scale-[1.02] transition-all">
                    Register for Seat
                  </button>
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-clay bg-white/10 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Attendee" />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-clay bg-indigo/20 flex items-center justify-center text-[10px] font-bold text-indigo">
                      +19
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-clay border border-white/5 rounded-3xl p-12 flex flex-col justify-between">
                <div className="space-y-8">
                  <div className="p-4 w-fit bg-accent/20 rounded-2xl border border-accent/30">
                    <Users className="text-accent" size={32} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-serif italic text-parchment">One-on-One Presence</h3>
                    <p className="text-parchment/50 leading-relaxed">
                      Deep dive into your portfolio. 15 minutes of pure technical and spiritual review. 
                    </p>
                  </div>
                </div>
                <button className="w-full mt-12 py-4 border border-white/10 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-ink transition-all">
                  Apply for Submission
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating ChatBot Trigger */}
        <div className="fixed bottom-12 right-12 z-50">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowChatBot(true)}
            className="w-16 h-16 rounded-full bg-saffron text-ink flex items-center justify-center shadow-2xl shadow-saffron/20 border-2 border-white/20"
          >
            <Cpu size={24} />
          </motion.button>
        </div>

        <AcademyChatBot isOpen={showChatBot} onClose={() => setShowChatBot(false)} />
      </div>
    </div>
  );
}
