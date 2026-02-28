import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { NeuralNetworkBackground } from './NeuralNetworkBackground';

interface HeroModernProps {
    onCtaClick: () => void;
}

export const HeroModern = ({ onCtaClick }: HeroModernProps) => {
    return (
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#121F28]">
            <NeuralNetworkBackground />

            {/* Background Abstract Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sunset/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="container relative z-10 px-6 mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase border rounded-full border-sunset/30 text-sunset bg-sunset/5">
                        The Future of Vocational Learning
                    </span>

                    <h1 className="max-w-4xl mx-auto mb-8 text-6xl font-bold leading-[1.1] md:text-8xl tracking-tight text-white font-heading">
                        Personalized <br />
                        <span className="animate-shimmer">Learning Paths</span>
                        <br />
                        <span className="text-5xl md:text-6xl text-silver/40">for Digital Excellence</span>
                    </h1>

                    <p className="max-w-2xl mx-auto mb-12 text-lg leading-relaxed text-silver/60">
                        Navigate the complexities of modern skills with our AI-driven guidance system.
                        Tailored journeys aligned with NSQF standards and real-time market needs.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onCtaClick}
                            className="px-10 py-5 text-lg font-bold text-midnight bg-sunset rounded-full shadow-premium hover:shadow-[0_0_50px_rgba(255,147,85,0.4)] transition-all flex items-center gap-2 group relative z-10"
                        >
                            Get Started Now
                            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-5 text-lg font-bold border rounded-full border-white/10 text-white transition-all relative z-10"
                        >
                            View Sample Path
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>
    );
};
