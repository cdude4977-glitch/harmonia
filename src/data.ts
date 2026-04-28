import { Shield, Globe, Users, Briefcase, Landmark, Cpu, Scale, HelpCircle, Heart, Flame, Atom, Camera, Newspaper, PenTool, Medal } from 'lucide-react';

export const COMMITTEES = [
  { 
    id: 'un-specpol', 
    name: 'UNGA SPECPOL', 
    icon: Globe, 
    type: 'UN Core',
    agenda: 'Territorial claims, governance, and Antarctica under international law.', 
    details: 'The Special Political and Decolonization Committee (Fourth Committee) will address the legal and political complexities of Antarctica. Delegates will debate sovereignty, environmental protection, and the future of the Antarctic Treaty System in an era of resource scarcity.',
    eligibility: 'Grade 9-12', 
    capacity: 60, 
    chairs: ['Ayana Chopra'] 
  },
  { 
    id: 'unsc', 
    name: 'UNSC', 
    icon: Shield, 
    type: 'Crisis',
    agenda: 'Thailand-Cambodia border tensions, sovereignty, stability.', 
    details: 'The Security Council focuses on the long-standing border dispute surrounding the Preah Vihear Temple. Delegates must navigate history, military tensions, and ICJ rulings to maintain peace in the region.',
    eligibility: 'Grade 10-12', 
    capacity: 15, 
    chairs: ['Anmol Tyagi'] 
  },
  { 
    id: 'uncsw', 
    name: 'UNCSW', 
    icon: Users, 
    type: 'UN Core',
    agenda: 'Reproductive healthcare and postnatal care, emphasis Afghanistan women.', 
    details: 'The Commission on the Status of Women will tackle the critical humanitarian crisis facing women in Afghanistan, focusing on maternal health, access to clinics, and international aid delivery under restrictive governance.',
    eligibility: 'Grade 9-12', 
    capacity: 40, 
    chairs: ['Nandani Dalal'] 
  },
  { 
    id: 'aippm', 
    name: 'AIPPM', 
    icon: Landmark, 
    type: 'Regional',
    agenda: 'LGBTQIA+ representation in Indian legislature and Transgender Rights Bill 2026.', 
    details: 'The All India Political Parties Meet will hold a high-stakes discussion on inclusive governance. Delegates will evaluate the legal landscape for LGBTQIA+ citizens and debate the structural implementation of the Transgender Rights Bill.',
    eligibility: 'Grade 9-12', 
    capacity: 50, 
    chairs: ['Achintya Gupta'] 
  },
  { 
    id: 'unea', 
    name: 'UNEA', 
    icon: Flame, 
    type: 'UN Core',
    agenda: 'Global fuel crisis and environmental impact on developing nations.', 
    details: 'The UN Environment Assembly will analyze how the energy crisis accelerates environmental degradation. The focus is on balancing economic survival with sustainable transitions in the Global South.',
    eligibility: 'Grade 8-12', 
    capacity: 45, 
    chairs: ['Yuti Kathuria'] 
  },
];

export const MOCK_REGISTRATIONS = [];

export const SECRETARIAT = [
  { name: 'Ayana Chopra', role: 'Secretary General', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Anmol Tyagi', role: 'Deputy Secretary General', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Nandani Dalal', role: 'Director General', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Achintya Gupta', role: 'Chargé d’affaires', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Yuti Kathuria', role: 'Chief of Staff', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop' },
];

export const USGS = [
  { name: 'Kaashvi Mahajan', role: 'Finance' },
  { name: 'Tanush Khajuria', role: 'Delegate Affairs' },
  { name: 'Anvi Nagdavane', role: 'Design' },
  { name: 'Chaarvi Reddy', role: 'Sponsorship' },
  { name: 'Aditi Mehta', role: 'Hospitality' },
  { name: 'Christa Sibu', role: 'Ceremonial Affairs' },
  { name: 'Avni Mathur', role: 'EB Affairs' },
  { name: 'Aahana Kaushik', role: 'Media & Marketing' },
];

export const WORLD_FACTS = [
  "The United Nations has 193 member states.",
  "The first UN General Assembly met in London in 1946.",
  "Model UN started as the Model League of Nations in the 1920s.",
  "There are 6 official languages of the UN.",
  "The UN Charter was signed on 26 June 1945.",
];

export const DYNAMIC_PHRASES = [
  "DIPLOMACY IN ACTION",
  "GLOBAL VISION, LOCAL ROOTS",
  "NEGOTIATE. INNOVATE. LEAD.",
  "THE FUTURE IS HARMONIA",
  "CONSENSUS BUILT HERE",
  "AGENDA FOR PROGRESS",
  "BEYOND BORDERS",
  "VOICE OF THE YOUTH",
  "RESOLVING CONFLICTS",
  "UNITY IN DIVERSITY"
];

export const TIMELINE = [
  { day: 'Day 1', events: ['Opening Ceremony', 'Committee Session 1', 'Lunch', 'Session 2', 'Networking'] },
  { day: 'Day 2', events: ['Committee Session 3', 'Crisis Updates', 'Closing Ceremony', 'Awards'] },
];

export const NOTICES = [
  { id: '1', title: 'Registration Deadline', content: 'Priority registration closes on June 1st. Secure your allotment soon!', date: '2026-05-10' },
  { id: '2', title: 'Study Guides Released', content: 'Study guides for all committees are now available in the resources section.', date: '2026-05-15' },
];

export const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop',
];
