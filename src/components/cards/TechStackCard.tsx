// src/components/TechStackCard.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Terminal, RotateCcw } from 'lucide-react';

type Tab = 'about' | 'skills' | 'contact';

export default function TechStackCard() {
    const [activeTab, setActiveTab] = useState<Tab>('about');
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentCommand, setCurrentCommand] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const consoleRef = useRef<HTMLDivElement>(null);

    const data = {
        about: {
            command: './about.sh',
            output: [
                'OS: TravisOS v1.0.4 x86_64',
                'Shell: zsh 5.8.1',
                'Uptime: 24 days, 6 hours',
                'Editor: VSCode / NeoVim',
                'Interests: Automation, Puzzle Game Mechanics, AI APIs',
                'Motto: "Simplicity is the ultimate sophistication."'
            ]
        },
        skills: {
            command: 'python skills.py',
            output: [
                'Python      ==================== [92%]',
                'TypeScript  =================    [85%]',
                'GML/GameDev ================     [80%]',
                'Lua/Scripts ==============       [75%]',
                'Docker/Ops  ============         [65%]',
                'Next.js     ===============      [78%]'
            ]
        },
        contact: {
            command: 'cat contact.json',
            output: [
                '{',
                '  "email": "abc@gmail.com",',
                '  "github": "github.com/travis",',
                '  "telegram": "t.me/travis_dev",',
                '  "discord": "travis#1337",',
                '  "location": "Hanoi, Vietnam"',
                '}'
            ]
        }
    };

    // Auto scroll terminal to bottom on line changes
    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
        }
    }, [displayedLines, currentCommand]);

    // Handle tab change / run command simulation
    const runCommand = (tab: Tab) => {
        if (isTyping) return;
        setActiveTab(tab);
        setDisplayedLines([]);
        setIsTyping(true);
        
        const fullCommand = data[tab].command;
        let charIndex = 0;
        
        // Clear and type command
        setCurrentCommand('');
        const typingInterval = setInterval(() => {
            if (charIndex < fullCommand.length) {
                setCurrentCommand(prev => prev + fullCommand[charIndex]);
                charIndex++;
            } else {
                clearInterval(typingInterval);
                // Simulation delay before executing
                setTimeout(() => {
                    setDisplayedLines(data[tab].output);
                    setIsTyping(false);
                }, 400);
            }
        }, 40);
    };

    // Initial run on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            runCommand('about');
        }, 0);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="bg-white/40 dark:bg-zinc-900/40 border border-neutral-200/50 dark:border-zinc-800/80 rounded-3xl p-5 flex flex-col justify-between backdrop-blur-xl h-full shadow-2xl hover:border-neutral-300 dark:hover:border-zinc-700/60 hover:shadow-[0_0_40px_rgba(34,197,94,0.06)] transition-all duration-500 md:col-span-3 md:row-span-1 group/terminal flex-grow">
            {/* Terminal Top Window Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200/40 dark:border-zinc-800/40 relative z-10">
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    <span className="text-[10px] font-mono font-bold text-neutral-500 dark:text-zinc-500 ml-2 tracking-wide flex items-center gap-1">
                        <Terminal size={10} className="text-emerald-600 dark:text-emerald-400" />
                        guest@travis-os: ~
                    </span>
                </div>
                {/* Reset button */}
                <button 
                    onClick={() => runCommand(activeTab)} 
                    disabled={isTyping}
                    className="p-1 rounded-md text-neutral-500 dark:text-zinc-500 hover:text-neutral-700 dark:hover:text-zinc-300 hover:bg-neutral-100 dark:hover:bg-zinc-800/40 disabled:opacity-30 transition-all cursor-pointer"
                    title="Re-run active script"
                >
                    <RotateCcw size={10} className={isTyping ? 'animate-spin' : ''} />
                </button>
            </div>

            {/* Script tabs */}
            <div className="flex gap-1.5 py-3 relative z-10">
                {(['about', 'skills', 'contact'] as Tab[]).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => runCommand(tab)}
                        disabled={isTyping}
                        className={`px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-black transition-all duration-300 flex items-center gap-1 cursor-pointer select-none border ${
                            activeTab === tab
                                ? 'bg-emerald-500/15 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                                : 'bg-neutral-100/50 dark:bg-zinc-950/20 border-neutral-200/50 dark:border-zinc-850/40 text-neutral-400 dark:text-zinc-500 hover:text-neutral-700 dark:hover:text-zinc-400 hover:border-neutral-300 dark:hover:border-zinc-800'
                        }`}
                    >
                        <span className={`w-1 h-1 rounded-full ${activeTab === tab ? 'bg-emerald-500 dark:bg-emerald-400 animate-pulse' : 'bg-neutral-300 dark:bg-zinc-650'}`} />
                        {tab === 'about' ? 'about.sh' : tab === 'skills' ? 'skills.py' : 'contact.json'}
                    </button>
                ))}
            </div>

            {/* Console Screen Output */}
            <div 
                ref={consoleRef}
                className="bg-neutral-950 border border-neutral-900 rounded-xl p-3.5 h-[105px] font-mono text-[9px] md:text-[10px] overflow-y-auto leading-relaxed text-neutral-300 dark:text-zinc-300 relative select-none scrollbar-none"
            >
                {/* Simulated scan lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] pointer-events-none z-20" />
                
                {/* Command prompt */}
                <div className="flex items-center gap-1 text-neutral-500 dark:text-zinc-500">
                    <span className="text-emerald-500 dark:text-emerald-400">guest@travis-os</span>
                    <span>:~$</span>
                    <span className="text-neutral-100 dark:text-zinc-300">{currentCommand}</span>
                    {isTyping && <span className="w-1.5 h-3 bg-emerald-500 dark:bg-emerald-400 animate-pulse inline-block" />}
                </div>

                {/* Outputs */}
                {!isTyping && displayedLines.length > 0 && (
                    <div className="mt-1.5 flex flex-col gap-0.5 animate-fadeIn">
                        {displayedLines.map((line, idx) => (
                            <div key={idx} className="whitespace-pre text-neutral-400 dark:text-zinc-455 font-medium">
                                {line}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

