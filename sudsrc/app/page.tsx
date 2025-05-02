'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SudokuGame from '@/app/components/SudokuGame';

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);

  if (gameStarted) {
    return <SudokuGame onExit={() => setGameStarted(false)} />;
  }

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        <h1 className="text-5xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
          Zenoku
        </h1>
        <p className="subtext text-xl mb-8">Experience the calming challenge of Sudoku</p>
        
        <div className="mb-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGameStarted(true)}
            className="px-8 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Start Game
          </motion.button>
        </div>
        
        <div id="container" className="max-w-md mx-auto mb-8 p-6">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
            How to Play
          </h2>
          <ul className="text-left subtext space-y-2">
            <li>• Fill the 9×9 grid with digits 1-9</li>
            <li>• Each row must contain all digits 1-9</li>
            <li>• Each column must contain all digits 1-9</li>
            <li>• Each 3×3 box must contain all digits 1-9</li>
          </ul>
        </div>
        
        <div id="container" className="max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
            Difficulty Levels
          </h2>
          <p className="subtext mb-4">Start with Beginner and work your way up to Advanced as your skills improve!</p>
          <div className="flex justify-between">
            <div className="text-center p-2">
              <div className="font-semibold" style={{ color: 'var(--foreground)' }}>Beginner</div>
              <div className="subtext">For newcomers</div>
            </div>
            <div className="text-center p-2">
              <div className="font-semibold" style={{ color: 'var(--foreground)' }}>Intermediate</div>
              <div className="subtext">For regulars</div>
            </div>
            <div className="text-center p-2">
              <div className="font-semibold" style={{ color: 'var(--foreground)' }}>Advanced</div>
              <div className="subtext">For experts</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}