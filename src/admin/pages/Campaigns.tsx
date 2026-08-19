import React, { useMemo, useState } from 'react';
import { Send, Megaphone } from 'lucide-react';
import { getCampaigns, addCampaign, getClients } from '../data';
import { PageHeader, Card, Input, PrimaryButton, formatDate } from '../ui';

export const Campaigns: React.FC = () => {
  const [version, setVersion] = useState(0);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const campaigns = useMemo(() => getCampaigns(), [version]);
  const recipientCount = useMemo(() => getClients().length, [version]);

  const handleSend = () => {
    if (!title.trim() || !message.trim()) return;
    addCampaign(title.trim(), message.trim());
    setTitle('');
    setMessage('');
    setVersion((v) => v + 1);
  };

  return (
    <div>
      <PageHeader title="Campaigns" subtitle="Send announcements and offers to every known client." />

      <Card className="p-6 mb-6">
        <div className="font-bold mb-1">Send a Campaign</div>
        <div className="text-xs text-neutral-500 mb-4">
          Logs a broadcast to all {recipientCount} known clients (delivery channel wiring is next).
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Weekend Flash Sale — 20% Off Everything!"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. This weekend only, get 20% off every category. Order before Sunday midnight!"
              rows={3}
              className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder:text-neutral-600 resize-none"
            />
          </div>
          <PrimaryButton onClick={handleSend} disabled={!title.trim() || !message.trim()} className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            <span>Send to All Clients</span>
          </PrimaryButton>
        </div>
      </Card>

      <Card className="p-6">
        <div className="font-bold mb-1">Campaign History</div>
        <div className="text-xs text-neutral-500 mb-4">{campaigns.length} campaigns sent</div>

        {campaigns.length === 0 ? (
          <div className="py-10 flex flex-col items-center text-neutral-600">
            <Megaphone className="w-8 h-8 mb-2" />
            <span className="text-sm">No campaigns sent yet.</span>
          </div>
        ) : (
          <div className="divide-y divide-neutral-900">
            {campaigns.map((c) => (
              <div key={c.id} className="py-3">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-sm">{c.title}</div>
                  <div className="text-xs text-neutral-500">{formatDate(c.sentAt)}</div>
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">{c.message}</div>
                <div className="text-[11px] text-neutral-600 mt-1">Sent to {c.recipientCount} clients</div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
