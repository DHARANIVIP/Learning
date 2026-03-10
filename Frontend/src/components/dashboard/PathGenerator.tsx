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
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-neutral-text tracking-tight mb-2">AI Path Generator</h2>
        <p className="text-neutral-text/50 font-medium">Define your aspirations and let our engine map your future.</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-16 relative px-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-col items-center relative z-10">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500 shadow-sm border-2 ${
              step >= s ? 'bg-neutral-accent text-white border-neutral-accent' : 'bg-neutral-secondary text-neutral-text/30 border-neutral-secondary/50'
            }`}>
              {step > s ? <Check size={20} /> : s}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest mt-3 ${step >= s ? 'text-neutral-accent' : 'text-neutral-text/30'}`}>
              {s === 1 ? 'Profile' : s === 2 ? 'Aspirations' : 'Result'}
            </span>
          </div>
        ))}
        {/* Connecting Line */}
        <div className="absolute left-24 right-24 top-6 h-0.5 bg-neutral-secondary/30 -z-0" /> 
      </div>

      <div className="p-10 border rounded-[32px] bg-neutral-secondary border-neutral-secondary/30 min-h-[450px] shadow-sm">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="mb-8 text-xl font-bold text-neutral-text tracking-tight">Current Status</h3>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-xs font-bold text-neutral-text/40 uppercase tracking-widest">Highest Qualification</label>
                <select className="w-full px-4 py-3 text-neutral-text rounded-[10px] bg-neutral-bg/40 border border-neutral-secondary/50 focus:border-neutral-accent focus:outline-none transition-all shadow-inner">
                  <option>Bachelor's Degree</option>
                  <option>Diploma</option>
                  <option>High School</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-xs font-bold text-neutral-text/40 uppercase tracking-widest">Current Role</label>
                <input type="text" defaultValue="Junior Developer" className="w-full px-4 py-3 text-neutral-text rounded-[10px] bg-neutral-bg/40 border border-neutral-secondary/50 focus:border-neutral-accent focus:outline-none transition-all shadow-inner" />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 text-xs font-bold text-neutral-text/40 uppercase tracking-widest">Key Skills (Comma separated)</label>
                <textarea className="w-full px-4 py-3 text-neutral-text rounded-[10px] bg-neutral-bg/40 border border-neutral-secondary/50 focus:border-neutral-accent focus:outline-none h-32 transition-all shadow-inner" defaultValue="HTML, CSS, JavaScript, React Basics" />
              </div>
            </div>
            <div className="flex justify-end mt-10">
              <button onClick={() => setStep(2)} className="px-10 py-4 font-bold text-white bg-neutral-accent rounded-[12px] hover:bg-neutral-text shadow-lg transition-all active:scale-95">Next Step</button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {!isGenerating ? (
              <>
                <h3 className="mb-8 text-xl font-bold text-neutral-text tracking-tight">Career Aspirations</h3>
                <div className="space-y-8">
                  <div>
                    <label className="block mb-2 text-xs font-bold text-neutral-text/40 uppercase tracking-widest">Target Role</label>
                    <input type="text" placeholder="e.g. Senior Full Stack Engineer" className="w-full px-4 py-3 text-neutral-text rounded-[10px] bg-neutral-bg/40 border border-neutral-secondary/50 focus:border-neutral-accent focus:outline-none transition-all shadow-inner" />
                  </div>
                  <div>
                    <label className="block mb-3 text-xs font-bold text-neutral-text/40 uppercase tracking-widest">Preferred Industry</label>
                    <div className="flex flex-wrap gap-3">
                      {['FinTech', 'EdTech', 'Healthcare', 'E-commerce'].map(tag => (
                        <button key={tag} className="px-5 py-2 text-xs font-bold border rounded-full border-neutral-secondary/50 text-neutral-text/60 hover:border-neutral-accent hover:text-neutral-accent hover:bg-neutral-bg/50 transition-all">
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-16">
                  <button onClick={() => setStep(1)} className="px-8 py-3 font-bold text-neutral-text/40 hover:text-neutral-accent transition-colors">Back</button>
                  <button 
                    onClick={handleGenerate}
                    className="flex items-center gap-2 px-10 py-4 font-bold text-white bg-neutral-accent rounded-[12px] shadow-xl hover:bg-neutral-text transition-all active:scale-95"
                  >
                    <Sparkles size={18} />
                    Generate Path
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <div className="relative mb-8">
                  <div className="absolute inset-0 rounded-full blur-xl bg-neutral-accent/10 animate-pulse" />
                  <Loader2 size={56} className="relative text-neutral-accent animate-spin" />
                </div>
                <h3 className="text-xl font-bold text-neutral-text tracking-tight">Analyzing Market Trends...</h3>
                <p className="mt-3 text-neutral-text/40 font-medium">Mapping your skills to 15,000+ job descriptions</p>
              </div>
            )}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-full bg-neutral-accent text-white shadow-xl">
              <Check size={40} strokeWidth={3} />
            </div>
            <h3 className="text-3xl font-bold text-neutral-text tracking-tight">Path Generated Successfully!</h3>
            <p className="max-w-lg mx-auto mt-3 text-neutral-text/40 font-medium leading-relaxed">
              We've identified a 6-month trajectory to reach "Senior Full Stack Engineer" aligned with NSQF Level 6.
            </p>
            <div className="grid max-w-2xl gap-5 mx-auto mt-12 text-left">
              <div className="p-6 border rounded-[20px] bg-neutral-card/30 border-neutral-secondary/50 flex gap-6 items-center shadow-inner group hover:border-neutral-accent transition-all cursor-pointer">
                <div className="w-14 h-14 rounded-[14px] bg-neutral-bg/40 flex items-center justify-center text-neutral-accent font-black text-xl shadow-sm">1</div>
                <div>
                  <h4 className="font-bold text-neutral-text group-hover:text-neutral-accent transition-colors">Advanced Backend Architecture</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-text/30 mt-1">4 Weeks • Micro-credential</p>
                </div>
              </div>
              <div className="p-6 border rounded-[20px] bg-neutral-card/30 border-neutral-secondary/50 flex gap-6 items-center shadow-inner group hover:border-neutral-accent transition-all cursor-pointer">
                <div className="w-14 h-14 rounded-[14px] bg-neutral-bg/40 flex items-center justify-center text-neutral-text/20 font-black text-xl shadow-sm">2</div>
                <div>
                  <h4 className="font-bold text-neutral-text/40">Cloud Infrastructure (AWS/Azure)</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-text/20 mt-1">6 Weeks • Certification</p>
                </div>
              </div>
            </div>
            <button onClick={() => setStep(1)} className="mt-12 text-xs font-black uppercase tracking-widest text-neutral-text/40 hover:text-neutral-accent transition-colors flex items-center gap-2 mx-auto decoration-2 underline underline-offset-4">Start Over</button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
