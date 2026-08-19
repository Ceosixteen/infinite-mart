import React, { useState } from 'react';
import { isAuthenticated } from './auth';
import { AdminLogin } from './AdminLogin';
import { AdminLayout, AdminPage } from './AdminLayout';
import { Overview } from './pages/Overview';
import { Orders } from './pages/Orders';
import { Products } from './pages/Products';
import { Categories } from './pages/Categories';
import { Coupons } from './pages/Coupons';
import { Clients } from './pages/Clients';
import { EmailLeads } from './pages/EmailLeads';
import { Campaigns } from './pages/Campaigns';
import { Settings } from './pages/Settings';

const PAGES: Record<AdminPage, React.FC> = {
  overview: Overview,
  orders: Orders,
  products: Products,
  categories: Categories,
  coupons: Coupons,
  clients: Clients,
  leads: EmailLeads,
  campaigns: Campaigns,
  settings: Settings
};

export default function AdminApp() {
  const [authed, setAuthed] = useState(isAuthenticated());
  const [page, setPage] = useState<AdminPage>('overview');

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  const ActivePage = PAGES[page];

  return (
    <AdminLayout active={page} onNavigate={setPage} onLogout={() => setAuthed(false)}>
      <ActivePage />
    </AdminLayout>
  );
}
