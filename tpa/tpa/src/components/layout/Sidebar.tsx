'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const NAV = [
  {
    label: 'Navigatie',
    items: [
      { href: '/projecten', label: 'Projecten', icon: <GridIcon /> },
      { href: '/analyse', label: 'Analyse', icon: <ChartIcon /> },
      { href: '/planning', label: 'Planning', icon: <PlanningIcon /> },
      { href: '/modules/omgevingsmanagement', label: 'Omgevingsmanagement', icon: <LeafIcon /> },
      { href: '/modules/boringen', label: 'HDD Dashboard', icon: <DrillIcon /> },
      { href: '/modules/proefsleuven', label: 'PS Dashboard', icon: <TrenchIcon /> },
      { href: '/modules/duiker', label: 'Duiker Dashboard', icon: <PipeIcon /> },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { profile, signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('sb_collapsed');
    if (stored === '1') setCollapsed(true);

    // Sync body class for header padding
    document.body.classList.toggle('sidebar-collapsed', stored === '1');
  }, []);

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem('sb_collapsed', next ? '1' : '0');
    document.body.classList.toggle('sidebar-collapsed', next);
  };

  return (
    <>
      <aside className={`sidebar${collapsed ? ' collapsed' : ''}`} id="appSidebar">
        <div className="sidebar-content">
          {/* Logo */}
          <div style={{ padding: '1rem 1rem 0.5rem', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: '0.875rem', marginBottom: '0.25rem' }}>
            <div style={{ width: 28, height: 28, background: '#0071E3', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" rx="1.2" fill="rgba(255,255,255,0.9)" />
                <rect x="8" y="1" width="5" height="5" rx="1.2" fill="rgba(255,255,255,0.6)" />
                <rect x="1" y="8" width="5" height="5" rx="1.2" fill="rgba(255,255,255,0.6)" />
                <rect x="8" y="8" width="5" height="5" rx="1.2" fill="rgba(255,255,255,0.4)" />
              </svg>
            </div>
            <span className="sb-label" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13, color: '#fff' }}>TPA Dashboard</span>
          </div>

          {NAV.map(group => (
            <div key={group.label}>
              <div className="sb-section-label">{group.label}</div>
              {group.items.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sb-item${pathname.startsWith(item.href) ? ' active' : ''}`}
                >
                  <span className="sb-icon">{item.icon}</span>
                  <span className="sb-label">{item.label}</span>
                </Link>
              ))}
            </div>
          ))}

          <div className="sb-divider" />

          {/* User info */}
          <div style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#1D4ED8,#0071E3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
              {profile?.naam?.slice(0, 2).toUpperCase() ?? '??'}
            </div>
            <div className="sb-label" style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{profile?.naam}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{profile?.rol}</div>
            </div>
            <button
              onClick={() => signOut().then(() => window.location.href = '/login')}
              className="sb-label"
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontSize: 11, padding: '2px 4px', borderRadius: 4, whiteSpace: 'nowrap' }}
              title="Uitloggen"
            >
              ↩
            </button>
          </div>
        </div>
      </aside>

      {/* Toggle button */}
      <button className="sb-toggle" onClick={toggle} title={collapsed ? 'Uitklappen' : 'Inklappen'}>
        {collapsed ? '›' : '‹'}
      </button>
    </>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function GridIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M2 12L6 7l3 3 3-5 2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlanningIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="3" width="14" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 1v4M11 1v4M1 7h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M2 14c2-4 4-8 12-12C14 6 10 10 2 14z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function DrillIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function TrenchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M1 4h14M1 12h14M4 4v8M12 4v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PipeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M1 8h14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.2" />
      <path d="M1 8h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="3" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="13" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
