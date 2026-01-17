
export interface ImageState {
  original: string | null;
  edited: string | null;
  mimeType: string | null;
}

export interface HistoryItem {
  id: string;
  original: string;
  edited: string;
  prompt: string;
  timestamp: number;
}

export type AppView = 'dashboard' | 'editor' | 'crm' | 'analytics' | 'settings';

export interface Client {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'pending' | 'inactive';
  lastActivity: string;
  totalProjects: number;
}

export interface BIStats {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}
