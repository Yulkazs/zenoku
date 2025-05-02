'use client';

import { ThemeSwitcher } from './ThemeSwitcher';

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-3 dark:bg-gray-900 shadow-sm">
      <div className="font-bold text-black dark:text-white">Your App Name</div>
      <ThemeSwitcher />
    </nav>
  );
}