"use client";

import { useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  MarkerType,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import ServiceNodeComponent from './ServiceNodeComponent';
import { useSystemStore } from '@/store/useSystemStore';

const initialNodes = [
  // Infra & Config (Top level or side)
  { id: 'api-gateway', type: 'serviceNode', data: { id: 'api-gateway' }, position: { x: 450, y: 0 } },
  { id: 'service-registry', type: 'serviceNode', data: { id: 'service-registry' }, position: { x: 850, y: 0 } },
  { id: 'config-server', type: 'serviceNode', data: { id: 'config-server' }, position: { x: 850, y: 150 } },

  // Security
  { id: 'auth-service', type: 'serviceNode', data: { id: 'auth-service' }, position: { x: 50, y: 250 } },

  // Core Domain Services
  { id: 'url-shortener', type: 'serviceNode', data: { id: 'url-shortener' }, position: { x: 300, y: 250 } },
  { id: 'rate-limiter', type: 'serviceNode', data: { id: 'rate-limiter' }, position: { x: 600, y: 250 } },

  { id: 'id-generator', type: 'serviceNode', data: { id: 'id-generator' }, position: { x: 850, y: 350 } },
  { id: 'training-system', type: 'serviceNode', data: { id: 'training-system' }, position: { x: 300, y: 450 } },
  { id: 'teacher-optimizer', type: 'serviceNode', data: { id: 'teacher-optimizer' }, position: { x: 600, y: 450 } },

  // Data & Streaming (Bottom level)
  { id: 'redis-cache', type: 'serviceNode', data: { id: 'redis-cache' }, position: { x: 150, y: 650 } },
  { id: 'postgres-db', type: 'serviceNode', data: { id: 'postgres-db' }, position: { x: 450, y: 650 } },
  { id: 'kafka-broker', type: 'serviceNode', data: { id: 'kafka-broker' }, position: { x: 750, y: 650 } },
];

const initialEdges: Edge[] = [
  // Gateway routes
  { id: 'e-gw-auth', source: 'api-gateway', target: 'auth-service', animated: true, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-gw-url', source: 'api-gateway', target: 'url-shortener', animated: true, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-gw-rate', source: 'api-gateway', target: 'rate-limiter', animated: true, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-gw-training', source: 'api-gateway', target: 'training-system', animated: true, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },

  // Inter-service
  { id: 'e-url-id', source: 'url-shortener', target: 'id-generator', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-training-teacher', source: 'training-system', target: 'teacher-optimizer', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },

  // Data & Cache connections
  { id: 'e-auth-db', source: 'auth-service', target: 'postgres-db', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-url-redis', source: 'url-shortener', target: 'redis-cache', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-rate-redis', source: 'rate-limiter', target: 'redis-cache', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-url-db', source: 'url-shortener', target: 'postgres-db', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-training-db', source: 'training-system', target: 'postgres-db', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },

  // Event streaming connections
  { id: 'e-training-kafka', source: 'training-system', target: 'kafka-broker', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-teacher-kafka', source: 'teacher-optimizer', target: 'kafka-broker', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
];

export default function ArchitectureDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const setSelectedService = useSystemStore(state => state.setSelectedService);

  const nodeTypes = useMemo(() => ({ serviceNode: ServiceNodeComponent as any }), []);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onPaneClick = useCallback(() => {
    setSelectedService(null);
  }, [setSelectedService]);

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-transparent"
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="var(--color-border)" />
      </ReactFlow>
    </div>
  );
}
