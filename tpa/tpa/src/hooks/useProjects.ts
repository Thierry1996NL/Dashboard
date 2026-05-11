'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Werkpakket, CelData } from '@/types';
import { CONFIG_ROW_IDX } from '@/lib/constants';

export function useProjects() {
  const supabase = createClient();
  const [projects, setProjects] = useState<Werkpakket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from('werkpakketten')
      .select('*')
      .neq('row_idx', CONFIG_ROW_IDX)
      .order('row_idx', { ascending: true });

    if (err) { setError(err.message); setLoading(false); return; }
    setProjects((data ?? []) as Werkpakket[]);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { load(); }, [load]);

  const updateCell = async (rowIdx: number, colIdx: number, value: string, updatedBy?: string) => {
    const project = projects.find(p => p.row_idx === rowIdx);
    if (!project) return;

    const newCelData: CelData = { ...project.cel_data, [String(colIdx)]: value };
    const patch: Partial<Werkpakket> = {
      cel_data: newCelData,
      updated_by: updatedBy,
      updated_at: new Date().toISOString(),
    };

    const { error: err } = await supabase
      .from('werkpakketten')
      .update(patch)
      .eq('row_idx', rowIdx);

    if (err) throw new Error(err.message);

    setProjects(prev =>
      prev.map(p => p.row_idx === rowIdx ? { ...p, ...patch } : p)
    );
  };

  const createProject = async (celData: CelData, updatedBy?: string): Promise<Werkpakket> => {
    const maxRowIdx = projects.reduce((m, p) => Math.max(m, p.row_idx), 0);
    const newProject: Partial<Werkpakket> = {
      row_idx: maxRowIdx + 1,
      cel_data: celData,
      updated_by: updatedBy,
      updated_at: new Date().toISOString(),
    };

    const { data, error: err } = await supabase
      .from('werkpakketten')
      .insert(newProject)
      .select()
      .single();

    if (err) throw new Error(err.message);
    const created = data as Werkpakket;
    setProjects(prev => [...prev, created]);
    return created;
  };

  const deleteProject = async (rowIdx: number) => {
    const { error: err } = await supabase
      .from('werkpakketten')
      .delete()
      .eq('row_idx', rowIdx);

    if (err) throw new Error(err.message);
    setProjects(prev => prev.filter(p => p.row_idx !== rowIdx));
  };

  return { projects, loading, error, load, updateCell, createProject, deleteProject };
}
