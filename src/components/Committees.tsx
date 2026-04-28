import { useState, useMemo, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Users, BookOpen, Filter, Star, Info, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMMITTEES } from '../data';
import { cn } from '../lib/utils';

const CATEGORIES = ['All', 'UN Core', 'Crisis', 'Regional', 'Historic'];

export default function Committees() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCommittee, setSelectedCommittee] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return COMMITTEES.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                           c.agenda.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || c.type === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const toggleFavorite = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <section id="committees" className="section-padding bg-navy-dark relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.02]">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gold rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-royal rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gold font-mono font-bold uppercase tracking-[0.6em] text-[10px] mb-4 block"
          >
            The Forums of Diplomacy
          </motion.span>
          <h2 className="text-5xl md:text-8xl font-display font-bold mb-12 uppercase italic tracking-tight leading-[0.85]">
            Our <br /><span className="text-gold">Committees</span>
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 glass p-6 md:p-4 rounded-3xl border-white/5 max-w-5xl mx-auto">
            <div className="relative group flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-gold transition-colors" />
              <input 
                type="text" 
                placeholder="Search committees or agendas..."
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-12 focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/30 transition-all text-sm font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95",
                    selectedCategory === cat 
                      ? "bg-gold text-navy-dark shadow-[0_0_20px_rgba(197,160,89,0.3)]" 
                      : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((c, i) => (
              <motion.div
                layout
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedCommittee(c)}
                className="glass group p-10 rounded-[2.5rem] hover:bg-white/[0.08] transition-all border-white/5 hover:border-gold/30 relative overflow-hidden flex flex-col cursor-pointer min-h-[400px]"
              >
                <div className="absolute -top-10 -right-10 text-[15rem] font-black text-white/[0.015] group-hover:text-gold/[0.03] transition-colors select-none pointer-events-none italic tracking-[-0.1em]">
                  {c.id.slice(0, 2)}
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div className="bg-gold/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-gold/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <c.icon className="text-gold w-8 h-8" />
                    </div>
                    <button 
                      onClick={(e) => toggleFavorite(c.id, e)}
                      className={cn(
                        "p-3 rounded-full transition-all active:scale-90",
                        favorites.includes(c.id) ? "text-gold bg-gold/20" : "text-white/20 hover:text-gold hover:bg-white/5"
                      )}
                    >
                      <Star size={20} fill={favorites.includes(c.id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                  
                  <h3 className="text-4xl font-display font-bold mb-4 uppercase italic tracking-tighter leading-[0.8]">
                    <span className="block text-white group-hover:text-gold transition-colors duration-500">{c.name}</span>
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-6 font-mono">
                    <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-[8px] font-bold uppercase tracking-[0.2em] border border-gold/10">
                      {c.type}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/5 text-white/30 text-[8px] font-bold uppercase tracking-[0.2em] border border-white/5">
                      {c.eligibility}
                    </span>
                  </div>

                  <p className="text-[13px] text-white/30 mb-8 line-clamp-3 leading-relaxed italic tracking-tight">
                    {c.agenda}
                  </p>
                  
                  <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full border border-navy-dark bg-white/10" />
                        ))}
                      </div>
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{c.capacity} Slots</span>
                    </div>
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="text-gold"
                    >
                      <Info size={20} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 glass rounded-[3rem] border-white/5 mt-10"
          >
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-white/20">
              <Search size={32} />
            </div>
            <p className="text-xl font-display text-white/30 italic">No committees found matching your criteria</p>
            <button 
              onClick={() => { setSearch(''); setSelectedCategory('All'); }}
              className="mt-6 text-gold font-black uppercase text-xs tracking-widest hover:underline"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Re-using the same modal but with enhanced styling */}
      <AnimatePresence>
        {selectedCommittee && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCommittee(null)}
              className="absolute inset-0 bg-navy-dark/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="glass w-full max-w-5xl rounded-[3.5rem] border-white/10 relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]"
            >
              <div className="grid md:grid-cols-5 h-full max-h-[85vh]">
                <div className="md:col-span-2 bg-gradient-to-br from-royal/20 to-navy-dark p-12 flex flex-col justify-between relative border-r border-white/5">
                  <div className="relative z-10">
                    <div className="w-24 h-24 bg-gold rounded-3xl flex items-center justify-center shadow-2xl mb-10 transform rotate-3">
                      <selectedCommittee.icon size={48} className="text-navy-dark" />
                    </div>
                    <h3 className="text-6xl font-display font-black text-white mb-6 uppercase italic leading-[0.8] tracking-[-0.05em]">
                      {selectedCommittee.name}
                    </h3>
                    <div className="inline-block px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-mono font-bold uppercase tracking-[0.4em]">
                      {selectedCommittee.type}
                    </div>
                  </div>
                  
                  <div className="mt-12 space-y-6 relative z-10 font-mono">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-gold">
                           <Users size={18} />
                        </div>
                        <div>
                           <div className="text-[9px] uppercase font-bold text-white/20 tracking-[0.2em] mb-0.5">Capacity</div>
                           <div className="text-white text-xs font-bold uppercase tracking-tighter">{selectedCommittee.capacity} Delegates</div>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-gold">
                           <BookOpen size={18} />
                        </div>
                        <div>
                           <div className="text-[9px] uppercase font-bold text-white/20 tracking-[0.2em] mb-0.5">Eligibility</div>
                           <div className="text-white text-xs font-bold uppercase tracking-tighter">{selectedCommittee.eligibility}</div>
                        </div>
                     </div>
                  </div>

                  {/* Decorative ID */}
                  <div className="absolute bottom-[-50px] left-[-20px] text-[15rem] font-black text-white/[0.03] italic select-none">
                    {selectedCommittee.id.slice(0, 2)}
                  </div>
                </div>

                <div className="md:col-span-3 p-12 overflow-y-auto custom-scrollbar">
                  <button 
                    onClick={() => setSelectedCommittee(null)}
                    className="absolute top-10 right-10 w-12 h-12 rounded-full glass flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all group"
                  >
                    <X size={24} className="group-hover:rotate-90 transition-transform" />
                  </button>

                  <div className="space-y-12">
                    <div>
                      <div className="text-[10px] uppercase font-black text-gold tracking-[0.4em] mb-6 block">The Agenda</div>
                      <h4 className="text-3xl font-display font-black text-white leading-tight italic">
                        "{selectedCommittee.agenda}"
                      </h4>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase font-black text-white/30 tracking-[0.4em] mb-6 block">Strategic Context</div>
                      <p className="text-white/50 leading-relaxed text-lg font-light italic">
                        {selectedCommittee.details}
                      </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 pt-10 border-t border-white/5">
                      <div className="flex-1">
                        <div className="text-[10px] uppercase font-black text-gold/40 tracking-[0.4em] mb-6">Executive Board</div>
                        <div className="space-y-3">
                          {selectedCommittee.chairs.map((chair: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-3">
                               <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                               <span className="text-xl font-display text-white font-bold italic">{chair}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col justify-end">
                         <Link 
                           to="/contact"
                           className="px-10 py-5 bg-gold text-navy-dark font-black rounded-2xl hover:bg-gold-light transition-all active:scale-95 shadow-xl shadow-gold/20 flex items-center gap-3"
                         >
                           Delegate Application <ArrowRight size={18} />
                         </Link>
                      </div>
                    </div>
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
