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
        text: "Navigating the vocational training landscape was confusing until I found Skill.AI. The personalized guidance and market demand insights are game-changers.",
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
        <section id="testimonials" className="py-20 bg-transparent">
            <div className="container px-6 mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-neutral-accent"
                    >
                        Trusted by Thousands of <br />
                        <span className="text-neutral-text/30 italic">New-Age Learners</span>
                    </motion.h2>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                            className="p-6 bg-white rounded-xl relative group hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 border border-[#E5E7EB]"
                        >
                            <Quote className="absolute top-5 right-6 text-[#F3F4F6] group-hover:text-[#E5E7EB] transition-colors" size={48} />

                            <div className="flex gap-0.5 mb-4">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} size={14} className="fill-neutral-accent text-neutral-accent" />
                                ))}
                            </div>

                            <p className="mb-6 text-sm text-[#6B7280] leading-relaxed">
                                "{t.text}"
                            </p>

                            <div className="flex items-center gap-3 pt-4 border-t border-[#F3F4F6]">
                                <img
                                    src={t.image}
                                    alt={t.name}
                                    className="w-10 h-10 rounded-lg object-cover border border-[#E5E7EB]"
                                />
                                <div>
                                    <h4 className="text-sm font-semibold text-[#111827]">{t.name}</h4>
                                    <p className="text-xs text-[#6B7280]">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
