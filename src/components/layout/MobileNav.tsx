import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Gamepad2, Trophy, User, ShoppingBag, Map } from 'lucide-react';
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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-background/95 backdrop-blur-md border-t border-border pb-safe">
      <nav className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300",
                isActive
                  ? "text-primary font-bold -translate-y-1"
                  : "text-muted-foreground hover:text-foreground active:scale-95"
              )}
            >
              {isActive && (
                <div className="absolute top-0 w-12 h-1 rounded-b-full bg-primary animate-in fade-in zoom-in duration-300" />
              )}
              <item.icon className={cn("h-6 w-6 transition-transform duration-300", isActive && "scale-110 fill-current/20 drop-shadow-sm")} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
