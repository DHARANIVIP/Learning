import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Sparkles, Send, Loader2 } from 'lucide-react';

interface AITutorPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AITutorPanel: React.FC<AITutorPanelProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'Plan' | 'Course' | 'Guide' | 'Roadmap'>('Course');
  const [query, setQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!query.trim()) return;
    setIsGenerating(true);
    setResult(null);

    try {
      // API call to the backend
      const response = await fetch(`http://127.0.0.1:8000/api/ai/generate-path`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, topic: query, user_stack: ['Python', 'React.js', 'Node.js', 'Generative AI'] })
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error generating path:', error);
      // Fallback dummy data if backend is not ready
      setResult({
        modules: [
          { title: `Advanced ${query} with CNNs`, status: 'In-Progress', market_relevance: 'Highly demanded skill in 2026 for AI Engineers.', duration: '4.5 Hours' },
          { title: `Deploying ${query} Models`, status: 'Locked', market_relevance: 'Essential for ML-Ops roles.', duration: '3 Hours' }
        ]
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-[100] border-l border-neutral-secondary/20 flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-neutral-secondary/20 flex items-center justify-between bg-neutral-bg/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-neutral-accent text-white flex items-center justify-center">
                <Bot size={18} />
              </div>
              <span className="font-bold tracking-tight text-neutral-text">AI Tutor</span>
            </div>
            <button onClick={onClose} className="p-2 text-neutral-muted hover:text-neutral-accent transition-colors rounded-full hover:bg-neutral-secondary/10">
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-black text-neutral-text tracking-tight">What can I help you learn?</h3>
              <p className="text-sm text-neutral-muted mt-1 font-medium">I see you're focusing on Python & React. Let's build your path.</p>
            </div>

            {/* Mode Toggle */}
            <div className="flex bg-neutral-secondary/10 p-1 rounded-xl mb-6">
              {['Plan', 'Course', 'Guide', 'Roadmap'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m as any)}
                  className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${
                    mode === m ? 'bg-white text-neutral-accent shadow-sm' : 'text-neutral-muted hover:text-neutral-text'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Result Area */}
            <div className="flex-1">
              {isGenerating ? (
                <div className="h-full flex flex-col items-center justify-center text-neutral-muted">
                  <Loader2 size={32} className="animate-spin mb-4 text-neutral-accent" />
                  <p className="text-sm font-bold uppercase tracking-widest">Architecting your {mode}...</p>
                </div>
              ) : result ? (
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 text-green-800 border border-green-200 rounded-xl text-xs font-mono overflow-x-auto">
                    <div className="font-bold mb-2 flex items-center gap-2"><Sparkles size={14}/> Generated JSON Output</div>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                  </div>
                  {/* Mapping the structured data into cards */}
                  {result.modules?.map((mod: any, idx: number) => (
                    <div key={idx} className="p-4 border border-neutral-secondary/20 rounded-xl bg-white shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-neutral-text">{mod.title}</h4>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                          mod.status === 'In-Progress' ? 'bg-blue-50 text-blue-600' : 'bg-neutral-bg text-neutral-muted'
                        }`}>
                          {mod.status}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-muted mb-3">{mod.market_relevance}</p>
                      <div className="text-[10px] font-bold text-neutral-text/50 uppercase tracking-widest">
                        ⏱ {mod.duration}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-neutral-secondary/20 bg-white">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Generative AI with RAG..."
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                className="w-full pl-4 pr-12 py-3 bg-neutral-bg border border-neutral-secondary/20 rounded-xl text-sm font-medium focus:outline-none focus:border-neutral-accent transition-colors"
              />
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !query.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-neutral-accent text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 transition-all"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
