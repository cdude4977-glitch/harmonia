-- Supabase Schema for Harmonia MUN Management

-- 1. REGISTRATIONS
CREATE TABLE registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  school TEXT NOT NULL,
  grade TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  committee TEXT NOT NULL,
  type TEXT DEFAULT 'Delegate',
  payment_status TEXT DEFAULT 'Pending',
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SCORES (DELEGATES)
CREATE TABLE scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  committee_id TEXT NOT NULL,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  research INTEGER DEFAULT 0,
  diplomacy INTEGER DEFAULT 0,
  lobbying INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. NOTICES
CREATE TABLE notices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. GALLERY
CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. APP CONFIG (Settings)
CREATE TABLE app_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Initial Config
INSERT INTO app_config (key, value) VALUES ('googleFormLink', 'https://forms.gle/example');

-- 6. ADMIN PROFILES
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  is_admin BOOLEAN DEFAULT FALSE,
  email TEXT
);

-- ENABLE RLS (Row Level Security)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
CREATE POLICY "Public Read Notices" ON notices FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public Read Scores" ON scores FOR SELECT USING (true);
CREATE POLICY "Public Read Config" ON app_config FOR SELECT USING (true);

-- ADMIN AUTH POLICIES
-- Note: These assume the user is authenticated and is_admin is true in profiles
-- For simplicity in a prototype, you can use:
CREATE POLICY "Admin All Registrations" ON registrations FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "Admin All Scores" ON scores FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "Admin All Notices" ON notices FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "Admin All Gallery" ON gallery FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "Admin All Config" ON app_config FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "Admin All Profiles" ON profiles FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));
