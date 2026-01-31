import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Gamepad2, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const { pathname } = useLocation();

  const navItems = [
    { href: '/', label: 'Início', icon: Home },
    { href: '/curriculum', label: 'Módulos', icon: Compass },
    { href: '/arcade', label: 'Jogos', icon: Gamepad2 },
    { href: '/proficiency', label: 'Perfil', icon: User },
  ];

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] pointer-events-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-4 mb-4 pointer-events-auto">
        <nav className="flex justify-around items-center h-20 px-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-3xl ring-1 ring-black/5 dark:ring-white/10">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-500 touch-manipulation select-none group",
                  isActive ? "-translate-y-1" : "hover:scale-105"
                )}
              >
                {isActive && (
                  <div className="absolute -top-14">
                    <div className="w-12 h-12 rounded-full bg-primary/20 blur-xl animate-pulse" />
                  </div>
                )}

                <div className={cn(
                  "relative flex items-center justify-center p-2.5 rounded-2xl transition-all duration-500",
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/30 rotate-0"
                    : "bg-transparent text-muted-foreground group-hover:bg-muted group-hover:text-primary"
                )}>
                   <item.icon className={cn(
                     "h-6 w-6 transition-transform duration-500",
                     isActive && "scale-110"
                   )} />
                </div>

                <span className={cn(
                  "text-[10px] font-bold tracking-wide transition-all duration-300",
                  isActive ? "text-primary opacity-100 scale-105" : "text-muted-foreground opacity-70 group-hover:opacity-100"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
