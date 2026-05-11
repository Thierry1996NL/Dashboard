import type { KolomDef, StatusValue } from '@/types';

export const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const SUPA_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const CONFIG_ROW_IDX = 0;
export const POLL_MS = 5000;

// ── Status values & colors ───────────────────────────────────────────────────

export const STATUS_VALUES: StatusValue[] = [
  'Gereed', 'Loopt', 'Review', 'Geblokkeerd', 'Nog te starten',
];

export function statusClass(s: string): string {
  if (s === 'Gereed') return 'G';
  if (s === 'Loopt') return 'L';
  if (s === 'Review') return 'R';
  if (s === 'Geblokkeerd') return 'B';
  return 'N';
}

// ── All column definitions ────────────────────────────────────────────────────

export const COLS: KolomDef[] = [
  { i: 0, f: '', n: 'Projectnummer intern' },
  { i: 1, f: '', n: 'Projectnummer extern' },
  { i: 2, f: '', n: 'Projectnaam' },
  { i: 3, f: '', n: 'APD Bouwdeel' },
  { i: 4, f: '', n: 'Liander Tracédeel' },
  { i: 5, f: '', n: 'WP nummer' },
  { i: 6, f: '', n: 'Tracé start' },
  { i: 7, f: '', n: 'Tracé eind' },
  { i: 9, f: '', n: 'Lengte nieuw (m)' },
  { i: 10, f: '', n: 'Lengte verwijderen (m)' },
  { i: 11, f: '', n: 'Overdracht VO aannemer' },
  { i: 8, f: 'Rollen & Gebruikers', n: 'Engineer' },
  { i: 179, f: 'Rollen & Gebruikers', n: 'Projectleider' },
  { i: 180, f: 'Rollen & Gebruikers', n: 'Uitvoerder' },
  { i: 181, f: 'Rollen & Gebruikers', n: 'Werkvoorbereider' },
  { i: 12, f: 'Analyse', n: 'Stukken VO controleren' },
  { i: 13, f: 'Analyse', n: 'VO inhoudelijk beoordelen' },
  { i: 14, f: 'Analyse', n: 'Verificatieplan opstellen' },
  { i: 15, f: 'Analyse', n: 'Eisen importeren Relatics' },
  { i: 16, f: 'Analyse', n: 'VO QuickScan beoordelen' },
  { i: 17, f: 'Analyse', n: 'Taakstellend Budget' },
  { i: 18, f: 'Analyse', n: 'Input Startnota (1)' },
  { i: 19, f: 'Analyse', n: 'Input Startnota (2)' },
  { i: 20, f: 'Analyse', n: 'Input Startnota (3)' },
  { i: 21, f: 'Analyse', n: 'Input Startnota (4)' },
  { i: 22, f: 'Analyse', n: 'Warme overdracht' },
  { i: 23, f: 'Analyse', n: 'Inrichten projectomgeving' },
  { i: 24, f: 'Analyse', n: '[Analyse] Overgangsdatum' },
  { i: 25, f: 'Analyse', n: '[Analyse] Weken resterend' },
  { i: 26, f: 'Analyse', n: '[Analyse] Gereed' },
  { i: 200, f: 'Analyse', n: '[Analyse] Opmerkingen' },
  { i: 27, f: 'VO-Fase', n: 'Eisen beoordelen projectteam' },
  { i: 28, f: 'VO-Fase', n: 'Eisen verwerken Excel' },
  { i: 29, f: 'VO-Fase', n: 'Kennismaking bevoegd gezag' },
  { i: 30, f: 'VO-Fase', n: 'Periodiek overleg BG' },
  { i: 31, f: 'VO-Fase', n: 'Opvragen raakvlakken' },
  { i: 32, f: 'VO-Fase', n: "DR's/iMSR's bespreken" },
  { i: 33, f: 'VO-Fase', n: 'Spelregels bevoegd gezag' },
  { i: 34, f: 'VO-Fase', n: 'Schetsontwerp opstellen' },
  { i: 35, f: 'VO-Fase', n: '[VO] Overgangsdatum' },
  { i: 36, f: 'VO-Fase', n: '[VO] Weken resterend' },
  { i: 37, f: 'VO-Fase', n: '[VO] Gereed' },
  { i: 201, f: 'VO-Fase', n: '[VO] Opmerkingen' },
  { i: 38, f: 'DO-Fase', n: 'Eisen BG in werktekening' },
  { i: 39, f: 'DO-Fase', n: 'CROW-500 invullen' },
  { i: 40, f: 'DO-Fase', n: 'EV-beheerders contacteren' },
  { i: 41, f: 'DO-Fase', n: 'Vitens contacteren' },
  { i: 42, f: 'DO-Fase', n: 'Stakeholders inventariseren' },
  { i: 43, f: 'DO-Fase', n: 'Aantal percelen' },
  { i: 44, f: 'DO-Fase', n: 'Aantal perceeleigenaren' },
  { i: 45, f: 'DO-Fase', n: 'Boorlocaties uitzetten' },
  { i: 46, f: 'DO-Fase', n: 'Aantal boringen' },
  { i: 47, f: 'DO-Fase', n: 'Kabeltrekplan maken' },
  { i: 48, f: 'DO-Fase', n: 'Duikers inmeten' },
  { i: 49, f: 'DO-Fase', n: 'Schouwverslag maken' },
  { i: 50, f: 'DO-Fase', n: 'Boringen uitwerken' },
  { i: 51, f: 'DO-Fase', n: 'Werkterrein-inrichting' },
  { i: 52, f: 'DO-Fase', n: 'Kennismaking ZRO' },
  { i: 53, f: 'DO-Fase', n: 'Principe-akkoord grondeigenaren' },
  { i: 54, f: 'DO-Fase', n: 'Schouwen met realisatie' },
  { i: 55, f: 'DO-Fase', n: 'Opmerkingen schouw realisatie' },
  { i: 56, f: 'DO-Fase', n: 'Schouw bevoegd gezag' },
  { i: 57, f: 'DO-Fase', n: 'Opmerkingen schouw BG' },
  { i: 58, f: 'DO-Fase', n: '[DO] Overgangsdatum' },
  { i: 59, f: 'DO-Fase', n: '[DO] Weken resterend' },
  { i: 60, f: 'DO-Fase', n: '[DO] Gereed' },
  { i: 202, f: 'DO-Fase', n: '[DO] Opmerkingen' },
  { i: 61, f: 'Onderzoeksfase', n: 'Conditionerende onderzoeken' },
  { i: 62, f: 'Onderzoeksfase', n: 'Beïnvloedingsberekening' },
  { i: 63, f: 'Onderzoeksfase', n: 'Toestemming GasUnie/NEN3654' },
  { i: 64, f: 'Onderzoeksfase', n: 'Belastbaarheidsberekening' },
  { i: 65, f: 'Onderzoeksfase', n: 'Toestemming TenneT' },
  { i: 66, f: 'Onderzoeksfase', n: 'Toetsen met OIV\'er' },
  { i: 67, f: 'Onderzoeksfase', n: 'ZRO-tekeningen opstellen' },
  { i: 68, f: 'Onderzoeksfase', n: 'Vervolggesprekken grondeigenaren' },
  { i: 69, f: 'Onderzoeksfase', n: 'Proefsleuflocaties uitzetten' },
  { i: 70, f: 'Onderzoeksfase', n: 'Controle boven/ondergrond' },
  { i: 71, f: 'Onderzoeksfase', n: 'Verkeersplan proefsleuven' },
  { i: 72, f: 'Onderzoeksfase', n: 'Melden grondeigenaren' },
  { i: 73, f: 'Onderzoeksfase', n: 'Melding proefsleuven' },
  { i: 74, f: 'Onderzoeksfase', n: 'Graafmelding KLIC' },
  { i: 75, f: 'Onderzoeksfase', n: 'Inladen Marxact' },
  { i: 76, f: 'Onderzoeksfase', n: 'Graven proefsleuven' },
  { i: 77, f: 'Onderzoeksfase', n: 'Beschoeiing aanvragen' },
  { i: 78, f: 'Onderzoeksfase', n: 'Melding beschoeiing grond.' },
];

