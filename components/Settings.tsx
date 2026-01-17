
import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-1">System Settings</h1>
        <p className="text-slate-400">Configure your SaaS instance and API preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <section className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
          <h3 className="text-lg font-bold mb-6">Subscription & Billing</h3>
          <div className="flex items-center justify-between p-6 bg-slate-950 rounded-2xl border border-indigo-500/20 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                </svg>
              </div>
              <div>
                <p className="font-bold">Pro Enterprise Plan</p>
                <p className="text-xs text-slate-500">Your next billing date is Oct 12, 2024</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold transition-colors">
              Manage Billing
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Current Balance</p>
              <p className="text-xl font-bold">$12.50</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Tokens Remaining</p>
              <p className="text-xl font-bold">145k</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Active Users</p>
              <p className="text-xl font-bold">8 / 20</p>
            </div>
          </div>
        </section>

        <section className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
          <h3 className="text-lg font-bold mb-6">API Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">AI Model Version</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 outline-none focus:border-indigo-500">
                <option>Gemini 2.5 Flash (Default)</option>
                <option>Gemini 3 Pro (Beta)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Output Quality</label>
              <div className="flex gap-2">
                {['Draft', 'Standard', 'HD', '4K'].map(q => (
                  <button key={q} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${q === 'HD' ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-950 border-slate-800'}`}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
