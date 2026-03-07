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
            className="absolute inset-0 bg-midnight/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md overflow-hidden border shadow-2xl rounded-2xl border-silver/30 bg-silver/10 backdrop-blur-xl"
          >
            <div className="absolute top-0 right-0 p-4">
              <button onClick={onClose} className="text-silver hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-8">
              <h2 className="mb-2 text-3xl font-bold text-white">Welcome Back</h2>
              <p className="mb-8 text-silver/70">Access your personalized evolution path.</p>

              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <label className="block mb-1 text-sm font-medium text-silver">Email</label>
                  <input
                    type="email"
                    defaultValue="learner@ncvet.ai"
                    className="w-full px-4 py-3 text-white transition-all bg-midnight/50 border rounded-lg border-silver/20 focus:border-sunset focus:outline-none focus:ring-1 focus:ring-sunset placeholder-silver/30"
                    placeholder="learner@example.com"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-silver">Password</label>
                  <input
                    type="password"
                    defaultValue="password123"
                    className="w-full px-4 py-3 text-white transition-all bg-midnight/50 border rounded-lg border-silver/20 focus:border-sunset focus:outline-none focus:ring-1 focus:ring-sunset placeholder-silver/30"
                    placeholder="••••••••"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className="relative w-full py-3 mt-6 font-bold text-midnight transition-all rounded-lg bg-sunset shadow-[0_0_15px_rgba(255,147,85,0.3)] hover:shadow-[0_0_25px_rgba(255,147,85,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
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

              <div className="mt-6 text-center">
                <button className="text-sm text-silver/50 hover:text-sunset transition-colors">
                  Don't have an account? Sign up
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
