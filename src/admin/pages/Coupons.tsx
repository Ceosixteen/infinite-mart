import React from 'react';
import { COUPONS } from '../../data/coupons';
import { PageHeader, Card, Badge } from '../ui';

export const Coupons: React.FC = () => {
  return (
    <div>
      <PageHeader title="Coupons" subtitle="Active discount codes shown in the VIP Voucher Vault." />

      <Card className="p-5">
        <div className="font-bold mb-1">Active Coupons</div>
        <div className="text-xs text-neutral-500 mb-4">{COUPONS.length} coupons live on the storefront</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {COUPONS.map((c) => (
            <div key={c.code} className="bg-neutral-950/60 border border-neutral-800 rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-bold text-sm">{c.title}</div>
                  <div className="text-xs text-neutral-500">{c.subtitle}</div>
                </div>
                <Badge tone="green">Live</Badge>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-800">
                <span className="font-mono font-black text-purple-300 tracking-wider">{c.code}</span>
                <span className="text-xs text-neutral-500">Min spend ${c.minSpendUSD}</span>
              </div>
              <div className="text-[11px] text-neutral-600 mt-1.5">{c.expiry}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
