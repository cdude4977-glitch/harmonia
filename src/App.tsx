import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MainSite from './pages/MainSite';
import AdminDashboardV2 from './pages/AdminDashboardV2';
import { COMMITTEES } from './data';
import { supabase } from './lib/supabase';

export default function App() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [scores, setScores] = useState<any>({});
  const [notices, setNotices] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [googleFormLink, setGoogleFormLink] = useState('https://forms.gle/example');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial Data Fetch
    const fetchData = async () => {
      try {
        const [
          { data: regData },
          { data: scoreData },
          { data: noticeData },
          { data: galleryData },
          { data: configData }
        ] = await Promise.all([
          supabase.from('registrations').select('*'),
          supabase.from('scores').select('*'),
          supabase.from('notices').select('*').order('date', { ascending: false }),
          supabase.from('gallery').select('*'),
          supabase.from('app_config').select('*')
        ]);

        if (regData) setRegistrations(regData);
        if (noticeData) setNotices(noticeData);
        if (galleryData) setGallery(galleryData.map(item => item.url));
        if (configData) {
          const link = configData.find(c => c.key === 'googleFormLink')?.value;
          if (link) setGoogleFormLink(link);
        }
        
        // Group scores by committee
        if (scoreData && scoreData.length > 0) {
          const grouped: any = {};
          COMMITTEES.forEach(c => grouped[c.id] = []);
          scoreData.forEach(s => {
            if (!grouped[s.committee_id]) grouped[s.committee_id] = [];
            grouped[s.committee_id].push(s);
          });
          setScores(grouped);
        } else {
          // Fallback Dummy Data
          const dummyScores: any = {
            'unsc': [
              { id: 'd1', name: 'Kabir Singh', country: 'USA', research: 15, diplomacy: 18, lobbying: 14 },
              { id: 'd2', name: 'Zoya Khan', country: 'UK', research: 12, diplomacy: 15, lobbying: 18 }
            ],
            'un-specpol': [
              { id: 'd3', name: 'Aarav Jha', country: 'France', research: 10, diplomacy: 12, lobbying: 10 }
            ],
            'uncsw': [
              { id: 'd4', name: 'Ishani Roy', country: 'India', research: 18, diplomacy: 19, lobbying: 17 }
            ],
            'aippm': [
              { id: 'd5', name: 'Rohan Verma', country: 'INC', research: 14, diplomacy: 14, lobbying: 15 }
            ],
            'unea': [
              { id: 'd6', name: 'Sania Mirza', country: 'Brazil', research: 11, diplomacy: 13, lobbying: 12 }
            ]
          };
          setScores(dummyScores);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up Real-time subscriptions
    const registrationsSub = supabase.channel('registrations-all')
      .on('postgres_changes' as any, { event: '*', schema: 'public', table: 'registrations' }, fetchData)
      .subscribe();

    const scoresSub = supabase.channel('scores-all')
      .on('postgres_changes' as any, { event: '*', schema: 'public', table: 'scores' }, fetchData)
      .subscribe();

    const noticesSub = supabase.channel('notices-all')
      .on('postgres_changes' as any, { event: '*', schema: 'public', table: 'notices' }, fetchData)
      .subscribe();

    const gallerySub = supabase.channel('gallery-all')
      .on('postgres_changes' as any, { event: '*', schema: 'public', table: 'gallery' }, fetchData)
      .subscribe();

    const configSub = supabase.channel('config-all')
      .on('postgres_changes' as any, { event: '*', schema: 'public', table: 'app_config' }, fetchData)
      .subscribe();

    return () => {
      supabase.removeChannel(registrationsSub);
      supabase.removeChannel(scoresSub);
      supabase.removeChannel(noticesSub);
      supabase.removeChannel(gallerySub);
      supabase.removeChannel(configSub);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-gold font-display font-bold tracking-widest uppercase text-xs">Synchronizing Harmonia Cloud</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={
          <AdminDashboardV2 
            registrations={registrations}
            setRegistrations={setRegistrations}
            scores={scores}
            setScores={setScores}
            notices={notices}
            setNotices={setNotices}
            gallery={gallery}
            setGallery={setGallery}
            googleFormLink={googleFormLink}
            setGoogleFormLink={setGoogleFormLink}
          />
        } />
        <Route path="/*" element={
          <MainSite 
            notices={notices} 
            gallery={gallery} 
            scores={scores} 
            googleFormLink={googleFormLink} 
          />
        } />
      </Routes>
    </Router>
  );
}
