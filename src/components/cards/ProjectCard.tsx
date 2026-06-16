// src/components/ProjectCard.tsx
import { Project } from '../types';
import { ExternalLink, Gamepad2 } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, tags, category, githubUrl, demoUrl, imageOrGif } = project;

  // Border and Shadow Glow classes based on category
  const getGlowStyles = () => {
    switch (category) {
      case 'bot':
        return 'hover:shadow-[0_0_35px_rgba(16,185,129,0.08)] hover:border-emerald-500/30';
      case 'game':
        return 'hover:shadow-[0_0_35px_rgba(168,85,247,0.08)] hover:border-purple-500/30';
      case 'web':
      default:
        return 'hover:shadow-[0_0_35px_rgba(59,130,246,0.08)] hover:border-blue-500/30';
    }
  };

  // Render a custom CSS abstract mockup based on category
  const renderFallbackMockup = () => {
    switch (category) {
      case 'bot':
        // Terminal Window Mockup
        return (
          <div className="absolute inset-0 bg-zinc-950 flex flex-col p-3 font-mono text-[9px] select-none text-emerald-500/80">
            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between border-b border-zinc-900 pb-1.5 mb-2 w-full text-zinc-500">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
              </div>
              <span className="text-[8px] font-semibold text-zinc-650">terminal.sh</span>
              <span className="w-2" />
            </div>
            {/* Terminal Commands */}
            <div className="flex flex-col gap-1.5 leading-normal">
              <div>
                <span className="text-zinc-600">$</span> npm run start:bot
              </div>
              <div className="text-zinc-400">
                &gt; Loading system models... <span className="text-emerald-400 font-bold">[OK]</span>
              </div>
              <div className="text-zinc-550">
                &gt; Webhook server listening on port 8080
              </div>
              <div className="text-emerald-400 flex items-center gap-0.5">
                &gt; Awaiting tasks...<span className="w-1 h-3 bg-emerald-500 animate-pulse inline-block" />
              </div>
            </div>
          </div>
        );
      case 'game':
        // Retro Arcade Game Screen
        return (
          <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center relative overflow-hidden">
            {/* Arcade Grid lines */}
            <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,rgba(168,85,247,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.2)_1px,transparent_1px)] bg-[size:10px_10px]" />
            {/* Space Game Graphic */}
            <div className="relative flex flex-col items-center gap-1.5 z-10">
              <Gamepad2 className="w-10 h-10 text-purple-500 animate-bounce" style={{ animationDuration: '2s' }} />
              <span className="text-[9px] font-mono text-purple-300 tracking-widest font-black uppercase text-center animate-pulse">
                LEVEL 01 // PRESS START
              </span>
            </div>
            {/* Game entities */}
            <div className="absolute top-4 left-6 w-2 h-2 bg-pink-500 rounded-sm animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute bottom-4 right-8 w-1.5 h-1.5 bg-cyan-400 rounded-sm" />
          </div>
        );
      case 'web':
      default:
        // Web Browser Window Mockup
        return (
          <div className="absolute inset-0 bg-zinc-950 flex flex-col p-2.5 relative overflow-hidden">
            {/* Browser Header Bar */}
            <div className="flex items-center gap-1.5 border-b border-zinc-900 pb-2 mb-2 w-full text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-red-500/60" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
              <span className="w-2 h-2 rounded-full bg-green-500/60" />
              <div className="h-4 bg-zinc-900 border border-zinc-850 rounded px-2 text-[8px] flex items-center gap-1 w-28 text-zinc-550 overflow-hidden font-mono font-medium">
                <span className="text-blue-400 text-[6px]">https://</span>
                <span>mysite.com</span>
              </div>
            </div>
            {/* Abstract Web Page structure */}
            <div className="flex flex-col gap-2">
              <div className="h-5 bg-gradient-to-r from-blue-500/10 to-indigo-500/5 rounded border border-blue-500/20 flex items-center justify-between px-2">
                <span className="w-10 h-1.5 bg-zinc-800 rounded" />
                <span className="w-3 h-3 bg-blue-500/20 rounded" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-10 bg-zinc-900 rounded border border-zinc-850 p-1.5 flex flex-col gap-1">
                  <span className="w-full h-1 bg-zinc-800 rounded" />
                  <span className="w-4/5 h-1 bg-zinc-850 rounded" />
                </div>
                <div className="h-10 bg-zinc-900 rounded border border-zinc-850 p-1.5 flex flex-col gap-1">
                  <span className="w-full h-1 bg-zinc-800 rounded" />
                  <span className="w-2/3 h-1 bg-zinc-850 rounded" />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`group/project relative overflow-hidden bg-white/40 dark:bg-zinc-900/40 border border-neutral-200/50 dark:border-zinc-800/80 rounded-3xl p-6 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 ${getGlowStyles()}`}>
      
      {/* Visual Header (Image or Custom Mockup Graphic) */}
      <div className="relative w-full h-40 rounded-2xl overflow-hidden mb-5 bg-neutral-900/5 dark:bg-zinc-950 flex items-center justify-center border border-neutral-200 dark:border-zinc-900">
        {imageOrGif ? (
          <img 
            src={imageOrGif} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover/project:scale-105"
          />
        ) : (
          renderFallbackMockup()
        )}
        
        {/* Category Badge */}
        <span className="absolute top-3 right-3 px-3 py-1.5 text-[9px] font-mono font-bold tracking-wider rounded-full bg-white/90 dark:bg-zinc-950/90 border border-neutral-200 dark:border-zinc-850 text-neutral-700 dark:text-zinc-300 capitalize flex items-center gap-1.5 backdrop-blur-md shadow-sm">
          <span className={`w-1.5 h-1.5 rounded-full ${
            category === 'bot' ? 'bg-emerald-500 animate-pulse' : category === 'game' ? 'bg-purple-500 animate-pulse' : 'bg-blue-500 animate-pulse'
          }`} />
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className={`text-lg font-black tracking-tight text-neutral-900 dark:text-white transition-colors duration-300 ${
          category === 'bot' ? 'group-hover/project:text-emerald-600 dark:group-hover/project:text-emerald-400' : category === 'game' ? 'group-hover/project:text-purple-600 dark:group-hover/project:text-purple-400' : 'group-hover/project:text-blue-600 dark:group-hover/project:text-blue-400'
        }`}>
          {title}
        </h3>
        <p className="text-neutral-500 dark:text-zinc-400 text-sm mt-2.5 leading-relaxed flex-1 font-sans font-medium">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-5">
          {tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg bg-neutral-100 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-850 text-neutral-500 dark:text-zinc-500 group-hover/project:text-neutral-700 dark:group-hover/project:text-zinc-300 group-hover/project:border-neutral-250 dark:group-hover/project:border-zinc-800 transition-colors">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-neutral-200/50 dark:border-zinc-900/60">
        {githubUrl && (
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="px-4 py-2 bg-neutral-100 dark:bg-zinc-850 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 border border-neutral-200 dark:border-zinc-800/80 cursor-pointer text-neutral-600 dark:text-zinc-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            GitHub
          </a>
        )}
        {demoUrl && (
          <a 
            href={demoUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="group/demo px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 shadow-lg shadow-purple-600/10 hover:shadow-purple-500/30 cursor-pointer"
          >
            Demo
            <span className="transform group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform duration-300">
              <ExternalLink size={13} className="stroke-[2.5]" />
            </span>
          </a>
        )}
      </div>
    </div>
  );
}