'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Clock, MapPin, ArrowUp, Sun, Moon, Send } from 'lucide-react';
import { useLanyard } from '../../hooks/useLanyard';
import { useLenis } from 'lenis/react';
import Image from 'next/image';

const DISCORD_USER_ID = '885340096272941127';

export default function Footer() {
  const lanyard = useLanyard(DISCORD_USER_ID);
  const lenis = useLenis();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial dark mode
    setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useLenis((e) => {
    if (e.scroll > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  });

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    }
  };

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
  };

  const statusColors = {
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-500',
  };

  const statusLabels = {
    online: 'Online',
    idle: 'Idle',
    dnd: 'Do Not Disturb',
    offline: 'Offline',
  };

  // Resolve Activity
  let activity = null;
  if (lanyard?.activities) {
    activity = lanyard.activities.find((a: any) => a.type === 0 || a.type === 2);
  }

  let activityImgUrl = '';
  if (activity?.assets?.large_image) {
    const imgId = activity.assets.large_image;
    if (imgId.startsWith('mp:external')) {
      activityImgUrl = `https://media.discordapp.net/external/${imgId.replace('mp:external/', '')}`;
    } else {
      activityImgUrl = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${imgId}.png`;
    }
  }

  return (
    <footer className="relative bg-white/40 dark:bg-black/40 backdrop-blur-2xl border-t border-black/10 dark:border-white/10 px-8 py-20 overflow-hidden transition-colors duration-500">
      {/* Background Glow */}
      <div className="absolute -top-[150px] left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[radial-gradient(circle,rgba(96,165,250,0.08)_0%,transparent_70%)] blur-[50px] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">

        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
              Zhnaw
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
              Lập trình viên đam mê phát triển game với GameMaker, tự động hóa với Python và tối ưu hóa phần cứng PC. Luôn tìm kiếm và học hỏi những công nghệ mới.
            </p>
          </div>

          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-4 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all transform hover:translate-x-1">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-blue-500">
                <Mail size={18} />
              </div>
              <a href="mailto:contact@example.com">contact@example.com</a>
            </li>
            <li className="flex items-center gap-4 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all transform hover:translate-x-1">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-blue-500">
                <Clock size={18} />
              </div>
              <span>UTC +7 (Asia/Ho_Chi_Minh)</span>
            </li>
            <li className="flex items-center gap-4 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all transform hover:translate-x-1">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-blue-500">
                <MapPin size={18} />
              </div>
              <span>Việt Trì, Phú Thọ, Việt Nam</span>
            </li>
          </ul>

          <div className="flex gap-4 mt-2">
            <a
              href="https://github.com/TrnHatNamX"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-800 dark:text-white border border-black/10 dark:border-white/10 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30"
            >
              <i className="devicon-github-original text-xl" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-800 dark:text-white border border-black/10 dark:border-white/10 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30"
            >
              <Send size={20} />
            </a>
          </div>
        </div>

        {/* Right Column (Discord Widget) */}
        <div className="flex justify-start md:justify-end">
          <div className="w-full max-w-[380px] h-fit bg-white/70 dark:bg-[#16181d]/60 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl p-6 shadow-xl dark:shadow-2xl flex flex-col gap-5 transition-transform hover:-translate-y-1 hover:shadow-2xl">

            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  src={
                    lanyard?.discord_user?.avatar
                      ? `https://cdn.discordapp.com/avatars/${lanyard.discord_user.id}/${lanyard.discord_user.avatar}.${lanyard.discord_user.avatar.startsWith('a_') ? 'gif' : 'png'
                      }?size=128`
                      : 'https://via.placeholder.com/64/1e2128/ffffff?text=DS'
                  }
                  alt="Discord Avatar"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-[#16181d] shadow-md"
                />
                <div
                  className={`absolute bottom-0 right-0 w-[18px] h-[18px] rounded-full border-[3px] border-white dark:border-[#16181d] ${lanyard ? statusColors[lanyard.discord_status] || 'bg-gray-500' : 'bg-gray-500'
                    }`}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[1.15rem] text-black dark:text-white">
                  {lanyard?.discord_user?.global_name || lanyard?.discord_user?.username || 'Connecting...'}
                </span>
                <span className="text-[0.85rem] font-medium text-gray-500 dark:text-gray-400 capitalize">
                  {lanyard ? statusLabels[lanyard.discord_status] || 'Offline' : 'Đang tải trạng thái'}
                </span>
              </div>
            </div>

            {activity && (
              <div className="bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl p-4 flex items-center gap-4 animate-fadeIn">
                <Image
                  src={activityImgUrl || 'https://via.placeholder.com/56/1e2128/ffffff?text=App'}
                  alt="Activity"
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-xl object-cover bg-gray-200 dark:bg-black/50"
                />
                <div className="flex flex-col overflow-hidden min-w-0">
                  <span className="font-semibold text-[0.95rem] text-black dark:text-white truncate">
                    {activity.name}
                  </span>
                  {activity.details && (
                    <span className="text-[0.8rem] text-gray-500 dark:text-gray-400 truncate">
                      {activity.details}
                    </span>
                  )}
                  {activity.state && (
                    <span className="text-[0.8rem] text-gray-500 dark:text-gray-400 truncate">
                      {activity.state}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10 text-center relative z-10">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          &copy; 2026 - Present. All rights reserved.
        </p>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        <button
          onClick={toggleTheme}
          className="w-[52px] h-[52px] rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10 flex items-center justify-center text-black dark:text-white shadow-lg hover:scale-110 hover:-translate-y-1 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun size={22} /> : <Moon size={22} />}
        </button>
        <button
          onClick={scrollToTop}
          className={`w-[52px] h-[52px] rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10 flex items-center justify-center text-black dark:text-white shadow-lg hover:scale-110 hover:-translate-y-1 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all ${showScrollTop ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'
            }`}
          aria-label="Scroll to Top"
        >
          <ArrowUp size={22} />
        </button>
      </div>
    </footer>
  );
}
