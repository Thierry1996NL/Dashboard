'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import type { Profile, AppMode } from '@/types';

interface AuthContextValue {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  mode: AppMode;
  setMode: (m: AppMode) => void;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (naam: string, email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [mode, setModeState] = useState<AppMode>('viewer');
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (sess: Session) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', sess.user.id)
      .single();
    if (data) {
      setProfile(data);
      const m: AppMode = (data.rol === 'editor' || data.rol === 'admin') ? 'editor' : 'viewer';
      setModeState(m);
    }
  }, [supabase]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess) loadProfile(sess).finally(() => setLoading(false));
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess) loadProfile(sess);
      else { setProfile(null); setModeState('viewer'); }
    });

    return () => subscription.unsubscribe();
  }, [supabase, loadProfile]);

  const setMode = (m: AppMode) => {
    // Only editor/admin can switch to editor mode
    if (m === 'editor' && profile?.rol === 'viewer') return;
    setModeState(m);
  };

  const signIn = async (email: string, password: string): Promise<string | null> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return friendlyError(error.message);
    return null;
  };

  const signUp = async (naam: string, email: string, password: string): Promise<string | null> => {
    if (password.length < 8) return 'Wachtwoord moet minimaal 8 tekens zijn.';
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return friendlyError(error.message);
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        naam,
        email,
        rol: 'viewer',
        goedgekeurd: false,
      });
    }
    return null;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, session, mode, setMode, signIn, signUp, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

function friendlyError(msg: string): string {
  if (!msg) return 'Er is een fout opgetreden.';
  if (msg.includes('Invalid login')) return 'E-mailadres of wachtwoord klopt niet.';
  if (msg.includes('Email not confirmed')) return 'Bevestig eerst je e-mailadres via de mail die je hebt ontvangen.';
  if (msg.includes('User already registered')) return 'Dit e-mailadres is al geregistreerd.';
  if (msg.includes('Password should be')) return 'Wachtwoord moet minimaal 8 tekens zijn.';
  return msg;
}
