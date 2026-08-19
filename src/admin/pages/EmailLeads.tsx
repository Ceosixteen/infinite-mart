import React, { useMemo } from 'react';
import { getEmailLeads } from '../data';
import { PageHeader, Card, formatDate } from '../ui';

export const EmailLeads: React.FC = () => {
  const leads = useMemo(() => getEmailLeads(), []);

  return (
    <div>
      <PageHeader title="Email Leads" subtitle="Customers who joined the mailing list for discounts and drops." />

      <Card className="p-5">
        <div className="font-bold mb-1">Email Leads</div>
        <div className="text-xs text-neutral-500 mb-4">{leads.length} captured from homepage signups</div>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wider text-neutral-500 border-y border-neutral-800">
              <th className="py-3 font-bold">Email</th>
              <th className="py-3 font-bold">Source</th>
              <th className="py-3 font-bold">Captured</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {leads.map((l) => (
              <tr key={l.email}>
                <td className="py-3">{l.email}</td>
                <td className="py-3 text-neutral-400">{l.source}</td>
                <td className="py-3 text-neutral-500">{formatDate(l.capturedAt)}</td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={3} className="py-10 text-center text-neutral-600 text-sm">
                  No email leads yet. They'll show up here as customers subscribe from the footer.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
