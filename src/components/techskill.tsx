// src/components/techskill.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Server } from 'lucide-react';

const webSkills = [
    {
        name: 'Python',
        color: '#3776AB',
        svg: '<svg role="img" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M14.25.18c.9 0 1.66.73 1.66 1.65v2.89h3.63c.9 0 1.65.73 1.65 1.65v2.88c0 .9-.74 1.65-1.65 1.65h-1.42c-.52 0-.9-.4-.9-.9V7.12H12.4v3.63c0 .52-.38.9-.9.9H8.62v1.43c0 .51.38.9.9.9h2.88v4.83c0 .9-.74 1.65-1.65 1.65H7.13c-.9 0-1.65-.74-1.65-1.65v-2.89H1.85c-.9 0-1.65-.74-1.65-1.65V12.4c0-.9.74-1.65 1.65-1.65h1.42c.52 0 .9.38.9.9v2.88h4.82V10.9c0-.52.38-.9.9-.9h2.63V7.37c0-.52.38-.9.9-.9h2.88V1.83c0-.9.75-1.65 1.65-1.65z"/></svg>'
    },
    {
        name: 'TypeScript',
        color: '#3178C6',
        svg: '<svg role="img" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M0 0h24v24H0V0zm22.034 18.376a2.01 2.01 0 0 0-.497-.308c-.231-.115-.505-.195-.823-.238a4.42 4.42 0 0 0-.91-.065c-.231 0-.512.023-.84.067-.322.042-.61.137-.864.28a1.64 1.64 0 0 0-.594.55c-.147.23-.22.529-.22.896 0 .341.066.619.2.832.13.21.314.382.55.518.24.134.522.242.847.323c.32.078.65.155.986.23.385.086.74.186 1.065.3.321.114.597.264.825.451a2.12 2.12 0 0 1 .573.682c.143.284.214.653.214 1.106 0 .473-.082.885-.245 1.233a2.536 2.536 0 0 1-.672.889c-.32.274-.707.478-1.162.613a5.55 5.55 0 0 1-1.519.201 5.92 5.92 0 0 1-1.655-.213 4.192 4.192 0 0 1-1.282-.591 3.23 3.23 0 0 1-.842-1.004c-.201-.42-.303-.924-.305-1.512h2.464c.01.272.067.498.17.676.105.178.252.318.443.422.19.102.417.172.68.207.264.037.556.054.877.054.341 0 .662-.023.961-.068a1.49 1.49 0 0 0 .72-.279c.175-.138.263-.356.263-.655 0-.254-.05-.461-.153-.618a1.522 1.522 0 0 0-.411-.422c-.171-.115-.38-.216-.628-.303a9.42 9.42 0 0 0-.78-.239c-.435-.1-.855-.216-1.26-.347a3.46 3.46 0 0 1-1.077-.534 2.296 2.296 0 0 1-.72-.809c-.171-.341-.256-.788-.256-1.34 0-.451.084-.853.252-1.205.168-.352.411-.647.73-.883.32-.238.71-.418 1.17-.542.46-.124.978-.186 1.554-.186.516 0 1.008.064 1.477.195a3.9 3.9 0 0 1 1.201.526c.338.229.605.534.801.916.197.382.298.834.305 1.357H22.03zM12.784 13.5h2.516v1.947h2.455V13.5h2.517v9.5H17.75v-5.467h-2.455V23h-2.516v-9.5z"/></svg>'
    },
    {
        name: 'React',
        color: '#61DAFB',
        svg: '<svg viewBox="-11.5 -10.2 23 20.4" fill="currentColor" class="w-4 h-4"><circle cx="0" cy="0" r="2.05"/><ellipse rx="11" ry="4.2" fill="none" stroke="currentColor" stroke-width="1"/><ellipse rx="11" ry="4.2" fill="none" stroke="currentColor" stroke-width="1" transform="rotate(60)"/><ellipse rx="11" ry="4.2" fill="none" stroke="currentColor" stroke-width="1" transform="rotate(120)"/></svg>'
    },
    {
        name: 'Next.js',
        color: '#8b5cf6',
        svg: '<svg viewBox="0 0 180 180" fill="currentColor" class="w-4 h-4"><circle cx="90" cy="90" r="85" fill="none" stroke="currentColor" stroke-width="8"/><path d="M145.4 163.6l-47.9-66.2v66.2H80V60h16.3l47.9 66.3V60h14.5v103.6h-13.3zM100 60H83.7v103.6H100V60z"/></svg>'
    },
    {
        name: 'Git',
        color: '#F05032',
        svg: '<svg role="img" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.186 0L8.74 2.593l3.02 3.02c.646-.22 1.395-.072 1.905.437.51.51.658 1.264.437 1.91l3.02 3.02c.646-.22 1.4-.074 1.91.437.604.604.604 1.583 0 2.186-.603.604-1.582.604-2.185 0-.51-.51-.658-1.264-.438-1.91l-3.02-3.02c-.22.22-.47.39-.75.51v6.23c.36.19.64.5.78.89.43.91.04 2.01-.87 2.44-.91.44-2.01.04-2.44-.87-.27-.56-.23-1.21.09-1.73V12.7c-.28-.12-.53-.29-.75-.51-.51-.51-.658-1.264-.438-1.91l-3.02-3.02L.452 10.93c-.602.604-.602 1.582 0 2.185l10.48 10.478c.604.603 1.582.603 2.186 0l10.428-10.43c.603-.603.603-1.582 0-2.184z"/></svg>'
    },
    {
        name: 'Docker',
        color: '#2496ED',
        svg: '<svg role="img" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M13.983 11.078h2.119c.102 0 .186-.083.186-.185V8.99c0-.102-.084-.186-.186-.186h-2.119c-.103 0-.186.084-.186.186v1.903c0 .102.083.185.186.185zM11.561 11.078h2.118c.103 0 .186-.083.186-.185V8.99c0-.102-.083-.186-.186-.186h-2.118c-.103 0-.186.084-.186.186v1.903c0 .102.083.185.186.185zm-2.422 0h2.119c.102 0 .186-.083.186-.185V8.99c0-.102-.084-.186-.186-.186H9.139c-.103 0-.186.084-.186.186v1.903c0 .102.083.185.186.185zm-2.421 0h2.119c.102 0 .186-.083.186-.185V8.99c0-.102-.084-.186-.186-.186H6.718c-.103 0-.186.084-.186.186v1.903c0 .102.083.185.186.185zm-2.42 0h2.119c.102 0 .186-.083.186-.185V8.99c0-.102-.084-.186-.186-.186H4.298c-.103 0-.186.084-.186.186v1.903c0 .102.083.185.186.185zm0-2.42h2.119c.102 0 .186-.083.186-.186V6.57c0-.103-.084-.186-.186-.186H4.298c-.103 0-.186.083-.186.186v1.902c0 .103.083.186.186.186zm2.422 0h2.119c.102 0 .186-.083.186-.186V6.57c0-.103-.084-.186-.186-.186H6.718c-.103 0-.186.083-.186.186v1.902c0 .103.083.186.186.186zm2.419 0h2.119c.103 0 .186-.083.186-.186V6.57c0-.103-.083-.186-.186-.186H9.139c-.103 0-.186.083-.186.186v1.902c0 .103.083.186.186.186zm2.422 0h2.118c.103 0 .186-.083.186-.186V6.57c0-.103-.083-.186-.186-.186h-2.118c-.103 0-.186.083-.186.186v1.902c0 .103.083.186.186.186zm-2.422-2.418h2.119c.102 0 .186-.083.186-.186V4.152c0-.103-.084-.186-.186-.186H9.139c-.103 0-.186.083-.186.186v1.902c0 .103.083.186.186.186zm-6.05 8.132h2.119c.103 0 .186-.083.186-.185V11.41c0-.103-.083-.186-.186-.186H3.088c-.103 0-.186.083-.186.186v1.902c0 .102.083.185.186.185m2.422 0h2.119c.102 0 .186-.083.186-.185V11.41c0-.103-.084-.186-.186-.186H5.51c-.103 0-.186.083-.186.186v1.902c0 .102.083.185.186.185zM23.904 9.46c-.115-.173-.39-.23-.52-.276-.482-.16-.993-.257-1.503-.3-.115-.01-.242-.022-.345-.07-.24-.114-.322-.4-.367-.643-.092-.505-.287-.987-.562-1.423-.115-.184-.287-.367-.482-.46-.253-.114-.54-.045-.804-.045h-1.252c-.103 0-.185.083-.185.185v1.902c0 .103.082.186.185.186h.63c.24 0 .424.162.516.38.16.38.333.77.517 1.147.103.218.252.4.447.528.23.149.528.16.792.172.436.023.872.08 1.3.184.126.034.333.08.413.195.126.172.046.528-.012.723-.424 1.446-1.33 2.697-2.582 3.524-.4.264-.85.47-1.32.608-.505.15-1.045.218-1.573.23-.23 0-.46-.01-.69-.022-.24-.01-.482-.034-.712-.07-.3-.045-.585-.15-.86-.275-.724-.32-1.366-.815-1.906-1.388-.344-.367-.642-.78-.895-1.217h-2.13v1.902c0 .103.083.186.186.186h.746c.218 0 .413.115.516.31.253.47.55.907.895 1.31.253.286.55.54.883.745.54.344 1.15.574 1.78.712.723.15 1.48.183 2.215.114 1.343-.115 2.652-.63 3.73-1.423 1.63-1.194 2.766-2.95 3.167-4.947.16-.803.184-1.63.046-2.445z"/></svg>'
    },
];

