'use client';

import { useRef, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import type { AppMode } from '@/types';

export default function Header() {
  const { profile, mode, setMode } = useAuth();
  const sliderRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLSpanElement>(null);
  const editorRef = useRef<HTMLSpanElement>(null);
  const [isOnline, setIsOnline] = useState(true);

  // Animate the mode switch slider
  useEffect(() => {
    const active = mode === 'viewer' ? viewerRef.current : editorRef.current;
    const slider = sliderRef.current;
    if (!active || !slider) return;
    const parent = active.parentElement!;
    const parentRect = parent.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    slider.style.left = `${activeRect.left - parentRect.left}px`;
    slider.style.width = `${activeRect.width}px`;
  }, [mode]);

  useEffect(() => {
    const handle = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handle);
    window.addEventListener('offline', handle);
    return () => { window.removeEventListener('online', handle); window.removeEventListener('offline', handle); };
  }, []);

  const canEdit = profile?.rol === 'editor' || profile?.rol === 'admin';

  const toggle = () => {
    if (!canEdit) return;
    setMode(mode === 'viewer' ? 'editor' : 'viewer');
  };

  const initials = profile?.naam?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() ?? '?';

  return (
    <header className="site-header" id="siteHeader">
      {/* Logo (hidden on wider screens since sidebar shows it) */}
      <span className="logo" style={{ marginRight: 4 }}>
        <span className="logo-icon">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <rect x="0.5" y="0.5" width="3.5" height="3.5" rx="0.8" fill="rgba(255,255,255,0.9)" />
            <rect x="6" y="0.5" width="3.5" height="3.5" rx="0.8" fill="rgba(255,255,255,0.6)" />
            <rect x="0.5" y="6" width="3.5" height="3.5" rx="0.8" fill="rgba(255,255,255,0.6)" />
            <rect x="6" y="6" width="3.5" height="3.5" rx="0.8" fill="rgba(255,255,255,0.4)" />
          </svg>
        </span>
        TPA
      </span>

      <div className="hdr-spacer" />

      {/* Online indicator */}
      <div style={{ display: 'flex', alignItems: 'center', fontSize: 11, color: 'var(--text-3)' }}>
        <span className={`rt-dot${isOnline ? '' : ' rt-offline'}`} />
        {isOnline ? 'Live' : 'Offline'}
      </div>

      <div className="hdr-sep" />

      {/* Mode switch */}
      {canEdit && (
        <div
          className={`mode-switch ${mode === 'viewer' ? 'is-viewer' : 'is-editor'}`}
          onClick={toggle}
          title="Wissel van modus"
        >
          <div className="ms-slider" ref={sliderRef} />
          <span className="ms-option" ref={viewerRef}>Viewer</span>
          <span className="ms-option" ref={editorRef}>Bewerker</span>
        </div>
      )}

      <div className="hdr-sep" />

      {/* User avatar */}
      <div className="hdr-user" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span className="user-avatar">{initials}</span>
        <span style={{ fontSize: 12, color: 'var(--text-2)', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {profile?.naam}
        </span>
      </div>
    </header>
  );
}
