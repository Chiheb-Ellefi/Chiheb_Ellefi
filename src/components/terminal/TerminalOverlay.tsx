"use client";

import { useState, useRef, useEffect } from 'react';
import { useTerminalStore } from '@/store/useTerminalStore';
import { useSystemStore } from '@/store/useSystemStore';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function TerminalOverlay() {
  const { isOpen, toggleTerminal, history, addHistory, clearHistory } = useTerminalStore();
  const { services, simulateFailure, recoverService } = useSystemStore();
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [history, isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    let output: string | React.ReactNode = '';
    const args = trimmedCmd.split(' ');
    const mainCommand = args[0].toLowerCase();

    switch (mainCommand) {
      case 'help':
        output = (
          <div className="flex flex-col gap-1 text-muted-foreground">
            <div>Available commands:</div>
            <div><span className="text-primary">system status</span> - View health of all services</div>
            <div><span className="text-primary">kill &lt;service&gt;</span> - Simulate a service failure</div>
            <div><span className="text-primary">recover &lt;service&gt;</span> - Recover a failed service</div>
            <div><span className="text-primary">simulate traffic</span> - Trigger load on the system</div>
            <div><span className="text-primary">clear</span> - Clear terminal history</div>
          </div>
        );
        break;
      case 'clear':
        clearHistory();
        setInput('');
        return;
      case 'system':
        if (args[1] === 'status') {
          output = (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1">
              {Object.values(services).map(s => (
                <div key={s.id} className="flex items-center justify-between">
                  <span>{s.name}</span>
                  <span className={cn(
                    s.status === 'healthy' && 'text-success',
                    s.status === 'degraded' && 'text-warning',
                    s.status === 'down' && 'text-destructive',
                  )}>[{s.status.toUpperCase()}]</span>
                </div>
              ))}
            </div>
          );
        } else {
          output = `Unknown system command: ${args[1]}`;
        }
        break;
      case 'kill':
        if (args[1] && services[args[1]]) {
          simulateFailure(args[1]);
          output = <span className="text-destructive">Service {args[1]} killed successfully. System degraded.</span>;
        } else {
          output = 'Please provide a valid service ID.';
        }
        break;
      case 'recover':
        if (args[1] && services[args[1]]) {
          recoverService(args[1]);
          output = <span className="text-success">Service {args[1]} recovered successfully. Node healthy.</span>;
        } else {
          output = 'Please provide a valid service ID.';
        }
        break;
      case 'simulate':
        output = <span className="text-warning">Traffic simulation initiated. Watch the architecture diagram for data flow.</span>;
        break;
      default:
        output = `Command not found: ${mainCommand}. Type "help" for a list of commands.`;
    }

    addHistory({ command: trimmedCmd, output });
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute bottom-0 left-0 right-0 h-80 max-h-[60vh] bg-black/90 backdrop-blur-xl border-t border-border flex flex-col font-mono text-sm z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-black/40">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TerminalIcon size={16} />
              <span>System Terminal</span>
            </div>
            <button onClick={toggleTerminal} className="text-muted-foreground hover:text-foreground transition-colors">
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
            {history.map((entry) => (
              <div key={entry.id} className="flex flex-col gap-1">
                {entry.command && (
                  <div className="flex items-center gap-2 text-foreground">
                    <span className="text-primary font-bold">chiheb@sys:~$</span>
                    <span>{entry.command}</span>
                  </div>
                )}
                <div className="text-muted-foreground ml-4">{entry.output}</div>
              </div>
            ))}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
              <span className="text-primary font-bold shrink-0">chiheb@sys:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-foreground caret-primary w-full"
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
            </form>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
