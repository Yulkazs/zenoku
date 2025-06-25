'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SudokuGame from '@/app/components/SudokuGame';
import { useTheme } from '@/app/components/ThemeContext';
import { Coffee, Info, X } from 'lucide-react';

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { theme } = useTheme();

  if (gameStarted) {
    return <SudokuGame onExit={() => setGameStarted(false)} />;
  }

  return (
    <div
      className="relative mt-50 flex flex-col items-center justify-center bg-no-repeat bg-cover px-4"
      style={{ backgroundColor: 'var(--zen-background)' }}
    >
      {/* Decorative bamboo or wave SVGs can be added here with absolute positioning */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl mx-auto px-4"
      >
        {/* Zenoku Logo */}
        <div className="mb-8">
          <img 
            src={theme === 'dark' ? "/zen-dark-logo.png" : "/zen-light-logo.png"} 
            alt="Zenoku Logo" 
            className="mx-auto w-24 h-24" 
          />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-serif font-semibold mb-12 text-[var(--zen-foreground)]">
          ZENOKU
        </h1>

        {/* Tagline */}
        <p className="text-xl mb-8 font-light text-[var(--zen-foreground)]">
         Experience the calming challenge of Sudoku <Coffee className="inline-block ml-2" size={16} />
        </p>

        {/* CTA Button and Info Button Container */}
        <div className="flex flex-col items-center gap-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGameStarted(true)}
            className="px-8 py-3 border border-[var(--zen-foreground)] rounded-lg text-[var(--zen-foreground)] font-medium hover:bg-[var(--zen-foreground)] hover:text-[var(--zen-background)] transition-colors"
          >
            Play
          </motion.button>

          {/* Info Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowInfoModal(true)}
            className="flex items-center justify-center p-2 mt-20 rounded-full border border-[var(--zen-foreground)] text-[var(--zen-foreground)] hover:bg-[var(--zen-foreground)] hover:text-[var(--zen-background)] transition-colors"
            aria-label="How to play Sudoku"
          >
            <Info size={20} />
          </motion.button>
        </div>
      </motion.div>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowInfoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800 text-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-600"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif font-semibold text-white">
                  How to Play Sudoku
                </h2>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Rules Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Rules & Objective
                  </h3>
                  
                  <div className="space-y-3 text-white">
                    <p>
                      <strong>Goal:</strong> Fill the 9×9 grid so that every row, column, and 3×3 box contains the digits 1-9 exactly once.
                    </p>
                    
                    <div>
                      <strong>Three Simple Rules:</strong>
                      <ul className="mt-2 space-y-1 ml-4">
                        <li>• Each <strong>row</strong> must contain digits 1-9 (no repeats)</li>
                        <li>• Each <strong>column</strong> must contain digits 1-9 (no repeats)</li>
                        <li>• Each <strong>3×3 box</strong> must contain digits 1-9 (no repeats)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <strong>How to Play:</strong>
                      <ul className="mt-2 space-y-1 ml-4">
                        <li>• Click on an empty cell</li>
                        <li>• Enter a number from 1-9</li>
                        <li>• Use logic to determine which numbers can go where</li>
                        <li>• Start with cells that have fewer possible options</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Demo Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4 ml-15">
                  Demo
                  </h3>
                  <SudokuDemo />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Animated Sudoku Demo Component
function SudokuDemo() {
  const [demoGrid, setDemoGrid] = useState(() => {
    // Initial partially filled grid
    return [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
  });
  
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightCell, setHighlightCell] = useState({ row: -1, col: -1 });

  // Solution steps to demonstrate
  const solutionSteps = [
    { row: 0, col: 2, value: 4, reason: "Only 4 can go in this cell" },
    { row: 0, col: 3, value: 6, reason: "6 completes this row" },
    { row: 1, col: 1, value: 7, reason: "7 fits in this column" },
    { row: 2, col: 0, value: 1, reason: "1 completes this 3×3 box" },
    { row: 2, col: 3, value: 3, reason: "3 is the only option" },
    { row: 0, col: 5, value: 8, reason: "8 completes the pattern" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const nextStep = (prev + 1) % (solutionSteps.length + 1);
        
        if (nextStep === 0) {
          // Reset grid
          setDemoGrid([
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
          ]);
          setHighlightCell({ row: -1, col: -1 });
        } else {
          const step = solutionSteps[nextStep - 1];
          setDemoGrid(prev => {
            const newGrid = prev.map(row => [...row]);
            newGrid[step.row][step.col] = step.value;
            return newGrid;
          });
          setHighlightCell({ row: step.row, col: step.col });
        }
        
        return nextStep;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="grid grid-cols-9 gap-0 border-2 border-gray-400 w-72 h-72">
        {demoGrid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isHighlighted = highlightCell.row === rowIndex && highlightCell.col === colIndex;
            const isThickBorderRight = (colIndex + 1) % 3 === 0 && colIndex !== 8;
            const isThickBorderBottom = (rowIndex + 1) % 3 === 0 && rowIndex !== 8;
            
            return (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  w-8 h-8 flex items-center justify-center text-sm font-medium text-white
                  border border-gray-500
                  ${isThickBorderRight ? 'border-r-2 border-r-gray-400' : ''}
                  ${isThickBorderBottom ? 'border-b-2 border-b-gray-400' : ''}
                  ${isHighlighted ? 'bg-blue-600' : ''}
                  ${cell === 0 ? 'bg-gray-700' : 'bg-gray-600'}
                `}
                animate={isHighlighted ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {cell !== 0 && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {cell}
                  </motion.span>
                )}
              </motion.div>
            );
          })
        )}
      </div>
      
      <div className="text-center">
        <p className="text-sm text-gray-300">
          {currentStep > 0 && currentStep <= solutionSteps.length
            ? solutionSteps[currentStep - 1].reason
            : "Watch the solving demonstration"}
        </p>
      </div>
    </div>
  );
}