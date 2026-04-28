import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Linkedin, Mail, ChevronRight } from 'lucide-react';
import { SECRETARIAT, USGS } from '../data';
import { cn } from '../lib/utils';

export default function Secretariat() {
  const [selectedMember, setSelectedMember] = useState<any>(null);

  return (
    <section id="secretariat" className="section-padding bg-navy-dark relative overflow-hidden">
      {/* Background ID Watermarks */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.02] flex items-center justify-center">
        <span className="text-[30vw] font-display font-black select-none italic tracking-tighter drop-shadow-2xl">ELITE</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gold font-mono font-bold uppercase tracking-[0.6em] text-[10px] mb-4 block"
          >
            The Architects of Diplomacy
          </motion.span>
          <h2 className="text-5xl md:text-8xl font-display font-bold mb-6 uppercase italic tracking-tight leading-[0.85]">
            The <br /><span className="text-gold">Secretariat</span>
          </h2>
          <p className="text-white/40 text-base italic font-light max-w-lg mx-auto tracking-tight">
            Dedicated leaders working tirelessly to curate the perfect conference experience for every delegate.
          </p>
        </div>

        {/* Core Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-32">
          {SECRETARIAT.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              onClick={() => setSelectedMember({ ...member, type: 'Secretariat' })}
              className="group cursor-pointer"
            >
              <div className="relative mb-6">
                <div className="aspect-[3/4] rounded-[2rem] overflow-hidden relative border border-white/5 group-hover:border-gold/40 transition-all duration-700 shadow-2xl">
                  <img 
                      src={member.img} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                     <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full glass flex items-center justify-center text-gold">
                           <Linkedin size={14} />
                        </div>
                        <div className="w-8 h-8 rounded-full glass flex items-center justify-center text-gold">
                           <Mail size={14} />
                        </div>
                     </div>
                  </div>
                </div>

                {/* Floating ID Tag */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gold shadow-xl rounded-2xl flex items-center justify-center text-navy-dark font-display font-black italic transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  {i + 1}
                </div>
              </div>
              
              <div className="px-2">
                <h4 className="font-display font-bold text-2xl mb-1 uppercase italic tracking-tighter group-hover:text-gold transition-colors leading-none">{member.name}</h4>
                <div className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-mono font-bold">{member.role}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* USGs Executive Grid */}
        <div className="glass rounded-[3.5rem] p-12 md:p-16 border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-20 pointer-events-none opacity-[0.02]">
               <ChevronRight size={400} className="text-white" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-16 font-mono">
                 <div className="h-px bg-gold/10 flex-1" />
                 <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold/40">Under Secretary Generals</h3>
                 <div className="h-px bg-gold/10 flex-1" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-12">
                  {USGS.map((usg, i) => (
                      <motion.div 
                          key={usg.name}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="relative group pb-6 border-b border-white/5 hover:border-gold/30 transition-all font-mono"
                      >
                          <div className="text-[9px] font-bold text-gold/20 uppercase tracking-[0.2em] mb-2 group-hover:text-gold transition-colors leading-none">{usg.role}</div>
                          <div className="font-display font-bold text-xl text-white/80 uppercase italic tracking-tighter leading-none">{usg.name}</div>
                          
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            className="absolute bottom-[-1px] left-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"
                          />
                      </motion.div>
                  ))}
              </div>
            </div>
        </div>
      </div>

      {/* Profile Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-navy-dark/95 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="glass w-full max-w-4xl rounded-[3rem] border-white/10 relative overflow-hidden shadow-2xl"
            >
              <div className="grid md:grid-cols-2">
                 <div className="aspect-[4/5] md:aspect-auto h-full overflow-hidden">
                    <img src={selectedMember.img} className="w-full h-full object-cover" alt="" />
                 </div>
                 <div className="p-12 relative flex flex-col justify-center">
                    <button 
                      onClick={() => setSelectedMember(null)}
                      className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors"
                    >
                      <X size={24} />
                    </button>
                    
                    <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">{selectedMember.role}</span>
                    <h3 className="text-5xl font-display font-black mb-8 uppercase italic leading-none tracking-tighter">
                      {selectedMember.name}
                    </h3>
                    
                    <p className="text-lg text-white/50 leading-relaxed font-light italic mb-10">
                      "Leading Harmonia 2026 with a vision of unity and global progress. We invite you to join us in this journey of diplomacy."
                    </p>

                    <div className="flex gap-4">
                       <button className="flex-1 px-8 py-4 bg-gold text-navy-dark font-black rounded-2xl hover:bg-gold-light transition-all active:scale-95 text-xs uppercase tracking-widest">Connect</button>
                       <button className="px-8 py-4 glass border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all text-xs uppercase tracking-widest">View Profile</button>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
