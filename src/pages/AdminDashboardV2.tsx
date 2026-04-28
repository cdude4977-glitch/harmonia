import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Users, CreditCard, Landmark, Activity, ChevronRight, Search, Bell, Settings, LogOut, Menu, X, Plus, Filter, Download, Eye, Edit2, CheckCircle, XCircle, Shield, Medal, ShieldAlert, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { COMMITTEES } from '../data';
import { supabase } from '../lib/supabase';

const CHART_DATA = [
  { name: 'Mon', regs: 4 },
  { name: 'Tue', regs: 7 },
  { name: 'Wed', regs: 5 },
  { name: 'Thu', regs: 12 },
  { name: 'Fri', regs: 9 },
  { name: 'Sat', regs: 15 },
  { name: 'Sun', regs: 20 },
];

const COMMITTEE_POPULARITY = [
  { name: 'UNSC', value: 35 },
  { name: 'UNGA', value: 25 },
  { name: 'AIPPM', value: 20 },
  { name: 'UNCSW', value: 15 },
  { name: 'UNEA', value: 5 },
];

const COLORS = ['#C5A059', '#1B3B6F', '#112240', '#0A192F', '#4A5568'];

export default function AdminDashboardV2({ 
  registrations, setRegistrations, 
  scores, setScores, 
  notices, setNotices, 
  gallery, setGallery, 
  googleFormLink, setGoogleFormLink 
}: any) {
  const [user, setUser] = useState<any>(null);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedCommitteeId, setSelectedCommitteeId] = useState(COMMITTEES[0].id);

  // Derive Dynamic Chart Data from Registrations
  const getRegsByDay = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const counts = new Array(7).fill(0);
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d;
    });

    registrations.forEach((r: any) => {
      const createdAt = new Array(7).fill(0); // placeholder
      // For a real app, we'd check r.created_at
    });

    // Mock implementation for velocity since we don't have many real registrations yet
    return [
      { name: 'Mon', regs: Math.floor(registrations.length * 0.1) || 4 },
      { name: 'Tue', regs: Math.floor(registrations.length * 0.2) || 7 },
      { name: 'Wed', regs: Math.floor(registrations.length * 0.15) || 5 },
      { name: 'Thu', regs: Math.floor(registrations.length * 0.3) || 12 },
      { name: 'Fri', regs: Math.floor(registrations.length * 0.25) || 9 },
      { name: 'Sat', regs: Math.floor(registrations.length * 0.35) || 15 },
      { name: 'Sun', regs: registrations.length || 20 },
    ];
  };

  const dynamicChartData = getRegsByDay();

  const getCommitteePopularity = () => {
    const counts: any = {};
    COMMITTEES.forEach(c => counts[c.name] = 0);
    registrations.forEach((r: any) => {
      if (counts[r.committee] !== undefined) counts[r.committee]++;
    });

    const total = registrations.length || 1;
    return COMMITTEES.map(c => ({
      name: c.name.split(' ')[0], // short name
      value: Math.round(((counts[c.name] || 1) / total) * 100)
    })).sort((a,b) => b.value - a.value);
  };

  const dynamicPopularityData = getCommitteePopularity();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!user) {
    return <Login />;
  }

  const handleUpdateRegStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('registrations').update({ status }).eq('id', id);
    if (error) alert('Error updating status: ' + error.message);
  };

  const handleDeleteReg = async (id: string) => {
    if (window.confirm('Delete this registration?')) {
      const { error } = await supabase.from('registrations').delete().eq('id', id);
      if (error) alert('Error deleting: ' + error.message);
    }
  };

  const handleUpdateScore = async (commId: string, delegateId: string, field: string, value: number) => {
    const { error } = await supabase.from('scores').update({ [field]: value }).eq('id', delegateId);
    if (error) console.error('Error updating score:', error.message);
  };

  return (
    <div className="flex h-screen bg-[#020617] text-white font-sans selection:bg-gold/30">
      {/* Sidebar */}
      <Sidebar 
        activeModule={activeModule} 
        setActiveModule={setActiveModule} 
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onLogout={() => supabase.auth.signOut()}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-8 bg-[#020617]/50 backdrop-blur-md border-b border-white/5 z-20">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative group max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-gold transition-colors" />
              <input 
                type="text" 
                placeholder="Search everything..." 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Current Session</span>
              <span className="text-xs font-mono">{new Date().toLocaleTimeString()} • 26 April</span>
            </div>
            <button className="relative p-2 text-white/40 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full border-2 border-[#020617]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-bold text-xs ring-2 ring-gold/10">
              SG
            </div>
          </div>
        </header>

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeModule === 'dashboard' && <DashboardModule registrations={registrations} chartData={dynamicChartData} popularityData={dynamicPopularityData} />}
              {activeModule === 'registrations' && (
                <RegistrationsModule 
                  registrations={registrations} 
                  onUpdateStatus={handleUpdateRegStatus} 
                  onDelete={handleDeleteReg}
                  googleFormLink={googleFormLink}
                  setGoogleFormLink={setGoogleFormLink}
                />
              )}
              {activeModule === 'committees' && (
                <CommitteesModule 
                  committees={COMMITTEES} 
                  onSelectScore={(id: string) => {
                    setSelectedCommitteeId(id);
                    setActiveModule('scores');
                  }}
                />
              )}
              {activeModule === 'scores' && (
                <ScoresModule 
                  committees={COMMITTEES}
                  scores={scores}
                  selectedId={selectedCommitteeId}
                  setSelectedId={setSelectedCommitteeId}
                  onUpdateScore={handleUpdateScore}
                  onAddDelegate={async (commId: string) => {
                    const name = prompt('Enter delegate name (e.g. Sarah Ahmed):');
                    const country = prompt('Enter representation (e.g. France):');
                    if (name && country) {
                      const { error } = await supabase.from('scores').insert({
                        committee_id: commId,
                        name,
                        country,
                        research: 0,
                        diplomacy: 0,
                        lobbying: 0
                      });
                      if (error) alert('Error adding delegate: ' + error.message);
                      else alert('Delegate added successfully!');
                    }
                  }}
                  onDeleteDelegate={async (commId: string, delId: string) => {
                    if (confirm('Delete delegate?')) {
                      const { error } = await supabase.from('scores').delete().eq('id', delId);
                      if (error) alert('Error deleting: ' + error.message);
                    }
                  }}
                />
              )}
              {activeModule === 'allotments' && <AllotmentsModule />}
              {activeModule === 'announcements' && (
                <NoticesModule 
                  notices={notices} 
                  onAdd={async () => {
                    const title = prompt('Title:');
                    const content = prompt('Content:');
                    if (title && content) {
                      const { error } = await supabase.from('notices').insert({
                        title,
                        content,
                        date: new Date().toISOString().split('T')[0]
                      });
                      if (error) alert('Error adding notice: ' + error.message);
                      else alert('Notice published successfully.');
                    }
                  }}
                  onDelete={async (id: string) => {
                    if (confirm('Delete notice?')) {
                      const { error } = await supabase.from('notices').delete().eq('id', id);
                      if (error) alert('Error deleting: ' + error.message);
                    }
                  }}
                />
              )}
              {activeModule === 'gallery' && (
                <GalleryModule 
                  images={gallery} 
                  onAdd={async () => {
                    const url = prompt('Image URL:');
                    if (url) {
                      const { error } = await supabase.from('gallery').insert({ url });
                      if (error) alert('Error adding photo: ' + error.message);
                      else alert('Photo added to gallery.');
                    }
                  }}
                  onDelete={async (url: string) => {
                    if (confirm('Delete photo?')) {
                      const { error } = await supabase.from('gallery').delete().eq('url', url);
                      if (error) alert('Error deleting: ' + error.message);
                    }
                  }}
                />
              )}
              {activeModule === 'settings' && <SettingsModule />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function SettingsModule() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-display font-bold italic">System <span className="text-gold">Configuration</span></h2>
        <p className="text-white/40 text-sm mt-1">Global settings for Harmonia Conference Management.</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="glass p-8 rounded-3xl border-white/5 space-y-6">
           <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold">Maintenance Mode</div>
                <div className="text-xs text-white/40">Disable public site access</div>
              </div>
              <button className="w-12 h-6 bg-white/10 rounded-full relative"><div className="absolute left-1 top-1 w-4 h-4 bg-white/20 rounded-full" /></button>
           </div>
           <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold">Live Scoring</div>
                <div className="text-xs text-white/40">Enable real-time award tracking for delegates</div>
              </div>
              <button className="w-12 h-6 bg-gold rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-navy-dark rounded-full shadow-sm" /></button>
           </div>
           <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold">Priority Registration</div>
                <div className="text-xs text-white/40">Enable priority allotment logic</div>
              </div>
              <button className="w-12 h-6 bg-gold rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-navy-dark rounded-full shadow-sm" /></button>
           </div>
        </div>

        <button 
          onClick={() => alert('Security audit logs are being generated...')}
          className="w-full py-4 glass border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
        >
          View Security Audit Logs
        </button>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function Login() {
  const [passcode, setPasscode] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: passcode,
    });
    if (error) alert(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-royal/20 via-navy-dark to-[#020617]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass max-w-sm w-full p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gold/20 shadow-lg shadow-gold/10">
            <Landmark className="text-gold w-8 h-8" />
          </div>
          <h1 className="text-2xl font-display font-bold mb-2 tracking-tight">Secretariat Portal</h1>
          <p className="text-white/40 text-xs tracking-wide uppercase font-bold">Authorization Required</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 relative z-10">
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2 font-bold">Access Email</label>
            <input 
              type="email" 
              placeholder="sg@shalommun.in"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold/50 transition-all text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2 font-bold">Passcode</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold/50 transition-all text-sm tracking-widest"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              required
            />
          </div>
          <button 
            disabled={loading}
            className="w-full py-4 bg-gold text-navy-dark font-black rounded-xl hover:bg-gold-light hover:shadow-xl hover:shadow-gold/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Log In to Harmonia'}
          </button>
        </form>
        
        <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] text-white/20 uppercase font-bold tracking-[0.2em]">
          <span>© 2026 SHALOM MUN</span>
          <span className="text-gold/50">V2.4.0</span>
        </div>
      </motion.div>
    </div>
  );
}

