import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, User, Sparkles, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const { pathname } = useLocation();

  const navItems = [
    { href: '/', label: 'Início', icon: Home },
    { href: '/curriculum', label: 'Aprender', icon: Map },
    { href: '/exercises/listening', label: 'Escuta', icon: Headphones },
    { href: '/progress', label: 'Perfil', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border pb-safe">
      <nav className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-6 w-6", isActive && "fill-current/20")} />
              <span className="text-[10px] uppercase tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
