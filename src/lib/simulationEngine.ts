"use client";

import { useEffect, useRef } from 'react';
import { useSystemStore, ScenarioType } from '@/store/useSystemStore';

// Fluctuates a value by a given percentage
const fluctuate = (val: number, percent: number = 0.05) => {
  const change = val * percent * (Math.random() * 2 - 1);
  return Math.max(0, val + change);
};

export function useSimulationEngine() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const state = useSystemStore.getState();
      const { metrics, activeScenario, services, addLog, setMetrics, setServiceStatus } = state;

      let newMetrics = { ...metrics };

      // Base jitter
      newMetrics.rps = fluctuate(newMetrics.rps, 0.05);
      newMetrics.latency = fluctuate(newMetrics.latency, 0.05);
      newMetrics.errorRate = fluctuate(newMetrics.errorRate, 0.1);
      newMetrics.cacheHitRatio = fluctuate(newMetrics.cacheHitRatio, 0.01);

      // Scenario Logic
      if (activeScenario === 'high_traffic') {
        newMetrics.rps = Math.min(newMetrics.rps * 1.2 + 50, 5000); // Ramps up quickly
        newMetrics.latency = Math.min(newMetrics.latency * 1.05 + 5, 2000); // Latency increases
        
        if (newMetrics.rps > 1000 && Math.random() > 0.7) {
          addLog({ serviceId: 'rate-limiter', level: 'warn', message: 'High load detected. Token bucket depleting rapidly.' });
        }
        if (newMetrics.rps > 2500 && Math.random() > 0.5) {
          addLog({ serviceId: 'api-gateway', level: 'error', message: 'HTTP 429 Too Many Requests - Rate limiter active.' });
          newMetrics.errorRate = Math.min(newMetrics.errorRate + 2, 15);
        }
      } 
      
      else if (activeScenario === 'redis_failure') {
        newMetrics.cacheHitRatio = Math.max(newMetrics.cacheHitRatio - 20, 0); // Drops to 0 quickly
        newMetrics.latency = Math.min(newMetrics.latency * 1.1 + 20, 5000); // DB fallback causes high latency
        
        if (services['redis-cache'].status !== 'down') {
          setServiceStatus('redis-cache', 'down');
          addLog({ serviceId: 'redis-cache', level: 'error', message: 'Connection timeout. Redis node unreachable.' });
          addLog({ serviceId: 'rate-limiter', level: 'warn', message: 'Distributed cache lost. Falling back to local token bucket.' });
        }

        if (newMetrics.cacheHitRatio < 10 && Math.random() > 0.5) {
          addLog({ serviceId: 'postgres-db', level: 'warn', message: 'High CPU utilization detected due to cache miss storm.' });
          setServiceStatus('postgres-db', 'degraded');
        }
      }
      
      else if (activeScenario === 'auth_latency') {
        newMetrics.latency = Math.min(newMetrics.latency * 1.2 + 50, 8000);
        
        if (services['auth-service'].status !== 'degraded') {
          setServiceStatus('auth-service', 'degraded');
          addLog({ serviceId: 'auth-service', level: 'warn', message: 'OAuth2 token validation taking > 2000ms.' });
          addLog({ serviceId: 'api-gateway', level: 'error', message: 'Upstream auth-service connection timeout.' });
        }
        newMetrics.errorRate = Math.min(newMetrics.errorRate + 1, 25);
      }
      
      else if (activeScenario === 'db_bottleneck') {
        newMetrics.latency = Math.min(newMetrics.latency * 1.15 + 100, 10000);
        newMetrics.errorRate = Math.min(newMetrics.errorRate + 3, 40);
        newMetrics.rps = Math.max(newMetrics.rps * 0.9, 10); // RPS drops as connections queue
        
        if (services['postgres-db'].status !== 'degraded') {
          setServiceStatus('postgres-db', 'degraded');
          addLog({ serviceId: 'postgres-db', level: 'error', message: 'Active connections limit reached. MaxPoolSize exceeded.' });
        }

        if (Math.random() > 0.6) {
          addLog({ serviceId: 'url-shortener', level: 'error', message: 'HikariCP connection acquisition timeout.' });
          setServiceStatus('url-shortener', 'degraded');
        }
      }
      
      else {
        // Recovery / Normal state drift
        if (newMetrics.rps > 100) newMetrics.rps *= 0.9;
        if (newMetrics.rps < 30) newMetrics.rps *= 1.1;
        if (newMetrics.latency > 60) newMetrics.latency *= 0.8;
        if (newMetrics.latency < 20) newMetrics.latency *= 1.1;
        if (newMetrics.errorRate > 0.5) newMetrics.errorRate *= 0.5;
        if (newMetrics.cacheHitRatio < 95) newMetrics.cacheHitRatio += (95 - newMetrics.cacheHitRatio) * 0.2;
      }

      setMetrics({
        rps: Math.max(0, newMetrics.rps),
        latency: Math.max(5, newMetrics.latency),
        errorRate: Math.max(0, newMetrics.errorRate),
        cacheHitRatio: Math.min(100, Math.max(0, newMetrics.cacheHitRatio))
      });

    }, 2000); // Tick every 2 seconds

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
}
