import React, { useMemo } from 'react';
import { getClients } from '../data';
import { PageHeader, Card, Badge } from '../ui';

export const Clients: React.FC = () => {
  const clients = useMemo(() => getClients(), []);
  const withEmail = clients.filter((c) => c.email).length;

  return (
    <div>
      <PageHeader title="Clients" subtitle="Customers aggregated by phone number, across all orders." />

      <Card className="p-5">
        <div className="font-bold mb-1">Clients</div>
        <div className="text-xs text-neutral-500 mb-4">
          {clients.length} unique clients · {withEmail} with email on file
        </div>

        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-neutral-500 border-y border-neutral-800">
                <th className="py-3 px-5 font-bold">Client</th>
                <th className="py-3 px-5 font-bold">Contact</th>
                <th className="py-3 px-5 font-bold">Orders</th>
                <th className="py-3 px-5 font-bold">Total Spent</th>
                <th className="py-3 px-5 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {clients.map((c) => (
                <tr key={c.phone}>
                  <td className="py-3 px-5">
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-neutral-600">Juba</div>
                  </td>
                  <td className="py-3 px-5">
                    <div className="text-neutral-300">{c.phone}</div>
                    <div className="text-xs text-neutral-600">{c.email || 'No email on file'}</div>
                  </td>
                  <td className="py-3 px-5 text-neutral-400">{c.orders}</td>
                  <td className="py-3 px-5 font-bold text-purple-300">${c.totalSpentUSD.toLocaleString()}</td>
                  <td className="py-3 px-5">
                    <Badge tone="green">Active</Badge>
                  </td>
                </tr>
              ))}
              {clients.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-neutral-600 text-sm">
                    No clients yet — they'll appear here after their first order.
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