const gameSkills = [
    {
        name: 'GameMaker',
        color: '#E51A4C',
        svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.29 14.29L12 13.09l-3.29 3.2L7.3 14.88l3.2-3.29-3.2-3.29 1.41-1.41 3.29 3.2 3.29-3.2 1.41 1.41-3.2 3.29 3.2 3.29-1.41 1.41z"/></svg>'
    },
    {
        name: 'Lua',
        color: '#000080',
        svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="8" r="2"/><circle cx="16" cy="12" r="3" fill="currentColor"/></svg>'
    },
    {
        name: 'C#',
        color: '#178600',
        svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10zM7 9.5a2.5 2.5 0 0 1 5 0v1h1v1h-1v2h1v1h-1v1H9v-1H8v-2H7v-1h1v-2H7v-1zm2 1v2h1v-2H9z"/></svg>'
    },
    {
        name: 'Aseprite',
        color: '#FF6347',
        svg: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><rect x="3" y="3" width="6" height="6"/><rect x="9" y="9" width="6" height="6"/><rect x="15" y="15" width="6" height="6"/></svg>'
    },
];

export default function TechSkills() {
    const [cpu, setCpu] = useState(8.5);
    const [ping, setPing] = useState(24);
    const [ram, setRam] = useState(42.4);

    useEffect(() => {
        const interval = setInterval(() => {
            setCpu(parseFloat((5 + Math.random() * 8).toFixed(1)));
            setPing(Math.floor(18 + Math.random() * 12));
            setRam(parseFloat((41.5 + Math.random() * 1.5).toFixed(1)));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const doubleWeb = [...webSkills, ...webSkills, ...webSkills];
    const doubleGame = [...gameSkills, ...gameSkills, ...gameSkills];

    const maskStyle = {
        maskImage: 'linear-gradient(to right, transparent, white 15%, white 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, white 15%, white 85%, transparent)',
    };

    return (
        <div className="bg-white/40 dark:bg-zinc-900/40 border border-neutral-200/50 dark:border-zinc-800/80 rounded-3xl p-5 flex flex-col justify-between backdrop-blur-xl h-full overflow-hidden relative group md:col-span-1 md:row-span-1 hover:border-neutral-300 dark:hover:border-zinc-700/60 transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_rgba(139,92,246,0.08)]">
            {/* Header / Title */}
            <div className="flex items-center justify-between">
                <h3 className="text-neutral-500 dark:text-zinc-400 text-[10px] font-mono font-bold tracking-widest uppercase opacity-85 flex items-center gap-1.5">
                    <Server size={10} className="text-purple-500 dark:text-purple-400" />
                    CHUYÊN MÔN LÕI
                </h3>
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
            </div>

            {/* Marquee lanes container */}
            <div className="flex flex-col gap-3 my-auto overflow-hidden">
                {/* Lane 1: Web Development & Ops */}
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] text-neutral-400 dark:text-zinc-500 font-mono tracking-wider pl-1 uppercase font-bold">
                        {"// backend & systems"}
                    </span>
                    <div
                        className="relative flex w-full overflow-x-hidden border border-neutral-200/40 dark:border-zinc-800/50 py-2.5 bg-neutral-100/30 dark:bg-zinc-950/40 rounded-xl"
                        style={maskStyle}
                    >
                        <div className="animate-marquee gap-4 px-2 hover:[animation-play-state:paused]">
                            {doubleWeb.map((skill, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-700 dark:text-zinc-300 bg-white/60 dark:bg-zinc-900/85 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-zinc-850 hover:border-neutral-300 dark:hover:border-zinc-700/60 hover:text-neutral-900 dark:hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer select-none"
                                >
                                    <div
                                        className="w-4 h-4 flex items-center justify-center transition-transform duration-300"
                                        style={{ color: skill.color }}
                                        dangerouslySetInnerHTML={{ __html: skill.svg }}
                                    />
                                    <span>{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Lane 2: Game Dev & Logic */}
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] text-neutral-400 dark:text-zinc-500 font-mono tracking-wider pl-1 uppercase font-bold">
                        {"// game dev & logic"}
                    </span>
                    <div
                        className="relative flex w-full overflow-x-hidden border border-neutral-200/40 dark:border-zinc-800/50 py-2.5 bg-neutral-100/30 dark:bg-zinc-950/40 rounded-xl"
                        style={maskStyle}
                    >
                        <div
                            className="animate-marquee gap-4 px-2 hover:[animation-play-state:paused]"
                            style={{ animationDirection: 'reverse', animationDuration: '22s' }}
                        >
                            {doubleGame.map((skill, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-700 dark:text-zinc-300 bg-white/60 dark:bg-zinc-900/85 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-zinc-850 hover:border-neutral-300 dark:hover:border-zinc-700/60 hover:text-neutral-900 dark:hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer select-none"
                                >
                                    <div
                                        className="w-4 h-4 flex items-center justify-center transition-transform duration-300"
                                        style={{ color: skill.color }}
                                        dangerouslySetInnerHTML={{ __html: skill.svg }}
                                    />
                                    <span>{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Simulated Live System Telemetry Status Bar */}
            <div className="text-[9px] font-mono text-neutral-400 dark:text-zinc-500 border-t border-neutral-200/40 dark:border-zinc-800/50 pt-2.5 mt-1 flex items-center justify-between relative z-10 font-bold">
                <div className="flex items-center gap-2">
                    <Activity size={10} className="text-emerald-500 dark:text-emerald-400 animate-pulse" />
                    <span>SYS: ACTIVE</span>
                </div>
                <div className="flex gap-2.5">
                    <span>CPU: {cpu}%</span>
                    <span>MEM: {ram}%</span>
                    <span>PING: {ping}ms</span>
                </div>
            </div>
        </div>
    );
}
