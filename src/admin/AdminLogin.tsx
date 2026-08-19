import React, { useState } from 'react';
import { Lock, User, ArrowRight, ShieldAlert } from 'lucide-react';
import { login } from './auth';

interface AdminLoginProps {
  onSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      setError('');
      onSuccess();
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0d] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-fuchsia-700/20 rounded-full blur-3xl" />

      <div className="relative w-full max-w-sm">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-white text-black font-black flex items-center justify-center text-xl shadow-lg mb-3">
            ⚡
          </div>
          <h1 className="text-xl font-black">Infinite Mart</h1>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mt-0.5">
            Back Office
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-6 space-y-4 backdrop-blur-sm"
        >
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:opacity-90 text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-opacity cursor-pointer"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-center text-[11px] text-neutral-500 pt-1">
            Restricted access — authorized staff only
          </p>
        </form>
      </div>
    </div>
  );
};
