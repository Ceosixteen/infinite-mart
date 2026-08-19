import React, { useMemo, useState } from 'react';
import { Search, Download, Pencil, Eye, EyeOff, X } from 'lucide-react';
import { getEffectiveProducts, setProductOverride, EffectiveProduct } from '../data';
import { CATEGORIES } from '../../data/categories';
import { PageHeader, Card, Input, Badge, PrimaryButton } from '../ui';

function toCsv(products: EffectiveProduct[]): string {
  const header = ['id', 'title', 'category', 'priceUSD', 'stockCount', 'status'];
  const rows = products.map((p) => [p.id, p.title, p.category, p.priceUSD, p.stockCount, p.hidden ? 'Hidden' : 'Live']);
  return [header, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
}

export const Products: React.FC = () => {
  const [version, setVersion] = useState(0);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [editing, setEditing] = useState<EffectiveProduct | null>(null);
  const products = useMemo(() => getEffectiveProducts(), [version]);

  const refresh = () => setVersion((v) => v + 1);

  const filtered = products.filter((p) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
    const matchesCategory = category === 'all' || p.category === category;
    return matchesQuery && matchesCategory;
  });

  const toggleVisibility = (p: EffectiveProduct) => {
    setProductOverride(p.id, { hidden: !p.hidden });
    refresh();
  };

  const handleExport = () => {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'infinite-mart-products.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <PageHeader title="Products" subtitle="Manage your entire product catalogue." />

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
          <div>
            <div className="font-bold">Product Catalogue</div>
            <div className="text-xs text-neutral-500">
              {filtered.length} of {products.length} products across {CATEGORIES.length - 1} categories
            </div>
          </div>
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-sm font-bold px-3.5 py-2.5 rounded-xl cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-neutral-600 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or ID..."
              className="pl-9 w-full"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-neutral-950/80 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-neutral-500 border-y border-neutral-800">
                <th className="py-3 px-5 font-bold">Product</th>
                <th className="py-3 px-5 font-bold">Category</th>
                <th className="py-3 px-5 font-bold">Price</th>
                <th className="py-3 px-5 font-bold">Stock</th>
                <th className="py-3 px-5 font-bold">Status</th>
                <th className="py-3 px-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]} alt={p.title} className="w-10 h-10 rounded-lg object-cover bg-neutral-800 shrink-0" />
                      <div className="min-w-0">
                        <div className="font-semibold truncate max-w-[240px]">{p.title}</div>
                        <div className="text-xs text-neutral-600 truncate max-w-[240px]">{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-5 text-neutral-400 capitalize">{p.category}</td>
                  <td className="py-3 px-5">
                    <span className="font-bold">${p.priceUSD}</span>
                    {p.originalPriceUSD > p.priceUSD && (
                      <span className="text-neutral-600 line-through text-xs ml-1.5">${p.originalPriceUSD}</span>
                    )}
                  </td>
                  <td className="py-3 px-5 text-neutral-400">{p.stockCount}</td>
                  <td className="py-3 px-5">
                    <Badge tone={p.hidden ? 'neutral' : 'green'}>{p.hidden ? 'Hidden' : 'Live'}</Badge>
                  </td>
                  <td className="py-3 px-5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => toggleVisibility(p)}
                        title={p.hidden ? 'Show on storefront' : 'Hide from storefront'}
                        className="text-neutral-500 hover:text-white transition-colors cursor-pointer"
                      >
                        {p.hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditing(p)}
                        title="Edit price & stock"
                        className="text-neutral-500 hover:text-white transition-colors cursor-pointer"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-neutral-600 text-sm">
                    No products match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {editing && (
        <EditProductModal
          product={editing}
          onClose={() => setEditing(null)}
          onSave={(priceUSD, stockCount) => {
            setProductOverride(editing.id, { priceUSD, stockCount });
            refresh();
            setEditing(null);
          }}
        />
      )}
    </div>
  );
};

const EditProductModal: React.FC<{
  product: EffectiveProduct;
  onClose: () => void;
  onSave: (priceUSD: number, stockCount: number) => void;
}> = ({ product, onClose, onSave }) => {
  const [price, setPrice] = useState(String(product.priceUSD));
  const [stock, setStock] = useState(String(product.stockCount));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="font-bold">Edit Product</div>
          <button onClick={onClose} className="text-neutral-500 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="text-sm text-neutral-400 mb-4 truncate">{product.title}</div>
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
              Price (USD)
            </label>
            <Input type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} className="w-full" />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
              Stock Count
            </label>
            <Input type="number" min={0} value={stock} onChange={(e) => setStock(e.target.value)} className="w-full" />
          </div>
        </div>
        <PrimaryButton
          className="w-full mt-5"
          onClick={() => onSave(Number(price) || 0, Number(stock) || 0)}
        >
          Save Changes
        </PrimaryButton>
      </div>
    </div>
  );
};
