
import React, { useState } from 'react';
import { HistoryItem } from '../types';
import { performMarketResearch } from '../services/gemini';

interface AnalyticsProps {
  history: HistoryItem[];
}

const Analytics: React.FC<AnalyticsProps> = ({ history }) => {
  const [researchQuery, setResearchQuery] = useState('');
  const [researchResult, setResearchResult] = useState<{text: string, sources: any[]} | null>(null);
  const [isResearching, setIsResearching] = useState(false);

  const handleResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!researchQuery) return;
    setIsResearching(true);
    try {
      const result = await performMarketResearch(researchQuery);
      setResearchResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsResearching(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-1">Deep Business Analytics</h1>
        <p className="text-slate-400">Leverage AI to uncover market trends and internal performance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Market Research Tool (Google Search AI)</h3>
            <form onSubmit={handleResearch} className="flex gap-4 mb-6">
              <input 
                value={researchQuery}
                onChange={e => setResearchQuery(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 outline-none focus:border-indigo-500 text-sm"
                placeholder="Search market trends for AI SaaS..."
              />
              <button disabled={isResearching} className="px-6 py-3 bg-indigo-600 rounded-xl font-bold text-sm disabled:opacity-50">
                {isResearching ? 'Analyzing...' : 'Research'}
              </button>
            </form>
            
            {researchResult && (
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 prose prose-invert max-w-none text-sm leading-relaxed text-slate-300">
                <p className="whitespace-pre-wrap">{researchResult.text}</p>
                {researchResult.sources.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-slate-800">
                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Sources Found:</p>
                    <div className="flex flex-wrap gap-2">
                      {researchResult.sources.map((s, i) => s.web && (
                        <a key={i} href={s.web.uri} target="_blank" className="text-[10px] bg-slate-900 px-2 py-1 rounded border border-slate-800 hover:text-indigo-400">
                          {s.web.title || 'Link'}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">System Operational Logs</h3>
            <div className="font-mono text-[10px] space-y-2 text-slate-500 bg-slate-950 p-6 rounded-2xl">
              {history.map((h, i) => (
                <div key={i} className="flex gap-4 opacity-70">
                  <span className="text-indigo-400">[{new Date(h.timestamp).toLocaleTimeString()}]</span>
                  <span className="text-emerald-400 font-bold">INFO:</span>
                  <span>GENERATE_SUCCESS (ID: {h.id}) Prompt: "{h.prompt}"</span>
                </div>
              ))}
              {history.length === 0 && <div className="italic text-slate-600">No logs generated. Edit images to see trace.</div>}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Prompt Taxonomy</h3>
            <div className="space-y-4">
              {[
                { label: 'Creative', val: 72, color: 'bg-indigo-500' },
                { label: 'Retouching', val: 45, color: 'bg-purple-500' },
                { label: 'Automation', val: 18, color: 'bg-emerald-500' },
              ].map(cat => (
                <div key={cat.label} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span>{cat.label}</span>
                    <span className="text-slate-500">{cat.val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${cat.color}`} style={{ width: `${cat.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">User Loyalty</h3>
            <div className="flex items-center justify-center py-6">
               <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-800" />
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="364.4" strokeDashoffset="91" className="text-indigo-500" />
                </svg>
                <div className="absolute text-2xl font-black">75%</div>
              </div>
            </div>
            <p className="text-center text-[10px] text-slate-500 font-bold uppercase">Quarterly Retention</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
