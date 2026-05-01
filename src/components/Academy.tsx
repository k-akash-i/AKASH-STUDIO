import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  MessageSquare, 
  Video, 
  ExternalLink,
  FolderOpen,
  Play, 
  Users, 
  Lock,
  ArrowUpRight,
  Database
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AcademyChat from './AcademyChat';

export default function Academy() {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'lessons' | 'community' | 'connect' | 'archive'>('lessons');

  const archiveFolders = [
    { name: 'Scans: 600DPI Raw', link: 'https://drive.google.com/drive/folders/your-id-1', icon: Database, color: 'text-indigo' },
    { name: 'Process: Graphite Flow', link: 'https://drive.google.com/drive/folders/your-id-2', icon: FolderOpen, color: 'text-saffron' },
    { name: 'Academy Assets', link: 'https://drive.google.com/drive/folders/your-id-3', icon: Lock, color: 'text-accent' }
  ];

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
    }
  ];

  return (
    <div className="pt-32 pb-24 px-8 md:px-24 bg-ink min-h-screen">
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

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setActiveTab('lessons')}
              className={`px-6 py-3 rounded-xl border transition-all flex items-center gap-2 text-xs uppercase tracking-widest font-bold ${activeTab === 'lessons' ? 'bg-saffron text-ink border-saffron' : 'bg-white/5 border-white/10 text-parchment/60 hover:bg-white/10'}`}
            >
              <BookOpen size={16} />
              Curriculum
            </button>
            <button 
              onClick={() => setActiveTab('archive')}
              className={`px-6 py-3 rounded-xl border transition-all flex items-center gap-2 text-xs uppercase tracking-widest font-bold ${activeTab === 'archive' ? 'bg-white text-ink border-white' : 'bg-white/5 border-white/10 text-parchment/60 hover:bg-white/10'}`}
            >
              <FolderOpen size={16} />
              The Archive
            </button>
            <button 
              onClick={() => setActiveTab('community')}
              className={`px-6 py-3 rounded-xl border transition-all flex items-center gap-2 text-xs uppercase tracking-widest font-bold ${activeTab === 'community' ? 'bg-indigo text-ink border-indigo' : 'bg-white/5 border-white/10 text-parchment/60 hover:bg-white/10'}`}
            >
              <MessageSquare size={16} />
              Forum
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
              {lessons.map((lesson) => (
                <div key={lesson.id} className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-saffron/40 transition-all duration-700">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={lesson.thumb} alt={lesson.title} className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/20 transition-colors" />
                    <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-saffron/90 backdrop-blur-sm flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform">
                        <Play fill="currentColor" size={24} />
                      </div>
                    </button>
                  </div>
                  <div className="p-8 space-y-4">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-saffron/60">
                      <span>{lesson.level}</span>
                      <span className="opacity-40">{lesson.duration}</span>
                    </div>
                    <h3 className="text-2xl font-serif italic text-parchment">{lesson.title}</h3>
                    <p className="text-sm text-parchment/50 leading-relaxed">{lesson.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'archive' && (
            <motion.div
              key="archive"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {archiveFolders.map((folder, i) => (
                <a 
                  key={i} 
                  href={folder.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/5 border border-white/10 p-8 rounded-3xl group hover:bg-white/10 transition-all hover:border-white/20"
                >
                  <div className={`p-4 w-fit rounded-2xl bg-white/5 mb-8 ${folder.color}`}>
                    <folder.icon size={32} />
                  </div>
                  <h3 className="text-xl font-serif italic mb-2 flex items-center gap-2">
                    {folder.name}
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest opacity-40">Stored in Cloud Space</p>
                </a>
              ))}
            </motion.div>
          )}

          {activeTab === 'community' && (
            <motion.div
              key="community"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
                <AcademyChat />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
