import { motion } from 'framer-motion';
import { Mail, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="py-20 border-t border-neutral-secondary/20 bg-white">
            <div className="container px-6 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Logo & Description */}
                    <div className="md:col-span-2">
                        <div className="text-2xl font-black text-neutral-accent tracking-tighter mb-6">
                            Skill<span className="text-neutral-accent/20">.AI</span>
                        </div>
                        <p className="text-neutral-muted max-w-sm mb-8">
                            Helping learners build industry-ready AI skills with personalized roadmaps and real-time market insights.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { name: 'Email', icon: Mail },
                                { name: 'Twitter', icon: Twitter },
                                { name: 'LinkedIn', icon: Linkedin }
                            ].map((social) => (
                                <motion.a
                                    key={social.name}
                                    href="#"
                                    whileHover={{ y: -2 }}
                                    className="w-10 h-10 rounded-full bg-neutral-secondary/20 flex items-center justify-center text-neutral-accent hover:bg-neutral-accent hover:text-white transition-all group"
                                >
                                    <span className="sr-only">{social.name}</span>
                                    <social.icon className="w-4 h-4 text-current transition-opacity" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="font-bold text-neutral-accent mb-6 uppercase tracking-widest text-xs">Product</h4>
                        <ul className="space-y-4">
                            {['Learning Paths', 'Courses', 'Skills', 'Career Insights'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-neutral-muted hover:text-neutral-accent transition-colors font-medium">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="font-bold text-neutral-accent mb-6 uppercase tracking-widest text-xs">Resources</h4>
                        <ul className="space-y-4">
                            {['Documentation', 'Community', 'Support', 'Contact'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-neutral-muted hover:text-neutral-accent transition-colors font-medium">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-neutral-secondary/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-neutral-muted font-medium">
                    <div>
                        &copy; 2026 Skill.AI. All rights reserved.
                    </div>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-neutral-accent transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-neutral-accent transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-neutral-accent transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
