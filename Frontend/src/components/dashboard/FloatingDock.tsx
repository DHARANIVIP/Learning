import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Compass, BarChart3, GraduationCap, Briefcase, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
    { icon: LayoutDashboard, label: 'Overview', to: '/dashboard' },
    { icon: Compass, label: 'Path', to: '/dashboard/generator' },
    { icon: BarChart3, label: 'Skills', to: '/dashboard/skills' },
    { icon: Briefcase, label: 'Market', to: '/dashboard/market' },
    { icon: GraduationCap, label: 'Courses', to: '/dashboard/courses' },
];

export const FloatingDock = () => {
    const location = useLocation();

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center gap-2 p-2 glass-card rounded-full shadow-2xl"
            >
                {navItems.map((item) => {
                    const isActive = location.pathname === item.to;
                    return (
                        <NavLink key={item.to} to={item.to} title={item.label}>
                            <motion.div
                                whileHover={{ y: -5, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                                    isActive
                                        ? "bg-sunset text-midnight shadow-[0_0_20px_rgba(255,147,85,0.4)]"
                                        : "text-silver/60 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <item.icon size={20} />
                            </motion.div>
                        </NavLink>
                    );
                })}
                <div className="w-px h-8 bg-white/10 mx-2" />
                <motion.button
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => window.location.href = '/'}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-silver/40 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300"
                >
                    <LogOut size={20} />
                </motion.button>
            </motion.div>
        </div>
    );
};
