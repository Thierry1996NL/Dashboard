'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || (profile && !profile.goedgekeurd))) {
      router.replace('/login');
    }
  }, [user, profile, loading, router]);

  if (loading) {
    return <div className="loading-bar" />;
  }

  if (!user || !profile?.goedgekeurd) return null;

  return (
    <>
      <Sidebar />
      <Header />
      <div className="app-layout">
        {children}
      </div>
    </>
  );
}
