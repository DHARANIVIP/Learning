import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
}


export const NeuralNetworkBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number>(0);

    const colors = {
        particle: '#BFC9D1', // Silver
        glow: '#FF9355',    // Sunset Orange
        line: 'rgba(191, 201, 209, 0.2)', // Faint Silver
        lineGlow: 'rgba(255, 147, 85, 0.4)', // Sunset Orange for lines
    };

    const particleCount = 120;
    const connectionDistance = 150;
    const mouseRadius = 150;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const initParticles = () => {
            const { width, height } = canvas.getBoundingClientRect();
            const particles: Particle[] = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    color: colors.particle
                });
            }
            particlesRef.current = particles;
        };

        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            initParticles();
        };

        const resizeObserver = new ResizeObserver(() => {
            handleResize();
        });

        resizeObserver.observe(canvas);
        handleResize();

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const { width, height } = canvas.getBoundingClientRect();
            const particles = particlesRef.current;
            const mouse = mouseRef.current;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off walls
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Slowly return to normal speed if they were fast
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (speed > 0.5) {
                    p.vx *= 0.98;
                    p.vy *= 0.98;
                }

                // Mouse interaction for glow
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const mouseDist = Math.sqrt(dx * dx + dy * dy);
                const isGlowing = mouseDist < mouseRadius;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = isGlowing ? colors.glow : p.color;
                if (isGlowing) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = colors.glow;
                } else {
                    ctx.shadowBlur = 0;
                }
                ctx.fill();
                ctx.shadowBlur = 0; // Reset shadow for lines

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const cdx = p.x - p2.x;
                    const cdy = p.y - p2.y;
                    const distance = Math.sqrt(cdx * cdx + cdy * cdy);

                    if (distance < connectionDistance) {
                        const opacity = 1 - distance / connectionDistance;
                        const dx1 = mouse.x - p.x;
                        const dy1 = mouse.y - p.y;
                        const dx2 = mouse.x - p2.x;
                        const dy2 = mouse.y - p2.y;
                        const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
                        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                        const isLineGlowing = dist1 < mouseRadius || dist2 < mouseRadius;

                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = isLineGlowing ? colors.lineGlow : colors.line;
                        ctx.lineWidth = isLineGlowing ? (opacity * 2) : (opacity * 1);
                        ctx.globalAlpha = opacity;
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }

            animationFrameRef.current = requestAnimationFrame(draw);
        };

        draw();

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameRef.current);
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            style={{ background: 'transparent' }}
        />
    );
};
