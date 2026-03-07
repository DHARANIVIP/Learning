import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { MoveHorizontal, ArrowRight } from 'lucide-react';

export const HeroSplit: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const x = useMotionValue(0);
  
  // Smooth spring animation for the slider
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      // Initialize in the middle
      x.set(containerRef.current.offsetWidth / 2);
    }
    
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        x.set(containerRef.current.offsetWidth / 2);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [x]);

  // Calculate percentage for clip-path
  const widthPercent = useTransform(xSpring, [0, containerWidth], [0, 100]);
  
  const handleDrag = (_: any, info: any) => {
    const newX = x.get() + info.delta.x;
    if (newX >= 0 && newX <= containerWidth) {
      x.set(newX);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-midnight select-none">
      
      {/* LEFT SIDE: The Foundation (Grayscale, Past) */}
      <div className="absolute inset-0 flex items-center justify-center w-full h-full">
        <div className="absolute inset-0 z-0">
           {/* Darker, "Drafting" or "Paperwork" style background */}
           <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop&grayscale" 
            alt="Foundation Background" 
            className="object-cover w-full h-full opacity-20 blur-[1px]"
          />
          <div className="absolute inset-0 bg-midnight/80" />
        </div>
        
        {/* Content Container - Centered */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
          <div className="relative">
            <h1 className="text-7xl font-bold leading-none tracking-tighter text-center md:text-[10rem] text-silver/20">
              <span className="block text-4xl font-medium tracking-widest uppercase md:text-5xl text-silver/40 mb-[-0.2em]">The</span>
              FOUNDATION
            </h1>
          </div>
          <p className="mt-8 text-sm font-medium tracking-[0.3em] uppercase text-silver/30">
            Where you start
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: The Evolution (Color, Future) - Masked */}
      <motion.div 
        className="absolute inset-0 z-20 overflow-hidden"
        style={{ clipPath: useTransform(widthPercent, (v) => `inset(0 0 0 ${v}%)`) }}
      >
        <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-midnight">
          {/* Circuit/Tech Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-midnight via-transparent to-midnight z-10" />
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" 
              alt="Evolution Background" 
              className="object-cover w-full h-full opacity-60"
            />
             <div className="absolute inset-0 bg-midnight/40 mix-blend-multiply" />
          </div>
          
          {/* Content Container - Perfectly aligned with Left Side */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
            <div className="relative text-center">
              <h1 className="text-7xl font-bold leading-none tracking-tighter md:text-[10rem] text-white drop-shadow-2xl">
                <span className="block text-4xl font-medium tracking-widest uppercase md:text-5xl text-white mb-[-0.2em]">The</span>
                <span className="text-sunset">EVOLUTION</span>
              </h1>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute left-1/2 -translate-x-1/2 -bottom-32 px-8 py-4 font-bold text-midnight bg-sunset rounded-full shadow-[0_0_30px_rgba(255,147,85,0.4)] flex items-center gap-2 group whitespace-nowrap"
              >
                <span>Start Your Path</span>
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
            
            <p className="mt-8 text-sm font-medium tracking-[0.3em] uppercase text-sunset drop-shadow-md">
              Where you're going
            </p>
          </div>
        </div>
      </motion.div>

      {/* DRAG HANDLE */}
      <motion.div
        style={{ x: xSpring, left: '-2px' }} 
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0}
        dragMomentum={false}
        onDrag={handleDrag}
        className="absolute top-0 bottom-0 z-30 flex items-center justify-center w-1 cursor-ew-resize group"
      >
        <div className="w-full h-full bg-silver/50 backdrop-blur-sm" />
        <div className="absolute flex items-center justify-center w-12 h-12 transition-transform duration-200 border-2 rounded-full shadow-2xl bg-silver border-midnight group-hover:scale-110 group-active:scale-95">
          <MoveHorizontal className="text-midnight" size={20} />
        </div>
      </motion.div>

      <div className="absolute z-30 -translate-x-1/2 bottom-8 left-1/2 animate-bounce text-silver/30">
        <span className="text-[10px] tracking-[0.2em] uppercase font-sans">Scroll to Evolve</span>
      </div>
    </div>
  );
};
