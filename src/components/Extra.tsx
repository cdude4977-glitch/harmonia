import { motion } from 'motion/react';
import { HelpCircle, ChevronDown, Award, Star, Zap } from 'lucide-react';
import { useState } from 'react';

const FAQS = [
  { q: "What is the dress code for Harmonia 2026?", a: "Western Formals for Day 1. Traditional/Indian Formals are permitted for AIPPM. Ethnic wear is encouraged for the Social Night." },
  { q: "Can individual delegates apply?", a: "Yes, we accept both school delegations and individual delegate applications." },
  { q: "Is the registration fee inclusive of transport?", a: "Transport is not included. However, we provide shuttle services from the nearest metro station." },
  { q: "What are the criteria for awards?", a: "Awards are based on diplomatic negotiation skills, quality of content, adherence to ROP, and constructive caucus participation." }
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-padding bg-navy-dark">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-display font-bold mb-12 text-center">Frequently <span className="text-gold italic">Asked</span></h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden border-white/5">
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-all outline-none"
              >
                <span className="font-bold text-sm md:text-base">{faq.q}</span>
                <ChevronDown className={`transition-transform duration-500 text-gold ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <div 
                className={`transition-all duration-500 ease-in-out px-6 ${open === i ? 'max-h-40 py-6 border-t border-white/5' : 'max-h-0'}`}
              >
                <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
