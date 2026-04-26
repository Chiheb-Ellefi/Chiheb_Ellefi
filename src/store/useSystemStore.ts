import { create } from 'zustand';

export type ServiceStatus = 'healthy' | 'degraded' | 'down';

export interface SystemMetrics {
  rps: number;
  errorRate: number;
  latency: number;
  cacheHitRatio: number;
}

export type ScenarioType = 'none' | 'high_traffic' | 'redis_failure' | 'auth_latency' | 'db_bottleneck';

export interface ServiceNode {
  id: string;
  name: string;
  status: ServiceStatus;
  replicas: number;
  type: 'gateway' | 'auth' | 'service' | 'db' | 'cache' | 'broker';
}

export interface SystemLog {
  id: string;
  timestamp: string;
  serviceId: string;
  level: 'info' | 'warn' | 'error';
  message: string;
}

interface SystemState {
  services: Record<string, ServiceNode>;
  logs: SystemLog[];
  selectedService: string | null;
  metrics: SystemMetrics;
  activeScenario: ScenarioType;
  systemInsight: string;

  // Actions
  setServiceStatus: (id: string, status: ServiceStatus) => void;
  setReplicas: (id: string, replicas: number) => void;
  addLog: (log: Omit<SystemLog, 'id' | 'timestamp'>) => void;
  setSelectedService: (id: string | null) => void;
  simulateFailure: (id: string) => void;
  recoverService: (id: string) => void;
  
  // Advanced SRE Actions
  setMetrics: (metrics: Partial<SystemMetrics>) => void;
  setActiveScenario: (scenario: ScenarioType) => void;
  setSystemInsight: (insight: string) => void;
  scaleService: (id: string, delta: number) => void;
  toggleDegraded: (id: string) => void;
  resetSystem: () => void;
}

const initialMetrics: SystemMetrics = {
  rps: 42,
  errorRate: 0.1,
  latency: 45,
  cacheHitRatio: 94.5,
};

const initialServices: Record<string, ServiceNode> = {
  'api-gateway': {
    id: 'api-gateway',
    name: 'API Gateway (Spring Cloud)',
    status: 'healthy',
    replicas: 2,
    type: 'gateway'
  },

  'auth-service': {
    id: 'auth-service',
    name: 'Auth Service (OAuth2 / JWT)',
    status: 'healthy',
    replicas: 2,
    type: 'auth'
  },

  'service-registry': {
    id: 'service-registry',
    name: 'Service Registry (Eureka)',
    status: 'healthy',
    replicas: 1,
    type: 'service'
  },

  'config-server': {
    id: 'config-server',
    name: 'Config Server',
    status: 'healthy',
    replicas: 1,
    type: 'service'
  },

  // 🔥 YOUR PROJECTS (this is the important part)

  'url-shortener': {
    id: 'url-shortener',
    name: 'URL Shortener Service',
    status: 'healthy',
    replicas: 2,
    type: 'service'
  },

  'rate-limiter': {
    id: 'rate-limiter',
    name: 'API Rate Limiter (AOP + Redis)',
    status: 'healthy',
    replicas: 2,
    type: 'service'
  },

  'id-generator': {
    id: 'id-generator',
    name: 'Distributed ID Generator',
    status: 'healthy',
    replicas: 1,
    type: 'service'
  },

  'training-system': {
    id: 'training-system',
    name: 'Training Management System',
    status: 'healthy',
    replicas: 2,
    type: 'service'
  },

  'teacher-optimizer': {
    id: 'teacher-optimizer',
    name: 'Teacher Distribution Engine',
    status: 'healthy',
    replicas: 1,
    type: 'service'
  },

  // 🧱 INFRA LAYER

  'redis-cache': {
    id: 'redis-cache',
    name: 'Redis (Cache / Rate Limiting)',
    status: 'healthy',
    replicas: 1,
    type: 'cache'
  },

  'postgres-db': {
    id: 'postgres-db',
    name: 'PostgreSQL',
    status: 'healthy',
    replicas: 1,
    type: 'db'
  },

  'kafka-broker': {
    id: 'kafka-broker',
    name: 'Kafka (Event Streaming)',
    status: 'healthy',
    replicas: 3,
    type: 'broker'
  }
};
export const serviceToRepoMap: Record<string, string> = {
  'url-shortener': 'Url_Shortener_Spring',
  'rate-limiter': 'Rate_Limiter',
  'id-generator': 'Unique_Id_Gen',
  'training-system': 'Training Management System',
  'teacher-optimizer': 'Teachers_Distribution_System',
  'auth-service': 'Authentication-Service',
  'api-gateway': 'Gateway',
  'service-registry': 'Service-Registry',
  'config-server': 'Config-Server'
};
export const useSystemStore = create<SystemState>((set) => ({
  services: initialServices,
  logs: [],
  selectedService: null,
  metrics: initialMetrics,
  activeScenario: 'none',
  systemInsight: 'System operating normally. All services are healthy and responding within expected latency thresholds.',

  setServiceStatus: (id, status) => set((state) => ({
    services: {
      ...state.services,
      [id]: { ...state.services[id], status }
    }
  })),

  setReplicas: (id, replicas) => set((state) => ({
    services: {
      ...state.services,
      [id]: { ...state.services[id], replicas }
    }
  })),

  addLog: (log) => set((state) => ({
    logs: [
      {
        ...log,
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toISOString(),
      },
      ...state.logs
    ].slice(0, 200) // Keep last 200 logs
  })),

  setSelectedService: (id) => set({ selectedService: id }),

  simulateFailure: (id) => set((state) => ({
    services: {
      ...state.services,
      [id]: { ...state.services[id], status: 'down', replicas: 0 }
    }
  })),

  recoverService: (id) => set((state) => ({
    services: {
      ...state.services,
      [id]: { ...state.services[id], status: 'healthy', replicas: initialServices[id].replicas }
    }
  })),

  setMetrics: (newMetrics) => set((state) => ({ metrics: { ...state.metrics, ...newMetrics } })),
  setActiveScenario: (scenario) => set({ activeScenario: scenario }),
  setSystemInsight: (insight) => set({ systemInsight: insight }),

  scaleService: (id, delta) => set((state) => {
    const svc = state.services[id];
    if (!svc) return state;
    const newReplicas = Math.max(0, svc.replicas + delta);
    
    let newStatus = svc.status;
    if (newReplicas === 0) newStatus = 'down';
    else if (newReplicas > 0 && svc.status === 'down') newStatus = 'healthy';
    
    return {
      services: {
        ...state.services,
        [id]: { ...svc, replicas: newReplicas, status: newStatus }
      }
    };
  }),

  toggleDegraded: (id) => set((state) => {
    const svc = state.services[id];
    if (!svc) return state;
    const newStatus = svc.status === 'degraded' ? 'healthy' : 'degraded';
    return {
      services: {
        ...state.services,
        [id]: { ...svc, status: newStatus }
      }
    };
  }),

  resetSystem: () => set({
    services: initialServices,
    logs: [],
    metrics: initialMetrics,
    activeScenario: 'none',
    systemInsight: 'System reset to initial state. All services are healthy and responding within expected latency thresholds.',
  })
}));