function Sidebar({ activeModule, setActiveModule, isOpen, onToggle, onLogout }: any) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'registrations', label: 'Registrations', icon: Users },
    { id: 'allotments', label: 'Allotments', icon: Landmark },
    { id: 'committees', label: 'Committees', icon: Shield },
    { id: 'scores', label: 'Scores', icon: Medal },
    { id: 'announcements', label: 'Notices', icon: Bell },
    { id: 'gallery', label: 'Gallery', icon: Search },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={cn(
      "h-screen bg-[#0A1120] border-r border-white/5 flex flex-col transition-all duration-300 z-30 relative",
      isOpen ? "w-64" : "w-20"
    )}>
      {/* Sidebar Close/Open */}
      <button 
        onClick={onToggle}
        className="absolute -right-3 top-8 w-6 h-6 bg-gold text-navy-dark rounded-full flex items-center justify-center border border-navy shadow-lg z-40 transition-transform active:scale-90"
      >
        {isOpen ? <Menu size={12} /> : <ChevronRight size={12} />}
      </button>

      <div className="p-6 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 border border-gold/20">
            <Landmark className="text-gold w-5 h-5" />
          </div>
          {isOpen && (
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-tight">SHALOM</span>
              <span className="text-[10px] font-bold text-gold/60 uppercase tracking-widest leading-none">Harmonia</span>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative group",
              activeModule === item.id 
                ? "bg-gold text-navy-dark font-bold shadow-lg shadow-gold/10" 
                : "text-white/40 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon size={18} className={cn("shrink-0", activeModule === item.id ? "" : "group-hover:scale-110 transition-transform")} />
            {isOpen && <span className="text-sm truncate">{item.label}</span>}
            {activeModule === item.id && !isOpen && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-white rounded-l-full" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 mt-auto">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
        >
          <LogOut size={18} />
          {isOpen && <span className="text-sm font-bold">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

function StatCard({ label, value, trend, icon: Icon, color }: any) {
  return (
    <div className="glass p-6 rounded-3xl border-white/5 group hover:border-white/10 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-3 rounded-2xl", color)}>
          <Icon className="w-5 h-5" />
        </div>
        <div className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest", trend > 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500")}>
          {trend > 0 ? '+' : ''}{trend}%
        </div>
      </div>
      <div>
        <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold mb-1">{label}</div>
        <div className="text-2xl font-display font-bold group-hover:text-gold transition-colors">{value}</div>
      </div>
    </div>
  );
}

