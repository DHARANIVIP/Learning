import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroModern } from '../components/HeroModern';
import { Testimonials } from '../components/Testimonials';
import { LoginModal } from '../components/LoginModal';
import { NeuralNetworkBackground } from '../components/NeuralNetworkBackground';
import { motion } from 'framer-motion';
import { BrainCircuit, Target, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { KineticText } from '../components/KineticText';

export const LandingPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const features = [
    {
      icon: <BrainCircuit size={32} />,
      title: "AI Learner Profiling",
      desc: "Our engine analyzes your academic background, prior skills, and learning pace to create a unique digital fingerprint."
    },
    {
      icon: <Target size={32} />,
      title: "NSQF Alignment",
      desc: "Every recommended path is strictly mapped to National Skills Qualifications Framework standards for recognized certification."
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Market Intelligence",
      desc: "Real-time integration with labour market data ensures you are learning skills that are currently in high demand."
    },
    {
      icon: <Users size={32} />,
      title: "Inclusive Guidance",
      desc: "Multilingual support and accessible interfaces designed to serve millions of diverse learners across the nation."
    }
  ];

  return (
    <div className="relative min-h-screen bg-neutral-bg text-neutral-text font-sans selection:bg-neutral-secondary/30">
      <NeuralNetworkBackground />
      
      <div className="relative z-10">
        <Navbar onLoginClick={() => setIsLoginOpen(true)} />

        <main>
          <HeroModern onCtaClick={() => setIsLoginOpen(true)} />

          {/* Kinetic Divider with "Fixed" Styles */}
          <div className="py-10 bg-neutral-secondary/20 backdrop-blur-sm border-y border-neutral-secondary/10 overflow-hidden">
            <KineticText text="TRANSFORM YOUR CAREER • EVOLVE WITH AI • JOIN THE FUTURE • " direction="left" />
          </div>

          {/* Features Section */}
          <section id="features" className="relative py-20 overflow-hidden bg-transparent">
            <div className="container px-6 mx-auto">
              <div className="flex flex-col md:flex-row gap-16 items-center">
                <div className="md:w-1/2">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-neutral-accent/40 font-bold tracking-widest text-xs uppercase mb-4 block"
                  >
                    Core Capabilities
                  </motion.span>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-neutral-accent mb-6"
                  >
                    Bridge the Skill <br />
                    <span className="text-neutral-text/20">Gap Instantly.</span>
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="mt-6 max-w-lg text-neutral-muted"
                  >
                    Traditional education is slow. The job market is fast.
                    Our AI bridge ensures your learning matches reality.
                  </motion.p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-8 flex items-center gap-3 text-neutral-accent font-bold group"
                  >
                    Explore Features
                    <div className="w-10 h-10 rounded-xl border border-neutral-secondary flex items-center justify-center group-hover:bg-neutral-accent group-hover:text-white transition-all">
                      <ArrowRight size={20} />
                    </div>
                  </motion.button>
                </div>

                <div className="md:w-1/2 grid gap-6 sm:grid-cols-2">
                  {features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + (idx * 0.1) }}
                      className="p-8 bg-white border border-neutral-secondary/10 rounded-2xl hover:border-neutral-accent/20 transition-all group shadow-subtle text-neutral-text"
                    >
                      <div className="mb-6 text-neutral-accent group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <h3 className="mb-3 text-neutral-accent text-xl font-bold">{feature.title}</h3>
                      <p className="text-sm text-neutral-muted leading-relaxed">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <Testimonials />

          {/* CTA Section */}
          <section className="py-20 relative overflow-hidden bg-neutral-secondary/30">
            <div className="container relative z-10 px-6 mx-auto">
              <div className="max-w-4xl mx-auto text-center p-12 md:p-20 bg-white rounded-[32px] shadow-subtle border border-neutral-secondary/10 backdrop-blur-sm">
                <h2 className="text-neutral-accent mb-6">Ready to Evolve?</h2>
                <p className="max-w-2xl mx-auto mb-10 text-neutral-muted">
                  Join thousands of learners who have transformed their careers with NCVET.AI.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#1A1A1A' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLoginOpen(true)}
                  className="px-12 py-5 text-lg font-bold text-white bg-neutral-accent rounded-[12px] shadow-xl transition-all"
                >
                  Launch Your Journey
                </motion.button>
              </div>
            </div>
          </section>
        </main>

        <footer className="py-20 border-t border-neutral-secondary/20 bg-neutral-bg">
          <div className="container px-6 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="text-2xl font-bold text-neutral-text tracking-tighter">
                NCVET<span className="text-neutral-accent">.AI</span>
              </div>
              <div className="flex gap-10 text-neutral-text/40 text-sm font-medium">
                <a href="#" className="hover:text-neutral-accent transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-neutral-accent transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-neutral-accent transition-colors">Contact Us</a>
              </div>
              <div className="text-neutral-text/20 text-sm">
                &copy; 2026 NCVET.AI. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};
