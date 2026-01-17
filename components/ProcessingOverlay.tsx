
import React, { useState, useEffect } from 'react';

const ProcessingOverlay: React.FC = () => {
  const [step, setStep] = useState(0);
  const messages = [
    "Analyzing image structure...",
    "Understanding your creative intent...",
    "Consulting with the Nano Banana experts...",
    "Gemini is reimagining pixels...",
    "Applying the magical transformations...",
    "Polishing the final result...",
    "Almost there, finalizing pixels..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="max-w-md w-full p-12 text-center flex flex-col items-center gap-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-indigo-600 animate-pulse flex items-center justify-center relative z-10">
             <svg className="w-12 h-12 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 animate-pulse"></div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Magic in Progress
          </h2>
          <div className="h-6 flex items-center justify-center overflow-hidden">
             <p key={step} className="text-slate-400 font-medium animate-in slide-in-from-bottom-2 fade-in duration-500">
              {messages[step]}
            </p>
          </div>
        </div>

        <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
          <div className="bg-indigo-500 h-full animate-[loading_10s_linear_infinite]" style={{ width: '100%' }}></div>
        </div>
      </div>
      
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ProcessingOverlay;
