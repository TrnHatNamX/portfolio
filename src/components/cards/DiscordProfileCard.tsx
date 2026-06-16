'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const DISCORD_ID = "885340096272941127";

export default function DiscordProfileCard() {
  interface LanyardData {
    discord_user?: { avatar: string; id: string; username: string };
    discord_status?: string;
    activities?: Array<{ type: number; id: string; name: string; state?: string; emoji?: { id?: string; name?: string; animated?: boolean } }>;
    spotify?: { song: string; artist: string };
  }
  interface DstnData {
    user?: {
      avatar_decoration_data?: { asset: string };
      clan?: { badge: string; identity_guild_id: string; tag: string };
      primary_guild?: { badge: string; identity_guild_id: string; tag: string };
    };
    badges?: Array<{ icon: string; description: string }>;
  }

  const [lanyard, setLanyard] = useState<LanyardData | null>(null);
  const [dstn, setDstn] = useState<DstnData | null>(null);
  const [loading, setLoading] = useState(true);

  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lanRes, dstnRes] = await Promise.all([
          fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`).then(r => r.json()),
          fetch(`https://dcdn.dstn.to/profile/${DISCORD_ID}`).then(r => r.json())
        ]);
        
        if (lanRes.success) setLanyard(lanRes.data);
        if (dstnRes.user) setDstn(dstnRes);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching Discord data:", e);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (loading) return null;

  // Extracted Data
  const avatarUrl = lanyard?.discord_user?.avatar 
    ? `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${lanyard.discord_user.avatar}.${lanyard.discord_user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=128`
    : `https://cdn.discordapp.com/embed/avatars/0.png`;

  const avatarDecoration = dstn?.user?.avatar_decoration_data?.asset
    ? `https://cdn.discordapp.com/avatar-decoration-presets/${dstn.user.avatar_decoration_data.asset}.png`
    : null;

  const badges = dstn?.badges || [];
  const clan = dstn?.user?.clan || dstn?.user?.primary_guild;
  
  const customStatus = lanyard?.activities?.find((a) => a.type === 4 || a.id === "custom");
  let statusText = "Đang không làm gì cả :D";
  
  const playingActivity = lanyard?.activities?.find((a) => a.type === 0);
  if (lanyard?.spotify) {
    statusText = `Listening to ${lanyard.spotify.song}`;
  } else if (playingActivity) {
    statusText = `Playing ${playingActivity.name}`;
  }

  // Get status dot color
  const statusColors: Record<string, string> = {
    online: "bg-[#23a559]",
    idle: "bg-[#f0b232]",
    dnd: "bg-[#f23f43]",
    offline: "bg-[#80848e]"
  };
  const statusColor = statusColors[lanyard?.discord_status || 'offline'];

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className="relative z-50 w-[500px] rounded-[32px] overflow-hidden text-black dark:text-white cursor-pointer select-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] dark:shadow-[0_0_80px_rgba(255,255,255,0.15)] transition-shadow duration-500 hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.6)] dark:hover:shadow-[0_0_120px_rgba(255,255,255,0.25)]"
    >
      {/* Background with White/Dark Glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/60 dark:from-black/80 dark:to-black/50 backdrop-blur-3xl z-0 border border-black/10 dark:border-white/10" />

      {/* Solid Top Banner portion */}
      <div className="absolute top-0 left-0 w-full h-[120px] bg-black/5 dark:bg-white/5 z-0 border-b border-black/5 dark:border-white/5" />

      <div className="relative z-10 p-6 pt-10 flex flex-col gap-6" style={{ transform: "translateZ(30px)" }}>
        
        {/* Header: Avatar, Status Bubble, and Badges */}
        <div className="flex justify-between items-start">
          
          <div className="relative">
            {/* Avatar Frame Wrapper */}
            <div className="relative w-24 h-24">
              <img 
                src={avatarUrl} 
                alt="Avatar" 
                className="w-[74px] h-[74px] rounded-full object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[4px] border-white dark:border-black" 
              />
              {avatarDecoration && (
                <img 
                  src={avatarDecoration} 
                  alt="Decoration" 
                  className="absolute inset-0 w-full h-full scale-[1.2] pointer-events-none" 
                />
              )}
              {/* Status Dot */}
              <div className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-[3px] border-white dark:border-black ${statusColor}`} />
            </div>

            {/* Custom Status Bubble */}
            {customStatus && (
              <div className="absolute -bottom-1 -right-16 translate-x-4 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-lg border border-black/5 dark:border-white/5 whitespace-nowrap z-20">
                {customStatus.emoji?.id ? (
                  <img src={`https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.${customStatus.emoji.animated ? 'gif' : 'png'}`} className="w-4 h-4" alt="emoji" />
                ) : customStatus.emoji?.name ? (
                  <span className="text-sm">{customStatus.emoji.name}</span>
                ) : (
                  <span className="text-sm text-red-400 font-bold">❓</span>
                )}
                <span className="text-sm font-medium text-black dark:text-white">{customStatus.state || 'ế u ế u'}</span>
              </div>
            )}
          </div>

          {/* Badges Container */}
          <div className="flex flex-wrap items-center justify-end gap-1.5 w-[140px] mt-16 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm rounded-xl p-1.5 border border-black/5 dark:border-white/10 shadow-sm">
            {badges.map((badge, i) => (
              <img 
                key={i} 
                src={`https://cdn.discordapp.com/badge-icons/${badge.icon}.png`} 
                alt={badge.description} 
                className="w-[22px] h-[22px]" 
                title={badge.description}
              />
            ))}
          </div>

        </div>

        {/* User Info Card with New Titles */}
        <div className="mt-2 flex-grow bg-black/5 dark:bg-black/30 backdrop-blur-md rounded-2xl p-8 shadow-inner border border-black/5 dark:border-white/10 flex flex-col items-center justify-center text-center gap-4 min-h-[260px]">
          
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-wide text-black dark:text-white">{lanyard?.discord_user?.username || 'niang1_'}</h1>
            {clan && (
              <div className="flex items-center gap-1 bg-black/10 dark:bg-black/40 backdrop-blur-md rounded-md px-2 py-0.5 border border-black/5 dark:border-white/10">
                {clan.badge && (
                  <img src={`https://cdn.discordapp.com/clan-badges/${clan.identity_guild_id}/${clan.badge}.png`} alt="Clan Badge" className="w-4 h-4" />
                )}
                <span className="text-xs font-bold text-black/90 dark:text-white/90">{clan.tag}</span>
              </div>
            )}
          </div>

          {/* Added Titles */}
          <div className="flex flex-col items-center gap-0.5">
            <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Full-Stack Developer</h2>
            <h3 className="text-[11px] font-semibold text-black/60 dark:text-white/50 uppercase tracking-widest">AI & Server</h3>
          </div>

          <div className="w-full h-px bg-black/10 dark:bg-white/10 my-4" />

          <p className="text-black/70 dark:text-white/80 font-medium text-sm italic">{statusText}</p>

        </div>

      </div>
    </motion.div>
  );
}
