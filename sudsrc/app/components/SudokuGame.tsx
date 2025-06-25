'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { generateSudoku, checkSudoku, SudokuType } from '@/app/utils/sudokuUtils';
import { Sparkles, ArrowLeft, RotateCcw, Coffee } from 'lucide-react';

type Difficulty = 'beginner' | 'intermediate' | 'advanced';

interface SudokuGameProps {
  onExit: () => void;
}

export default function SudokuGame({ onExit }: SudokuGameProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [board, setBoard] = useState<SudokuType | null>(null);
  const [solution, setSolution] = useState<number[][] | null>(null);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hintsRemaining, setHintsRemaining] = useState<number>(4);
  const boardRef = useRef<HTMLDivElement>(null);
  const initialized = useRef<boolean>(false);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    const { puzzle, solution } = generateSudoku(difficulty);
    setBoard(puzzle);
    setSolution(solution);
    setSelectedCell(null);
    setIsComplete(false);
    setIsCorrect(false);
    setHintsRemaining(4);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [difficulty]);

  const handleCellSelect = (row: number, col: number) => {
    if (board && board[row][col].fixed) return;
    setSelectedCell([row, col]);
  };

  const handleNumberInput = useCallback((num: number) => {
    if (!selectedCell || !board) return;

    const [row, col] = selectedCell;
    if (board[row][col].fixed) return;

    const newBoard = [...board];
    newBoard[row][col] = { value: num, fixed: false };
    setBoard(newBoard);

    const allFilled = newBoard.every(row =>
      row.every(cell => cell.value !== 0)
    );

    if (allFilled) {
      const isSolutionCorrect = checkSudoku(newBoard);
      setIsComplete(true);
      setIsCorrect(isSolutionCorrect);
    }
  }, [selectedCell, board]);

  const clearCell = useCallback(() => {
    if (!selectedCell || !board) return;

    const [row, col] = selectedCell;
    if (board[row][col].fixed) return;

    const newBoard = [...board];
    newBoard[row][col] = { value: 0, fixed: false };
    setBoard(newBoard);
    setIsComplete(false);
  }, [selectedCell, board]);

  const applyHint = useCallback(() => {
    if (!selectedCell || !board || !solution || hintsRemaining <= 0) return;

    const [row, col] = selectedCell;
    if (board[row][col].fixed || board[row][col].value === solution[row][col]) return;

    const newBoard = [...board];
    newBoard[row][col] = { value: solution[row][col], fixed: true };
    setBoard(newBoard);
    setHintsRemaining(prev => prev - 1);

    const allFilled = newBoard.every(row => 
      row.every(cell => cell.value !== 0)
    );

    if (allFilled) {
      const isSolutionCorrect = checkSudoku(newBoard);
      setIsComplete(true);
      setIsCorrect(isSolutionCorrect);
    }
  }, [selectedCell, board, solution, hintsRemaining]);

  const newPuzzle = () => {
    setIsLoading(true);
    setTimeout(() => {
      const { puzzle, solution } = generateSudoku(difficulty);
      setBoard(puzzle);
      setSolution(solution);
      setSelectedCell(null);
      setIsComplete(false);
      setIsCorrect(false);
      setHintsRemaining(4);
      setIsLoading(false);
      initialized.current = false;
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[1-9]$/.test(e.key)) {
        const num = parseInt(e.key, 10);
        handleNumberInput(num);
      } else if (e.key.startsWith('Numpad') && /^[1-9]$/.test(e.key.slice(-1))) {
        const num = parseInt(e.key.slice(-1), 10);
        handleNumberInput(num);
      } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        if (!selectedCell) {
          setSelectedCell([4, 4]);
          return;
        }
        const [row, col] = selectedCell;
        let newRow = row;
        let newCol = col;
  
        switch (e.key) {
          case 'ArrowUp': newRow = Math.max(0, row - 1); break;
          case 'ArrowDown': newRow = Math.min(8, row + 1); break;
          case 'ArrowLeft': newCol = Math.max(0, col - 1); break;
          case 'ArrowRight': newCol = Math.min(8, col + 1); break;
        }
  
        setSelectedCell([newRow, newCol]);
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        clearCell();
      } else if (e.key === 'h' || e.key === 'H') {
        applyHint();
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, board, handleNumberInput, clearCell, applyHint]);

  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ backgroundColor: 'var(--zen-background)' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-[var(--zen-foreground)] border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-xl font-light text-[var(--zen-foreground)]">
            Preparing your puzzle...
          </p>
        </motion.div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div 
        className="min-h-screen p-4 flex flex-col items-center justify-center"
        style={{ backgroundColor: 'var(--zen-background)' }}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center"
            >
              {isCorrect ? (
                <Coffee className="w-12 h-12 text-white" />
              ) : (
                <RotateCcw className="w-12 h-12 text-white" />
              )}
            </motion.div>
            
            <h1 className="text-3xl font-serif font-semibold mb-4 text-[var(--zen-foreground)]">
              {isCorrect ? 'Well Done!' : 'Almost There!'}
            </h1>
            
            <p className="text-lg font-light text-[var(--zen-foreground)] mb-8">
              {isCorrect
                ? 'You have found inner peace through numbers.'
                : 'The path to enlightenment continues. Try again.'}
            </p>
          </div>
        
          <div className="flex flex-col sm:flex-row gap-4 justify-center"> 
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={newPuzzle}
              className="px-6 py-3 border border-[var(--zen-foreground)] rounded-lg text-[var(--zen-foreground)] font-medium hover:bg-[var(--zen-foreground)] hover:text-[var(--zen-background)] transition-colors"
            >
              New Journey
            </motion.button> 
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExit}
              className="px-6 py-3 bg-[var(--zen-foreground)] text-[var(--zen-background)] rounded-lg font-medium hover:opacity-80 transition-opacity"
            >
              Return Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Render main game board
  return (
    <div 
      ref={gameContainerRef}
      tabIndex={0}
      className="min-h-screen p-4 outline-none"
      style={{ backgroundColor: 'var(--zen-background)' }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExit}
            className="flex items-center gap-2 px-4 py-2 border border-[var(--zen-foreground)] rounded-lg text-[var(--zen-foreground)] font-medium hover:bg-[var(--zen-foreground)] hover:text-[var(--zen-background)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </motion.button>
          
          <h1 className="text-2xl sm:text-3xl sm:ml-0 ml-8 font-serif font-semibold text-center text-[var(--zen-foreground)]">
            ZENOKU
          </h1>
          
          <div className="w-20 sm:w-24"></div> {/* Spacer for alignment */}
        </motion.div>
        
        {/* Difficulty Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex rounded-lg overflow-hidden border border-[var(--zen-foreground)]">
            {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
              <button 
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-medium transition-colors ${
                  difficulty === level 
                    ? 'bg-[var(--zen-foreground)] text-[var(--zen-background)]' 
                    : 'text-[var(--zen-foreground)] hover:bg-[var(--zen-foreground)] hover:bg-opacity-10'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Game Board */}
        {board && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div 
              ref={boardRef}
              className="grid grid-cols-9 gap-0 bg-[var(--zen-foreground)] border-2 border-[var(--zen-foreground)] rounded-lg overflow-hidden mx-auto shadow-2xl"
              style={{ 
                maxWidth: 'min(90vw, 450px)', 
                aspectRatio: '1/1',
              }}
            >
              {board.map((row, rowIndex) => 
                row.map((cell, colIndex) => (
                  <motion.div                 
                    key={`${rowIndex}-${colIndex}`}
                    whileHover={{ scale: cell.fixed ? 1 : 1.05 }}
                    whileTap={{ scale: cell.fixed ? 1 : 0.95 }}
                    className={`
                      flex items-center justify-center text-sm sm:text-base lg:text-lg font-medium cursor-pointer
                      transition-all duration-200
                      ${selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex
                        ? 'bg-gray-400 dark:bg-gray-800 shadow-inner' 
                        : 'bg-[var(--zen-background)] hover:bg-[var(--zen-foreground)] hover:bg-opacity-5'
                      }
                      ${(rowIndex % 3 === 2 && rowIndex < 8) ? 'border-b-3 border-[var(--zen-foreground)]' : 'border-b border-gray-800 dark:border-gray-600'}
                      ${(colIndex % 3 === 2 && colIndex < 8) ? 'border-r-3 border-[var(--zen-foreground)]' : 'border-r border-gray-800 dark:border-gray-600'}
                      ${cell.fixed 
                        ? 'text-[var(--zen-foreground)] font-semibold' 
                        : 'text-gray-600 dark:text-gray-400 font-normal'
                      }
                    `}
                    onClick={() => handleCellSelect(rowIndex, colIndex)}
                    style={{ aspectRatio: '1/1' }}
                  >
                    {cell.value !== 0 && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {cell.value}
                      </motion.span>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
        
        {/* Number Input Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-5 gap-2 mb-8 max-w-sm mx-auto"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <motion.button
              key={num}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNumberInput(num)}
              className="aspect-square flex items-center justify-center text-lg font-medium rounded-lg border border-[var(--zen-foreground)] text-[var(--zen-foreground)] bg-[var(--zen-background)] hover:bg-[var(--zen-foreground)] hover:text-[var(--zen-background)] transition-colors shadow-md"
            >
              {num}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearCell}
            className="aspect-square flex items-center justify-center text-sm font-medium rounded-lg border border-[var(--zen-foreground)] text-[var(--zen-foreground)] bg-[var(--zen-background)] hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors shadow-md"
          >
            Clear
          </motion.button>
        </motion.div>
        
        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={applyHint}
            disabled={hintsRemaining <= 0 || !selectedCell}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-md transition-all
              ${hintsRemaining > 0 && selectedCell
                ? 'border border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white' 
                : 'border border-gray-300 text-gray-400 cursor-not-allowed opacity-50'
              }
            `}
          >
            <Sparkles className="w-4 h-4" />
            <span>Hint ({hintsRemaining})</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={newPuzzle}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium border border-[var(--zen-foreground)] text-[var(--zen-foreground)] hover:bg-[var(--zen-foreground)] hover:text-[var(--zen-background)] transition-colors shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Puzzle</span>
          </motion.button>
        </motion.div>
        
        {/* Instructions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs sm:text-sm text-[var(--zen-foreground)] opacity-70"
        >
          <p className="mb-2">
            Use keyboard: 1-9 for numbers, arrow keys to navigate
          </p>
          <p>
            Backspace/Delete to clear, H for hint
          </p>
        </motion.div>
      </div>
    </div>
  );
}