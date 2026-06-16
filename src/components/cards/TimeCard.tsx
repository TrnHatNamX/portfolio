// src/components/TimeCard.tsx
'use client';

import { useEffect, useState } from 'react';
import { Clock, Sun, Moon } from 'lucide-react';

interface TimeState {
    hours: string;
    minutes: string;
    seconds: string;
    rawHours: number;
}

export default function TimeCard() {
    const [time, setTime] = useState<TimeState>({
        hours: '00',
        minutes: '00',
        seconds: '00',
        rawHours: 12
    });
    const [dateString, setDateString] = useState<string>('');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 0);
        const updateTime = () => {
            const now = new Date();
            const hrs = now.getHours();
            setTime({
                hours: hrs.toString().padStart(2, '0'),
                minutes: now.getMinutes().toString().padStart(2, '0'),
                seconds: now.getSeconds().toString().padStart(2, '0'),
                rawHours: hrs
            });

            const options: Intl.DateTimeFormatOptions = { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
            };
            const formattedDate = now.toLocaleDateString('vi-VN', options);
            setDateString(formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, []);

    const isDayTime = time.rawHours >= 6 && time.rawHours < 18;

    // Custom greeting based on time of day
    const getGreeting = () => {
        const h = time.rawHours;
        if (h >= 5 && h < 12) return 'Chào buổi sáng! ☕';
        if (h >= 12 && h < 18) return 'Chào buổi chiều! ☀️';
        if (h >= 18 && h < 22) return 'Chào buổi tối! 🌃';
        return 'Đang cày đêm... 🌙';
    };

    // Calculate position for celestial body on orbital arc (SVG)
    const angle = ((time.rawHours - 6) / 24) * 360 * (Math.PI / 185);
    const cx = 50 + Math.cos(angle) * 35;
    const cy = 50 + Math.sin(angle) * 35;

    return (
        <div className="bg-white/40 dark:bg-zinc-900/40 border border-neutral-200/50 dark:border-zinc-800/80 rounded-3xl p-6 flex flex-col justify-between backdrop-blur-xl transition-all duration-500 hover:border-neutral-300 dark:hover:border-zinc-700/60 hover:shadow-lg dark:hover:shadow-[0_0_40px_rgba(20,184,166,0.08)] group/time relative overflow-hidden flex-grow">
            {/* Soft decorative glow background */}
            <div className={`absolute -right-16 -bottom-16 w-40 h-40 rounded-full blur-3xl transition-all duration-700 pointer-events-none ${
                isDayTime ? 'bg-amber-500/5 dark:bg-amber-500/5' : 'bg-indigo-500/5 dark:bg-indigo-500/5'
            }`} />

            {/* Header section with category icon */}
            <div className="flex items-center justify-between relative z-10">
                <div className="text-neutral-500 dark:text-zinc-400 flex items-center gap-2 text-xs font-mono font-bold tracking-wide">
                    <Clock size={14} className="text-cyan-600 dark:text-cyan-400 animate-spin-slow" />
                    <span>HANOI, VN (UTC+7)</span>
                </div>
                {isMounted && (
                    <span className={`px-2.5 py-0.5 text-[9px] font-mono font-bold tracking-wider rounded-md border ${
                        isDayTime 
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' 
                            : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border-indigo-500/20'
                    }`}>
                        {isDayTime ? 'DAY' : 'NIGHT'}
                    </span>
                )}
            </div>

            {/* Middle section: Celestial Orbital graphic & Greeting */}
            <div className="flex items-center gap-4 my-3 relative z-10">
                {/* Orbit graphic */}
                <div className="w-16 h-16 rounded-2xl bg-neutral-100/50 dark:bg-zinc-950/60 border border-neutral-200/60 dark:border-zinc-850 flex items-center justify-center relative shadow-inner overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full p-1" viewBox="0 0 100 100">
                        {/* Orbital path */}
                        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" className="text-neutral-200 dark:text-zinc-800" strokeWidth="1" strokeDasharray="3,3" />
                        
                        {/* Sun or Moon orbiting */}
                        {isMounted && (
                            <g transform={`translate(${cx}, ${cy})`}>
                                <circle r="7" fill={isDayTime ? '#fbbf24' : '#a5b4fc'} className="animate-pulse" />
                                <circle r="12" fill={isDayTime ? 'rgba(251,191,36,0.15)' : 'rgba(165,180,252,0.15)'} className="animate-ping" style={{ animationDuration: '3s' }} />
                            </g>
                        )}
                    </svg>
                    
                    {/* Centered current icon */}
                    {isMounted && (
                        <div className="relative z-10 text-neutral-600 dark:text-zinc-300">
                            {isDayTime ? (
                                <Sun size={18} className="text-amber-500 dark:text-amber-400 animate-pulse" />
                            ) : (
                                <Moon size={18} className="text-indigo-600 dark:text-indigo-300 -rotate-12" />
                            )}
                        </div>
                    )}
                </div>

                {/* Greetings and Date details */}
                <div className="flex flex-col">
                    <span className="text-neutral-700 dark:text-zinc-300 text-xs font-mono font-black">{isMounted ? getGreeting() : 'Chào bạn!'}</span>
                    <span className="text-neutral-400 dark:text-zinc-500 text-[11px] font-sans mt-0.5 font-bold">{isMounted ? dateString : 'Đang tải...'}</span>
                </div>
            </div>

            {/* Time display */}
            <div className="relative z-10 pt-2 border-t border-neutral-200/40 dark:border-zinc-800/40">
                <div className="text-3xl font-mono font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 dark:from-cyan-400 dark:via-teal-400 dark:to-emerald-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.1)] flex items-baseline">
                    <span>{time.hours}</span>
                    <span className="animate-pulse px-0.5 text-cyan-600/80 dark:text-cyan-400/80 font-sans" style={{ animationDuration: '1s' }}>:</span>
                    <span>{time.minutes}</span>
                    <span className="animate-pulse px-0.5 text-cyan-600/80 dark:text-cyan-400/80 font-sans" style={{ animationDuration: '1s' }}>:</span>
                    <span className="text-xl text-emerald-600/80 dark:text-emerald-400/80 font-medium ml-1">{time.seconds}</span>
                </div>
            </div>
        </div>
    );
}