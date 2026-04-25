import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { CustomNode } from './CustomNode';
import { TopicDrawer } from './TopicDrawer';
import { initialNodes, initialEdges } from '../../lib/roadmapData';

const nodeTypes = {
  customNode: CustomNode,
};

export const RoadmapCanvas: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const [selectedNodeData, setSelectedNodeData] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onNodeClick = useCallback((event: React.MouseEvent, node: any) => {
    setSelectedNodeData(node.data);
    setIsDrawerOpen(true);
  }, []);

  const handleStatusChange = (newStatus: string) => {
    setNodes((nds) => 
      nds.map((n) => {
        if (selectedNodeData && n.id === nodes.find(x => x.data === selectedNodeData)?.id) {
          const updatedData = { ...n.data, status: newStatus };
          setSelectedNodeData(updatedData); // Update drawer immediately
          return { ...n, data: updatedData };
        }
        return n;
      })
    );
  };

  return (
    <div className="w-full h-[600px] bg-[#FAFAFA] rounded-2xl border border-[#E5E7EB] overflow-hidden relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
        className="bg-[#FAFAFA]"
      >
        <MiniMap 
          nodeColor={(node) => {
            switch (node.data?.status) {
              case 'completed': return '#22c55e';
              case 'in-progress': return '#3b82f6';
              default: return '#e5e7eb';
            }
          }}
          maskColor="rgba(250, 250, 250, 0.7)"
          className="rounded-lg border border-[#E5E7EB] shadow-sm bg-white"
        />
        <Controls className="bg-white border border-[#E5E7EB] shadow-sm rounded-lg" />
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#D1D5DB" />
      </ReactFlow>

      <TopicDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        nodeData={selectedNodeData}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};
