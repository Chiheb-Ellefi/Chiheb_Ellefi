"use client";

import { Activity, Terminal as TerminalIcon } from "lucide-react";
import { useTerminalStore } from "@/store/useTerminalStore";
import ObservabilityPanel from "./ObservabilityPanel";
import ScenarioRunner from "./ScenarioRunner";
import SystemInsight from "./SystemInsight";
import AdvancedServiceControls from "./AdvancedServiceControls";
import { useSimulationEngine } from "@/lib/simulationEngine";

export default function SimulationControls() {
  const terminalToggle = useTerminalStore(state => state.toggleTerminal);
  
  // Start the background SRE simulation engine
  useSimulationEngine();

  return (
    <div className="flex flex-col h-full bg-card/95 text-card-foreground">
      <div className="p-3 border-b border-border flex items-center justify-between bg-black/40 shadow-sm z-10">
        <h2 className="font-semibold flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
          <Activity size={16} className="text-primary" />
          System Operations
        </h2>
        <button 
          onClick={terminalToggle}
          className="p-1.5 hover:bg-border rounded text-muted-foreground hover:text-foreground transition-colors"
          title="Toggle Terminal"
        >
          <TerminalIcon size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 custom-scrollbar">
        
        {/* Real-time Metrics Dashboard */}
        <ObservabilityPanel />

        <div className="h-px bg-border/50 w-full" />

        {/* System Insight Text Box */}
        <SystemInsight />

        <div className="h-px bg-border/50 w-full" />

        {/* Pre-defined Failure Scenarios */}
        <ScenarioRunner />

        <div className="h-px bg-border/50 w-full" />

        {/* Deep Dive Inspector for selected service */}
        <AdvancedServiceControls />

      </div>
    </div>
  );
}
