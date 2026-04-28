import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { About, Messages } from '../components/About';
import Committees from '../components/Committees';
import Scores from '../components/Scores';
import Secretariat from '../components/Secretariat';
import { Resources, PortalHero } from '../components/Portal';
import { Notices, Gallery } from '../components/InfoModules';
import { Timeline, Registration } from '../components/Timeline';
import { Contact, Footer } from '../components/Contact';
import { FAQ } from '../components/Extra';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { CursorGlow, ScrollProgressBar } from '../components/ui/GlobalPolish';
import { ChevronUp } from 'lucide-react';

export default function MainSite({ notices, gallery, scores, googleFormLink }: any) {
  const location = useLocation();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 1000);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-navy overflow-x-hidden selection:bg-gold selection:text-navy-dark">
      <ScrollProgressBar />
      <CursorGlow />
      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pt-20"
        >
          <Routes location={location}>
            <Route path="/" element={
              <div className="space-y-0">
                <Hero />
                <About />
                <Messages />
                <FAQ />
                <Contact />
              </div>
            } />
            <Route path="/committees" element={<Committees />} />
            <Route path="/scores" element={<Scores initialScores={scores} />} />
            <Route path="/delegate-hub" element={
              <div className="space-y-0">
                <PortalHero />
                <Resources />
              </div>
            } />
            <Route path="/notices" element={<Notices items={notices} />} />
            <Route path="/gallery" element={<Gallery items={gallery} />} />
            <Route path="/secretariat" element={<Secretariat />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={
              <div className="space-y-0">
                <Timeline />
                <FAQ />
                <Registration customLink={googleFormLink} />
                <Contact />
              </div>
            } />
          </Routes>
        </motion.main>
      </AnimatePresence>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-10 right-10 w-14 h-14 bg-gold text-navy-dark rounded-full shadow-2xl z-[10000] flex items-center justify-center hover:scale-110 active:scale-90 transition-all border-4 border-navy"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
