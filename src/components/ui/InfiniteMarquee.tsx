'use client';

import React, { useRef, useEffect, useState } from 'react';

interface InfiniteMarqueeProps {
  direction?: 'left' | 'right';
  speed?: number; // pixels per second
  pauseOnHover?: boolean;
  children: React.ReactNode;
}

export default function InfiniteMarquee({
  direction = 'left',
  speed = 30,
  pauseOnHover = true,
  children,
}: InfiniteMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(2);
  const [duration, setDuration] = useState(20);

  useEffect(() => {
    if (marqueeRef.current && contentRef.current) {
      const containerWidth = marqueeRef.current.offsetWidth;
      const contentWidth = contentRef.current.offsetWidth;
      if (contentWidth > 0) {
        setCopies(Math.max(2, Math.ceil((containerWidth * 2) / contentWidth) + 1));
        setDuration(contentWidth / speed);
      }
    }
  }, [speed, children]);

  const style = {
    '--duration': `${duration}s`,
    '--direction': direction === 'left' ? 'normal' : 'reverse',
  } as React.CSSProperties;

  return (
    <div
      ref={marqueeRef}
      className={`marquee-wrapper ${pauseOnHover ? 'pause-on-hover' : ''}`}
      style={style}
    >
      <div className="marquee-track">
        <div ref={contentRef} className="marquee-content">
          {children}
        </div>
        {Array.from({ length: copies - 1 }).map((_, i) => (
          <div key={i} className="marquee-content" aria-hidden="true">
            {children}
          </div>
        ))}
      </div>
      <style jsx>{`
        .marquee-wrapper {
          overflow: hidden;
          position: relative;
          width: 100%;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 15%,
            black 85%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 15%,
            black 85%,
            transparent 100%
          );
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: scroll var(--duration) linear infinite;
          animation-direction: var(--direction);
        }

        .pause-on-hover:hover .marquee-track {
          animation-play-state: paused;
        }

        .marquee-content {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / ${copies}));
          }
        }
      `}</style>
    </div>
  );
}
