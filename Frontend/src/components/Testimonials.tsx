import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: "Priya Sharma",
        role: "Full Stack Developer",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
        text: "The AI learning path was spot on. It identified exactly where I needed to improve in my NSQF Level 4 training and helped me jump to Level 5 within months.",
        rating: 5
    },
    {
        name: "Rahul Mehra",
        role: "Data Analyst",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
        text: "Navigating the vocational training landscape was confusing until I found NCVET.AI. The personalized guidance and market demand insights are game-changers.",
        rating: 5
    },
    {
        name: "Ananya Iyer",
        role: "UX Designer",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
        text: "The bento-style dashboard and intuitive path generator made learning feel like a breeze. Highly recommend for anyone looking to upskill professionally.",
        rating: 5
    }
];

export const Testimonials = () => {
    return (
        <section id="testimonials" className="py-32 bg-midnight/30">
            <div className="container px-6 mx-auto">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-white md:text-6xl font-heading"
                    >
                        Trusted by Thousands of <br />
                        <span className="text-sunset">New-Age Learners</span>
                    </motion.h2>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-8 glass-card rounded-3xl relative group hover:bg-white/10 transition-colors"
                        >
                            <Quote className="absolute top-6 right-8 text-sunset/10 group-hover:text-sunset/20 transition-colors" size={64} />

                            <div className="flex gap-1 mb-6">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-sunset text-sunset" />
                                ))}
                            </div>

                            <p className="mb-8 text-lg leading-relaxed text-silver/80 italic">
                                "{t.text}"
                            </p>

                            <div className="flex items-center gap-4">
                                <img
                                    src={t.image}
                                    alt={t.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-sunset/30"
                                />
                                <div>
                                    <h4 className="font-bold text-white">{t.name}</h4>
                                    <p className="text-xs text-silver/40 uppercase tracking-widest">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
