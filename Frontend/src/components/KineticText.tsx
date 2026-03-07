import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface KineticTextProps {
  text: string;
  direction?: 'left' | 'right';
}

export const KineticText = ({ text, direction = 'left' }: KineticTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xMove = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'left' ? [100, -100] : [-100, 100]
  );

  return (
    <div ref={containerRef} className="flex overflow-hidden whitespace-nowrap">
      <motion.h2
        style={{ x: xMove, WebkitTextStroke: '2px #BFC9D1' } as any}
        className="text-[10vw] font-black uppercase leading-none text-transparent opacity-10"
      >
        {text} {text} {text}
      </motion.h2>
    </div>
  );
};
