"use client";

import { useSystemStore } from "@/store/useSystemStore";
import { Play, Square, Settings2, Plus, Minus, Activity, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export default function AdvancedServiceControls() {
  const selectedServiceId = useSystemStore(state => state.selectedService);
  const service = useSystemStore(state => selectedServiceId ? state.services[selectedServiceId] : null);
  const scaleService = useSystemStore(state => state.scaleService);
  const toggleDegraded = useSystemStore(state => state.toggleDegraded);
  const recoverService = useSystemStore(state => state.recoverService);
  const simulateFailure = useSystemStore(state => state.simulateFailure);
  const logs = useSystemStore(state => state.logs);
  
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, selectedServiceId]);

  if (!service) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-sm text-muted-foreground text-center border-2 border-dashed border-border rounded-lg p-6 bg-black/10">
        <Settings2 size={24} className="mb-2 opacity-50" />
        Select a service from the architecture diagram to inspect its status and manage instances.
      </div>
    );
  }

  return (
    <div className="space-y-4 flex-1 flex flex-col min-h-0">
      <h3 className="text-xs uppercase text-muted-foreground font-semibold tracking-wider">Service Inspector</h3>
      
      <div className="bg-black/20 p-3 rounded-lg border border-border shadow-inner">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-semibold text-sm text-foreground">{service.name}</h4>
            <span className="text-[10px] text-muted-foreground font-mono">{service.id}</span>
          </div>
          <span className={cn(
            "text-[10px] uppercase px-2 py-0.5 rounded font-bold tracking-wider",
            service.status === 'healthy' && "bg-success/20 text-success",
            service.status === 'degraded' && "bg-warning/20 text-warning",
            service.status === 'down' && "bg-destructive/20 text-destructive",
          )}>
            {service.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Replica Control */}
          <div className="bg-card border border-border p-2 rounded flex flex-col justify-between items-center">
            <span className="text-[10px] text-muted-foreground uppercase mb-1">Replicas</span>
            <div className="flex items-center gap-3">
              <button onClick={() => scaleService(service.id, -1)} className="p-1 hover:bg-border rounded text-muted-foreground"><Minus size={12}/></button>
              <span className="font-mono text-sm font-bold">{service.replicas}</span>
              <button onClick={() => scaleService(service.id, 1)} className="p-1 hover:bg-border rounded text-muted-foreground"><Plus size={12}/></button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col gap-1">
            <button 
              onClick={() => toggleDegraded(service.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 border py-1 rounded text-[10px] font-medium transition-all",
                service.status === 'degraded' ? "bg-warning/20 border-warning text-warning" : "bg-card border-border hover:border-warning/50 text-foreground"
              )}
            >
              <Activity size={12}/> Toggle Degraded
            </button>
            
            {service.status === 'down' ? (
              <button 
                onClick={() => recoverService(service.id)}
                className="flex-1 flex items-center justify-center gap-1.5 bg-success/10 hover:bg-success/20 text-success border border-success/20 py-1 rounded text-[10px] font-medium transition-all"
              >
                <Play size={12}/> Restart
              </button>
            ) : (
              <button 
                onClick={() => simulateFailure(service.id)}
                className="flex-1 flex items-center justify-center gap-1.5 bg-destructive/10 hover:bg-destructive/20 text-destructive border border-destructive/20 py-1 rounded text-[10px] font-medium transition-all"
              >
                <Square size={12} className="fill-current"/> Kill Node
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Service Logs */}
      <div className="flex-1 min-h-[150px] bg-[#0a0a0a] rounded-lg border border-border flex flex-col overflow-hidden shadow-inner">
        <div className="bg-black/40 px-3 py-1.5 border-b border-border text-[10px] uppercase font-mono text-muted-foreground flex justify-between items-center">
          <span>stdout logs • {service.id}</span>
        </div>
        <div className="flex-1 overflow-y-auto p-2 font-mono text-[10px] flex flex-col gap-1.5">
          {logs.filter(l => l.serviceId === service.id).map(log => (
            <div key={log.id} className="flex gap-2 leading-tight">
              <span className="text-muted-foreground shrink-0 select-none">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
              <span className={cn(
                "break-words",
                log.level === 'error' && "text-destructive font-semibold",
                log.level === 'warn' && "text-warning",
                log.level === 'info' && "text-primary/80",
              )}>
                {log.message}
              </span>
            </div>
          ))}
          {logs.filter(l => l.serviceId === service.id).length === 0 && (
            <div className="text-muted-foreground italic opacity-50 m-auto">No recent logs for this service...</div>
          )}
          <div ref={logsEndRef} />
        </div>
      </div>
    </div>
  );
}
