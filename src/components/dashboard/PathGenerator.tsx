import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Check, Sparkles } from 'lucide-react';

export const PathGenerator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(3);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">AI Path Generator</h2>
        <p className="text-silver/60">Define your aspirations and let our engine map your future.</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-12">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-col items-center relative z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${
              step >= s ? 'bg-sunset text-midnight shadow-[0_0_15px_rgba(255,147,85,0.4)]' : 'bg-silver/10 text-silver/30'
            }`}>
              {step > s ? <Check size={20} /> : s}
            </div>
            <span className={`text-xs mt-2 font-medium ${step >= s ? 'text-sunset' : 'text-silver/30'}`}>
              {s === 1 ? 'Profile' : s === 2 ? 'Aspirations' : 'Result'}
            </span>
          </div>
        ))}
        {/* Connecting Line */}
        <div className="absolute left-0 right-0 top-[145px] h-0.5 bg-silver/10 -z-0 max-w-4xl mx-auto" /> 
        {/* Note: In a real app, calculate line width dynamically or use a grid */}
      </div>

      <div className="p-8 border rounded-2xl bg-midnight border-silver/10 min-h-[400px]">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h3 className="mb-6 text-xl font-bold text-white">Current Status</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm text-silver">Highest Qualification</label>
                <select className="w-full px-4 py-3 text-white rounded-lg bg-silver/5 border border-silver/10 focus:border-sunset focus:outline-none">
                  <option>Bachelor's Degree</option>
                  <option>Diploma</option>
                  <option>High School</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm text-silver">Current Role</label>
                <input type="text" defaultValue="Junior Developer" className="w-full px-4 py-3 text-white rounded-lg bg-silver/5 border border-silver/10 focus:border-sunset focus:outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm text-silver">Key Skills (Comma separated)</label>
                <textarea className="w-full px-4 py-3 text-white rounded-lg bg-silver/5 border border-silver/10 focus:border-sunset focus:outline-none h-32" defaultValue="HTML, CSS, JavaScript, React Basics" />
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button onClick={() => setStep(2)} className="px-8 py-3 font-bold text-midnight bg-silver rounded-lg hover:bg-white">Next Step</button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            {!isGenerating ? (
              <>
                <h3 className="mb-6 text-xl font-bold text-white">Career Aspirations</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 text-sm text-silver">Target Role</label>
                    <input type="text" placeholder="e.g. Senior Full Stack Engineer" className="w-full px-4 py-3 text-white rounded-lg bg-silver/5 border border-silver/10 focus:border-sunset focus:outline-none" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-silver">Preferred Industry</label>
                    <div className="flex gap-3">
                      {['FinTech', 'EdTech', 'Healthcare', 'E-commerce'].map(tag => (
                        <button key={tag} className="px-4 py-2 text-sm border rounded-full border-silver/20 text-silver hover:border-sunset hover:text-sunset transition-colors">
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-12">
                  <button onClick={() => setStep(1)} className="px-8 py-3 font-bold text-silver hover:text-white">Back</button>
                  <button 
                    onClick={handleGenerate}
                    className="flex items-center gap-2 px-8 py-3 font-bold text-midnight bg-sunset rounded-lg hover:bg-orange-400 shadow-[0_0_20px_rgba(255,147,85,0.3)]"
                  >
                    <Sparkles size={18} />
                    Generate Path
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full blur-xl bg-sunset/20 animate-pulse" />
                  <Loader2 size={48} className="relative text-sunset animate-spin" />
                </div>
                <h3 className="text-xl font-bold text-white">Analyzing Market Trends...</h3>
                <p className="mt-2 text-silver/60">Mapping your skills to 15,000+ job descriptions</p>
              </div>
            )}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-500/10 text-green-500">
              <Check size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white">Path Generated Successfully!</h3>
            <p className="max-w-lg mx-auto mt-2 text-silver/60">
              We've identified a 6-month trajectory to reach "Senior Full Stack Engineer" aligned with NSQF Level 6.
            </p>
            <div className="grid max-w-2xl gap-4 mx-auto mt-8 text-left">
              <div className="p-4 border rounded-lg bg-silver/5 border-silver/10 flex gap-4 items-center">
                <div className="w-12 h-12 rounded bg-sunset/10 flex items-center justify-center text-sunset font-bold">1</div>
                <div>
                  <h4 className="font-bold text-white">Advanced Backend Architecture</h4>
                  <p className="text-xs text-silver/50">4 Weeks • Micro-credential</p>
                </div>
              </div>
              <div className="p-4 border rounded-lg bg-silver/5 border-silver/10 flex gap-4 items-center">
                <div className="w-12 h-12 rounded bg-silver/10 flex items-center justify-center text-silver font-bold">2</div>
                <div>
                  <h4 className="font-bold text-silver">Cloud Infrastructure (AWS/Azure)</h4>
                  <p className="text-xs text-silver/50">6 Weeks • Certification</p>
                </div>
              </div>
            </div>
            <button onClick={() => setStep(1)} className="mt-8 text-sm text-silver hover:text-white underline">Start Over</button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
