'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SudokuGame from '@/app/components/SudokuGame';

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);

  if (gameStarted) {
    return <SudokuGame onExit={() => setGameStarted(false)} />;
  }

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-[url('/patterns/waves.svg')] bg-no-repeat bg-cover px-4"
      style={{ backgroundColor: 'var(--zen-background)' }}
    >
      {/* Decorative bamboo or wave SVGs can be added here with absolute positioning */}

      {/* Background Japanese Waves */}
      <img
        src="/patterns/seigaiha.svg"
        alt="waves pattern"
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
      />

      {/* Left Bamboo */}
      <img
        src="/patterns/bamboo-jp.svg"
        alt="bamboo left"
        className="absolute left-0 top-0 h-full opacity-10"
      />

      {/* Right Bamboo (mirrored) */}
      <img
        src="/patterns/bamboo-jp.svg"
        alt="bamboo right"
        className="absolute right-0 top-0 h-full opacity-10 scale-x-[-1]"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl mx-auto px-4"
      >
        {/* Zenoku Logo */}
        <div className="mb-8">
          <img src="/logo/zenoku-logo.svg" alt="Zenoku Logo" className="mx-auto w-24 h-24" />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-serif font-semibold mb-4 text-[var(--zen-foreground)]">
          ZENOKU
        </h1>

        {/* Tagline */}
        <p className="text-xl mb-8 font-light text-[var(--zen-foreground)]">
          Sudoku with a touch of Zen
        </p>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setGameStarted(true)}
          className="px-8 py-3 border border-[var(--zen-foreground)] rounded-lg text-[var(--zen-foreground)] font-medium hover:bg-[var(--zen-foreground)] hover:text-[var(--zen-background)] transition-colors"
        >
          Play
        </motion.button>
      </motion.div>
    </div>
  );
}
