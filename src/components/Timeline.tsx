import { motion, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';
import { TIMELINE } from '../data';
import { CheckCircle2, Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="itinerary" className="section-padding bg-navy relative overflow-hidden" ref={containerRef}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gold font-mono font-bold uppercase tracking-[0.6em] text-[10px] mb-4 block"
          >
            The Schedule
          </motion.span>
          <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tight leading-[0.85] uppercase italic">
            Itinerary of <br /><span className="text-gold">Excellence</span>
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Progress Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2">
            <motion.div 
              style={{ scaleY, originY: 0 }}
              className="absolute inset-0 bg-gradient-to-b from-gold to-royal shadow-[0_0_15px_rgba(234,179,8,0.5)]"
            />
          </div>

          <div className="space-y-32">
            {TIMELINE.map((item, i) => (
              <div key={i} className={cn(
                "relative flex flex-col md:flex-row items-center gap-12",
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              )}>
                
                {/* Visual Label (Day 01) */}
                <div className="absolute -top-16 md:top-1/2 md:-translate-y-1/2 left-4 md:left-auto md:right-auto text-[18vw] md:text-[14rem] font-display font-black text-white/[0.02] pointer-events-none select-none z-0 tracking-[-0.1em]">
                  0{i + 1}
                </div>

                {/* Content Card */}
                <motion.div 
                  initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ amount: 0.5 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full md:w-[45%] z-10"
                >
                  <div className="glass p-10 rounded-[2.5rem] border-white/5 group hover:border-gold/20 transition-colors duration-500 relative overflow-hidden">
                    {/* Active Indicator Glow */}
                    <motion.div 
                        whileInView={{ opacity: [0, 0.3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-gold/5 pointer-events-none"
                    />

                    <div className="flex items-center gap-3 text-gold font-display font-black text-3xl mb-8 tracking-tighter italic">
                      <Calendar className="w-6 h-6" />
                      {item.day}
                    </div>

                    <div className="space-y-6 font-mono">
                      {item.events.map((event, ei) => (
                        <motion.div 
                          key={ei}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + (ei * 0.1) }}
                          className="flex items-center gap-4 group/item"
                        >
                          <motion.div 
                            whileInView={{ scale: [1, 1.5, 1], backgroundColor: ["rgba(234,179,8,0.2)", "rgba(234,179,8,1)", "rgba(234,179,8,0.2)"] }}
                            transition={{ duration: 2, repeat: Infinity, delay: ei * 0.2 }}
                            className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover/item:bg-gold transition-colors" 
                          />
                          <span className="text-white/70 text-sm md:text-base tracking-tight group-hover/item:text-white transition-colors uppercase font-medium">{event}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Center Pulse Point */}
                <div className="absolute left-4 md:left-1/2 top-4 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20">
                  <motion.div 
                    whileInView={{ 
                        scale: [1, 1.5, 1], 
                        backgroundColor: ['#1e293b', '#eab308', '#eab308'],
                        borderColor: ['#334155', '#1e293b', '#1e293b']
                    }}
                    viewport={{ amount: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="w-4 h-4 rounded-full border-4 border-navy-dark shadow-[0_0_20px_rgba(234,179,8,0.3)] bg-navy-light"
                  />
                </div>

                {/* Empty Space for layout balancing */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links / CTAs */}
        <div className="mt-32 flex flex-wrap justify-center gap-6 font-mono">
            <div className="glass px-8 py-4 rounded-2xl flex items-center gap-3 text-white/40 text-[10px] uppercase font-bold tracking-widest">
                <MapPin className="text-gold w-4 h-4" />
                Shalom Hills International, Gurugram
            </div>
            <div className="glass px-8 py-4 rounded-2xl flex items-center gap-3 text-white/40 text-[10px] uppercase font-bold tracking-widest">
                <Clock className="text-gold w-4 h-4" />
                9:00 AM - 5:00 PM IST
            </div>
        </div>
      </div>
    </section>
  );
}

export function Registration({ customLink }: { customLink?: string }) {
  const dynamicLink = customLink || (typeof window !== 'undefined' ? localStorage.getItem('googleFormLink') : 'https://forms.google.com');
  
  return (
    <section id="registration" className="section-padding relative overflow-hidden bg-navy-dark">
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-royal rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-gold rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 text-center px-6">
        <div className="glass p-12 md:p-24 rounded-[4rem] border-gold/40 relative overflow-hidden group">
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-gold/40 rounded-tr-[4rem] group-hover:w-40 group-hover:h-40 transition-all duration-700" />
          
          <span className="text-gold font-mono font-bold uppercase tracking-[0.5em] text-[10px] mb-8 block">Join the Legacy</span>
          <h2 className="text-5xl md:text-9xl font-display font-bold mb-12 leading-[0.8] tracking-tight uppercase italic">
            Register for <br /><span className="text-gold">Harmonia 2026</span>
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 mb-20 font-mono">
            <div className="text-center md:text-left">
                <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mb-2">Registration Fee</div>
                <div className="text-6xl font-display font-bold text-gold tracking-tighter italic">₹3,200</div>
                <div className="text-[9px] text-white/10 uppercase tracking-[0.3em] mt-3">Inclusive of Executive Perks</div>
            </div>
            <div className="w-px h-24 bg-white/10 hidden md:block" />
            <div className="space-y-6">
                <div className="flex items-center gap-4 text-white/40 text-[12px] uppercase tracking-wider font-bold justify-center md:justify-start">
                    <CheckCircle2 className="text-gold w-6 h-6" /> All-access pass to 13+ committees
                </div>
                <div className="flex items-center gap-4 text-white/40 text-[12px] uppercase tracking-wider font-bold justify-center md:justify-start">
                    <CheckCircle2 className="text-gold w-6 h-6" /> Official Shalom MUN Merchandise
                </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a 
              href={dynamicLink || "https://forms.google.com"} 
              target="_blank" 
              rel="noreferrer"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gold hover:bg-gold-light text-navy-dark font-black rounded-2xl overflow-hidden transition-all shadow-2xl shadow-gold/20 active:scale-95"
            >
              <span className="relative z-10 text-lg">Apply as Delegate</span>
              <ExternalLink className="relative z-10" size={20} />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </a>

            <a 
              href="https://forms.gle/EB-Registration" 
              target="_blank" 
              rel="noreferrer"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white/5 border border-white/20 hover:bg-white/10 text-white font-black rounded-2xl overflow-hidden transition-all active:scale-95"
            >
              <span className="relative z-10 text-lg tracking-tight">Apply for EB</span>
              <ExternalLink className="relative z-10" size={20} />
            </a>
          </div>
          
          <p className="mt-12 text-white/20 text-xs italic">* Last date for registration: 20 June 2026. Priority allotments close by June 1st.</p>
        </div>
      </div>
    </section>
  );
}
