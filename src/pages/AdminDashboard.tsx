import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, LayoutDashboard, Trophy, Newspaper, Users, LogOut, Save, ShieldAlert, Plus, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AdminDashboard() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [activeTab, setActiveTab] = useState('scores');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === (import.meta.env.VITE_ADMIN_PASSCODE || 'MUN2026')) {
        setIsAuthorized(true);
    } else {
        alert('Invalid Diplomatic Credentials');
    }
  };

  if (!isAuthorized) {
    return (
        <div className="min-h-screen bg-navy-dark flex items-center justify-center p-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass max-w-md w-full p-10 rounded-[2.5rem] border-gold/20 text-center"
            >
                <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                    <Lock className="text-gold" />
                </div>
                <h1 className="text-2xl font-display font-bold mb-2">Secretariat Access</h1>
                <p className="text-white/40 text-sm mb-8">Please enter your secure diplomatic verification code to manage Harmonia 2026.</p>
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <input 
                        type="password" 
                        placeholder="Security Code"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-gold outline-none text-center tracking-[1em]"
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                    />
                    <button className="w-full py-4 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-all">Authorize Access</button>
                </form>
            </motion.div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/10 bg-navy-dark/50 hidden md:flex flex-col">
            <div className="p-8 border-b border-white/10">
                <div className="font-display font-bold text-xl text-gold">ADMIN PANEL</div>
                <div className="text-[10px] text-white/20 uppercase tracking-widest mt-1">Harmonia 2026</div>
            </div>
            
            <nav className="flex-1 p-4 space-y-2">
                {[
                    { id: 'scores', label: 'Leaderboard', icon: Trophy },
                    { id: 'notices', label: 'Announcements', icon: Newspaper },
                    { id: 'OC', label: 'Team Members', icon: Users },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium",
                            activeTab === tab.id ? "bg-gold text-navy-dark shadow-lg shadow-gold/20" : "text-white/40 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <tab.icon size={18} /> {tab.label}
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-white/10">
                <button 
                  onClick={() => setIsAuthorized(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all text-sm font-medium"
                >
                    <LogOut size={18} /> De-authorize
                </button>
            </div>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-10">
            <header className="flex justify-between items-center mb-12">
                <div>
                   <h2 className="text-3xl font-display font-bold">Haromonizing <span className="text-gold italic">Data</span></h2>
                   <p className="text-white/40 text-sm">Managing live feed for current {activeTab} information.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] uppercase font-bold tracking-widest">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Live System Secure
                    </div>
                    <button className="p-3 glass rounded-xl text-gold hover:bg-gold/10 transition-all"><Save size={20} /></button>
                </div>
            </header>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                >
                    {activeTab === 'scores' && (
                        <div className="glass rounded-3xl p-8 border-gold/10">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="font-bold flex items-center gap-2 font-display text-xl"><Trophy size={20} className="text-gold" /> Institutional Points</h3>
                                <button className="p-2 bg-royal/20 text-royal hover:bg-royal hover:text-white rounded-lg transition-all"><Plus size={16} /></button>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { school: 'Heritage Global', score: 1250 },
                                    { school: 'St. Mary’s', score: 1180 },
                                    { school: 'Pathways World', score: 1150 }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl items-center">
                                       <span className="text-white/20 font-bold w-4">{i+1}</span>
                                       <input type="text" value={item.school} className="flex-1 bg-transparent outline-none focus:text-gold" />
                                       <input type="number" value={item.score} className="w-20 bg-white/5 border border-white/10 rounded px-2 text-gold font-bold" />
                                       <button className="text-white/20 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'notices' && (
                        <div className="space-y-6">
                            <div className="glass rounded-3xl p-8 border-royal/30 bg-royal/10">
                                <h3 className="font-bold mb-6 font-display text-xl">Publish New Notice</h3>
                                <div className="space-y-4">
                                    <select className="w-full bg-white/10 border border-white/20 rounded-xl p-4 outline-none focus:border-gold">
                                        <option className="bg-navy">General Notice</option>
                                        <option className="bg-navy">UNSC Crisis</option>
                                        <option className="bg-navy">Schedule Update</option>
                                    </select>
                                    <textarea placeholder="Enter notice content..." className="w-full bg-white/10 border border-white/20 rounded-xl p-4 outline-none focus:border-gold resize-none h-32"></textarea>
                                    <button className="px-8 py-3 bg-royal text-white font-bold rounded-xl hover:bg-royal-light transition-all flex items-center gap-2">
                                        <Newspaper size={18} /> Broadcast Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'OC' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="glass p-6 rounded-2xl group border-white/5 hover:border-gold/30 transition-all">
                                    <div className="aspect-square bg-white/5 rounded-xl mb-4 flex items-center justify-center">
                                        <Users className="text-white/10 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <input type="text" placeholder="OC Member Name" className="w-full bg-transparent border-b border-white/10 mb-2 py-1 outline-none focus:border-gold" />
                                    <input type="text" placeholder="Department" className="w-full bg-transparent text-xs text-white/30 outline-none" />
                                </div>
                            ))}
                            <button className="aspect-square glass border-dashed flex flex-col items-center justify-center gap-4 text-white/20 hover:text-gold hover:border-gold transition-all">
                                <Plus size={40} />
                                <span className="font-bold text-xs uppercase tracking-widest text-center">Add Team Member</span>
                            </button>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </main>
    </div>
  );
}
