import { create } from 'zustand';

export interface CommandHistory {
  id: string;
  command: string;
  output: string | React.ReactNode;
  isError?: boolean;
}

interface TerminalState {
  isOpen: boolean;
  history: CommandHistory[];
  
  toggleTerminal: () => void;
  setTerminalOpen: (isOpen: boolean) => void;
  addHistory: (entry: Omit<CommandHistory, 'id'>) => void;
  clearHistory: () => void;
}

export const useTerminalStore = create<TerminalState>((set) => ({
  isOpen: false,
  history: [
    {
      id: 'init',
      command: '',
      output: 'Chiheb System Terminal v1.0.0. Type "help" for a list of commands.'
    }
  ],

  toggleTerminal: () => set((state) => ({ isOpen: !state.isOpen })),
  setTerminalOpen: (isOpen) => set({ isOpen }),
  
  addHistory: (entry) => set((state) => ({
    history: [
      ...state.history,
      { ...entry, id: Math.random().toString(36).substring(7) }
    ]
  })),
  
  clearHistory: () => set({ 
    history: [
      {
        id: Math.random().toString(36).substring(7),
        command: '',
        output: 'Terminal cleared.'
      }
    ]
  }),
}));
