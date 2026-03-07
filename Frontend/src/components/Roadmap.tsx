import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, Circle, Trophy } from 'lucide-react';
import { cn } from '../lib/utils';

const levels = [
  {
    id: 1,
    title: "NSQF Level 4",
    role: "Junior Developer",
    desc: "Mastering the fundamentals of syntax, logic, and basic algorithms.",
    status: "completed"
  },
  {
    id: 2,
    title: "NSQF Level 5",
    role: "Frontend Specialist",
    desc: "Building responsive interfaces with React and managing complex state.",
    status: "completed"
  },
  {
    id: 3,
    title: "NSQF Level 6",
    role: "Full Stack Engineer",
    desc: "Integrating APIs, databases, and server-side logic for complete solutions.",
    status: "current"
  },
  {
    id: 4,
    title: "NSQF Level 7",
    role: "System Architect",
    desc: "Designing scalable cloud infrastructures and microservices patterns.",
    status: "locked"
  },
  {
    id: 5,
    title: "NSQF Level 8",
    role: "AI Solutions Lead",
    desc: "Implementing machine learning models and driving technical innovation.",
    status: "locked"
  }
];

export const Roadmap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl px-6 py-24 mx-auto">

      {/* Central Line Container */}
      <div className="absolute left-8 md:left-1/2 top-24 bottom-24 w-1 -translate-x-1/2 bg-silver/20 rounded-full overflow-hidden">
        <motion.div
          className="w-full bg-sunset shadow-[0_0_15px_#FF9355]"
          style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
        />
      </div>

      <div className="space-y-24">
        {levels.map((level, index) => {
          const isEven = index % 2 === 0;
          const isCompleted = level.status === 'completed';
          const isCurrent = level.status === 'current';

          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative flex items-center md:justify-between",
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              )}
            >
              {/* Timeline Node */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                <div className={cn(
                  "w-8 h-8 rounded-full border-4 flex items-center justify-center bg-midnight transition-colors duration-500",
                  isCompleted || isCurrent ? "border-sunset" : "border-silver/30"
                )}>
                  {isCompleted ? (
                    <div className="w-3 h-3 rounded-full bg-sunset" />
                  ) : isCurrent ? (
                    <div className="w-3 h-3 rounded-full bg-sunset animate-pulse" />
                  ) : null}
                </div>
              </div>

              {/* Content Card */}
              <div className="w-full pl-20 md:pl-0 md:w-[42%]">
                <motion.div
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 40px -10px rgba(255, 147, 85, 0.15)"
                  }}
                  className={cn(
                    "p-6 rounded-xl border transition-all duration-300 group cursor-default",
                    isCurrent
                      ? "bg-gradient-to-br from-silver/10 to-silver/5 border-sunset/50 shadow-[0_0_30px_-10px_rgba(255,147,85,0.2)]"
                      : "bg-silver/10 border-silver/10 hover:border-silver/30"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={cn(
                      "text-xs font-bold tracking-wider uppercase",
                      isCurrent ? "text-sunset" : "text-silver/60"
                    )}>
                      {level.title}
                    </span>
                    {isCompleted && <CheckCircle2 size={16} className="text-sunset" />}
                    {isCurrent && <Circle size={16} className="text-sunset animate-pulse" />}
                  </div>

                  <h3 className={cn(
                    "text-xl font-bold mb-2 group-hover:text-sunset transition-colors",
                    isCurrent ? "text-white" : "text-silver"
                  )}>
                    {level.role}
                  </h3>

                  <p className="text-sm leading-relaxed text-silver/70">
                    {level.desc}
                  </p>

                  {isCurrent && (
                    <div className="w-full h-1 mt-4 overflow-hidden rounded-full bg-midnight">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "65%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-sunset"
                      />
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Empty spacer for the other side */}
              <div className="hidden md:block md:w-[42%]" />
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center mt-24">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center justify-center w-16 h-16 border-2 rounded-full border-silver/20 text-silver/40">
            <Trophy size={32} />
          </div>
          <p className="text-sm tracking-widest uppercase text-silver/40">Path Complete</p>
        </div>
      </div>
    </div>
  );
};
