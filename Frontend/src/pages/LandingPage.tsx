import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroModern } from '../components/HeroModern';
import { Testimonials } from '../components/Testimonials';
import { LoginModal } from '../components/LoginModal';
import { KineticText } from '../components/KineticText';
import { motion } from 'framer-motion';
import { BrainCircuit, Target, TrendingUp, Users, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-midnight text-offwhite font-sans selection:bg-sunset/30">
      <Navbar onLoginClick={() => setIsLoginOpen(true)} />

      <main>
        <HeroModern onCtaClick={() => setIsLoginOpen(true)} />

        {/* Kinetic Divider */}
        <div className="py-12 bg-midnight border-y border-white/5">
          <KineticText text="TRANSFORM YOUR CAREER • EVOLVE WITH AI • JOIN THE FUTURE • " direction="left" />
        </div>

        {/* Features Section */}
        <section id="features" className="relative py-32 overflow-hidden bg-midnight">
          <div className="container px-6 mx-auto">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="md:w-1/2">
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-sunset font-bold tracking-widest text-sm uppercase mb-4 block"
                >
                  Core Capabilities
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-5xl font-bold leading-[1.1] md:text-7xl text-white font-heading"
                >
                  Bridge the Skill <br />
                  <span className="text-silver/30">Gap Instantly.</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="mt-8 text-xl leading-relaxed text-silver/60 max-w-lg"
                >
                  Traditional education is slow. The job market is fast.
                  Our AI bridge ensures your learning matches reality.
                </motion.p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-10 flex items-center gap-3 text-white font-bold group"
                >
                  Explore Features
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-sunset group-hover:text-sunset transition-colors">
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
                    className="p-8 glass-card rounded-3xl hover:bg-white/10 transition-all group"
                  >
                    <div className="mb-6 text-sunset group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-white font-heading">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-silver/60">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Testimonials />

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-sunset/[0.02] mix-blend-overlay" />
          <div className="container relative z-10 px-6 mx-auto text-center">
            <h2 className="text-5xl font-bold text-white md:text-8xl font-heading mb-8">Ready to Evolve?</h2>
            <p className="max-w-2xl mx-auto mb-12 text-xl text-silver/60">
              Join thousands of learners who have transformed their careers with NCVET.AI.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLoginOpen(true)}
              className="px-12 py-6 text-xl font-bold text-midnight bg-sunset rounded-full shadow-premium transition-shadow"
            >
              Launch Your Journey
            </motion.button>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 bg-midnight">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-2xl font-bold text-white">
              NCVET<span className="text-sunset">.AI</span>
            </div>
            <div className="flex gap-10 text-silver/40 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact Us</a>
            </div>
            <div className="text-silver/40 text-sm">
              &copy; 2026 NCVET.AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

