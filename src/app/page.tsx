'use client';

import React, { useState, useEffect } from 'react';
import FluidSand from '../components/FluidSand';
import InfiniteMarquee from '../components/InfiniteMarquee';
import FloatingCard from '../components/FloatingCard';
import { Heart, AtSign, Music } from 'lucide-react';
import Navbar from '../components/Navbar';

const fullStackIcons = [
  { name: 'TypeScript', class: 'devicon-typescript-plain' },
  { name: 'React', class: 'devicon-react-original' },
  { name: 'Vue', class: 'devicon-vuejs-plain' },
  { name: 'Tailwind', class: 'devicon-tailwindcss-plain' },
  { name: 'Node.js', class: 'devicon-nodejs-line-wordmark' },
  { name: 'Docker', class: 'devicon-docker-plain' },
  { name: 'Git', class: 'devicon-git-plain' },
  { name: 'Next.js', class: 'devicon-nextjs-plain' },
  { name: 'Nuxt', class: 'devicon-nuxtjs-plain' },
  { name: 'Three.js', class: 'devicon-threejs-original' },
  { name: 'Express', class: 'devicon-express-original' },
  { name: 'MySQL', class: 'devicon-mysql-original' },
  { name: 'AWS', class: 'devicon-amazonwebservices-plain-wordmark' },
  { name: 'GitHub', class: 'devicon-github-original' },
];

const gameDesignIcons = [
  { name: 'Unity', class: 'devicon-unity-original' },
  { name: 'Lua', class: 'devicon-lua-plain' },
  { name: 'C#', class: 'devicon-csharp-plain' },
  { name: 'Go', class: 'devicon-go-original-wordmark' },
  { name: 'Photoshop', class: 'devicon-photoshop-plain' },
];

export default function Home() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    }, 0);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const cards = [
    { title: "Donate", href: "https://buymeacoffee.com/travis__", icon: <Heart /> },
    { title: "Repositories", href: "https://github.com/TrnHatNamX", icon: <i className="devicon-github-original text-2xl" /> },
    { title: "Contact", href: "nam2442011yt@gmail.com", icon: <AtSign /> },
    { title: "Songs", href: "#", icon: <Music /> },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col transition-colors duration-300">
      {/* Dynamic Nexus Background */}
      <FluidSand />

      {/* Main Content Overlay */}
      <div className="relative z-10 w-full flex-grow flex flex-col items-center pb-8 sm:pb-12 md:my-0 justify-start">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-0 flex items-center justify-center gap-8 lg:gap-16 w-full pt-12 md:pt-24">

          {/* Left Cards */}
          <div className="hidden lg:flex flex-col gap-4 w-2/12 z-10">
            {cards.slice(0, 2).map((card, idx) => (
              <FloatingCard
                key={idx}
                title={card.title}
                href={card.href}
                icon={card.icon}
                className={`w-32 h-32 ${idx % 2 === 0 ? 'ml-auto' : ''} ${idx === 0 ? 'rotate-2' : '-rotate-3'}`}
              />
            ))}
          </div>

          {/* Center Hero */}
          <header className="flex-1 z-10 w-full flex flex-col justify-center">
            <div className="space-y-6 sm:space-y-8 z-10">
              <div className="space-y-3 sm:space-y-4">
                <h1 className="font-semibold text-center text-base sm:text-lg text-black/50 dark:text-white/50 md:text-xl flex items-center justify-center flex-wrap gap-2">
                  <span>Hi, I am</span>
                  <span className="text-black/80 select-none dark:text-white/90 transition-colors backdrop-blur-md bg-white/30 dark:bg-neutral-800/30 ring-1 ring-black/10 dark:ring-white/10 rounded-full py-2 sm:py-2.5 pl-4 pr-5 gap-1 inline-flex items-center w-max font-medium text-sm sm:text-base">
                    TrAvis
                  </span>
                </h1>

                <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
                  <div className="inline-flex flex-col items-center mt-2">
                    <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-black/90 dark:text-white/90 lg:text-6xl text-center block sm:whitespace-nowrap tracking-tight">
                      Full-Stack Developer
                    </h1>
                    <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl opacity-60 mt-1 sm:mt-2 sm:whitespace-nowrap font-semibold text-black/90 dark:text-white/90 text-right w-full tracking-tight">
                      Game & AI Controller
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 sm:mt-16 flex flex-col items-center justify-center gap-y-6">
              {/* Marquee 1 */}
              <div className="flex flex-col items-center gap-y-3 w-full max-w-lg">
                <span className="text-[10px] sm:text-xs text-black/40 dark:text-white/40 font-semibold tracking-[0.2em] uppercase">
                  Full-Stack Development
                </span>
                <InfiniteMarquee direction="left" speed={40}>
                  {fullStackIcons.map((icon, idx) => (
                    <i key={idx} className={`${icon.class} text-black dark:text-white`} style={{ fontSize: 32, margin: '0 24px' }} title={icon.name} />
                  ))}
                </InfiniteMarquee>
              </div>

              {/* Marquee 2 */}
              <div className="flex flex-col items-center gap-y-3 w-full max-w-lg pt-4">
                <span className="text-[10px] sm:text-xs text-black/40 dark:text-white/40 font-semibold tracking-[0.2em] uppercase">
                  Game Development & Design
                </span>
                <InfiniteMarquee direction="right" speed={40}>
                  {gameDesignIcons.map((icon, idx) => (
                    <i key={idx} className={`${icon.class} text-black dark:text-white`} style={{ fontSize: 32, margin: '0 24px' }} title={icon.name} />
                  ))}
                </InfiniteMarquee>
              </div>
            </div>
          </header>

          {/* Right Cards */}
          <div className="hidden lg:flex flex-col gap-4 w-2/12 z-10">
            {cards.slice(2, 4).map((card, idx) => (
              <FloatingCard
                key={idx}
                title={card.title}
                href={card.href}
                icon={card.icon}
                className={`w-32 h-32 ${idx % 2 !== 0 ? 'ml-auto' : ''} ${idx === 0 ? '-rotate-2' : 'rotate-3'}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="grid lg:hidden grid-cols-2 gap-3 sm:gap-4 w-full mt-12 z-10 px-4 sm:px-6 max-w-lg">
          {cards.map((card, idx) => (
            <FloatingCard
              key={idx}
              title={card.title}
              href={card.href}
              icon={card.icon}
              className="w-full aspect-square"
            />
          ))}
        </div>
      </div>
    </div>
  );
}