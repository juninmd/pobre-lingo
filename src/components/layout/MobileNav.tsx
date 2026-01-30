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
      className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-background/80 backdrop-blur-xl border-t border-border/50 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <nav className="flex justify-around items-center h-16 px-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 touch-manipulation select-none py-1",
                isActive
                  ? "text-primary font-bold -translate-y-1"
                  : "text-muted-foreground/70 hover:text-primary active:scale-90"
              )}
            >
              {isActive && (
                <div className="absolute -top-1 w-10 h-1 rounded-b-full bg-primary animate-in fade-in zoom-in duration-300 shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
              )}

              <div className={cn(
                "relative flex items-center justify-center p-1 rounded-full transition-all duration-300",
                isActive ? "bg-primary/10" : "bg-transparent"
              )}>
                 <item.icon className={cn(
                   "h-6 w-6 transition-transform duration-300",
                   isActive && "scale-110 fill-primary/20 drop-shadow-sm animate-bounce-short"
                 )} />
              </div>

              <span className={cn(
                "text-[10px] font-bold uppercase tracking-wider transition-opacity duration-300",
                isActive ? "opacity-100" : "opacity-80"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