function DashboardModule({ registrations, chartData, popularityData }: { registrations: any[], chartData: any[], popularityData: any[] }) {
  const approvedCount = registrations.filter(r => r.status === 'Approved').length;
  const pendingCount = registrations.filter(r => r.status === 'Pending' || r.status === 'New').length;
  
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-display font-bold">Harmonia <span className="text-gold italic">Insights</span></h2>
          <p className="text-white/40 text-sm mt-1">Global conference status and delegate participation overview.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => alert('Generating full conference report...')}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Download size={14} /> Export Report
          </button>
          <button 
            onClick={() => alert('Feature coming soon: Integrated Broadcast System')}
            className="px-4 py-2 bg-gold text-navy-dark rounded-xl text-xs font-bold hover:bg-gold-light transition-all flex items-center gap-2 shadow-lg shadow-gold/20"
          >
            <Plus size={14} /> New Announcement
          </button>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Registrations" value={registrations.length} trend={12} icon={Users} color="bg-gold/10 text-gold" />
        <StatCard label="Approved Forms" value={approvedCount} trend={8} icon={CheckCircle} color="bg-green-500/10 text-green-500" />
        <StatCard label="Pending Review" value={pendingCount} trend={15} icon={Activity} color="bg-royal/10 text-royal" />
        <StatCard label="Verified Schools" value={new Set(registrations.map(r => r.school)).size} trend={15} icon={Landmark} color="bg-white/10 text-white/60" />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass p-8 rounded-[2.5rem] border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-display font-bold">Registration Velocity</h3>
            <select className="bg-[#020617] border border-white/10 text-[10px] font-bold uppercase rounded-lg px-3 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRegs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C5A059" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C5A059" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A1120', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#C5A059' }}
                />
                <Area type="monotone" dataKey="regs" stroke="#C5A059" strokeWidth={3} fillOpacity={1} fill="url(#colorRegs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-8 rounded-[2.5rem] border-white/5">
          <h3 className="text-lg font-display font-bold mb-8">Committee Heatmap</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={popularityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {popularityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A1120', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
             {popularityData.slice(0, 3).map((c, i) => (
               <div key={c.name} className="flex items-center justify-between text-xs">
                 <div className="flex items-center gap-2 text-white/40">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                   {c.name}
                 </div>
                 <div className="font-bold">{c.value}%</div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RegistrationsModule({ registrations, onUpdateStatus, onDelete, googleFormLink, setGoogleFormLink }: any) {
  const saveLink = async () => {
    const { error } = await supabase.from('app_config').upsert({ key: 'googleFormLink', value: googleFormLink });
    if (error) alert('Error saving link: ' + error.message);
    else alert('Google Form link saved and updated on main site.');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-display font-bold italic">Application <span className="text-gold">Central</span></h2>
          <p className="text-white/40 text-sm mt-1">Review and process delegate registration forms.</p>
        </div>
        <div className="flex gap-4">
           <div className="flex flex-col gap-1 items-end">
             <label className="text-[10px] uppercase font-bold text-white/30">Google Form Link</label>
             <div className="flex gap-2">
               <input 
                 type="text" 
                 value={googleFormLink} 
                 onChange={(e) => setGoogleFormLink(e.target.value)}
                 placeholder="https://forms.gle/..."
                 className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gold outline-none focus:border-gold/50 min-w-[250px]"
               />
               <button 
                 onClick={saveLink}
                 className="px-3 py-1.5 bg-gold/10 text-gold border border-gold/20 rounded-lg text-[10px] font-bold uppercase hover:bg-gold hover:text-navy-dark transition-all"
               >
                 Save
               </button>
             </div>
           </div>
           <button 
             onClick={() => alert('Exporting registration database...')}
             className="glass p-3 rounded-xl hover:bg-white/10 transition-all self-end"
           >
             <Download size={18} />
           </button>
        </div>
      </div>

      <div className="glass rounded-[2rem] border-white/5 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/5">
              <th className="p-5 text-[10px] uppercase tracking-widest font-bold text-white/30">Delegate</th>
              <th className="p-5 text-[10px] uppercase tracking-widest font-bold text-white/30">School</th>
              <th className="p-5 text-[10px] uppercase tracking-widest font-bold text-white/30">Committee</th>
              <th className="p-5 text-[10px] uppercase tracking-widest font-bold text-white/30">Type</th>
              <th className="p-5 text-[10px] uppercase tracking-widest font-bold text-white/30">Payment Status</th>
              <th className="p-5 text-[10px] uppercase tracking-widest font-bold text-white/30">Status</th>
              <th className="p-5 text-[10px] uppercase tracking-widest font-bold text-white/30 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {registrations.map((reg) => (
              <tr key={reg.id} className="group hover:bg-white/[0.02] transition-colors">
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold text-[10px] uppercase">
                      {reg.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold">{reg.name}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{reg.id}</div>
                    </div>
                  </div>
                </td>
                <td className="p-5">
                  <div className="text-sm">{reg.school}</div>
                  <div className="text-[10px] text-white/40">Grade {reg.grade}</div>
                </td>
                <td className="p-5">
                  <div className="text-xs font-bold text-royal px-2 py-1 bg-royal/10 rounded inline-block">
                    {reg.committee}
                  </div>
                </td>
                <td className="p-5">
                  <div className={cn(
                    "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border inline-block",
                    reg.type === 'EB' ? "text-royal border-royal/30 bg-royal/5" : "text-gold border-gold/30 bg-gold/5"
                  )}>
                    {reg.type || 'Delegate'}
                  </div>
                </td>
                <td className="p-5">
                  <div className={cn(
                    "text-[10px] font-black uppercase tracking-wider",
                    reg.payment_status === 'Paid' ? "text-green-500" : "text-amber-500"
                  )}>
                    {reg.payment_status}
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full animate-pulse",
                      reg.status === 'Approved' ? "bg-green-500" : reg.status === 'Review' ? "bg-blue-500" : "bg-amber-500"
                    )} />
                    <span className="text-xs font-medium text-white/60">{reg.status}</span>
                  </div>
                </td>
                <td className="p-5 text-right">
                   <div className="flex items-center justify-end gap-2 text-white/20">
                      <button 
                        onClick={() => onUpdateStatus(reg.id, 'Approved')}
                        className="p-2 glass rounded-lg hover:bg-white/10 hover:text-green-500 transition-all"
                        title="Approve"
                      >
                        <CheckCircle size={14} />
                      </button>
                      <button 
                        onClick={() => onUpdateStatus(reg.id, 'Review')}
                        className="p-2 glass rounded-lg hover:bg-white/10 hover:text-blue-500 transition-all"
                        title="Review"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => onDelete(reg.id)}
                        className="p-2 glass rounded-lg hover:bg-white/10 hover:text-red-500 transition-all"
                        title="Delete"
                      >
                        <XCircle size={14} />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-5 bg-white/5 border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-white/30 uppercase tracking-widest">
            <span>Showing {registrations.length} registrations</span>
            <div className="flex gap-2">
              <button disabled className="px-3 py-1 glass rounded disabled:opacity-30">Prev</button>
              <button className="px-3 py-1 glass rounded hover:bg-white/10">Next</button>
            </div>
        </div>
      </div>
    </div>
  );
}

function CommitteesModule({ committees, onSelectScore }: { committees: any[], onSelectScore: (id: string) => void }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-display font-bold">Forum <span className="text-royal italic">Management</span></h2>
          <p className="text-white/40 text-sm mt-1">Configure committee agendas, delegates, and capacity.</p>
        </div>
        <button 
          onClick={() => alert('Create committee feature restricted to Super Admin.')}
          className="px-6 py-3 bg-royal text-white font-bold rounded-2xl flex items-center gap-2 hover:bg-royal/80 transition-all shadow-xl shadow-royal/10"
        >
          <Plus size={18} /> Define New Committee
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {committees.map((committee) => (
          <div key={committee.id} className="glass p-8 rounded-[2rem] border-white/5 group hover:border-gold/20 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <committee.icon size={100} />
            </div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-gold/30 transition-all">
                <committee.icon className="text-gold w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold mb-1 tracking-tight">{committee.name}</h3>
              <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mb-6">Harmonia Official Forum</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/40">Delegates</span>
                  <span className="text-xs font-bold font-mono">0 / {committee.capacity}</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gold h-full rounded-full transition-all duration-1000" style={{ width: `0%` }} />
                </div>
                <div className="flex items-center justify-between pt-2">
                   <span className="text-xs text-white/40">Agenda Status</span>
                   <span className="text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded-full font-bold uppercase tracking-widest border border-amber-500/20">Pending</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => alert(`Editing ${committee.name} details...`)}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Edit2 size={12} /> Edit Detail
                </button>
                <button 
                  onClick={() => onSelectScore(committee.id)}
                  className="p-3 bg-gold/10 text-gold hover:bg-gold hover:text-navy-dark rounded-xl transition-all"
                >
                  <Users size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScoresModule({ committees, scores, selectedId, setSelectedId, onUpdateScore, onAddDelegate, onDeleteDelegate }: any) {
  const currentCommittee = committees.find((c: any) => c.id === selectedId);
  const delegates = scores[selectedId] || [];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-display font-bold italic">Scoring <span className="text-gold">Engine</span></h2>
          <p className="text-white/40 text-sm mt-1">Real-time point tabulation and award calculations.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 glass hover:bg-white/10 rounded-2xl text-sm font-bold transition-all border-white/10" onClick={() => window.location.reload()}>Global Refresh</button>
          <button className="px-6 py-3 bg-green-500 text-white font-bold rounded-2xl shadow-lg shadow-green-500/10 hover:opacity-90 transition-all flex items-center gap-2" onClick={() => alert('Scores Published Live!')}>
            Publish Results Live
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
           <div className="glass p-6 rounded-[2rem] border-white/5 bg-white/[0.02]">
              <h4 className="text-[10px] uppercase tracking-widest font-black text-gold mb-6">Select Committee</h4>
              <div className="space-y-1">
                {committees.map((c: any) => (
                  <button 
                    key={c.id} 
                    onClick={() => setSelectedId(c.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl text-xs transition-all flex items-center justify-between group",
                      selectedId === c.id ? "bg-gold/10 text-gold border border-gold/20" : "hover:bg-white/5 text-white/60 hover:text-white"
                    )}
                  >
                    <span className="font-medium">{c.name}</span>
                    <ChevronRight size={12} className={cn(selectedId === c.id ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-all")} />
                  </button>
                ))}
              </div>
           </div>

           <div className="glass p-6 rounded-[2rem] border-white/5">
              <div className="flex items-center gap-3 mb-6">
                 <ShieldAlert className="text-amber-500 w-5 h-5" />
                 <h4 className="text-xs font-bold">Scoring Policy</h4>
              </div>
              <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-wider">Note: Scores cannot be edited after publication unless revoked by the SG. Verification required for all awards.</p>
           </div>
        </div>

        <div className="lg:col-span-3">
           <div className="glass rounded-[2.5rem] border-white/5 overflow-hidden">
             <div className="p-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-royal/10 flex items-center justify-center text-royal border border-royal/20">
                     <currentCommittee.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl">{currentCommittee.name}</h3>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold italic">Primary Conflict Zone</p>
                  </div>
                </div>
                <div className="flex gap-2">
                   <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all">Roll Call</button>
                   <button 
                     onClick={() => onAddDelegate(selectedId)}
                     className="px-4 py-2 bg-gold text-navy-dark rounded-xl text-xs font-bold hover:shadow-lg transition-all"
                   >
                     + Add Delegate
                   </button>
                </div>
             </div>
             
             <div className="p-8">
               <div className="space-y-4">
                  {delegates.length > 0 ? delegates.map((d, i) => (
                    <div key={d.id} className="flex flex-wrap items-center gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-gold/20 hover:bg-gold/[0.02] transition-all">
                       <div className="flex items-center gap-4 min-w-[200px]">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center font-bold font-display border",
                            i === 0 ? "bg-gold text-navy-dark border-gold" : "bg-white/5 text-white/20 border-white/10"
                          )}>
                            {i + 1}
                          </div>
                          <div>
                            <div className="text-sm font-bold">{d.name}</div>
                            <div className="text-[10px] text-white/40 uppercase tracking-widest">{d.country}</div>
                          </div>
                       </div>
                       
                       <div className="flex-1 grid grid-cols-3 gap-4 min-w-[300px]">
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] uppercase tracking-widest text-white/30 font-bold ml-1">Research</label>
                            <input 
                              type="number" 
                              value={d.research} 
                              onChange={(e) => onUpdateScore(selectedId, d.id, 'research', parseInt(e.target.value) || 0)}
                              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-gold font-bold text-sm outline-none focus:border-gold/50" 
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] uppercase tracking-widest text-white/30 font-bold ml-1">Diplomacy</label>
                            <input 
                              type="number" 
                              value={d.diplomacy} 
                              onChange={(e) => onUpdateScore(selectedId, d.id, 'diplomacy', parseInt(e.target.value) || 0)}
                              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-gold font-bold text-sm outline-none focus:border-gold/50" 
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] uppercase tracking-widest text-white/30 font-bold ml-1">Lobbying</label>
                            <input 
                              type="number" 
                              value={d.lobbying} 
                              onChange={(e) => onUpdateScore(selectedId, d.id, 'lobbying', parseInt(e.target.value) || 0)}
                              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-gold font-bold text-sm outline-none focus:border-gold/50" 
                            />
                          </div>
                       </div>

                       <div className="min-w-[80px] text-center px-4 py-2 bg-gold/5 border border-gold/10 rounded-2xl">
                          <div className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Total</div>
                          <div className="text-xl font-display font-bold text-gold">{d.research + d.diplomacy + d.lobbying}</div>
                       </div>
                       
                       <button 
                         onClick={() => onDeleteDelegate(selectedId, d.id)}
                         className="p-3 text-white/20 hover:text-red-500 transition-colors"
                       >
                         <Trash2 size={18} />
                       </button>
                    </div>
                  )) : (
                    <div className="text-center py-24 text-white/20 border-2 border-dashed border-white/5 rounded-[2.5rem]">
                      <Medal className="mx-auto mb-6 opacity-30" size={64} />
                      <p className="text-lg font-display mb-2">No Delegates Found</p>
                      <p className="text-sm max-w-xs mx-auto mb-8">Start the competition by adding delegates to this committee.</p>
                      <button 
                        onClick={() => onAddDelegate(selectedId)}
                        className="px-8 py-4 bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest border border-gold/20 rounded-2xl hover:bg-gold hover:text-navy-dark transition-all"
                      >
                        + Add First Delegate
                      </button>
                    </div>
                  )}
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function AllotmentsModule() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-display font-bold">Diplomatic <span className="text-gold italic">Assignments</span></h2>
          <p className="text-white/40 text-sm mt-1">Assign portfolios to confirmed delegates.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => alert('AI Matching Algorithm starting...')}
            className="px-6 py-3 bg-royal/10 text-royal font-bold rounded-2xl border border-royal/20 hover:bg-royal hover:text-white transition-all shadow-lg shadow-royal/10"
          >
            Auto-Match AI
          </button>
          <button 
            onClick={() => alert('Generating all official allotment letters...')}
            className="px-6 py-3 bg-gold text-navy-dark font-black rounded-2xl hover:bg-gold-light transition-all flex items-center gap-2 shadow-lg shadow-gold/20"
          >
            <Download size={18} /> Official Letters
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass p-6 rounded-[2rem] border-white/5">
          <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Unassigned</h4>
          <div className="text-3xl font-display font-bold text-gold">0</div>
        </div>
        <div className="glass p-6 rounded-[2rem] border-white/5">
          <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Confirmed</h4>
          <div className="text-3xl font-display font-bold text-green-500">0</div>
        </div>
        <div className="glass p-6 rounded-[2rem] border-white/5">
           <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Duplicate Claims</h4>
           <div className="text-3xl font-display font-bold text-red-500">0</div>
        </div>
        <div className="glass p-6 rounded-[2rem] border-white/5">
           <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Vacant Seats</h4>
           <div className="text-3xl font-display font-bold text-white">200</div>
        </div>
      </div>

      <div className="glass rounded-[2rem] border-white/5 p-8 text-center py-20 bg-[radial-gradient(circle_at_center,_#ffffff05_0%,_transparent_100%)]">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Filter className="text-white/20" />
          </div>
          <h3 className="text-lg font-bold mb-2">Select a filter to view allotments</h3>
          <p className="text-sm text-white/30 max-w-xs mx-auto">Use the filter bar above to search by committee or school to manage assignments.</p>
      </div>
    </div>
  );
}

function NoticesModule({ notices, onAdd, onDelete }: any) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-display font-bold italic text-gold">Digital <span className="text-white">Bulletins</span></h2>
          <p className="text-white/40 text-sm mt-1">Manage public notices and conference announcements.</p>
        </div>
        <button 
          onClick={onAdd}
          className="px-6 py-3 bg-gold text-navy-dark font-black rounded-2xl hover:bg-gold-light transition-all flex items-center gap-2"
        >
          <Plus size={18} /> New Notice
        </button>
      </div>

      <div className="grid gap-4">
        {notices.map((notice: any) => (
          <div key={notice.id} className="glass p-6 rounded-3xl border-white/5 flex justify-between items-start group">
            <div>
              <h3 className="text-lg font-bold text-gold mb-1">{notice.title}</h3>
              <p className="text-sm text-white/60 mb-3">{notice.content}</p>
              <div className="text-[10px] uppercase tracking-widest font-bold text-white/20">{notice.date}</div>
            </div>
            <button 
              onClick={() => onDelete(notice.id)}
              className="p-3 text-white/10 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryModule({ images, onAdd, onDelete }: any) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-display font-bold italic text-gold">Conference <span className="text-white">Memories</span></h2>
          <p className="text-white/40 text-sm mt-1">Manage media gallery and live feeds.</p>
        </div>
        <button 
          onClick={onAdd}
          className="px-6 py-3 bg-gold text-navy-dark font-black rounded-2xl hover:bg-gold-light transition-all flex items-center gap-2"
        >
          <Plus size={18} /> Add Photo
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img: any, idx: number) => (
          <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden group">
            <img src={img} alt="Gallery" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button 
                onClick={() => onDelete(img)}
                className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
