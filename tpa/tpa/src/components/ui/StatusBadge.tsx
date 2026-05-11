import { statusClass } from '@/lib/constants';
import type { StatusValue } from '@/types';

const LABELS: Record<string, string> = {
  Gereed: 'Gereed',
  Loopt: 'Loopt',
  Review: 'Review',
  Geblokkeerd: 'Geblokkeerd',
  'Nog te starten': 'Nog te starten',
};

export default function StatusBadge({ status }: { status: StatusValue | string }) {
  if (!status) return <span style={{ color: 'var(--text-3)', fontSize: 11 }}>—</span>;
  const cls = statusClass(status);
  return <span className={`badge badge-${cls}`}>{LABELS[status] ?? status}</span>;
}
