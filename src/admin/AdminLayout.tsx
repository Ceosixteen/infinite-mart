import React from 'react';
import {
  LayoutGrid,
  ShoppingBag,
  Package,
  LayoutList,
  Ticket,
  Users,
  Mail,
  Megaphone,
  Settings as SettingsIcon,
  LogOut
} from 'lucide-react';
import { logout } from './auth';

export type AdminPage =
  | 'overview'
  | 'orders'
  | 'products'
  | 'categories'
  | 'coupons'
  | 'clients'
  | 'leads'
  | 'campaigns'
  | 'settings';

const NAV: { id: AdminPage; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'categories', label: 'Categories', icon: LayoutList },
  { id: 'coupons', label: 'Coupons', icon: Ticket },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'leads', label: 'Email Leads', icon: Mail },
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
  { id: 'settings', label: 'Settings', icon: SettingsIcon }
];

interface AdminLayoutProps {
  active: AdminPage;
  onNavigate: (page: AdminPage) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ active, onNavigate, onLogout, children }) => {
  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0d] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-neutral-900 flex flex-col fixed inset-y-0 left-0">
        <div className="flex items-center gap-3 px-5 py-5 border-b border-neutral-900">
          <div className="w-9 h-9 rounded-xl bg-white text-black font-black flex items-center justify-center text-sm shrink-0">
            ⚡
          </div>
          <div>
            <div className="text-sm font-black leading-tight">Infinite Mart</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
              Back Office
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-600/30'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-neutral-900">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 ml-64 min-h-screen">
        <div className="max-w-6xl mx-auto px-8 py-8">{children}</div>
      </main>
    </div>
  );
};
