'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

type AuthState = 'login' | 'register' | 'pending';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signUp, user, profile, loading } = useAuth();
  const [state, setState] = useState<AuthState>('login');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register fields
  const [naam, setNaam] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  useEffect(() => {
    if (!loading && user && profile?.goedgekeurd) {
      router.replace('/projecten');
    } else if (!loading && user && profile && !profile.goedgekeurd) {
      setState('pending');
    }
  }, [user, profile, loading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Vul e-mailadres en wachtwoord in.');
      return;
    }
    setSubmitting(true);
    setError('');
    const err = await signIn(email.trim(), password.trim());
    if (err) { setError(err); setSubmitting(false); }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!naam.trim()) { setError('Vul je naam in.'); return; }
    if (!regEmail.trim()) { setError('Vul je e-mailadres in.'); return; }
    if (regPassword.length < 8) { setError('Wachtwoord moet minimaal 8 tekens zijn.'); return; }
    setSubmitting(true);
    setError('');
    const err = await signUp(naam.trim(), regEmail.trim(), regPassword);
    if (err) { setError(err); setSubmitting(false); }
    else setState('pending');
    setSubmitting(false);
  };

  if (loading) return null;

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <div className="login-logo-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="2" width="6" height="6" rx="1.5" fill="rgba(255,255,255,0.9)" />
              <rect x="10" y="2" width="6" height="6" rx="1.5" fill="rgba(255,255,255,0.6)" />
              <rect x="2" y="10" width="6" height="6" rx="1.5" fill="rgba(255,255,255,0.6)" />
              <rect x="10" y="10" width="6" height="6" rx="1.5" fill="rgba(255,255,255,0.4)" />
            </svg>
          </div>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15 }}>TPA Dashboard</span>
        </div>

        {state === 'pending' && (
          <>
            <h1 className="login-title">Account in behandeling</h1>
            <p className="login-sub" style={{ marginBottom: 0 }}>
              Je account is aangemaakt en wacht op goedkeuring van een beheerder.
              Je ontvangt een e-mail zodra je account is goedgekeurd.
            </p>
          </>
        )}

        {state === 'login' && (
          <form onSubmit={handleLogin}>
            <h1 className="login-title">Welkom terug</h1>
            <p className="login-sub">Log in met je e-mailadres en wachtwoord</p>

            <div className="login-field">
              <label className="login-label">E-mailadres</label>
              <input
                className="login-input"
                type="email"
                placeholder="E-mailadres"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
              />
            </div>
            <div className="login-field">
              <label className="login-label">Wachtwoord</label>
              <input
                className="login-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button className="login-btn" type="submit" disabled={submitting}>
              {submitting ? 'Bezig...' : 'Inloggen →'}
            </button>

            {error && <div className="login-error">{error}</div>}

            <p className="auth-switch">
              Nog geen account?{' '}
              <a href="#" onClick={e => { e.preventDefault(); setState('register'); setError(''); }}>
                Registreren
              </a>
            </p>
          </form>
        )}

        {state === 'register' && (
          <form onSubmit={handleRegister}>
            <h1 className="login-title">Account aanmaken</h1>
            <p className="login-sub">Vul je gegevens in — een beheerder keurt je account goed</p>

            <div className="login-field">
              <label className="login-label">Naam</label>
              <input
                className="login-input"
                type="text"
                placeholder="Jan de Vries"
                value={naam}
                onChange={e => setNaam(e.target.value)}
                autoComplete="name"
                autoFocus
              />
            </div>
            <div className="login-field">
              <label className="login-label">E-mailadres</label>
              <input
                className="login-input"
                type="email"
                placeholder="E-mailadres"
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="login-field">
              <label className="login-label">Wachtwoord</label>
              <input
                className="login-input"
                type="password"
                placeholder="Minimaal 8 tekens"
                value={regPassword}
                onChange={e => setRegPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <button className="login-btn" type="submit" disabled={submitting}>
              {submitting ? 'Bezig...' : 'Account aanmaken →'}
            </button>

            {error && <div className="login-error">{error}</div>}

            <p className="auth-switch">
              Al een account?{' '}
              <a href="#" onClick={e => { e.preventDefault(); setState('login'); setError(''); }}>
                Inloggen
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
