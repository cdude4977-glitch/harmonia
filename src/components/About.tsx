import { motion } from 'motion/react';
import { Target, Lightbulb, Users, Search, Mic, Award, Globe, Shield } from 'lucide-react';
import { Counter } from './ui/InteractiveElements';

const FEATURES = [
  { icon: Target, title: 'Leadership', desc: 'Developing the vision to lead with integrity and empathy.' },
  { icon: Mic, title: 'Public Speaking', desc: 'Mastering the art of persuasion and diplomatic communication.' },
  { icon: Search, title: 'Research', desc: 'Deep-diving into complex global issues to find viable solutions.' },
  { icon: Lightbulb, title: 'Critical Thinking', desc: 'Analyzing perspectives to navigate modern global challenges.' },
  { icon: Users, title: 'Networking', desc: 'Building lifelong connections with future global leaders.' },
];

const STATS = [
  { label: 'Delegates', value: 500, suffix: '+', icon: Users },
  { label: 'Schools', value: 50, suffix: '+', icon: Globe },
  { label: 'Committees', value: 15, suffix: '', icon: Shield },
  { label: 'Awards', value: 100, suffix: '+', icon: Award },
];

export function About() {
  return (
    <section id="about" className="section-padding bg-navy overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full -mr-64 -mt-64" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-gold font-mono font-bold uppercase tracking-[0.6em] text-[10px] mb-6 block"
            >
              The Legacy of Harmonia
            </motion.span>
            <h2 className="text-5xl md:text-8xl font-display font-bold mb-10 leading-[0.8] tracking-tight uppercase italic drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              Empowering <br />
              <span className="text-gold">Global Diplomats</span>
            </h2>
            <p className="text-xl text-white/50 mb-12 leading-relaxed font-light tracking-tight max-w-xl">
              Shalom Harmonia 2026 is a prestigious inter-school Model United Nations conference designed to empower future leaders through diplomacy, negotiation, critical thinking, and global discourse.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8 mb-12">
              {FEATURES.slice(0, 4).map((f, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-start gap-5"
                >
                  <div className="bg-white/5 p-3 rounded-2xl border border-white/5 group-hover:bg-gold/10 group-hover:border-gold/20 transition-all duration-500">
                    <f.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-xs mb-1 uppercase tracking-[0.2em] italic">{f.title}</h4>
                    <p className="text-[11px] text-white/30 leading-relaxed font-mono uppercase tracking-tighter font-medium">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border border-white/5 group">
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop" 
                alt="Diplomacy" 
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent opacity-60" />
            </div>
            
            {/* Floating Stats Shield */}
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -bottom-12 -left-12 bg-royal/90 backdrop-blur-2xl p-10 rounded-[2.5rem] z-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
            >
                <div className="text-7xl font-display font-black text-gold mb-2 italic tracking-tighter">10th</div>
                <div className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-mono font-bold leading-none">Edition of <br />Excellence</div>
            </motion.div>

            <div className="absolute -top-10 -right-10 w-full h-full border border-gold/20 rounded-[3rem] z-0 pointer-events-none" />
          </motion.div>
        </div>

        {/* Interactive Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-32">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-10 rounded-[2rem] border-white/5 flex flex-col items-center text-center group hover:border-gold/20 transition-all duration-500"
            >
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 text-gold group-hover:scale-110 transition-transform">
                <stat.icon size={24} />
              </div>
              <div className="text-5xl font-display font-black text-white mb-2 italic tracking-tighter">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-mono font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Messages() {
  const MESSAGES = [
    {
      role: 'Founder',
      name: 'Dr. (Mrs) Lilly George',
      msg: 'Welcome to Harmonia 2026. Our vision is to nurture students into empathetic global citizens who lead with wisdom.',
      color: 'gold'
    },
    {
      role: 'Sherpa & Vice Chairman',
      name: 'Mr Dennis George',
      msg: 'MUN is more than a simulation; it is a laboratory for peace. We expect rigorous debate and creative solutions.',
      color: 'royal'
    },
     {
      role: 'Convener',
      name: 'Ms Swastika Acharya',
      msg: 'Leadership is defined in times of crisis. Harmonia provides the platform to test your mettle as a diplomat.',
      color: 'gold'
    },
    {
      role: 'Convener',
      name: 'Ms Monika Sharma',
      msg: 'Empowering youth to think critically about global issues is the cornerstone of a better future.',
      color: 'royal'
    }
  ];

  return (
    <section className="section-padding relative overflow-hidden">
        <div className="absolute top-0 right-0 py-20 pointer-events-none opacity-5">
            <span className="text-[20vw] font-display font-black leading-none">MESSAGE</span>
        </div>
        
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-5xl md:text-6xl font-display font-bold mb-20 text-center tracking-tight uppercase italic decoration-gold/50">Voices of <span className="text-gold">Leadership</span></h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 font-mono">
          {MESSAGES.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl border-l-[6px] hover:translate-y-[-5px] transition-all"
              style={{ borderColor: m.color === 'gold' ? '#C5A059' : '#1B3B6F' }}
            >
              <div className="mb-6">
                <div className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-2">{m.role}</div>
                <div className="font-display font-black text-xl italic tracking-tighter uppercase">{m.name}</div>
              </div>
              <p className="text-[13px] text-white/40 leading-relaxed italic tracking-tight">"{m.msg}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
