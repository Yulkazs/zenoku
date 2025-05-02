'use client';

import { ThemeSwitcher } from './ThemeSwitcher';

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-3 shadow-sm" style={{ backgroundColor: 'var(--background)' }}>
      <div className="font-bold" style={{ color: 'var(--foreground)' }}>Your App Name</div>
      <ThemeSwitcher />
    </nav>
  );
}