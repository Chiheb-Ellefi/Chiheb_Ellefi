"use client";

import { Handle, Position, NodeProps, type Node } from '@xyflow/react';
import { Link, Hash, Activity, Network, Key, LayoutGrid, Zap, Layers, Server, Database, ExternalLink } from 'lucide-react';
import { useSystemStore, ServiceNode, serviceToRepoMap } from '@/store/useSystemStore';
import { cn } from '@/lib/utils';

export type CustomNode = Node<{ id: string }, 'serviceNode'>;

// Simple Github SVG component since it's missing in this Lucide version
const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg 
    width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" 
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const iconMap: Record<string, React.ReactNode> = {
  'api-gateway': <LayoutGrid size={20} />,
  'auth-service': <Key size={20} />,
  'service-registry': <Network size={20} />,
  'config-server': <Server size={20} />,
  'url-shortener': <Link size={20} />,
  'rate-limiter': <Activity size={20} />,
  'id-generator': <Hash size={20} />,
  'training-system': <Server size={20} />,
  'teacher-optimizer': <Activity size={20} />,
  'redis-cache': <Zap size={20} />,
  'postgres-db': <Database size={20} />,
  'kafka-broker': <Layers size={20} />,
};

export default function ServiceNodeComponent({ data, isConnectable }: NodeProps<CustomNode>) {
  const service = useSystemStore(state => state.services[data.id]);
  const setSelectedService = useSystemStore(state => state.setSelectedService);
  const selectedService = useSystemStore(state => state.selectedService);

  if (!service) return null;

  const isSelected = selectedService === data.id;

  const statusColors = {
    healthy: 'bg-success text-success-foreground border-success/30',
    degraded: 'bg-warning text-warning-foreground border-warning/30',
    down: 'bg-destructive text-destructive-foreground border-destructive/30 animate-pulse',
  };

  const statusIndicators = {
    healthy: 'bg-success',
    degraded: 'bg-warning',
    down: 'bg-destructive',
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center p-3 rounded-lg border-2 bg-card cursor-pointer transition-all min-w-[140px]",
        isSelected ? "border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]" : "border-border hover:border-primary/50",
        service.status === 'down' && "opacity-80 grayscale-[0.5]"
      )}
      onClick={() => setSelectedService(data.id)}
    >
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-3 h-3 bg-primary/50" />

      <div className="flex items-center w-full justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="text-muted-foreground bg-black/20 p-1.5 rounded-md">
            {iconMap[data.id] || <Server size={20} />}
          </div>
          {serviceToRepoMap[data.id] && (
            <a
              href={`https://github.com/Chiheb-Ellefi/${serviceToRepoMap[data.id]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-primary/20 rounded text-primary/70 hover:text-primary transition-colors flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              title="Open GitHub Repository"
            >
              <GithubIcon size={14} />
            </a>
          )}
        </div>
        <div className={cn("w-2 h-2 rounded-full", statusIndicators[service.status])} />
      </div>

      <div className="text-sm font-semibold tracking-tight text-center w-full truncate">
        {service.name}
      </div>

      <div className="flex justify-between w-full mt-2 text-[10px] uppercase tracking-wider font-mono text-muted-foreground border-t border-border pt-1">
        <span>Type: {service.type}</span>
        <span>Rep: {service.replicas}</span>
      </div>

      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-3 h-3 bg-primary/50" />
    </div>
  );
}
