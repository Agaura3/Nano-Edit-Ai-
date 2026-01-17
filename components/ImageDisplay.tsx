
import React, { useState } from 'react';

interface ImageDisplayProps {
  original: string;
  edited: string | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ original, edited }) => {
  const [showOriginal, setShowOriginal] = useState(false);

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-slate-900/50 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl relative">
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <div className="bg-slate-950/80 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 border border-slate-700">
          <div className={`w-2 h-2 rounded-full ${edited ? 'bg-indigo-500' : 'bg-slate-500'}`} />
          {edited ? (showOriginal ? 'Before' : 'After') : 'Source Image'}
        </div>
      </div>

      {edited && (
        <button
          onMouseDown={() => setShowOriginal(true)}
          onMouseUp={() => setShowOriginal(false)}
          onMouseLeave={() => setShowOriginal(false)}
          className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold uppercase border border-white/20 transition-all select-none"
        >
          Hold to See Before
        </button>
      )}

      <div className="flex-1 flex items-center justify-center p-4 lg:p-12 overflow-hidden">
        <img 
          src={showOriginal || !edited ? original : edited} 
          alt="Canvas"
          className="max-w-full max-h-full object-contain rounded-xl shadow-2xl transition-all duration-300 animate-in fade-in"
        />
      </div>

      {edited && (
        <div className="absolute bottom-4 right-4 z-10">
          <a 
            href={edited} 
            download="nanoedit-ai-result.png"
            className="p-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg transition-all flex items-center justify-center"
            title="Download Result"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
