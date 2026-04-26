"use client";

import { useSystemStore } from "@/store/useSystemStore";
import { Activity, Clock, AlertCircle, Database } from "lucide-react";

export default function ObservabilityPanel() {
  const metrics = useSystemStore(state => state.metrics);

  return (
    <div className="space-y-3">
      <h3 className="text-xs uppercase text-muted-foreground font-semibold tracking-wider flex items-center gap-2">
        <Activity size={14} /> Global Metrics
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-black/20 border border-border p-3 rounded-lg flex flex-col justify-between">
          <span className="text-[10px] uppercase text-muted-foreground font-mono flex items-center gap-1"><Activity size={12}/> RPS</span>
          <span className="text-xl font-bold font-mono text-primary">{metrics.rps.toFixed(0)}</span>
        </div>
        <div className="bg-black/20 border border-border p-3 rounded-lg flex flex-col justify-between">
          <span className="text-[10px] uppercase text-muted-foreground font-mono flex items-center gap-1"><Clock size={12}/> Latency</span>
          <span className={`text-xl font-bold font-mono ${metrics.latency > 500 ? 'text-destructive' : metrics.latency > 150 ? 'text-warning' : 'text-success'}`}>
            {metrics.latency.toFixed(0)}ms
          </span>
        </div>
        <div className="bg-black/20 border border-border p-3 rounded-lg flex flex-col justify-between">
          <span className="text-[10px] uppercase text-muted-foreground font-mono flex items-center gap-1"><AlertCircle size={12}/> Error Rate</span>
          <span className={`text-xl font-bold font-mono ${metrics.errorRate > 5 ? 'text-destructive' : metrics.errorRate > 1 ? 'text-warning' : 'text-success'}`}>
            {metrics.errorRate.toFixed(2)}%
          </span>
        </div>
        <div className="bg-black/20 border border-border p-3 rounded-lg flex flex-col justify-between">
          <span className="text-[10px] uppercase text-muted-foreground font-mono flex items-center gap-1"><Database size={12}/> Cache Hit</span>
          <span className={`text-xl font-bold font-mono ${metrics.cacheHitRatio < 50 ? 'text-destructive' : metrics.cacheHitRatio < 80 ? 'text-warning' : 'text-success'}`}>
            {metrics.cacheHitRatio.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}
