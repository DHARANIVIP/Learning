import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-accent/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md overflow-hidden border border-neutral-secondary/10 shadow-subtle rounded-2xl bg-white"
          >
            <div className="absolute top-0 right-0 p-4">
              <button onClick={onClose} className="text-neutral-muted hover:text-neutral-accent transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-8">
              <h2 className="mb-2 text-neutral-text font-black uppercase tracking-tight">Welcome Back</h2>
              <p className="mb-8 text-neutral-muted font-medium">Access your personalized evolution path.</p>

              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <label className="block mb-1 text-sm font-bold text-neutral-text/70 uppercase tracking-widest text-[10px]">Email Address</label>
                  <input
                    type="email"
                    defaultValue="learner@ncvet.ai"
                    className="w-full px-4 py-3 text-neutral-text transition-all bg-neutral-bg border border-neutral-secondary/20 rounded-xl focus:border-neutral-accent focus:outline-none focus:ring-4 focus:ring-neutral-accent/5 placeholder-neutral-text/20"
                    placeholder="learner@example.com"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-bold text-neutral-text/70 uppercase tracking-widest text-[10px]">Password</label>
                  <input
                    type="password"
                    defaultValue="password123"
                    className="w-full px-4 py-3 text-neutral-text transition-all bg-neutral-bg border border-neutral-secondary/20 rounded-xl focus:border-neutral-accent focus:outline-none focus:ring-4 focus:ring-neutral-accent/5 placeholder-neutral-text/20"
                    placeholder="••••••••"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={isLoading}
                  className="relative w-full py-4 mt-6 font-black text-white transition-all rounded-xl bg-neutral-accent shadow-xl hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin" size={20} />
                      Authenticating...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </motion.button>
              </form>

              <div className="mt-8 text-center">
                <button className="text-xs text-neutral-muted hover:text-neutral-accent transition-colors font-bold uppercase tracking-widest">
                  Don't have an account? <span className="text-neutral-accent font-black border-b-2 border-neutral-accent/20">Sign up</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
