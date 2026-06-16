// src/components/ProfileCard.tsx
'use client';

import { useState, useEffect } from 'react';
import { Mail, Send, Copy, Check, Sparkles, Cpu, Terminal, Music } from 'lucide-react';

const DISCORD_USER_ID = '885340096272941127';

interface SpotifyData {
    track_id: string;
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
    timestamps: {
        start: number;
        end: number;
    };
}

interface ActivityData {
    type: number;
    name: string;
    details?: string;
    state?: string;
    assets?: {
        large_image?: string;
        large_text?: string;
    };
    timestamps?: {
        start: number;
    };
}

interface LanyardData {
    discord_status: 'online' | 'idle' | 'dnd' | 'offline';
    discord_user: {
        id: string;
        username: string;
        avatar: string | null;
        global_name?: string;
    };
    listening_to_spotify: boolean;
    spotify: SpotifyData | null;
    activities: ActivityData[];
}

interface LanyardResponse {
    success: boolean;
    data?: LanyardData;
}

export default function ProfileCard() {
    const [copied, setCopied] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [lanyard, setLanyard] = useState<LanyardData | null>(null);
    const [spotifyProgress, setSpotifyProgress] = useState(0);
    const [spotifyTimeStr, setSpotifyTimeStr] = useState('00:00 / 00:00');

    const email = 'abc@gmail.com';

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    // Mount check
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    // Fetch Lanyard API data
    useEffect(() => {
        if (!isMounted) return;

        const fetchData = async () => {
            try {
                const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
                const json: LanyardResponse = await res.json();
                if (json.success && json.data) {
                    setLanyard(json.data);
                }
            } catch (err) {
                console.error('Error fetching Lanyard data in ProfileCard:', err);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 15000); // Poll every 15s
        return () => clearInterval(interval);
    }, [isMounted]);

    // Live Spotify Time & Progress Bar Updater
    useEffect(() => {
        if (!lanyard?.listening_to_spotify || !lanyard.spotify) return;

        const updateProgress = () => {
            const { start, end } = lanyard.spotify!.timestamps;
            const now = Date.now();
            const total = end - start;
            const current = Math.max(0, Math.min(total, now - start));

            const progressPercent = (current / total) * 100;
            setSpotifyProgress(progressPercent);

            const formatTime = (ms: number) => {
                const secs = Math.floor(ms / 1000);
                const m = Math.floor(secs / 60);
                const s = secs % 60;
                return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
            };

            setSpotifyTimeStr(`${formatTime(current)} / ${formatTime(total)}`);
        };

        updateProgress();
        const timer = setInterval(updateProgress, 1000); // Tick every 1s
        return () => clearInterval(timer);
    }, [lanyard]);

    // Parse status details
    const getStatusColor = () => {
        if (!lanyard) return 'bg-zinc-500 dark:bg-zinc-600';
        switch (lanyard.discord_status) {
            case 'online': return 'bg-emerald-500 shadow-[0_0_8px_#10b981]';
            case 'idle': return 'bg-amber-500 shadow-[0_0_8px_#f59e0b]';
            case 'dnd': return 'bg-rose-500 shadow-[0_0_8px_#f43f5e]';
            case 'offline':
            default: return 'bg-zinc-500 dark:bg-zinc-600';
        }
    };

    // Fetch user Avatar URL (from Discord or fallback)
    const getAvatarUrl = () => {
        if (lanyard?.discord_user.avatar) {
            const isAnimated = lanyard.discord_user.avatar.startsWith('a_');
            return `https://cdn.discordapp.com/avatars/${DISCORD_USER_ID}/${lanyard.discord_user.avatar}.${isAnimated ? 'gif' : 'png'}?size=128`;
        }
        return null;
    };

    // Find non-Spotify, non-custom activity
    const getActiveActivity = () => {
        if (!lanyard) return null;
        // Find activity of type 0 (Game) or others, skip Spotify (listening_to_spotify takes precedence)
        return lanyard.activities.find(act => act.type !== 4 && act.name !== 'Spotify') || null;
    };

    const activeActivity = getActiveActivity();

    return (
        <div className="bg-white/40 dark:bg-zinc-900/40 border border-neutral-200/50 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between backdrop-blur-xl shadow-xl hover:shadow-[0_0_45px_rgba(168,85,247,0.08)] hover:border-purple-500/30 transition-all duration-500 md:col-span-2 md:row-span-2 group/card relative overflow-hidden">
            {/* Background glowing gradients */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/5 dark:bg-purple-600/10 rounded-full blur-3xl group-hover/card:bg-purple-500/10 dark:group-hover/card:bg-purple-600/15 transition-all duration-500 pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-cyan-500/5 dark:bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col gap-6 relative z-10">
                {/* Header Profile section */}
                <div className="flex items-center gap-5">
                    {/* Animated Avatar Wrapper */}
                    <div className="relative group/avatar cursor-pointer">
                        <div className="absolute -inset-0.5 bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-cyan-400 rounded-2xl blur opacity-60 group-hover/avatar:opacity-100 transition duration-500 animate-pulse" />
                        <div className="relative w-20 h-20 rounded-2xl bg-white dark:bg-zinc-950 flex items-center justify-center text-xl font-black text-neutral-800 dark:text-white shadow-inner overflow-hidden border border-neutral-200 dark:border-zinc-800">
                            {isMounted && getAvatarUrl() ? (
                                <img
                                    src={getAvatarUrl()!}
                                    alt="Discord Avatar"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover/avatar:scale-105"
                                />
                            ) : (
                                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-transparent bg-clip-text">
                                    TRAVIS
                                </span>
                            )}
                        </div>
                        {/* Status Pulse dot */}
                        <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 flex items-center gap-1 shadow-md">
                            <span className={`w-1.5 h-1.5 rounded-full ${isMounted ? getStatusColor() : 'bg-zinc-500 animate-pulse'}`} />
                            <span className="text-[9px] font-mono text-neutral-500 dark:text-zinc-400 font-black tracking-wider uppercase">
                                {isMounted ? lanyard?.discord_status || 'OFFLINE' : 'LOADING'}
                            </span>
                        </div>
                    </div>

                    {/* Developer Name and title */}
                    <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                            <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                                Hi, I am <span className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">{isMounted && lanyard ? lanyard.discord_user.global_name || lanyard.discord_user.username : '_TrAvis'}</span>
                            </h1>
                            <Sparkles className="w-5 h-5 text-yellow-500 dark:text-yellow-400 animate-pulse pointer-events-none" />
                        </div>
                        <p className="text-neutral-500 dark:text-zinc-500 text-xs font-mono mt-1">Full-Stack Engineer & Designer</p>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <p className="text-neutral-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed font-sans font-medium">
                        Một lập trình viên đam mê phát triển ứng dụng hệ thống, tự động hóa quy trình và thiết kế cơ chế game giải đố sáng tạo. Thích tối ưu code, xây dựng các giải pháp ổn định và tối giản.
                    </p>
                </div>

                {/* Live Activity (VS Code, Games, Spotify, etc.) */}
                {isMounted && lanyard && (lanyard.listening_to_spotify || activeActivity) ? (
                    <div className="p-4 rounded-2xl bg-neutral-100/50 dark:bg-zinc-950/40 border border-neutral-250/30 dark:border-zinc-850/50 animate-fadeIn">
                        {lanyard.listening_to_spotify && lanyard.spotify ? (
                            /* Spotify Player */
                            <div className="flex items-center gap-3.5">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-emerald-500/30 flex-shrink-0 animate-spin-slow shadow-md">
                                    <img
                                        src={lanyard.spotify.album_art_url}
                                        alt={lanyard.spotify.album}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-950 border border-zinc-850" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-[9px] font-mono font-bold tracking-widest text-emerald-500 flex items-center gap-1">
                                            <Music size={10} className="animate-bounce" />
                                            NOW PLAYING
                                        </span>
                                        <span className="text-[9px] font-mono text-neutral-400 dark:text-zinc-500">
                                            {spotifyTimeStr}
                                        </span>
                                    </div>
                                    <h4 className="text-xs font-black text-neutral-900 dark:text-white truncate mt-0.5">
                                        {lanyard.spotify.song}
                                    </h4>
                                    <p className="text-[10px] text-neutral-500 dark:text-zinc-400 truncate font-semibold mt-0.5">
                                        by {lanyard.spotify.artist}
                                    </p>
                                    {/* Spotify Progress Bar */}
                                    <div className="w-full h-1 bg-neutral-250 dark:bg-zinc-850 rounded-full mt-2 overflow-hidden">
                                        <div
                                            className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-linear"
                                            style={{ width: `${spotifyProgress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : activeActivity ? (
                            /* Other Rich Presence (VS Code, Game, etc.) */
                            <div className="flex gap-3.5">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 text-purple-500">
                                    <Terminal size={20} className="animate-pulse" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="text-[9px] font-mono font-bold tracking-widest text-purple-500 dark:text-purple-400 uppercase">
                                        LIVE ACTIVITY
                                    </span>
                                    <h4 className="text-xs font-black text-neutral-900 dark:text-white truncate mt-0.5">
                                        {activeActivity.name}
                                    </h4>
                                    {activeActivity.details && (
                                        <p className="text-[10px] text-neutral-500 dark:text-zinc-400 truncate mt-0.5 font-semibold">
                                            {activeActivity.details}
                                        </p>
                                    )}
                                    {activeActivity.state && (
                                        <p className="text-[9px] text-neutral-400 dark:text-zinc-500 truncate mt-0.5 font-mono">
                                            {activeActivity.state}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ) : null}
                    </div>
                ) : (
                    /* Default Fallback static badges */
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20 flex items-center gap-1">
                            <Cpu size={12} />
                            Systems & Automation
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20 flex items-center gap-1">
                            <Terminal size={12} />
                            Tooling & Bots
                        </span>
                    </div>
                )}
            </div>

            {/* Social Links & Clipboard Copy */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-4 border-t border-neutral-200/40 dark:border-zinc-800/40 relative z-10">
                {/* Social media links */}
                <div className="flex gap-2.5">
                    {/* GitHub link with specific color/shadow matching */}
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        title="GitHub Profile"
                        className="p-3 bg-neutral-100 dark:bg-zinc-850 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_5px_15px_rgba(255,255,255,0.2)] text-neutral-600 dark:text-zinc-300 border border-neutral-200/60 dark:border-zinc-800"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                    </a>

                    {/* Telegram link */}
                    <a
                        href="https://t.me"
                        target="_blank"
                        rel="noreferrer"
                        title="Telegram Contact"
                        className="p-3 bg-neutral-100 dark:bg-zinc-850 hover:bg-[#0088cc] hover:text-white rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_5px_15px_rgba(0,136,204,0.3)] text-neutral-600 dark:text-zinc-300 border border-neutral-200/60 dark:border-zinc-800"
                    >
                        <Send size={18} className="stroke-[2.5]" />
                    </a>

                    {/* Email mailto link */}
                    <a
                        href={`mailto:${email}`}
                        title="Send Direct Email"
                        className="p-3 bg-neutral-100 dark:bg-zinc-850 hover:bg-[#ea4335] hover:text-white rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_5px_15px_rgba(234,67,53,0.3)] text-neutral-600 dark:text-zinc-300 border border-neutral-200/60 dark:border-zinc-800"
                    >
                        <Mail size={18} className="stroke-[2.5]" />
                    </a>
                </div>

                {/* Email Clipboard Copy Button */}
                <button
                    onClick={handleCopy}
                    className="relative px-4 py-2.5 rounded-2xl text-xs font-mono font-bold transition-all duration-300 bg-neutral-100 dark:bg-zinc-900 border border-neutral-200/60 dark:border-zinc-800 hover:border-purple-500/50 hover:bg-purple-50/10 dark:hover:bg-purple-950/20 text-neutral-600 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-300 flex items-center gap-2 cursor-pointer"
                >
                    {copied ? (
                        <>
                            <Check size={14} className="text-emerald-500 dark:text-emerald-400 stroke-[2.5]" />
                            <span className="text-emerald-500 dark:text-emerald-400">ĐÃ SAO CHÉP!</span>
                        </>
                    ) : (
                        <>
                            <Copy size={14} className="stroke-[2.5]" />
                            <span>{email}</span>
                        </>
                    )}

                    {/* Tooltip confirmation */}
                    {copied && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-emerald-500 text-black text-[10px] font-bold rounded-lg shadow-lg animate-bounce pointer-events-none whitespace-nowrap">
                            Copied to clipboard!
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-500 rotate-45 -mt-1" />
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
}

