import React, { useMemo } from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import { getOrders, getClients, getRevenueByCategory } from '../data';
import { CATEGORIES } from '../../data/categories';
import { PageHeader, StatTile, Card, formatDate } from '../ui';

export const Overview: React.FC = () => {
  const orders = useMemo(() => getOrders(), []);
  const clients = useMemo(() => getClients(), []);
  const revenueByCategory = useMemo(() => getRevenueByCategory(), []);

  const confirmedRevenue = orders
    .filter((o) => o.status === 'delivered')
    .reduce((sum, o) => sum + o.totalUSD, 0);
  const pendingRevenue = orders
    .filter((o) => o.status === 'pending')
    .reduce((sum, o) => sum + o.totalUSD, 0);
  const deliveredCount = orders.filter((o) => o.status === 'delivered').length;

  const maxCategoryRevenue = Math.max(1, ...revenueByCategory.map((c) => c.revenueUSD));
  const categoryName = (slug: string) => CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime())
    .slice(0, 6);

  return (
    <div>
      <PageHeader title="Overview" subtitle="Everything at a glance, across every category." />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatTile
          icon={DollarSign}
          value={`$${confirmedRevenue.toLocaleString()}`}
          label="Confirmed Revenue"
          hint={pendingRevenue > 0 ? `$${pendingRevenue.toLocaleString()} still pending delivery` : undefined}
          colorClass="text-emerald-400 bg-emerald-500/10"
        />
        <StatTile
          icon={ShoppingBag}
          value={String(orders.length)}
          label="Total Orders"
          hint={`${deliveredCount} delivered`}
          colorClass="text-purple-400 bg-purple-500/10"
        />
        <StatTile
          icon={Users}
          value={String(clients.length)}
          label="Clients"
          colorClass="text-amber-400 bg-amber-500/10"
        />
        <StatTile
          icon={TrendingUp}
          value={String(orders.filter((o) => o.status !== 'canceled').length)}
          label="Active Orders"
          colorClass="text-sky-400 bg-sky-500/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <div className="font-bold mb-1">Revenue by Category</div>
          <div className="text-xs text-neutral-500 mb-4">Delivered orders only, USD</div>
          <div className="space-y-4">
            {revenueByCategory.length === 0 && <div className="text-sm text-neutral-600">No delivered revenue yet.</div>}
            {revenueByCategory.map((c) => (
              <div key={c.category}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-neutral-300">{categoryName(c.category)}</span>
                  <span className="font-bold">${c.revenueUSD.toLocaleString()}</span>
                </div>
                <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full"
                    style={{ width: `${(c.revenueUSD / maxCategoryRevenue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="font-bold mb-1">Order Status Breakdown</div>
          <div className="text-xs text-neutral-500 mb-4">All orders, current status</div>
          <div className="space-y-4">
            {(['pending', 'delivered', 'canceled'] as const).map((status) => {
              const count = orders.filter((o) => o.status === status).length;
              const pct = orders.length ? (count / orders.length) * 100 : 0;
              const colorMap: Record<string, string> = {
                pending: 'from-amber-500 to-amber-400',
                delivered: 'from-emerald-600 to-emerald-400',
                canceled: 'from-red-600 to-red-400'
              };
              return (
                <div key={status}>
                  <div className="flex justify-between text-sm mb-1.5 capitalize">
                    <span className="text-neutral-300">{status}</span>
                    <span className="font-bold">{count}</span>
                  </div>
                  <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${colorMap[status]} rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="font-bold mb-1">Recent Orders</div>
        <div className="text-xs text-neutral-500 mb-4">Latest {recentOrders.length} across all categories</div>
        <div className="divide-y divide-neutral-800">
          {recentOrders.map((o) => (
            <div key={o.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">
                  {o.customerName} <span className="text-neutral-600 font-normal">· #{o.id.split('-').pop()}</span>
                </div>
                <div className="text-xs text-neutral-500">
                  {o.items.map((i) => `${i.quantity}x ${i.title}`).join(', ')} · {formatDate(o.placedAt)}
                </div>
              </div>
              <div className="text-sm font-bold text-purple-300 shrink-0 pl-4">${o.totalUSD.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
