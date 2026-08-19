import React, { useMemo } from 'react';
import { CATEGORIES } from '../../data/categories';
import { getEffectiveProducts } from '../data';
import { PageHeader, Card } from '../ui';

export const Categories: React.FC = () => {
  const products = useMemo(() => getEffectiveProducts(), []);

  return (
    <div>
      <PageHeader title="Categories" subtitle="How your catalogue is organized on the storefront." />

      <Card className="p-5">
        <div className="font-bold mb-1">Storefront Categories</div>
        <div className="text-xs text-neutral-500 mb-4">{CATEGORIES.length} categories</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CATEGORIES.map((c) => {
            const liveCount = products.filter((p) => (c.slug === 'all' ? true : p.category === c.slug) && !p.hidden).length;
            return (
              <div
                key={c.slug}
                className="flex items-center gap-3 bg-neutral-950/60 border border-neutral-800 rounded-xl p-3"
              >
                <img src={c.image} alt={c.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm truncate">{c.name}</div>
                  <div className="text-xs text-neutral-500 truncate">{c.subtitle}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-bold text-sm">{liveCount}</div>
                  <div className="text-[10px] text-neutral-600 uppercase tracking-wider">Live</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
