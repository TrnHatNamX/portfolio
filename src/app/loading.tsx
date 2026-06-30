export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-neutral-900 transition-colors">
      <div className="w-full max-w-6xl flex items-center justify-between mb-24 animate-pulse">
        <div className="w-32 h-10 bg-black/10 dark:bg-white/10 rounded-lg"></div>
        <div className="w-24 h-10 bg-black/10 dark:bg-white/10 rounded-2xl"></div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-5xl">
        <div className="hidden md:flex flex-col gap-16">
          <div className="w-32 h-32 rounded-xl bg-black/10 dark:bg-white/10 animate-pulse"></div>
          <div className="w-32 h-32 rounded-xl bg-black/10 dark:bg-white/10 animate-pulse"></div>
        </div>
        
        <div className="w-full max-w-md h-[400px] rounded-[32px] bg-black/10 dark:bg-white/10 animate-pulse"></div>
        
        <div className="hidden md:flex flex-col gap-16">
          <div className="w-32 h-32 rounded-xl bg-black/10 dark:bg-white/10 animate-pulse"></div>
          <div className="w-32 h-32 rounded-xl bg-black/10 dark:bg-white/10 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