// ── Phase definitions for planning ──────────────────────────────────────────

export interface FaseDef {
  f: string;
  l: string;
  overgangsdatum: number;
  wekenResterend: number;
  gereed: number;
  statCols: number[];
}

export const FASEN: FaseDef[] = [
  {
    f: 'Analyse',
    l: 'Analyse',
    overgangsdatum: 24,
    wekenResterend: 25,
    gereed: 26,
    statCols: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
  },
  {
    f: 'VO-Fase',
    l: 'VO',
    overgangsdatum: 35,
    wekenResterend: 36,
    gereed: 37,
    statCols: [27, 28, 29, 30, 31, 32, 33, 34],
  },
  {
    f: 'DO-Fase',
    l: 'DO',
    overgangsdatum: 58,
    wekenResterend: 59,
    gereed: 60,
    statCols: [38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 56],
  },
  {
    f: 'Onderzoeksfase',
    l: 'Onderzoek',
    overgangsdatum: -1,
    wekenResterend: -1,
    gereed: -1,
    statCols: [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78],
  },
];

// ── Visible columns for the main project table ────────────────────────────────

export const VISIBLE_COLS = [0, 1, 2, 5, 8, 179, 180, 181];

// ── Fase color map ────────────────────────────────────────────────────────────

export const FASE_COLORS: Record<string, { fg: string; bg: string }> = {
  Analyse:       { fg: '#0071E3', bg: '#EAF4FF' },
  'VO-Fase':     { fg: '#1A7F3C', bg: '#F0FBF4' },
  'DO-Fase':     { fg: '#8E6000', bg: '#FFF8ED' },
  Onderzoeksfase: { fg: '#6F35CE', bg: '#F2EDFF' },
  Uitvoering:    { fg: '#D70015', bg: '#FFF0F0' },
  Natuurtoets:   { fg: '#1A7F3C', bg: '#F0FBF4' },
  Archeologie:   { fg: '#881C58', bg: '#FFF0F8' },
  Bodem:         { fg: '#6E6E73', bg: '#F5F5F7' },
  'NGE/OO':      { fg: '#C93400', bg: '#FFF3ED' },
  Geo:           { fg: '#0077B5', bg: '#EAF4FF' },
};
