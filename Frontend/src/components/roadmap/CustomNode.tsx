import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Target, Server, Database, Cloud, Code, GitBranch, CheckCircle2, Lock, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ReactNode> = {
  Target: <Target size={16} />,
  Server: <Server size={16} />,
  Database: <Database size={16} />,
  Cloud: <Cloud size={16} />,
  Code: <Code size={16} />,
  GitBranch: <GitBranch size={16} />
};

export const CustomNode = ({ data }: { data: any }) => {
  const isCompleted = data.status === 'completed';
  const isInProgress = data.status === 'in-progress';
  const isLocked = data.status === 'locked';

  const statusColors = {
    completed: 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]',
    'in-progress': 'bg-blue-50 border-blue-200 text-blue-700',
    locked: 'bg-[#F9FAFB] border-[#E5E7EB] text-[#9CA3AF]'
  };

  const currentStatusColor = statusColors[data.status as keyof typeof statusColors] || statusColors.locked;

  return (
    <motion.div 
      whileHover={!isLocked ? { scale: 1.05 } : {}}
      className={`px-4 py-3 min-w-[180px] rounded-xl border ${currentStatusColor} flex items-center gap-3 shadow-sm transition-all cursor-pointer ${isLocked ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md'}`}
      style={!isLocked ? { boxShadow: '0 2px 8px rgba(0,0,0,0.04)' } : {}}
    >
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-none !w-0 !h-0" />
      
      <div className={`p-2 rounded-lg bg-white bg-opacity-60 backdrop-blur-sm shadow-sm ${
        isCompleted ? 'text-green-600' : isInProgress ? 'text-blue-600' : 'text-gray-400'
      }`}>
        {iconMap[data.icon] || <Code size={16} />}
      </div>
      
      <div className="flex-1">
        <div className="text-xs font-bold uppercase tracking-widest opacity-60 mb-0.5">
          {data.status === 'completed' && 'Done'}
          {data.status === 'in-progress' && 'In Progress'}
          {data.status === 'locked' && 'Locked'}
        </div>
        <div className={`font-semibold text-sm ${isLocked ? 'text-gray-500' : 'text-gray-900'}`}>
          {data.label}
        </div>
      </div>

      <div className="ml-2">
        {isCompleted && <CheckCircle2 size={16} className="text-green-500" />}
        {isInProgress && <PlayCircle size={16} className="text-blue-500" />}
        {isLocked && <Lock size={16} className="text-gray-400" />}
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-none !w-0 !h-0" />
    </motion.div>
  );
};
