"use client";

import { useSystemStore, ScenarioType } from "@/store/useSystemStore";
import { Zap, ServerOff, Database, Key, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ScenarioRunner() {
  const activeScenario = useSystemStore(state => state.activeScenario);
  const setActiveScenario = useSystemStore(state => state.setActiveScenario);
  const setSystemInsight = useSystemStore(state => state.setSystemInsight);
  const resetSystem = useSystemStore(state => state.resetSystem);

  const handleScenario = (scenario: ScenarioType) => {
    setActiveScenario(scenario);
    if (scenario === 'high_traffic') {
      setSystemInsight("Massive traffic spike detected. API Gateway is routing load to Rate Limiter. Token bucket algorithm is actively dropping requests to protect backend services.");
    } else if (scenario === 'redis_failure') {
      setSystemInsight("Redis node became unresponsive. Rate Limiter lost distributed state and fell back to local token buckets. Cache misses are sending massive read loads directly to PostgreSQL, causing DB degradation.");
    } else if (scenario === 'auth_latency') {
      setSystemInsight("OAuth2 Authentication Service is experiencing high CPU load. Validation delays are propagating upstream, increasing global latency at the API Gateway and causing downstream timeouts.");
    } else if (scenario === 'db_bottleneck') {
      setSystemInsight("PostgreSQL connection pool exhausted. Core microservices (URL Shortener, Training System) are failing to acquire connections, leading to cascading failures across the data plane.");
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xs uppercase text-muted-foreground font-semibold tracking-wider">Failure Scenarios</h3>
      <div className="grid grid-cols-1 gap-2">
        <button 
          onClick={() => handleScenario('high_traffic')}
          className={cn(
            "flex items-center gap-3 p-2.5 rounded-md border transition-all text-sm font-medium justify-start",
            activeScenario === 'high_traffic' ? "bg-warning/20 border-warning text-warning" : "bg-card border-border hover:border-warning/50 text-foreground"
          )}
        >
          <Zap size={16} className={activeScenario === 'high_traffic' ? "text-warning" : "text-muted-foreground"}/>
          High Traffic Spike
        </button>

        <button 
          onClick={() => handleScenario('redis_failure')}
          className={cn(
            "flex items-center gap-3 p-2.5 rounded-md border transition-all text-sm font-medium justify-start",
            activeScenario === 'redis_failure' ? "bg-destructive/20 border-destructive text-destructive" : "bg-card border-border hover:border-destructive/50 text-foreground"
          )}
        >
          <ServerOff size={16} className={activeScenario === 'redis_failure' ? "text-destructive" : "text-muted-foreground"}/>
          Redis Cache Failure
        </button>

        <button 
          onClick={() => handleScenario('auth_latency')}
          className={cn(
            "flex items-center gap-3 p-2.5 rounded-md border transition-all text-sm font-medium justify-start",
            activeScenario === 'auth_latency' ? "bg-primary/20 border-primary text-primary" : "bg-card border-border hover:border-primary/50 text-foreground"
          )}
        >
          <Key size={16} className={activeScenario === 'auth_latency' ? "text-primary" : "text-muted-foreground"}/>
          Auth Service Latency
        </button>

        <button 
          onClick={() => handleScenario('db_bottleneck')}
          className={cn(
            "flex items-center gap-3 p-2.5 rounded-md border transition-all text-sm font-medium justify-start",
            activeScenario === 'db_bottleneck' ? "bg-destructive/20 border-destructive text-destructive" : "bg-card border-border hover:border-destructive/50 text-foreground"
          )}
        >
          <Database size={16} className={activeScenario === 'db_bottleneck' ? "text-destructive" : "text-muted-foreground"}/>
          Database Bottleneck
        </button>

        <button 
          onClick={resetSystem}
          className="mt-2 flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 text-muted-foreground border border-border py-2 px-2 rounded-md transition-all text-xs font-medium"
        >
          <RefreshCw size={14} />
          Reset System
        </button>
      </div>
    </div>
  );
}
