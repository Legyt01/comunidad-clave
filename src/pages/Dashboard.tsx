import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AdminDashboard } from '@/components/dashboards/AdminDashboard';
import { OwnerDashboard } from '@/components/dashboards/OwnerDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return user.role === 'admin' ? <AdminDashboard /> : <OwnerDashboard />;
}