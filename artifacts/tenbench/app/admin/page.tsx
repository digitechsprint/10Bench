import type { Metadata } from 'next';
import { AdminApp } from '../../components/admin/admin-app';
import './admin.css';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminPage() {
  return <AdminApp />;
}
