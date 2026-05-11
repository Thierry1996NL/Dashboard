import type { CelData, StatusValue } from '@/types';
import { FASEN } from './constants';

// ── Date utilities ────────────────────────────────────────────────────────────

export function parseDatum(s: string | null | undefined): Date | null {
  if (!s || s === '01-01-2020' || s === '?') return null;
  const m1 = s.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (m1) return new Date(+m1[3], +m1[2] - 1, +m1[1]);
  const m2 = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m2) return new Date(+m2[1], +m2[2] - 1, +m2[3]);
  return null;
}

export function fmtDate(s: string | null | undefined): string | null {
  const d = parseDatum(s);
  if (!d) return null;
  return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getFullYear()).slice(2)}`;
}

export function wekenResterend(s: string | null | undefined): number | null {
  const d = parseDatum(s);
  if (!d) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 7));
}

// ── Project helpers ──────────────────────────────────────────────────────────

export function getProjectNaam(celData: CelData, rowIdx?: number): string {
  return celData['2'] || celData['0'] || (rowIdx ? `Project ${rowIdx}` : 'Onbekend');
}

export function getEngineer(celData: CelData): string {
  return celData['8'] || '';
}

export function getProjectStatus(celData: CelData): StatusValue {
  // Overall project status = worst status across all phase status columns
  const order: StatusValue[] = ['Geblokkeerd', 'Review', 'Loopt', 'Nog te starten', 'Gereed'];
  const allStatCols = FASEN.flatMap(f => f.statCols);
  const found = new Set<string>();
  allStatCols.forEach(i => {
    const v = celData[String(i)];
    if (v) found.add(v);
  });
  for (const s of order) {
    if (found.has(s)) return s;
  }
  return '';
}

export function getProgressPercent(celData: CelData, statCols: number[]): number {
  if (!statCols.length) return 0;
  const done = statCols.filter(i => celData[String(i)] === 'Gereed').length;
  return Math.round((done / statCols.length) * 100);
}

// ── Health / colour coding ────────────────────────────────────────────────────

export type Health = 'groen' | 'oranje' | 'rood' | 'grijs';

export function calcHealth(celData: CelData, fase: typeof FASEN[number]): Health {
  const { statCols, wekenResterend: wkCol, gereed } = fase;
  if (!statCols.length) return 'grijs';
  const isBlokkeerd = statCols.some(c => celData[String(c)] === 'Geblokkeerd');
  if (isBlokkeerd) return 'rood';
  const isGereed = celData[String(gereed)] === 'Ja' || celData[String(gereed)] === 'Gereed';
  if (isGereed) return 'groen';
  const wk = wekenResterend(celData[String(wkCol)]);
  if (wk !== null && wk < 0) return 'rood';
  if (wk !== null && wk <= 4) return 'oranje';
  const done = statCols.filter(c => celData[String(c)] === 'Gereed').length;
  if (done === statCols.length) return 'groen';
  return 'grijs';
}

// ── String utils ─────────────────────────────────────────────────────────────

export function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
