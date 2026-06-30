'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';

export default function MinecraftScrollbar() {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateScroll = useCallback(() => {
    if (isDragging.current) return;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    const totalScroll = scrollHeight - clientHeight;
    const currentScroll = window.scrollY;

    if (totalScroll > 0) {
      setScrollY((currentScroll / totalScroll) * 100);
    } else {
      setScrollY(0);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      updateScroll();
      setIsScrolling(true);
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1500); // Hide after 1.5s of no scroll
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScroll);
    updateScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [updateScroll]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    isDragging.current = true;
    setIsScrolling(true);
    
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const thumbSize = 24;
      
      // Calculate new percentage based on mouse position within the track
      // Mouse Y relative to the track
      let newY = moveEvent.clientY - rect.top;
      
      // Adjust to consider the center of the thumb
      newY = newY - thumbSize / 2;
      
      // Clamp between 0 and max travel distance
      const maxTravel = rect.height - thumbSize;
      newY = Math.max(0, Math.min(newY, maxTravel));
      
      const percentage = newY / maxTravel;
      
      // Update local state for instant feedback
      setScrollY(percentage * 100);

      // Scroll the window
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: totalScroll * percentage, behavior: 'instant' });
    };

    const handlePointerUp = () => {
      isDragging.current = false;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      
      // Resume hide timeout
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1500);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const dirtBlockSvg = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" fill="%233A2411" /><rect x="4" y="4" width="16" height="5" fill="%235E9D34" /><rect x="4" y="9" width="16" height="11" fill="%23866043" /><rect x="6" y="12" width="4" height="4" fill="%23694830" /><rect x="14" y="15" width="2" height="2" fill="%2399704F" /><rect x="16" y="10" width="2" height="2" fill="%23694830" /><rect x="8" y="17" width="2" height="2" fill="%2399704F" /></svg>')`;
  const dirtBlockHoverSvg = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" fill="%234C3016" /><rect x="4" y="4" width="16" height="5" fill="%2370B83E" /><rect x="4" y="9" width="16" height="11" fill="%23A17351" /><rect x="6" y="12" width="4" height="4" fill="%237D5639" /><rect x="14" y="15" width="2" height="2" fill="%23B8875F" /><rect x="16" y="10" width="2" height="2" fill="%237D5639" /><rect x="8" y="17" width="2" height="2" fill="%23B8875F" /></svg>')`;

  const visible = isScrolling || isHovered;

  // Don't render scrollbar if page is too short to scroll
  if (typeof document !== 'undefined' && document.documentElement.scrollHeight <= window.innerHeight) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className={`fixed top-0 right-0 h-screen w-6 z-[9999] transition-all duration-700 flex justify-center ${visible ? 'opacity-100 blur-0' : 'opacity-0 blur-md'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* The Track (Thin line, with blur) */}
      <div className="absolute top-0 bottom-0 w-[2px] bg-black/10 dark:bg-white/10 backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,255,0.2)]"></div>
      
      {/* The Thumb */}
      <div 
        className="absolute w-6 h-6 cursor-grab active:cursor-grabbing transition-transform duration-100 hover:scale-110"
        onPointerDown={handlePointerDown}
        style={{ 
          top: `calc(${scrollY}% - ${scrollY / 100 * 24}px)`,
          backgroundImage: isHovered ? dirtBlockHoverSvg : dirtBlockSvg,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
    </div>
  );
}
