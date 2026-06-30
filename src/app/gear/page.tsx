'use client';

import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import dynamic from 'next/dynamic';
import { Gamepad2, Mouse, Keyboard, Monitor, Cpu, MonitorPlay, Crosshair, Settings, Component } from 'lucide-react';
import Image from 'next/image';
import DiscordProfileCard from '../../components/cards/DiscordProfileCard';
import { motion, AnimatePresence } from 'framer-motion';

const NexusBackground = dynamic(() => import('../../components/backgrounds/NexusBackground'), {
  ssr: false,
});

const gears = [
  { name: 'AULA S75 PRO', type: 'Keyboard', image: '/gear/keyboard.webp', url: 'https://www.google.com/search?q=AULA+S75+PRO+keyboard', icon: Keyboard },
  { name: 'ATK X1 ULT', type: 'Mouse', image: '/gear/mouse.webp', url: 'https://www.google.com/search?q=ATK+X1+ULT+mouse', icon: Mouse },
  { name: 'EDRA EGM24F120S', type: 'Monitor', image: '/gear/monitor_edra.webp', url: 'https://www.google.com/search?q=EDRA+EGM24F120S', icon: Monitor },
  { name: 'Asus Tuf VG249QM1A 270Hz', type: 'Monitor', image: '/gear/monitor_asus.webp', url: 'https://www.google.com/search?q=Asus+Tuf+VG249QM1A+270hz', icon: MonitorPlay },
  { name: 'Ryzen 5 5600X', type: 'CPU', image: '/gear/cpu.webp', url: 'https://www.google.com/search?q=Ryzen+5+5600x', icon: Cpu },
  { name: 'TUF GTX 1660 Ti', type: 'GPU', image: '/gear/gpu.webp', url: 'https://www.google.com/search?q=Asus+TUF+GeForce+GTX+1660+Ti', icon: Component },
  { name: 'Trident Z Neo DDR4-3000', type: 'RAM', image: '/gear/ram.webp', url: 'https://www.google.com/search?q=G.Skill+Trident+Z+Neo+DDR4', icon: Component }
];

const roles = {
  Valorant: ['Duelist', 'Controller', 'Initiator', 'Sentinel'],
  'Counter-Strike 2': ['AWP'],
  'League of Legends': ['Mid']
};

const settings = {
  Valorant: {
    Config: { DPI: '1600', Sensitivity: '0.147', 'Scoped Sensitivity': '0.2', Hz: '270' },
    Graphics: { Resolution: '1440x1080', 'Display Mode': 'Fullscreen', 'Aspect Ratio': '4:3', 'Aspect Ratio Method': 'Fill', 'Enemy Highlight': 'Red (Default)' }
  },
  'Counter-Strike 2': {
    Controls: { Sensitivity: '0.5', DPI: '1600', 'Polling rate': '4000 Hz' },
    Graphics: { Resolution: '1280x960' }
  }
};

type Tab = 'gears' | 'roles' | 'settings';

export default function GearPage() {
  const [activeTab, setActiveTab] = useState<Tab>('gears');

  return (
    <div className="relative min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500 overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="fixed inset-0 z-0 transition-all duration-500 dark:invert pointer-events-none">
          <Image src="/background.webp" alt="Background" fill priority quality={75} className="object-cover" />
        </div>
      </div>
      
      <div className="relative z-20 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8">
            
            {/* Left Column: Discord Profile */}
            <div className="w-full flex justify-center lg:justify-start lg:sticky lg:top-32 h-fit">
              <DiscordProfileCard />
            </div>

            {/* Right Column: Content */}
            <div className="w-full flex flex-col gap-6">
              
              {/* Navigation Tabs */}
              <div className="flex overflow-x-auto no-scrollbar gap-2 p-2 bg-white/20 dark:bg-black/20 backdrop-blur-xl rounded-2xl border border-black/5 dark:border-white/5">
                {[
                  { id: 'gears', label: 'Gears & Setup', icon: Gamepad2 },
                  { id: 'roles', label: 'Roles', icon: Crosshair },
                  { id: 'settings', label: 'Settings', icon: Settings }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as Tab)}
                      className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'text-black shadow-lg'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="active-tab"
                          className="absolute inset-0 bg-white rounded-xl"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        <Icon size={16} />
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="bg-white/30 dark:bg-black/30 backdrop-blur-2xl rounded-3xl border border-black/5 dark:border-white/5 p-6 sm:p-8 min-h-[500px]">
                <AnimatePresence mode="wait">
                  
                  {activeTab === 'gears' && (
                    <motion.div
                      key="gears"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      {gears.map((gear, idx) => {
                        const Icon = gear.icon;
                        return (
                          <a 
                            key={idx} 
                            href={gear.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group relative flex flex-col bg-white/50 dark:bg-neutral-900/50 rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300"
                          >
                            <div className="aspect-[4/3] w-full relative bg-white/80 dark:bg-white">
                              <Image 
                                src={gear.image}
                                alt={gear.name}
                                fill
                                unoptimized={true}
                                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="p-4 flex flex-col gap-1 backdrop-blur-md bg-white/30 dark:bg-black/30 border-t border-black/5 dark:border-white/5">
                              <div className="flex items-center gap-2 text-xs font-semibold text-blue-500 uppercase tracking-wider">
                                <Icon size={14} />
                                {gear.type}
                              </div>
                              <h3 className="font-bold text-blue-600 dark:text-blue-400 line-clamp-1">{gear.name}</h3>
                            </div>
                          </a>
                        )
                      })}
                    </motion.div>
                  )}

                  {activeTab === 'roles' && (
                    <motion.div
                      key="roles"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-8"
                    >
                      {Object.entries(roles).map(([game, gameRoles]) => (
                        <div key={game} className="flex flex-col gap-4">
                          <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
                            <span className="w-2 h-6 bg-rose-500 rounded-full" />
                            {game}
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {gameRoles.map(role => (
                              <div key={role} className="px-5 py-2.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 rounded-xl font-semibold shadow-[0_0_15px_rgba(244,63,94,0.1)]">
                                {role}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'settings' && (
                    <motion.div
                      key="settings"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-8"
                    >
                      {Object.entries(settings).map(([game, categories]) => (
                        <div key={game} className="flex flex-col gap-6">
                          <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 flex items-center gap-2 border-b border-black/10 dark:border-white/10 pb-4">
                            <span className="w-2 h-6 bg-rose-500 rounded-full" />
                            {game}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.entries(categories).map(([category, config]) => (
                              <div key={category} className="bg-white/40 dark:bg-black/40 rounded-2xl p-5 border border-black/5 dark:border-white/5">
                                <h4 className="font-semibold text-neutral-500 dark:text-neutral-400 mb-4 uppercase tracking-widest text-sm">{category}</h4>
                                <div className="flex flex-col gap-3">
                                  {Object.entries(config).map(([key, value]) => (
                                    <div key={key} className="flex justify-between items-center py-2 border-b border-black/5 dark:border-white/5 last:border-0">
                                      <span className="text-neutral-700 dark:text-neutral-300 font-medium">{key}</span>
                                      <span className="font-mono font-bold text-rose-500">{String(value)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                  
                </AnimatePresence>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
