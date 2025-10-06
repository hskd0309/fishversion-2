import { Home, Camera, Map, History, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface BottomNavigationProps {
  className?: string;
}

export const BottomNavigation = ({ className }: BottomNavigationProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { id: 'feed', path: '/', icon: Home, label: 'Feed' },
    { id: 'analyze', path: '/analyze', icon: Camera, label: 'Analyze' },
    { id: 'map', path: '/map', icon: Map, label: 'Map' },
    { id: 'history', path: '/history', icon: History, label: 'History' },
    { id: 'profile', path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 z-50",
      "bg-card/95 backdrop-blur-md border-t border-border",
      "pb-[var(--safe-area-inset-bottom)] px-2 pt-2",
      className
    )}>
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map(({ id, path, icon: Icon, label }) => {
          const isActive = currentPath === path;
          
          return (
            <Link
              key={id}
              to={path}
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200",
                "min-w-[60px] touch-manipulation active:scale-95",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
              aria-label={label}
            >
              <Icon 
                size={24} 
                className={cn(
                  "transition-all duration-200",
                  isActive && "drop-shadow-[0_0_8px_hsl(var(--primary)_/_0.5)]"
                )} 
              />
              <span className={cn(
                "text-xs font-medium transition-all",
                isActive ? "text-primary font-semibold" : "text-muted-foreground"
              )}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};