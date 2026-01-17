
import React from 'react';
import { HistoryItem } from '../types';

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect }) => {
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Recent Magic</h3>
        <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full text-[10px] font-bold">
          {history.length}
        </span>
      </div>
      
      {history.length === 0 ? (
        <div className="flex-1 border border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center p-6 text-center opacity-40">
          <svg className="w-8 h-8 mb-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm">Your generation history will appear here</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-3 custom-scrollbar">
          {history.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className="group text-left p-3 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition-all overflow-hidden shrink-0"
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-slate-800 mb-2 relative">
                <img src={item.edited} alt={item.prompt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] text-white font-medium truncate">{item.prompt}</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 truncate font-medium">{item.prompt}</p>
              <p className="text-[10px] text-slate-600 mt-0.5">
                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPanel;
