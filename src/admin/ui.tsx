import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-neutral-900/60 border border-neutral-800 rounded-2xl ${className}`}>{children}</div>
);

export const PageHeader: React.FC<{ title: string; subtitle: string; action?: React.ReactNode }> = ({
  title,
  subtitle,
  action
}) => (
  <div className="flex items-start justify-between gap-4 mb-6">
    <div>
      <h1 className="text-2xl font-black">{title}</h1>
      <p className="text-sm text-neutral-500 mt-1">{subtitle}</p>
    </div>
    {action}
  </div>
);

export const StatTile: React.FC<{
  icon: React.ElementType;
  value: string;
  label: string;
  hint?: string;
  colorClass?: string;
}> = ({ icon: Icon, value, label, hint, colorClass = 'text-emerald-400 bg-emerald-500/10' }) => (
  <Card className="p-5">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${colorClass}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div className="text-2xl font-black">{value}</div>
    <div className="text-sm text-neutral-400 mt-0.5">{label}</div>
    {hint && <div className="text-[11px] text-neutral-600 mt-1">{hint}</div>}
  </Card>
);

export const Badge: React.FC<{ children: React.ReactNode; tone?: 'green' | 'yellow' | 'red' | 'neutral' }> = ({
  children,
  tone = 'neutral'
}) => {
  const tones: Record<string, string> = {
    green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    yellow: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    red: 'bg-red-500/15 text-red-400 border-red-500/20',
    neutral: 'bg-neutral-500/15 text-neutral-300 border-neutral-500/20'
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${tones[tone]}`}>
      {children}
    </span>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className={`bg-neutral-950/80 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder:text-neutral-600 ${props.className ?? ''}`}
  />
);

export const PrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
  <button
    {...props}
    className={`bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-opacity cursor-pointer ${props.className ?? ''}`}
  />
);

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }) +
    ', ' +
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}
