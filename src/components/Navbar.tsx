import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Landmark } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Committees', path: '/committees' },
  { name: 'Scores', path: '/scores' },
  { name: 'Notices', path: '/notices' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Secretariat', path: '/secretariat' },
  { name: 'Delegate Hub', path: '/delegate-hub' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b',
        isScrolled ? 'bg-navy-dark/95 backdrop-blur-xl border-white/10 py-3 shadow-2xl' : 'bg-transparent border-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="w-12 h-12 bg-gold shadow-[0_0_20px_rgba(197,160,89,0.3)] rounded-2xl flex items-center justify-center border border-white/10"
          >
            <Landmark className="text-navy-dark w-7 h-7" />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-2xl leading-none tracking-[-0.02em] italic uppercase group-hover:text-gold transition-colors">HARMONIA MUN</span>
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shadow-[0_0_8px_rgba(197,160,89,1)]" />
               <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-mono font-bold">Shalom</span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1.5">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => cn(
                "px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-all rounded-xl border border-transparent whitespace-nowrap",
                isActive 
                  ? "text-gold border-gold/20 bg-gold/5" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              {link.name}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="ml-3 bg-gold hover:bg-gold-light text-navy-dark px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-gold/20 active:scale-95"
          >
            Register
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-navy border-b border-white/10 lg:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-2">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => cn(
                    "px-6 py-4 rounded-2xl text-base font-bold uppercase tracking-widest border border-transparent transition-colors",
                    isActive ? "bg-gold/10 text-gold border-gold/20" : "text-white/60 hover:bg-white/5"
                  )}
                >
                  {link.name}
                </NavLink>
              ))}
              <Link 
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-gold text-navy-dark py-5 rounded-2xl font-black uppercase tracking-widest text-center mt-4"
              >
                Register Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
