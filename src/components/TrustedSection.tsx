import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Users, Lightbulb, GraduationCap, Award } from 'lucide-react';

const Counter = ({ value, label, suffix = "", icon: Icon }: { value: number, label: string, suffix?: string, icon: any }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="p-8 bg-white/80 backdrop-blur-sm border border-neutral-secondary/20 rounded-[24px] shadow-subtle flex flex-col items-center text-center group"
        >
            <div className="w-14 h-14 rounded-2xl bg-neutral-accent/5 flex items-center justify-center text-neutral-accent mb-6 group-hover:bg-neutral-accent group-hover:text-white transition-all duration-300">
                <Icon size={28} />
            </div>
            <div className="text-4xl font-black text-neutral-accent mb-2 tracking-tight">
                {count.toLocaleString()}{suffix}
            </div>
            <div className="text-neutral-muted font-semibold text-sm uppercase tracking-wider">
                {label}
            </div>
        </motion.div>
    );
};

export const TrustedSection = () => {
    const stats = [
        { value: 10000, label: "Learners Worldwide", suffix: "+", icon: Users },
        { value: 500, label: "AI Paths Generated", suffix: "+", icon: Lightbulb },
        { value: 50, label: "Industry Skills", suffix: "+", icon: GraduationCap },
        { value: 95, label: "Satisfaction Rate", suffix: "%", icon: Award },
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-transparent">
            <div className="container px-6 mx-auto">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-neutral-accent/40 font-bold tracking-widest text-xs uppercase mb-4 block"
                    >
                        Proof of Impact
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-neutral-accent mb-4"
                    >
                        Trusted by 10,000+ <br />
                        <span className="text-neutral-text/20">Learners Worldwide</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-neutral-muted text-lg"
                    >
                        Our AI-driven personalized learning approach is revolutionizing how skills are acquired for the modern industry.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <Counter key={idx} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    );
};
