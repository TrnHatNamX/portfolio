'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/layout/Navbar';
import dynamic from 'next/dynamic';
import { Mail, Heart, Copy, Check, Phone, ExternalLink, MessageCircle, Gamepad2, Video } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = dynamic(() => import('../../components/layout/Footer'));

export default function ConnectPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'contact' | 'donate'>('contact');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'donate') {
      setActiveTab('donate');
    } else {
      setActiveTab('contact');
    }
  }, [searchParams]);

  const handleCopy = (text: string, itemName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(itemName);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const GithubSVG = ({ size = 24, className = "" }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );

  const FacebookSVG = ({ size = 24, className = "" }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );

  const socials = [
    { name: 'Phone', value: '0862937543', icon: Phone, action: () => handleCopy('0862937543', 'Phone') },
    { name: 'Email', value: 'hi@zhnaw.dev', icon: Mail, action: () => handleCopy('hi@zhnaw.dev', 'Email') },
    { name: 'GitHub', value: 'TrnHatNamX', icon: GithubSVG, href: 'https://github.com/TrnHatNamX' },
    { name: 'Facebook', value: 'Nam Trần Nhật', icon: FacebookSVG, href: 'https://www.facebook.com/nam.trannhat.18294/?locale=vi_VN' },
    { name: 'TikTok', value: '@naht_n4m', icon: Video, href: 'https://www.tiktok.com/@naht_n4m' },
    { name: 'Discord', value: 'Discord', icon: MessageCircle, href: 'https://discord.gg/k7hTz93cp8' },
    { name: 'Steam', value: '_TrAvis11k', icon: Gamepad2, href: 'https://steamcommunity.com/id/_TrAvis11k/' }
  ];

  const springTransition = { type: "spring", bounce: 0.15, duration: 0.7 } as const;

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col transition-colors duration-300">
      <div className="fixed inset-0 z-0 transition-all duration-500 dark:invert pointer-events-none">
        <Image src="/background.webp" alt="Background" fill priority quality={75} className="object-cover" />
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col items-center pb-8 flex-1 justify-between">
        <Navbar />

        <main className="flex-1 w-full max-w-[95vw] sm:max-w-[90vw] mx-auto flex flex-col items-center justify-center p-4">

          <div className="w-full h-[75vh] min-h-[500px] bg-white/40 dark:bg-black/40 backdrop-blur-2xl rounded-[32px] shadow-2xl p-2 sm:p-4 flex gap-2 sm:gap-4 overflow-hidden border border-black/10 dark:border-white/10">

            {/* Contact Tab */}
            <motion.div
              layout
              transition={springTransition}
              onClick={() => setActiveTab('contact')}
              className={`relative rounded-[24px] cursor-pointer overflow-hidden flex bg-white/60 dark:bg-black/60 border border-black/5 dark:border-white/5 origin-left
                ${activeTab === 'contact' ? 'flex-[9] cursor-default' : 'flex-[1] hover:bg-white/80 dark:hover:bg-black/80 group'}
              `}
            >
              <AnimatePresence mode="popLayout">
                {activeTab === 'contact' ? (
                  <motion.div
                    key="contact-active"
                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="absolute inset-0 p-4 sm:p-8 flex flex-col items-center justify-center overflow-y-auto no-scrollbar"
                  >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6 whitespace-nowrap">Get in touch</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-3xl">
                      {socials.map((social, idx) => {
                        const Icon = social.icon;
                        const isCopied = copiedItem === social.name;
                        const isCopyable = social.action !== undefined;
                        const Card = (
                          <div className="flex items-center gap-4 p-4 bg-white/40 dark:bg-black/30 hover:bg-white/80 dark:hover:bg-black/60 border border-black/10 dark:border-white/10 rounded-2xl transition-all group cursor-pointer">
                            <div className="p-3 bg-neutral-200/50 dark:bg-neutral-800/50 text-neutral-800 dark:text-neutral-200 rounded-xl group-hover:scale-110 group-hover:bg-neutral-800 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                              {isCopied ? <Check size={20} className="text-green-500" /> : <Icon size={20} />}
                            </div>
                            <div className="flex flex-col flex-1">
                              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">{social.name}</span>
                              <span className="font-mono text-neutral-800 dark:text-neutral-200 font-bold">{social.value}</span>
                            </div>
                            {!isCopyable && <ExternalLink size={16} className="text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors" />}
                            {isCopyable && <Copy size={16} className="text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors" />}
                          </div>
                        );

                        return social.href ? (
                          <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer">
                            {Card}
                          </a>
                        ) : (
                          <div key={idx} onClick={social.action}>
                            {Card}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="contact-inactive"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    <Mail className="w-8 h-8 mb-6 text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors flex-shrink-0" />
                    <span className="text-xl font-bold tracking-widest text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                      CONTACT
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Donate Tab */}
            <motion.div
              layout
              transition={springTransition}
              onClick={() => setActiveTab('donate')}
              className={`relative rounded-[24px] cursor-pointer overflow-hidden flex bg-white/60 dark:bg-black/60 border border-black/5 dark:border-white/5 origin-right
                ${activeTab === 'donate' ? 'flex-[9] cursor-default' : 'flex-[1] hover:bg-white/80 dark:hover:bg-black/80 group'}
              `}
            >
              <AnimatePresence mode="popLayout">
                {activeTab === 'donate' ? (
                  <motion.div
                    key="donate-active"
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="absolute inset-0 p-4 sm:p-8 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
                  >
                    <div className="relative w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-neutral-800 bg-white shrink-0">
                      <Image
                        src="/mbbank.svg"
                        alt="MB Bank QR Code"
                        fill
                        sizes="(max-width: 768px) 200px, 300px"
                        unoptimized={true}
                        className="object-contain hover:scale-105 transition-transform duration-500 p-2"
                      />
                    </div>
                    <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-sm">
                      <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4 whitespace-nowrap flex items-center gap-3 text-rose-500">
                        Donate <Heart size={32} className="fill-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)] animate-pulse" />
                      </h2>
                      <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                        Cảm ơn bạn rất nhiều vì đã ủng hộ! Mọi đóng góp đều là động lực to lớn giúp mình tiếp tục phát triển.
                      </p>
                      
                      <div className="w-full bg-white/50 dark:bg-black/30 p-4 rounded-2xl border border-black/10 dark:border-white/10 flex flex-col gap-1 backdrop-blur-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-neutral-500">Ngân hàng</span>
                          <span className="font-semibold">MB Bank</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-neutral-500">Chủ tài khoản</span>
                          <span className="font-semibold">TRAN NHAT NAM</span>
                        </div>
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-black/10 dark:border-white/10">
                          <span className="text-sm text-neutral-500">Số tài khoản</span>
                          <span className="font-mono font-bold text-lg text-rose-500">992404211000</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="donate-inactive"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    <Heart className="w-8 h-8 mb-6 text-neutral-500 dark:text-neutral-400 group-hover:text-rose-500 transition-colors flex-shrink-0" />
                    <span className="text-xl font-bold tracking-widest text-neutral-500 dark:text-neutral-400 group-hover:text-rose-500 transition-colors" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                      DONATE
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
