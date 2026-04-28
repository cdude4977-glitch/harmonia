import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Globe2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WORLD_FACTS, DYNAMIC_PHRASES } from '../data';
import { cn } from '../lib/utils';

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [factIndex, setFactIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = new Date('2026-07-10T09:00:00');
    const timer = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / 1000 / 60) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    const factTimer = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % WORLD_FACTS.length);
    }, 5000);

    const phraseTimer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % DYNAMIC_PHRASES.length);
    }, 3500);

    return () => {
      clearInterval(timer);
      clearInterval(factTimer);
      clearInterval(phraseTimer);
    };
  }, []);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-[110vh] flex flex-col items-center justify-center pt-32 pb-40 overflow-hidden"
    >
      {/* Background World Map Pattern */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat bg-contain" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-transparent to-navy-dark" />
      </div>

        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-[0.03] z-0 select-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={phraseIndex}
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2, y: -100 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[25vw] font-display font-extrabold italic text-gold whitespace-nowrap opacity-10 tracking-[-0.05em] select-none"
          >
            {DYNAMIC_PHRASES[phraseIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-royal/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.3em] mb-8 md:mb-12"
        >
          <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
          <span className="text-white/80">Registration is Live</span>
          <span className="text-gold opacity-50">•</span>
          <span className="text-gold">Harmonia 2026</span>
        </motion.div>

        <div className="relative mb-8 md:mb-10">
          {/* Translucent School Logo Background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.08, scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
          >
            <div className="w-64 h-64 md:w-[600px] md:h-[600px] border-[1px] border-gold/30 rounded-full flex items-center justify-center animate-[spin_60s_linear_infinite]">
               <div className="w-full h-full border-t-[3px] border-gold/20 rounded-full" />
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-[clamp(4.5rem,18.5vw,13rem)] font-display font-bold tracking-tight leading-[0.75] uppercase italic"
          >
            HARMONIA <br />
            <span className="text-gold selection:bg-white selection:text-gold drop-shadow-[0_0_30px_rgba(197,160,89,0.3)]">MUN</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, letterSpacing: '0.6em' }}
            transition={{ delay: 0.5, duration: 2 }}
            className="relative z-10 mt-10 text-gold font-display font-bold uppercase text-[10px] md:text-sm italic tracking-[1em] md:tracking-[1.2em] whitespace-nowrap overflow-visible"
          >
            <span className="drop-shadow-[0_0_20px_rgba(197,160,89,0.4)]">Emissaries of Effectuation</span>
          </motion.div>
        </div>

        {/* Interactive Dynamic Phrase - letter by letter */}
        <div className="mb-14 h-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
             <motion.div
               key={phraseIndex}
               className="flex items-center justify-center gap-[0.2em] md:gap-[0.5em]"
             >
               {DYNAMIC_PHRASES[phraseIndex].split("").map((char, i) => (
                 <motion.span
                   key={i}
                   initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                   animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                   exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                   transition={{ delay: i * 0.03, duration: 0.2 }}
                   className={cn(
                     "text-[10px] md:text-sm font-black tracking-widest uppercase cursor-default transition-all hover:scale-110",
                     char === " " ? "mr-4" : "text-white/40 hover:text-gold"
                   )}
                 >
                   {char}
                 </motion.span>
               ))}
             </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-20"
        >
          <Link 
            to="/committees" 
            className="group px-10 py-5 bg-gold text-navy-dark font-black rounded-2xl hover:bg-gold-light transition-all flex items-center gap-3 shadow-2xl shadow-gold/30 text-sm md:text-base active:scale-95"
          >
            Explore Committees
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            to="/contact" 
            className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all backdrop-blur-xl text-sm md:text-base hover:border-gold/30 active:scale-95"
          >
            Register Now
          </Link>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-4 md:gap-8 mb-20"
        >
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.mins },
            { label: 'Secs', value: timeLeft.secs },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative w-16 h-16 md:w-28 md:h-28 glass rounded-[2rem] border-white/5 flex items-center justify-center">
                  <span className="text-2xl md:text-5xl font-display font-bold text-gold">
                    {item.value.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
              <span className="mt-4 text-[8px] md:text-[10px] uppercase font-bold tracking-[0.4em] text-white/30 font-sans">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Hero Foot Ticker */}
      <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 z-20">
        <div className="max-w-7xl mx-auto glass p-4 rounded-3xl flex items-center gap-8 overflow-hidden border-white/5">
          <div className="flex items-center gap-3 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-royal animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-royal">MUN Bulletin</span>
          </div>
          <div className="relative flex-1 h-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={factIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="absolute text-[11px] md:text-sm tracking-wide text-white/50 font-medium"
              >
                {WORLD_FACTS[factIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="hidden md:flex gap-1.5 shrink-0">
            {WORLD_FACTS.slice(0, 5).map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === factIndex % 5 ? 'bg-gold w-6' : 'bg-white/10'}`} />
            ))}
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 text-white/10 hidden lg:block"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}
