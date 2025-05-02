'use client';

import { useTheme } from './ThemeContext';
import { Sun, Moon } from 'lucide-react';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full focus:outline-none"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-6 w-6 text-gray-800" />
      ) : (
        <Sun className="h-6 w-6 text-gray-200" />
      )}
    </button>
  );
}