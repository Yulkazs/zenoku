'use client';

import { ThemeSwitcher } from './ThemeSwitcher';

export function Navbar() {
  return (
    <nav className="relative flex items-center justify-between px-4 py-6 shadow-sm" style={{ backgroundColor: 'var(--background)' }}>
      {/* Centered Title */}
      <div className="text-lg font-bold text-center" style={{ color: 'var(--foreground)' }}>
        ゼノク Zenoku
      </div>

      {/* Theme Switcher Positioned Right */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
