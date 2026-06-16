'use client';

import React, { useState } from 'react';

interface OrbitingTechStackProps {
  icons: { name: string; class: string }[];
  radius?: number;
  duration?: number;
  reverse?: boolean;
}

export default function OrbitingTechStack({ 
  icons, 
  radius = 250, 
  duration = 30, 
  reverse = false 
}: OrbitingTechStackProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none flex items-center justify-center -z-10">
      <style>{`
        @keyframes orbit-spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div
        className="relative flex items-center justify-center"
        style={{
          animationName: 'orbit-spin',
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDirection: reverse ? 'reverse' : 'normal',
          animationPlayState: isHovered ? 'paused' : 'running'
        }}
      >
        {icons.map((icon, idx) => {
          const angle = (idx / icons.length) * 360;
          const x = Number((Math.cos((angle * Math.PI) / 180) * radius).toFixed(3));
          const y = Number((Math.sin((angle * Math.PI) / 180) * radius).toFixed(3));

          return (
            <div
              key={idx}
              className="absolute pointer-events-auto cursor-pointer group"
              style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div
                style={{
                  animationName: 'orbit-spin',
                  animationDuration: `${duration}s`,
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                  animationDirection: reverse ? 'normal' : 'reverse',
                  animationPlayState: isHovered ? 'paused' : 'running'
                }}
                className="flex flex-col items-center justify-center w-20 h-20 rounded-3xl bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:scale-110 hover:bg-white/30 dark:hover:bg-white/10"
              >
                <i className={`${icon.class} text-5xl text-black/80 dark:text-white/80 drop-shadow-md`} />
                
                {/* Tooltip */}
                <span className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 dark:bg-white/90 text-white dark:text-black text-sm font-bold px-3 py-1 rounded-lg pointer-events-none whitespace-nowrap shadow-lg">
                  {icon.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
