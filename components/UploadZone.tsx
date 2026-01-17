
import React from 'react';

interface UploadZoneProps {
  onUpload: (base64: string, mimeType: string) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onUpload }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onUpload(reader.result as string, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
      <div className="max-w-md w-full">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative p-12 bg-slate-900 border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center gap-6 hover:border-indigo-500/50 transition-all cursor-pointer">
            <input 
              type="file" 
              accept="image/*" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={handleFileChange}
            />
            <div className="w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Drop your image</h2>
              <p className="text-slate-400">or click to browse from your computer</p>
            </div>
            <div className="flex gap-4 text-xs font-semibold text-slate-500 uppercase tracking-widest">
              <span>PNG</span>
              <span>JPG</span>
              <span>WEBP</span>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4">
          <p className="text-sm text-slate-500 italic">"Try adding a ship going on deep ocean to a photo of a bathtub."</p>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;
