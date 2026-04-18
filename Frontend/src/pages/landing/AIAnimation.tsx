import { motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';

export const AIAnimation = () => {
    useEffect(() => {
        const handleResize = () => { };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nodes = useMemo(() => {
        return Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 10 + 10,
        }));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
            {nodes.map((node) => (
                <motion.div
                    key={node.id}
                    initial={{ x: `${node.x}%`, y: `${node.y}%` }}
                    animate={{
                        x: [`${node.x}%`, `${(node.x + 10) % 100}%`, `${node.x}%`],
                        y: [`${node.y}%`, `${(node.y + 10) % 100}%`, `${node.y}%`],
                    }}
                    transition={{
                        duration: node.duration,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bg-neutral-accent rounded-full blur-[1px]"
                    style={{ width: node.size, height: node.size }}
                >
                    <div className="absolute inset-0 bg-neutral-accent rounded-full animate-pulse" />
                </motion.div>
            ))}

            {/* Subtle lines connecting nodes (using SVG for better performance) */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--neutral-accent)" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="var(--neutral-accent)" stopOpacity="0.5" />
                    </linearGradient>
                </defs>
                {nodes.slice(0, 10).map((node, i) => (
                    <motion.line
                        key={`line-${i}`}
                        x1={`${node.x}%`}
                        y1={`${node.y}%`}
                        x2={`${nodes[(i + 1) % nodes.length].x}%`}
                        y2={`${nodes[(i + 1) % nodes.length].y}%`}
                        stroke="url(#lineGradient)"
                        strokeWidth="0.5"
                        animate={{
                            x1: [`${node.x}%`, `${(node.x + 10) % 100}%`, `${node.x}%`],
                            y1: [`${node.y}%`, `${(node.y + 10) % 100}%`, `${node.y}%`],
                            x2: [`${nodes[(i + 1) % nodes.length].x}%`, `${(nodes[(i + 1) % nodes.length].x + 10) % 100}%`, `${nodes[(i + 1) % nodes.length].x}%`],
                            y2: [`${nodes[(i + 1) % nodes.length].y}%`, `${(nodes[(i + 1) % nodes.length].y + 10) % 100}%`, `${nodes[(i + 1) % nodes.length].y}%`],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </svg>
        </div>
    );
};
