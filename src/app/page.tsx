import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import FloatingCard from '../components/cards/FloatingCard';
import { Heart, AtSign, Gamepad2 } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import DiscordProfileCard from '../components/cards/DiscordProfileCard';
import OrbitingTechStack from '../components/ui/OrbitingTechStack';

const Footer = dynamic(() => import('../components/layout/Footer'));

const fullStackIcons = [
  { name: 'TypeScript', class: 'devicon-typescript-plain' },
  { name: 'React', class: 'devicon-react-original' },
  { name: 'Vue', class: 'devicon-vuejs-plain' },
  { name: 'Tailwind', class: 'devicon-tailwindcss-plain' },
  { name: 'Node.js', class: 'devicon-nodejs-plain' },
  { name: 'Docker', class: 'devicon-docker-plain' },
  { name: 'Git', class: 'devicon-git-plain' },
  { name: 'Next.js', class: 'devicon-nextjs-plain' },
];

const gameDesignIcons = [
  { name: 'Unity', class: 'devicon-unity-original' },
  { name: 'Lua', class: 'devicon-lua-plain' },
  { name: 'C#', class: 'devicon-csharp-plain' },
  { name: 'Go', class: 'devicon-go-original-wordmark' },
  { name: 'Photoshop', class: 'devicon-photoshop-plain' },
  { name: 'Three.js', class: 'devicon-threejs-original' },
];

export default function Home() {

  const cards = [
    { title: "Donate", href: "/connect?tab=donate", icon: <Heart /> },
    { title: "Repositories", href: "https://github.com/TrnHatNamX", icon: <i className="devicon-github-original text-2xl" /> },
    { title: "Contact", href: "/connect?tab=contact", icon: <AtSign /> },
    { title: "Gear", href: "/gear", icon: <Gamepad2 /> },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col transition-colors duration-300">
      {/* Background Image with Invert for Dark Mode */}
      <div className="fixed inset-0 z-0 transition-all duration-500 dark:invert pointer-events-none">
        <Image 
          src="/background.webp" 
          alt="Background" 
          fill 
          priority
          quality={75}
          className="object-cover" 
        />
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center pb-8 sm:pb-12 md:my-0 justify-start">
        <Navbar />

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 lg:gap-32 w-full pt-0 flex-1">

          {/* Left Cards */}
          <div className="hidden lg:flex flex-col gap-[200px] w-2/12 z-10 items-center">
            {cards.slice(0, 2).map((card, idx) => (
              <FloatingCard
                key={idx}
                title={card.title}
                href={card.href}
                icon={card.icon}
                className={`w-[186px] h-[186px] ${idx === 0 ? 'rotate-2' : '-rotate-3'}`}
              />
            ))}
          </div>

          {/* Center Hero: Discord Card + Orbiting Stack */}
          <main className="flex-1 z-10 w-full flex flex-col items-center justify-center relative min-h-[550px]">
            
            {/* Outer and Inner Orbits */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <OrbitingTechStack icons={fullStackIcons} radius={320} duration={45} reverse={false} />
              <OrbitingTechStack icons={gameDesignIcons} radius={430} duration={60} reverse={true} />
            </div>

            {/* Central Discord Profile Card */}
            <DiscordProfileCard />

          </main>

          {/* Right Cards */}
          <div className="hidden lg:flex flex-col gap-[200px] w-2/12 z-10 items-center">
            {cards.slice(2, 4).map((card, idx) => (
              <FloatingCard
                key={idx}
                title={card.title}
                href={card.href}
                icon={card.icon}
                className={`w-[186px] h-[186px] ${idx === 0 ? '-rotate-2' : 'rotate-3'}`}
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
      <Footer />
    </div>
  );
}