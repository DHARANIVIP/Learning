import React from 'react';

interface GlitchTextProps {
    text: string;
    className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = "" }) => {
    const isShimmer = className.includes('animate-shimmer');
    const containerClasses = className.replace('animate-shimmer', '').trim();

    return (
        <div className={`relative inline-block glitch-container ${containerClasses}`} data-text={text}>
            <span className={`relative z-10 ${isShimmer ? 'animate-shimmer' : 'text-white'}`}>
                {text}
            </span>
            <span className="absolute top-0 left-0 -z-10 text-sunset opacity-70 glitch-copy glitch-copy-1" aria-hidden="true">{text}</span>
            <span className="absolute top-0 left-0 -z-10 text-cyan-400 opacity-70 glitch-copy glitch-copy-2" aria-hidden="true">{text}</span>
        </div>
    );
};
