
import React from 'react';

interface PromptInputProps {
  prompt: string;
  onChange: (val: string) => void;
  onProcess: () => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, onChange, onProcess, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProcess();
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-center">
        <div className="absolute left-5 text-slate-500">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20l-4-4m0-7A7 7 0 111 8a7 7 0 0114 0zM10 11V6m0 8h.01" />
          </svg>
        </div>
        <input 
          type="text"
          value={prompt}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Describe how to edit this image..."
          disabled={isLoading}
          className="w-full bg-slate-900 border border-slate-700 hover:border-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl py-5 pl-14 pr-32 text-lg transition-all outline-none"
        />
        <button
          type="submit"
          disabled={!prompt.trim() || isLoading}
          className="absolute right-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 rounded-xl font-bold transition-all text-sm flex items-center gap-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Generate
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default PromptInput;
