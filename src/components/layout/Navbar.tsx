'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import Image from 'next/image';

// Cấu hình ID Discord của bạn ở đây.
// Mặc định sử dụng ID mẫu: 885340096272941127
const DISCORD_USER_ID = '885340096272941127';

interface LanyardResponse {
    success: boolean;
    data?: {
        discord_status: 'online' | 'idle' | 'dnd' | 'offline';
        activities: Array<{
            type: number;
            name: string;
            details?: string;
            state?: string;
        }>;
    };
}

export default function Navbar() {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [isMounted, setIsMounted] = useState(false);
    const [discordStatus, setDiscordStatus] = useState<'online' | 'idle' | 'dnd' | 'offline'>('offline');

    // Xử lý chuyển theme
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
            const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
            const initialTheme = savedTheme || 'dark';
            setTheme(initialTheme);
            document.documentElement.classList.toggle('dark', initialTheme === 'dark');
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        localStorage.setItem('theme', nextTheme);
        document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    };

    // Gọi Lanyard API lấy trạng thái Discord
    useEffect(() => {
        if (!isMounted) return;

        const fetchStatus = async () => {
            try {
                const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
                if (res.ok) {
                    const json: LanyardResponse = await res.json();
                    if (json.success && json.data) {
                        setDiscordStatus(json.data.discord_status);
                    }
                }
            } catch (err) {
                // Ignore network errors silently to prevent Next.js overlay
            }
        };

        fetchStatus();
        // Polling mỗi 30 giây để cập nhật trạng thái
        const interval = setInterval(fetchStatus, 30000);
        return () => clearInterval(interval);
    }, [isMounted]);

    // Trả về màu tương ứng với trạng thái
    const getStatusColor = () => {
        switch (discordStatus) {
            case 'online': return 'bg-emerald-500 shadow-[0_0_10px_#10b981]';
            case 'idle': return 'bg-amber-500 shadow-[0_0_10px_#f59e0b]';
            case 'dnd': return 'bg-rose-500 shadow-[0_0_10px_#f43f5e]';
            case 'offline':
            default: return 'bg-zinc-500 dark:bg-zinc-600';
        }
    };

    return (
        <nav className="w-full py-6 px-4 md:px-8 max-w-6xl mx-auto flex items-center justify-between relative z-50">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
                <Image
                    src="/logo.png"
                    alt="TrAvis Logo"
                    width={200}
                    height={96}
                    priority
                    className="h-20 sm:h-24 w-auto transition-transform sm:transform hover:-rotate-6 dark:invert-0 invert"
                />
            </div>

            {/* Menu bên phải */}
            <div className="flex items-center gap-3 bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-2xl shadow-sm">
                {/* Discord Dynamic Live Status Badge (Dot Only) */}
                {isMounted && (
                    <a
                        href={`https://discord.com/users/${DISCORD_USER_ID}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                        title="Click to view Discord Profile"
                    >
                        <span className={`w-3 h-3 rounded-full ${getStatusColor()}`} />
                    </a>
                )}

                {/* Dark/Light mode Toggle */}
                {isMounted && (
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-2xl text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300 cursor-pointer"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? (
                            <Sun size={20} className="stroke-[2.5]" />
                        ) : (
                            <Moon size={20} className="stroke-[2.5]" />
                        )}
                    </button>
                )}
            </div>
        </nav>
    );
}
