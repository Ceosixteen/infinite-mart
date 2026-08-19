import React, { useMemo, useState } from 'react';
import { Search, Trash2 } from 'lucide-react';
import { getOrders, updateOrderStatus, deleteOrder, AdminOrder, OrderStatus } from '../data';
import { PageHeader, Card, Input, Badge, formatDate } from '../ui';

const STATUS_TONE: Record<OrderStatus, 'yellow' | 'green' | 'red'> = {
  pending: 'yellow',
  delivered: 'green',
  canceled: 'red'
};

export const Orders: React.FC = () => {
  const [version, setVersion] = useState(0);
  const [query, setQuery] = useState('');
  const orders = useMemo(() => getOrders(), [version]);

  const filtered = orders.filter((o) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      o.customerName.toLowerCase().includes(q) ||
      o.phone.toLowerCase().includes(q) ||
      o.id.toLowerCase().includes(q)
    );
  });

  const refresh = () => setVersion((v) => v + 1);

  const handleStatusChange = (order: AdminOrder, status: OrderStatus) => {
    updateOrderStatus(order.id, status);
    refresh();
  };

  const handleDelete = (order: AdminOrder) => {
    if (!confirm(`Delete order ${order.id}? This cannot be undone.`)) return;
    deleteOrder(order.id);
    refresh();
  };

  return (
    <div>
      <PageHeader title="Orders" subtitle="Every order placed across the storefront." />

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-bold">All Orders</div>
            <div className="text-xs text-neutral-500">{filtered.length} of {orders.length} orders</div>
          </div>
          <div className="relative w-64">
            <Search className="w-4 h-4 text-neutral-600 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, phone, ID..."
              className="pl-9 w-full"
            />
          </div>
        </div>

        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-neutral-500 border-y border-neutral-800">
                <th className="py-3 px-5 font-bold">Order</th>
                <th className="py-3 px-5 font-bold">Customer</th>
                <th className="py-3 px-5 font-bold">Items</th>
                <th className="py-3 px-5 font-bold">Payment</th>
                <th className="py-3 px-5 font-bold">Total</th>
                <th className="py-3 px-5 font-bold">Status</th>
                <th className="py-3 px-5 font-bold">Placed</th>
                <th className="py-3 px-5 font-bold text-right">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {filtered.map((o) => (
                <tr key={o.id} className="align-top">
                  <td className="py-3.5 px-5 font-mono text-xs font-bold text-neutral-300">#{o.id.split('-').pop()}</td>
                  <td className="py-3.5 px-5">
                    <div className="font-semibold">{o.customerName}</div>
                    <div className="text-xs text-neutral-500">{o.phone}</div>
                    <div className="text-xs text-neutral-600">{o.deliveryArea}</div>
                  </td>
                  <td className="py-3.5 px-5 text-xs text-neutral-400 max-w-[220px]">
                    {o.items.map((i) => `${i.quantity}x ${i.title}`).join(', ')}
                  </td>
                  <td className="py-3.5 px-5 text-xs text-neutral-400">{o.paymentMethod.replace(/_/g, ' ')}</td>
                  <td className="py-3.5 px-5 font-bold text-purple-300">${o.totalUSD.toLocaleString()}</td>
                  <td className="py-3.5 px-5">
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusChange(o, e.target.value as OrderStatus)}
                      className="bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-bold px-2 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      <option value="pending">Pending</option>
                      <option value="delivered">Delivered</option>
                      <option value="canceled">Canceled</option>
                    </select>
                    <div className="mt-1.5">
                      <Badge tone={STATUS_TONE[o.status]}>{o.status}</Badge>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 text-xs text-neutral-500 whitespace-nowrap">{formatDate(o.placedAt)}</td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(o)}
                      className="text-neutral-600 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-neutral-600 text-sm">
                    No orders match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
