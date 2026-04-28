import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, ArrowRight, X, Maximize2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function Notices({ items = [] }: { items?: any[] }) {
  return (
    <section id="notices" className="section-padding bg-navy relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end gap-6 mb-16">
          <div className="w-16 h-16 bg-gold/10 rounded-[2rem] flex items-center justify-center border border-gold/20 shadow-[0_0_30px_rgba(197,160,89,0.1)]">
            <Bell className="text-gold w-8 h-8 animate-bounce" />
          </div>
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-gold font-mono font-bold uppercase tracking-[0.6em] text-[10px] mb-2 block"
            >
              Intelligence Reports
            </motion.span>
            <h2 className="text-5xl md:text-8xl font-display font-bold uppercase italic tracking-tight leading-[0.85]">Latest <br /><span className="text-gold">Notices</span></h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {items.map((notice, i) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-10 rounded-[3rem] border-white/5 hover:border-gold/30 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                <Bell size={120} />
              </div>

              <div className="flex justify-between items-start mb-8 relative z-10 font-mono">
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-gold px-4 py-2 bg-gold/10 rounded-xl border border-gold/10">{notice.date}</span>
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/20 group-hover:text-gold group-hover:scale-110 transition-all">
                   <ArrowRight size={18} />
                </div>
              </div>
              <h3 className="text-3xl font-display font-bold mb-4 uppercase italic tracking-tighter group-hover:text-gold transition-colors leading-none">{notice.title}</h3>
              <p className="text-white/40 text-[13px] leading-relaxed italic tracking-tight">{notice.content}</p>
            </motion.div>
          ))}
          {items.length === 0 && (
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="col-span-full text-center py-32 glass rounded-[3rem] border-dashed border-white/10"
            >
              <p className="text-white/20 font-display italic text-2xl">The Bulletin remains silent.</p>
              <p className="text-sm text-white/10 mt-2 uppercase tracking-widest font-black">No active notices found</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Gallery({ items = [] }: { items?: string[] }) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section id="gallery" className="section-padding bg-navy-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gold font-mono font-bold uppercase tracking-[0.6em] text-[10px] mb-4 block"
          >
            Visual Chronicles
          </motion.span>
          <h2 className="text-5xl md:text-8xl font-display font-bold uppercase italic tracking-tight leading-[0.85]">Captured <br /><span className="text-gold">Memories</span></h2>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedImg(img)}
              className="relative overflow-hidden rounded-[2.5rem] group cursor-pointer border border-white/5 hover:border-gold/30 transition-all duration-700"
            >
              <img 
                src={img} 
                alt="MUN gallery" 
                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 group-hover:rotate-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <div className="w-14 h-14 rounded-full glass flex items-center justify-center text-white scale-50 group-hover:scale-100 transition-transform">
                    <Maximize2 size={24} />
                 </div>
              </div>
            </motion.div>
          ))}
          {items.length === 0 && (
            <div className="col-span-full text-center py-32 glass rounded-[3rem] border-dashed border-white/10">
              <p className="text-white/20 font-display italic text-2xl">Awaiting the lens of history.</p>
              <p className="text-sm text-white/10 mt-2 uppercase tracking-widest font-black">Gallery coming soon</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-[10002] flex items-center justify-center p-6 md:p-20">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="absolute inset-0 bg-navy-dark/95 backdrop-blur-2xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-7xl w-full h-full flex items-center justify-center"
            >
              <img 
                src={selectedImg} 
                className="max-w-full max-h-full object-contain rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10" 
                alt="" 
              />
              <button 
                onClick={() => setSelectedImg(null)}
                className="absolute top-0 -right-12 md:top-4 md:right-4 w-12 h-12 rounded-full glass flex items-center justify-center text-white/50 hover:text-white transition-all"
              >
                <X size={24} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
