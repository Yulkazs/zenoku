'use client';

import { useTheme } from './ThemeContext';
import { Sun, Moon } from 'lucide-react';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full focus:outline-none hover:bg-[var(--zen-foreground)] hover:bg-opacity-10 transition-colors"
      style={{ color: 'var(--zen-foreground)' }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-6 w-6" />
      ) : (
        <Sun className="h-6 w-6" />
      )}
    </button>
  );
}