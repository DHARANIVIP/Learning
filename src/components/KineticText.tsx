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
    direction === 'left' ? [400, -400] : [-400, 400]
  );

  return (
    <div ref={containerRef} className="flex overflow-hidden whitespace-nowrap py-4">
      <motion.h2
        style={{ x: xMove }}
        className="text-[32px] md:text-[48px] font-bold uppercase leading-none text-[#1A1A1A] tracking-tighter"
      >
        {text} {text} {text}
      </motion.h2>
    </div>
  );
};
