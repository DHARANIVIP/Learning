import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroModernProps {
    onCtaClick: () => void;
}

export const HeroModern = ({ onCtaClick }: HeroModernProps) => {
    return (
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-transparent">
            {/* Background Abstract Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neutral-secondary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neutral-secondary/10 rounded-full blur-[120px]" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neutral-secondary/20 to-transparent" />
            </div>

            <div className="container relative z-10 px-6 mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase border rounded-lg border-neutral-secondary/30 text-neutral-muted bg-neutral-secondary/10">
                        The Future of Vocational Learning
                    </span>

                    <h1 className="max-w-4xl mx-auto mb-6 leading-[1.1] tracking-tight">
                        <span style={{ color: '#000000' }}>Personalized</span> <br />
                        <span style={{ color: '#333333' }}>Learning Paths</span>
                        <br />
                        <span className="text-3xl md:text-5xl block mt-2 font-black uppercase tracking-tighter" style={{ color: '#555555' }}>for Digital Excellence</span>
                    </h1>

                    <p className="max-w-2xl mx-auto mb-10 text-base md:text-lg leading-relaxed" style={{ color: '#4A4A4A' }}>
                        Navigate the complexities of modern skills with our AI-driven guidance system.
                        Tailored journeys aligned with NSQF standards and real-time market needs.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <motion.button
                            whileHover={{ y: -4, boxShadow: '0 10px 20px rgba(0,0,0,0.15)', backgroundColor: '#1A1A1A' }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onCtaClick}
                            className="px-[28px] py-[12px] text-[16px] font-bold text-white bg-black rounded-[10px] transition-all flex items-center gap-2 group relative z-10 w-auto"
                        >
                            Get Started Now
                            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: '#F2F2F2' }}
                            whileTap={{ scale: 0.98 }}
                            className="px-[28px] py-[12px] text-[16px] font-bold border-2 rounded-[10px] border-black text-black transition-all relative z-10 w-auto"
                        >
                            View Sample Path
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-multiply" />
        </div>
    );
};
