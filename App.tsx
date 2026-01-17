
import React, { useState } from 'react';
import { editImageWithGemini } from './services/gemini';
import { ImageState, HistoryItem, AppView, Client } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CRM from './components/CRM';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import UploadZone from './components/UploadZone';
import ImageDisplay from './components/ImageDisplay';
import Header from './components/Header';
import HistoryPanel from './components/HistoryPanel';
import PromptInput from './components/PromptInput';
import ProcessingOverlay from './components/ProcessingOverlay';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [imageState, setImageState] = useState<ImageState>({
    original: null,
    edited: null,
    mimeType: null,
  });
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Real CRM State
  const [clients, setClients] = useState<Client[]>([
    { id: '1', name: 'Sarah Jenkins', email: 'sarah@design.com', status: 'active', lastActivity: '2m ago', totalProjects: 12 },
    { id: '2', name: 'Mike Thompson', email: 'mike@agency.net', status: 'active', lastActivity: '1h ago', totalProjects: 5 },
  ]);

  const handleImageUpload = (base64: string, mimeType: string) => {
    setImageState({ original: base64, edited: null, mimeType });
    setError(null);
  };

  const handleProcessImage = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || prompt;
    if (!imageState.original || !finalPrompt || !imageState.mimeType) return;

    setIsProcessing(true);
    setError(null);
    try {
      const result = await editImageWithGemini(
        imageState.original,
        imageState.mimeType,
        finalPrompt
      );
      
      const newHistoryItem: HistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        original: imageState.original,
        edited: result,
        prompt: finalPrompt,
        timestamp: Date.now(),
      };

      setImageState(prev => ({ ...prev, edited: result }));
      setHistory(prev => [newHistoryItem, ...prev]);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setImageState({ original: null, edited: null, mimeType: null });
    setPrompt('');
    setError(null);
  };

  const addClient = (name: string, email: string, status: 'active' | 'pending' | 'inactive' = 'active') => {
    const newClient: Client = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      status,
      lastActivity: 'Just now',
      totalProjects: 0
    };
    setClients([newClient, ...clients]);
  };

  const toggleClientStatus = (clientId: string) => {
    setClients(prev => prev.map(client => {
      if (client.id === clientId) {
        const statuses: ('active' | 'pending' | 'inactive')[] = ['active', 'pending', 'inactive'];
        const currentIndex = statuses.indexOf(client.status);
        const nextStatus = statuses[(currentIndex + 1) % statuses.length];
        return { ...client, status: nextStatus };
      }
      return client;
    }));
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onAction={() => setCurrentView('editor')} history={history} />;
      case 'crm':
        return <CRM clients={clients} onAddClient={addClient} onToggleStatus={toggleClientStatus} />;
      case 'analytics':
        return <Analytics history={history} />;
      case 'settings':
        return <Settings />;
      case 'editor':
        return (
          <div className="flex flex-col lg:flex-row gap-6 h-full overflow-hidden">
            <div className="hidden lg:block w-72 shrink-0 overflow-hidden">
              <HistoryPanel 
                history={history} 
                onSelect={(item) => setImageState({ 
                  original: item.original, 
                  edited: item.edited, 
                  mimeType: 'image/png' 
                })} 
              />
            </div>
            <div className="flex-1 flex flex-col gap-6 overflow-hidden">
              {!imageState.original ? (
                <UploadZone onUpload={handleImageUpload} />
              ) : (
                <div className="flex-1 relative flex flex-col min-h-0">
                  <ImageDisplay original={imageState.original} edited={imageState.edited} />
                  <div className="mt-6">
                    <PromptInput 
                      prompt={prompt} 
                      onChange={setPrompt} 
                      onProcess={() => handleProcessImage()} 
                      isLoading={isProcessing}
                    />
                    {error && <div className="mt-2 p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs">{error}</div>}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden font-inter">
      <Sidebar activeView={currentView} onViewChange={setCurrentView} />
      
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <Header onReset={handleReset} />
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-[1600px] mx-auto h-full">
            {renderContent()}
          </div>
        </main>
      </div>

      {isProcessing && <ProcessingOverlay />}
    </div>
  );
};

export default App;
