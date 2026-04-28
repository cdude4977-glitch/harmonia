import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Globe, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Contact() {
  return (
    <section id="contact" className="section-padding bg-navy">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl font-display font-bold mb-10 italic">Let's <span className="text-gold">Connect</span></h2>
            <p className="text-white/50 mb-12 max-w-md">Our secretariat and teacher coordinators are available to answer any queries regarding registration, logistics, or allotments.</p>
            
            <div className="space-y-10">
                <div className="flex items-start gap-6">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                        <Mail className="text-gold" />
                    </div>
                    <div>
                        <div className="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-1">General Inquiries</div>
                        <a href="mailto:info@shalommun.in" className="text-lg font-medium hover:text-gold transition-colors">info@shalommun.in</a>
                    </div>
                </div>
                <div className="flex items-start gap-6">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                        <Phone className="text-royal" />
                    </div>
                    <div>
                        <div className="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-1">Secretariat Hotline</div>
                        <div className="text-lg font-medium">+91 99999 88888</div>
                    </div>
                </div>
                <div className="flex items-start gap-6">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                        <MapPin className="text-gold" />
                    </div>
                    <div>
                        <div className="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-1">Venue</div>
                        <div className="text-lg font-medium">Shalom Hills International School, Gurgaon</div>
                    </div>
                </div>
            </div>
          </div>

          <div className="glass p-10 rounded-[2.5rem] border-white/10">
            <h3 className="text-2xl font-display font-bold mb-8">Direct Message</h3>
            <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                    <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-gold outline-none transition-all placeholder:text-white/20" />
                    <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-gold outline-none transition-all placeholder:text-white/20" />
                </div>
                <input type="text" placeholder="Subject" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-gold outline-none transition-all placeholder:text-white/20" />
                <textarea rows={5} placeholder="How can we help?" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-gold outline-none transition-all placeholder:text-white/20 resize-none"></textarea>
                <button className="w-full py-4 bg-white/10 border border-white/10 rounded-xl font-bold hover:bg-gold hover:text-navy-dark hover:border-gold transition-all">Send Transmission</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer bg-navy-dark pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Landmark className="text-gold w-10 h-10" />
              <div>
                <div className="font-display font-bold text-2xl leading-none">SHALOM MUN</div>
                <div className="text-[10px] uppercase font-bold text-gold tracking-[0.3em]">Harmonia 2026</div>
              </div>
            </div>
            <p className="text-white/40 max-w-sm mb-8 leading-relaxed">
              Nurturing the leaders of tomorrow through the spirit of diplomacy and the power of discourse. A premiere initiative of the Shalom Group of Schools.
            </p>
            <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-gold hover:text-navy transition-all"><Instagram size={20} /></a>
                <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-gold hover:text-navy transition-all"><Globe size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-gold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-white/50 text-sm">
                <li><Link to="/" className="hover:text-gold transition-colors underline-offset-4 hover:underline">About Harmonia</Link></li>
                <li><Link to="/portal" className="hover:text-gold transition-colors underline-offset-4 hover:underline">Delegate Portal</Link></li>
                <li><Link to="/scores" className="hover:text-gold transition-colors underline-offset-4 hover:underline">Live Leaderboard</Link></li>
                <li><Link to="/contact" className="hover:text-gold transition-colors underline-offset-4 hover:underline">Registration</Link></li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold text-sm uppercase tracking-widest text-royal mb-6">Legal</h4>
             <ul className="space-y-4 text-white/50 text-sm">
                <li><a href="#" className="hover:text-gold transition-colors underline-offset-4 hover:underline">Code of Conduct</a></li>
                <li><a href="#" className="hover:text-gold transition-colors underline-offset-4 hover:underline">Rules of Procedure</a></li>
                <li><a href="#" className="hover:text-gold transition-colors underline-offset-4 hover:underline">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">
            <div className="flex items-center gap-4">
                <span>© 2026 SHALOM MUN. ALL RIGHTS RESERVED.</span>
                <a href="/admin" className="hover:text-gold transition-colors">Admin Core</a>
            </div>
            <div className="flex items-center gap-2">
                MADE WITH <div className="text-gold">PRECISION</div> BY SHALOM TECH COUNCIL
            </div>
        </div>
      </div>
    </footer>
  );
}
