import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Medal, Star, TrendingUp, ChevronRight, Activity, Award } from 'lucide-react';
import { cn } from '../lib/utils';
import { COMMITTEES } from '../data';

export default function Scores({ initialScores }: { initialScores?: any }) {
  const [selectedId, setSelectedId] = useState(COMMITTEES[0].id);
  const committee = COMMITTEES.find(c => c.id === selectedId);
  
  const delegates = useMemo(() => {
    const raw = initialScores?.[selectedId] || [];
    return [...raw].sort((a, b) => 
      (b.research + b.diplomacy + b.lobbying) - (a.research + a.diplomacy + a.lobbying)
    );
  }, [initialScores, selectedId]);

  const topThree = delegates.slice(0, 3);
  const rest = delegates.slice(3);

  return (
    <section id="scores" className="section-padding bg-navy relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-royal/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gold font-mono font-bold uppercase tracking-[0.6em] text-[10px] mb-4 block"
          >
            The Battleground of Ideas
          </motion.span>
          <h2 className="text-5xl md:text-8xl font-display font-bold mb-8 uppercase italic tracking-tight leading-[0.85]">
            Live <br /><span className="text-gold">Leaderboard</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-6 text-white/30 text-[9px] uppercase font-bold font-mono tracking-[0.2em]">
            <span className="flex items-center gap-2"><Trophy size={14} className="text-gold" /> Research</span>
            <span className="flex items-center gap-2"><Star size={14} className="text-gold" /> Diplomacy</span>
            <span className="flex items-center gap-2"><Activity size={14} className="text-gold" /> Lobbying</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
           {/* Sidebar: Committee Select */}
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="lg:col-span-1 space-y-6"
           >
              <div className="glass p-8 rounded-[2rem] border-white/5 bg-white/[0.02]">
                <h4 className="text-[10px] uppercase font-black text-gold mb-8 tracking-[0.3em]">Select Forum</h4>
                <div className="space-y-1">
                  {COMMITTEES.map(c => (
                    <button 
                      key={c.id}
                      onClick={() => setSelectedId(c.id)}
                      className={cn(
                        "w-full text-left px-5 py-4 rounded-2xl text-xs transition-all flex items-center justify-between group",
                        selectedId === c.id ? "bg-gold text-navy-dark shadow-xl" : "hover:bg-white/5 text-white/60"
                      )}
                    >
                      <span className="font-extrabold uppercase tracking-wider">{c.name}</span>
                      <ChevronRight size={14} className={cn("transition-transform", selectedId === c.id ? "translate-x-1" : "group-hover:translate-x-1")} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass p-8 rounded-[2rem] border-white/5 bg-navy-light text-center">
                 <Award size={32} className="mx-auto mb-4 text-gold/50" />
                 <h5 className="text-sm font-black uppercase tracking-widest mb-2">Tabulation Mode</h5>
                 <p className="text-[10px] text-white/40 leading-relaxed italic">
                    Scores are normalized based on committee difficulty and session performance.
                 </p>
              </div>
           </motion.div>

           {/* Results Pane */}
           <div className="lg:col-span-3 space-y-8">
              {delegates.length > 0 ? (
                <>
                  {/* Top 3 Podium Cards */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {topThree.map((d, i) => (
                      <motion.div
                        key={d.id}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={cn(
                          "glass p-8 rounded-[2.5rem] relative overflow-hidden flex flex-col items-center text-center",
                          i === 0 ? "border-gold/30 bg-gold/[0.03] scale-105 z-10 md:-translate-y-2" : "border-white/5"
                        )}
                      >
                        {i === 0 && (
                          <div className="absolute top-4 right-4">
                            <Trophy size={20} className="text-gold animate-bounce" />
                          </div>
                        )}
                        <div className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-2xl font-display font-black border-2",
                          i === 0 ? "bg-gold text-navy-dark border-gold" : 
                          i === 1 ? "bg-white/10 text-white border-white/20" : 
                          "bg-navy-light text-white/60 border-white/10"
                        )}>
                          {i + 1}
                        </div>
                        <h4 className="text-3xl font-display font-bold mb-1 uppercase tracking-tighter italic leading-none">{d.name}</h4>
                        <div className="text-[9px] text-gold/60 uppercase font-mono font-bold tracking-[0.3em] mb-6">{d.country}</div>
                        
                        <div className="w-full h-px bg-white/5 mb-6" />
                        
                        <div className="flex justify-between w-full text-center px-2 font-mono">
                           <div>
                              <div className="text-[8px] text-white/20 uppercase font-bold tracking-widest">Score</div>
                              <div className="text-3xl font-display font-black text-white">{d.research + d.diplomacy + d.lobbying}</div>
                           </div>
                           <div className="text-right">
                              <div className="text-[8px] text-white/20 uppercase font-bold tracking-widest">Rank</div>
                              <div className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mt-1">Elite {i + 1}</div>
                           </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Rest of the List */}
                  <div className="glass rounded-[2rem] border-white/5 overflow-hidden">
                    <div className="p-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center px-8">
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Detailed Standings</span>
                       <TrendingUp size={16} className="text-gold" />
                    </div>
                    <div className="divide-y divide-white/5 font-mono">
                      {rest.map((d, i) => (
                        <motion.div
                          key={d.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (i + 3) * 0.05 }}
                          className="flex items-center justify-between p-6 px-10 hover:bg-white/[0.03] transition-colors group"
                        >
                          <div className="flex items-center gap-8">
                            <span className="text-sm font-display font-black text-white/20 group-hover:text-gold transition-colors">{i + 4}</span>
                            <div>
                               <div className="font-bold text-base md:text-lg uppercase tracking-tight leading-none mb-1 font-display italic">{d.name}</div>
                               <div className="text-[9px] text-white/20 uppercase font-bold tracking-[0.2em]">{d.country}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-12 text-right">
                             <div className="hidden lg:grid grid-cols-3 gap-8">
                                <div>
                                  <div className="text-[8px] text-white/20 uppercase">RES</div>
                                  <div className="text-xs font-bold text-white/60">{d.research}</div>
                                </div>
                                <div>
                                  <div className="text-[8px] text-white/20 uppercase">DIP</div>
                                  <div className="text-xs font-bold text-white/60">{d.diplomacy}</div>
                                </div>
                                <div>
                                  <div className="text-[8px] text-white/20 uppercase">LOB</div>
                                  <div className="text-xs font-bold text-white/60">{d.lobbying}</div>
                                </div>
                             </div>
                             <div>
                                <div className="text-[8px] text-white/20 uppercase font-black">Total</div>
                                <div className="text-xl font-display font-black text-gold">{d.research + d.diplomacy + d.lobbying}</div>
                             </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-40 glass rounded-[3rem] border-white/5 border-dashed bg-white/[0.01]">
                   <div className="relative mb-8">
                      <div className="absolute inset-0 bg-gold/10 blur-3xl rounded-full scale-150" />
                      <Medal size={64} className="text-gold/20 relative animate-pulse" />
                   </div>
                   <h3 className="text-3xl font-display font-black uppercase italic text-white/30 mb-4 tracking-tighter">Scores Tabulating</h3>
                   <p className="text-sm text-white/20 max-w-sm text-center font-light italic">
                      Performance data is currently being processed by the Secretariat. Live updates will appear here soon.
                   </p>
                </div>
              )}
           </div>
        </div>
      </div>
    </section>
  );
}
