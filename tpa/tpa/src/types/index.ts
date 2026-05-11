// ── Database types ──────────────────────────────────────────────────────────

export type StatusValue =
  | 'Gereed'
  | 'Loopt'
  | 'Review'
  | 'Geblokkeerd'
  | 'Nog te starten'
  | '';

export type UserRole = 'viewer' | 'editor' | 'admin';
export type AppMode = 'viewer' | 'editor';

export interface Profile {
  id: string;
  naam: string;
  email: string;
  rol: UserRole;
  goedgekeurd: boolean;
  aangemaakt_op?: string;
}

// cel_data: JSON object with column index (as string) → value
export type CelData = Record<string, string>;

export interface Werkpakket {
  id?: string;
  row_idx: number;
  projectnaam?: string;
  cel_data: CelData;
  updated_by?: string;
  updated_at?: string;
}

export interface Boring {
  id: string;
  werkpakket_id: number;
  boring_nr: string;
  type_boring?: string;
  locatie?: string;
  aannemer?: string;
  diepte?: number;
  diameter?: number;
  lengte?: number;
  status: StatusValue;
  opmerking?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Proefsleuven {
  id: string;
  werkpakket_id: number;
  sleuf_nr: string;
  locatie?: string;
  aannemer?: string;
  lengte?: number;
  breedte?: number;
  status: StatusValue;
  opmerking?: string;
  created_at?: string;
}

export interface Duiker {
  id: string;
  werkpakket_id: number;
  duiker_nr: string;
  locatie?: string;
  type?: string;
  diameter?: number;
  lengte?: number;
  materiaal?: string;
  status: StatusValue;
  opmerking?: string;
  created_at?: string;
}

export interface Omgevingsmanagement {
  id: string;
  werkpakket_id: number;
  bureau?: string;
  type_onderzoek?: string;
  locatie?: string;
  aannemer?: string;
  status: StatusValue;
  opmerking?: string;
  created_at?: string;
}

export interface Opmerking {
  id: string;
  werkpakket_id: number;
  col_idx?: number;
  tekst: string;
  auteur?: string;
  created_at: string;
}

export interface Contactpersoon {
  id: string;
  werkpakket_id: number;
  naam: string;
  functie?: string;
  organisatie?: string;
  email?: string;
  telefoon?: string;
  created_at?: string;
}

export interface OntwerpLaag {
  id: string;
  werkpakket_id: number;
  naam: string;
  versie?: string;
  status?: string;
  opmerking?: string;
  created_at?: string;
}

// ── Column definitions ───────────────────────────────────────────────────────

export interface KolomDef {
  i: number;      // column index (key in cel_data)
  f: string;      // phase/group name
  n: string;      // column display name
}

// ── UI state types ───────────────────────────────────────────────────────────

export interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
}

export interface FilterState {
  search: string;
  fase: string;
  engineer: string;
  status: StatusValue | '';
  archief: boolean;
}
