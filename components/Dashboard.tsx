
import React from 'react';
import { HistoryItem } from '../types';

interface DashboardProps {
  onAction: () => void;
  history: HistoryItem[];
}

const Dashboard: React.FC<DashboardProps> = ({ onAction, history }) => {
  const totalEdits = history.length;
  const activeClients = 24; // Mock
  const revenue = totalEdits * 0.50 + 12450; // Mock SaaS math
  
  const cards = [
    { label: 'Total AI Edits', value: totalEdits.toString(), trend: '+12%', color: 'text-indigo-400' },
    { label: 'Active Clients', value: activeClients.toString(), trend: '+4%', color: 'text-emerald-400' },
    { label: 'Revenue (MRR)', value: `$${revenue.toLocaleString()}`, trend: '+18%', color: 'text-purple-400' },
    { label: 'Avg Latency', value: '1.2s', trend: '-10%', color: 'text-amber-400' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">Business Overview</h1>
          <p className="text-slate-400">Your AI-powered SaaS dashboard is live.</p>
        </div>
        <button onClick={onAction} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20">
          Open AI Editor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(card => (
          <div key={card.label} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-700 transition-all">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">{card.label}</p>
            <div className="flex items-end justify-between">
              <h2 className={`text-3xl font-bold ${card.color}`}>{card.value}</h2>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">
                {card.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-8 bg-slate-900 border border-slate-800 rounded-3xl min-h-[400px]">
          <h3 className="text-lg font-bold mb-6">Usage Growth Intelligence (BI)</h3>
          <div className="h-64 flex items-end justify-between gap-4">
            {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85, 60, 100].map((h, i) => (
              <div key={i} className="flex-1 group relative">
                <div 
                  className="w-full bg-indigo-600/40 group-hover:bg-indigo-500 transition-all rounded-t-lg relative"
                  style={{ height: `${h}%` }}
                >
                  {i === 11 && history.length > 0 && (
                    <div className="absolute inset-0 bg-indigo-400 animate-pulse rounded-t-lg"></div>
                  )}
                </div>
                <div className="mt-4 text-[10px] font-bold text-slate-600 text-center">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-6 italic">* Chart reflects real-time API call distribution across fiscal quarters.</p>
        </div>

        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col">
          <h3 className="text-lg font-bold mb-6">Recent Customer Activity</h3>
          <div className="space-y-6 flex-1">
            {history.length > 0 ? history.slice(0, 4).map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 overflow-hidden">
                  <img src={item.edited} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold truncate">Admin Generation</p>
                  <p className="text-xs text-slate-500 truncate">{item.prompt}</p>
                </div>
                <span className="ml-auto text-[10px] font-bold text-slate-600 uppercase tracking-widest">Just now</span>
              </div>
            )) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-600 text-center">
                <svg className="w-8 h-8 mb-2 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p className="text-xs">No activity yet.<br/>Generate an image to see data.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
