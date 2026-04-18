import { useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { HeroModern } from './HeroModern';
import { Testimonials } from './Testimonials';
import { LoginModal } from '../../components/LoginModal';
import { NeuralNetworkBackground } from './NeuralNetworkBackground';
import { motion } from 'framer-motion';
import { BrainCircuit, Target, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { KineticText } from './KineticText';
import { TrustedSection } from './TrustedSection';
import { Footer } from '../../components/layout/Footer';
import { AIAnimation } from './AIAnimation';

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
      <AIAnimation />

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

                <div className="md:w-1/2 grid gap-5 sm:grid-cols-2">
                  {features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + (idx * 0.1) }}
                      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                      className="p-5 bg-white border border-[#E5E7EB] rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 group text-neutral-text"
                    >
                      <div className="mb-4 p-2.5 w-fit rounded-lg bg-[#F9FAFB] text-neutral-accent group-hover:bg-neutral-accent group-hover:text-white transition-all duration-200">
                        {feature.icon}
                      </div>
                      <h3 className="mb-2 text-[#111827] text-base font-semibold">{feature.title}</h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <Testimonials />
          <TrustedSection />

          {/* CTA Section */}
          <section className="py-20 relative overflow-hidden bg-neutral-secondary/30">
            <div className="container relative z-10 px-6 mx-auto">
              <div
                className="max-w-3xl mx-auto text-center p-10 md:p-16 bg-white rounded-xl border border-[#E5E7EB] backdrop-blur-sm"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <h2 className="text-2xl font-semibold text-[#111827] mb-4">Ready to Evolve?</h2>
                <p className="max-w-xl mx-auto mb-8 text-[#6B7280]">
                  Join thousands of learners who have transformed their careers with NCVET.AI.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsLoginOpen(true)}
                  className="px-8 py-3 text-sm font-semibold text-white bg-black hover:bg-neutral-800 rounded-lg transition-all"
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
                >
                  Launch Your Journey
                </motion.button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};
