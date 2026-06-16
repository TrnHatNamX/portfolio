import React from 'react';
import Link from 'next/link';

interface FloatingCardProps {
  title: string;
  href?: string;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function FloatingCard({
  title,
  href,
  icon,
  className = '',
  style,
}: FloatingCardProps) {
  const content = (
    <div className="flex flex-col gap-2 items-center">
      {icon && <div className="h-8 w-8 flex justify-center items-center">{icon}</div>}
      <span className="text-sm sm:text-base font-medium">{title}</span>
    </div>
  );

  const baseClasses = `flex items-center justify-center transform hover:scale-105 transition-all backdrop-blur-md bg-white/30 dark:bg-neutral-800/30 ring-1 ring-black/10 dark:ring-white/10 rounded-xl p-4 text-neutral-900 dark:text-white ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <div className={baseClasses} style={style}>
      {content}
    </div>
  );
}
