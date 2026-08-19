import React, { useState } from 'react';
import { PageHeader, Card, Input, PrimaryButton } from '../ui';

export const Settings: React.FC = () => {
  const [rate, setRate] = useState(() => localStorage.getItem('infinitemart_rateSSP') || '8000');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('infinitemart_rateSSP', rate);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <PageHeader title="Settings" subtitle="Store-wide configuration." />

      <Card className="p-6 max-w-lg">
        <div className="font-bold mb-1">Exchange Rate</div>
        <div className="text-xs text-neutral-500 mb-4">
          USD to SSP conversion rate shown across the storefront.
        </div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
          1 USD equals (SSP)
        </label>
        <div className="flex items-center gap-3">
          <Input type="number" min={0} value={rate} onChange={(e) => setRate(e.target.value)} className="flex-1" />
          <PrimaryButton onClick={handleSave}>{saved ? 'Saved ✓' : 'Save'}</PrimaryButton>
        </div>
      </Card>

      <Card className="p-6 max-w-lg mt-6">
        <div className="font-bold mb-1">Admin Access</div>
        <div className="text-xs text-neutral-500">
          Change the back-office password by setting the <code className="text-neutral-400">VITE_ADMIN_PASSWORD</code>{' '}
          environment variable in your Vercel project settings, then redeploy.
        </div>
      </Card>
    </div>
  );
};
