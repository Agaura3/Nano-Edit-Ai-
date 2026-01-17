
import React, { useState } from 'react';
import { Client } from '../types';

interface CRMProps {
  clients: Client[];
  onAddClient: (name: string, email: string, status: 'active' | 'pending' | 'inactive') => void;
  onToggleStatus: (clientId: string) => void;
}

const CRM: React.FC<CRMProps> = ({ clients, onAddClient, onToggleStatus }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newStatus, setNewStatus] = useState<'active' | 'pending' | 'inactive'>('active');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName && newEmail) {
      onAddClient(newName, newEmail, newStatus);
      setNewName('');
      setNewEmail('');
      setNewStatus('active');
      setShowAdd(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">Customer Management</h1>
          <p className="text-slate-400">Monitor client acquisition and retention metrics.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setShowAdd(!showAdd)} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-all text-sm shadow-lg shadow-indigo-500/20">
            {showAdd ? 'Cancel' : 'Add Client'}
          </button>
        </div>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="p-6 bg-slate-900 border border-indigo-500/30 rounded-2xl flex flex-wrap gap-4 items-end animate-in slide-in-from-top-4 duration-300">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Full Name</label>
            <input 
              required
              value={newName} 
              onChange={e => setNewName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-500"
              placeholder="e.g. John Doe"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Email Address</label>
            <input 
              required
              type="email"
              value={newEmail} 
              onChange={e => setNewEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-500"
              placeholder="john@example.com"
            />
          </div>
          <div className="w-full md:w-auto">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Initial Status</label>
            <select 
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as any)}
              className="w-full md:w-32 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-500"
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-bold shadow-lg shadow-indigo-500/10">
            Save Client
          </button>
        </form>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-950/50 border-b border-slate-800">
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Customer</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Status (Click to toggle)</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Activity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-slate-800/30 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-bold">{client.name}</p>
                      <p className="text-xs text-slate-500">{client.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <button 
                    onClick={() => onToggleStatus(client.id)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 cursor-pointer border ${
                    client.status === 'active' 
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20' 
                      : client.status === 'pending'
                      ? 'bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20'
                      : 'bg-slate-500/10 text-slate-400 border-slate-500/20 hover:bg-slate-500/20'
                  }`}>
                    {client.status}
                  </button>
                </td>
                <td className="px-8 py-6 text-right font-medium text-slate-500 text-xs">{client.lastActivity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CRM;
