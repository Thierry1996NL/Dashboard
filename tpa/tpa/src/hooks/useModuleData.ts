'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { StatusValue } from '@/types';
import { CONFIG_ROW_IDX } from '@/lib/constants';

export interface ProjectOption { id: number; label: string; }

export function useModuleData<T extends { id: string; status: StatusValue }>(
  tableName: string,
  orderCol: string = 'id'
) {
  const supabase = createClient();
  const [data, setData] = useState<T[]>([]);
  const [projects, setProjects] = useState<ProjectOption[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const [{ data: rows }, { data: wps }] = await Promise.all([
      supabase.from(tableName).select('*').order(orderCol, { ascending: true }),
      supabase.from('werkpakketten')
        .select('row_idx,cel_data,projectnaam')
        .neq('row_idx', CONFIG_ROW_IDX)
        .order('row_idx', { ascending: true }),
    ]);
    setData((rows ?? []) as T[]);
    setProjects(
      (wps ?? [])
        .filter((r: { projectnaam?: string }) => r.projectnaam !== '__config__')
        .map((r: { row_idx: number; cel_data?: Record<string, string>; projectnaam?: string }) => {
          const cd = r.cel_data ?? {};
          const label = (cd['2'] || r.projectnaam || `Project ${r.row_idx}`) + (cd['5'] ? ` · ${cd['5']}` : '');
          return { id: r.row_idx, label };
        })
    );
    setLoading(false);
  }, [supabase, tableName, orderCol]);

  useEffect(() => { load(); }, [load]);

  const save = async (id: string | null, payload: Partial<T>): Promise<void> => {
    if (id) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await supabase.from(tableName).update(payload as any).eq('id', id);
      if (error) throw new Error(error.message);
      setData(prev => prev.map(r => r.id === id ? { ...r, ...payload } : r));
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: newRow, error } = await supabase.from(tableName).insert(payload as any).select().single();
      if (error) throw new Error(error.message);
      setData(prev => [...prev, newRow as T]);
    }
  };

  const remove = async (id: string): Promise<void> => {
    const { error } = await supabase.from(tableName).delete().eq('id', id);
    if (error) throw new Error(error.message);
    setData(prev => prev.filter(r => r.id !== id));
  };

  return { data, setData, projects, loading, load, save, remove };
}
