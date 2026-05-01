import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Trash2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  onSnapshot, 
  serverTimestamp,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

interface Message {
  id: string;
  userId: string;
  userName: string;
  content: string;
}

export default function AcademyChat() {
  const { user, profile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('createdAt', 'asc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(msgs);
      
      // Auto scroll
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'messages');
    });

    return unsubscribe;
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    try {
      await addDoc(collection(db, 'messages'), {
        userId: user.uid,
        userName: profile?.name || user.displayName || 'Witness',
        content: newMessage.trim(),
        createdAt: serverTimestamp()
      });
      setNewMessage('');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'messages');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'messages', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `messages/${id}`);
    }
  };

  return (
    <div className="bg-clay border border-white/10 rounded-3xl flex flex-col h-[600px] overflow-hidden">
      <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-indigo animate-pulse" />
          <h2 className="text-xs uppercase tracking-widest font-bold text-parchment">The Shared Flow</h2>
        </div>
        <span className="text-[10px] opacity-30 uppercase tracking-widest">{messages.length} Messages</span>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth scrollbar-hide"
      >
        {messages.map((msg, index) => (
          <motion.div
            initial={{ opacity: 0, x: msg.userId === user?.uid ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={msg.id}
            className={`flex flex-col ${msg.userId === user?.uid ? 'items-end' : 'items-start'}`}
          >
            <div className={`flex items-center gap-2 mb-2 text-[10px] uppercase tracking-widest opacity-30 ${msg.userId === user?.uid ? 'flex-row-reverse' : ''}`}>
              <span className="font-bold">{msg.userName}</span>
              {msg.userId === user?.uid && (
                <button 
                  onClick={() => handleDeleteMessage(msg.id)}
                  className="hover:text-crimson transition-colors"
                >
                   <Trash2 size={10} />
                </button>
              )}
            </div>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.userId === user?.uid 
              ? 'bg-indigo text-ink rounded-tr-none font-medium' 
              : 'bg-white/5 text-parchment/80 border border-white/5 rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="p-6 border-t border-white/10 bg-white/5 flex gap-4">
        <input 
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Speak your presence..."
          className="flex-1 bg-ink border border-white/10 rounded-xl px-6 py-4 text-sm outline-none focus:border-indigo/50 transition-all placeholder:text-white/10"
        />
        <button 
          type="submit"
          className="w-14 h-14 rounded-xl bg-indigo text-ink flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-indigo/20"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
