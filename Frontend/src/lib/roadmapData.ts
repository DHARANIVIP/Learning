import { Edge, Node } from '@xyflow/react';
import { Target, Server, Database, Cloud, Code, GitBranch } from 'lucide-react';

export const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: 250, y: 0 },
    data: { 
      label: 'Internet Basics',
      icon: 'Cloud',
      status: 'completed',
      description: 'Understand how the internet works, HTTP/HTTPS, and DNS.',
      resources: [
        { title: 'How does the internet work?', url: '#' },
        { title: 'What is DNS?', url: '#' }
      ]
    },
    type: 'customNode',
  },
  {
    id: '2',
    position: { x: 250, y: 150 },
    data: { 
      label: 'HTML & CSS',
      icon: 'Code',
      status: 'completed',
      description: 'The foundational languages of the web.',
      resources: [
        { title: 'MDN Web Docs - HTML', url: '#' },
        { title: 'CSS Tricks', url: '#' }
      ]
    },
    type: 'customNode',
  },
  {
    id: '3',
    position: { x: 250, y: 300 },
    data: { 
      label: 'JavaScript',
      icon: 'Code',
      status: 'in-progress',
      description: 'Learn the programming language of the web.',
      resources: [
        { title: 'JavaScript Info', url: '#' },
        { title: 'ES6 Features', url: '#' }
      ]
    },
    type: 'customNode',
  },
  {
    id: '4',
    position: { x: 100, y: 450 },
    data: { 
      label: 'Version Control',
      icon: 'GitBranch',
      status: 'locked',
      description: 'Learn Git and GitHub to manage your code.',
      resources: [
        { title: 'Git Handbook', url: '#' }
      ]
    },
    type: 'customNode',
  },
  {
    id: '5',
    position: { x: 400, y: 450 },
    data: { 
      label: 'React',
      icon: 'Target',
      status: 'locked',
      description: 'A popular frontend JavaScript library.',
      resources: [
        { title: 'React Official Docs', url: '#' }
      ]
    },
    type: 'customNode',
  },
  {
    id: '6',
    position: { x: 400, y: 600 },
    data: { 
      label: 'Node.js',
      icon: 'Server',
      status: 'locked',
      description: 'JavaScript runtime for the backend.',
      resources: [
        { title: 'Node.js Docs', url: '#' }
      ]
    },
    type: 'customNode',
  },
  {
    id: '7',
    position: { x: 400, y: 750 },
    data: { 
      label: 'Databases',
      icon: 'Database',
      status: 'locked',
      description: 'Store and manage application data (SQL/NoSQL).',
      resources: [
        { title: 'PostgreSQL Tutorial', url: '#' },
        { title: 'MongoDB Crash Course', url: '#' }
      ]
    },
    type: 'customNode',
  }
];

export const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#9CA3AF' } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#9CA3AF' } },
  { id: 'e3-4', source: '3', target: '4', animated: false, style: { stroke: '#E5E7EB' } },
  { id: 'e3-5', source: '3', target: '5', animated: false, style: { stroke: '#E5E7EB' } },
  { id: 'e5-6', source: '5', target: '6', animated: false, style: { stroke: '#E5E7EB' } },
  { id: 'e6-7', source: '6', target: '7', animated: false, style: { stroke: '#E5E7EB' } }
];
