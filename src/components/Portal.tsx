import { Download, FileText, Ruler, Calendar, Info } from 'lucide-react';

const RESOURCES = [
  { name: 'Study Guides', icon: FileText, size: '2.4 MB' },
  { name: 'Rules of Procedure', icon: Ruler, size: '1.1 MB' },
  { name: 'Position Paper Guide', icon: FileText, size: '840 KB' },
  { name: 'Dress Code Policy', icon: Info, size: '560 KB' },
  { name: 'Conference Schedule', icon: Calendar, size: '1.2 MB' },
];

export function PortalHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12">
      <div className="glass p-12 rounded-[2.5rem] border-white/5 relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent">
        <div className="relative z-10">
          <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Conference Hub</span>
          <h1 className="text-6xl md:text-8xl font-display font-black italic tracking-tighter mb-4 leading-none">
            EYE-CATCHING <br />
            <span className="text-royal">EXCELLENCE</span>
          </h1>
          <p className="text-white/50 max-w-lg text-lg leading-relaxed font-light">
            Experience the harmony of global diplomacy through our state-of-the-art information hub. Stay updated on all conference shifts and highlights.
          </p>
        </div>
        <div className="absolute top-1/2 -right-12 -translate-y-1/2 opacity-5 pointer-events-none">
          <FileText size={400} strokeWidth={0.5} />
        </div>
      </div>
    </div>
  );
}

export function Resources() {
  return (
    <section id="resources" className="section-padding bg-navy-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
                <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Knowledge Base</span>
                <h2 className="text-4xl font-display font-bold italic">Preparation <span className="text-royal">Resources</span></h2>
            </div>
            <p className="max-w-xs text-white/40 text-sm">Extensive study materials curated by the secretariat to ensure the highest level of debate.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESOURCES.map((res, i) => (
                <div key={i} className="group glass p-6 rounded-2xl flex items-center justify-between hover:border-gold/50 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/5 p-3 rounded-xl group-hover:bg-gold/10 transition-colors">
                            <res.icon className="text-white/20 group-hover:text-gold transition-colors" />
                        </div>
                        <div>
                            <div className="text-sm font-bold">{res.name}</div>
                            <div className="text-[10px] text-white/20 uppercase tracking-widest">{res.size} • PDF</div>
                        </div>
                    </div>
                    <div className="text-white/10 group-hover:text-white transition-colors">
                        <Download size={20} />
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
