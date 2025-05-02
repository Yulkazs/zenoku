'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { animate, stagger } from 'animejs';
import { generateSudoku, checkSudoku, SudokuType } from '@/app/utils/sudokuUtils';

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
  const boardRef = useRef<HTMLDivElement>(null);
  const initialized = useRef<boolean>(false);

  // Generate a new Sudoku puzzle when difficulty changes
  useEffect(() => {
    setIsLoading(true);
    const { puzzle, solution } = generateSudoku(difficulty);
    setBoard(puzzle);
    setSolution(solution);
    setSelectedCell(null);
    setIsComplete(false);
    setIsCorrect(false);
    
    // Reset UI state
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [difficulty]);

  // Animate board appearance when it's first rendered
  useEffect(() => {
    if (boardRef.current && !initialized.current && !isLoading && board) {
      initialized.current = true;
  
      // Ensure elements are present
      const cells = document.querySelectorAll('.sudoku-cell');
      if (cells.length > 0) {
        requestAnimationFrame(() => {
          animate({
            targets: cells,
            scale: [0, 1],
            opacity: [0, 1],
            delay: stagger(10, { grid: [9, 9], from: 'center' }),
            easing: 'easeInOutQuad',
            duration: 800,
          });
        });
      }
    }
  }, [board, isLoading]);

  // Handle cell selection
  const handleCellSelect = (row: number, col: number) => {
    if (board && board[row][col].fixed) return;
    setSelectedCell([row, col]);
  };

  // Handle number input
  const handleNumberInput = (num: number) => {
    if (!selectedCell || !board) return;
    
    const [row, col] = selectedCell;
    if (board[row][col].fixed) return;
    
    const newBoard = [...board];
    newBoard[row][col] = { value: num, fixed: false };
    setBoard(newBoard);
    
    // Check if the board is complete
    const allFilled = newBoard.every(row => 
      row.every(cell => cell.value !== 0)
    );
    
    if (allFilled) {
      const isSolutionCorrect = checkSudoku(newBoard);
      setIsComplete(true);
      setIsCorrect(isSolutionCorrect);
    }
  };

  // Clear selected cell
  const clearCell = () => {
    if (!selectedCell || !board) return;
    
    const [row, col] = selectedCell;
    if (board[row][col].fixed) return;
    
    const newBoard = [...board];
    newBoard[row][col] = { value: 0, fixed: false };
    setBoard(newBoard);
    setIsComplete(false);
  };

  // Generate a new puzzle with the same difficulty
  const newPuzzle = () => {
    setIsLoading(true);
    setTimeout(() => {
      const { puzzle, solution } = generateSudoku(difficulty);
      setBoard(puzzle);
      setSolution(solution);
      setSelectedCell(null);
      setIsComplete(false);
      setIsCorrect(false);
      setIsLoading(false);
      
      // Re-animate board appearance
      initialized.current = false;
    }, 300);
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <div className="text-4xl font-bold mb-4 text-blue-600">Loading...</div>
      </div>
    );
  }

  // Render complete game state
  if (isComplete) {
    return (
      <div className="min-h-screen p-4 flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <div className={`mb-6 p-4 shadow-lg border-2 rounded-lg opacity-90 ${isCorrect ? 'bg-green-600 border-green-700' : 'bg-red-600 border-red-700'}`}>
            <h1 className="text-3xl font-bold mb-4">
                {isCorrect ? 'Puzzle Solved!' : 'Oops, Puzzle Not Solved!'}
            </h1>
            </div>

            <div className="mb-8">
            <p className="subtext text-lg mb-4">
                {isCorrect
                ? 'Congratulations! You successfully completed the puzzle.'
                : 'It looks like something went wrong. No worries, though! Click below to try a new puzzle and keep challenging yourself!'}
            </p>
            </div>
          
          <div className="flex gap-4 justify-center"> 
            <button 
              onClick={newPuzzle}
              className="px-6 py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              New Puzzle
            </button> 
            <button 
              onClick={onExit}
              className="px-6 py-2 rounded-lg font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 transition-colors dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Exit
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Render main game board
  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={onExit}
            className="px-4 py-2 rounded-lg font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 transition-colors dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            Back
          </button>
          
          <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
            Zenoku
          </h1>
          
          <div className="invisible px-4 py-2">
            {/* Spacer for alignment */}
          </div>
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg overflow-hidden">
            <button 
              onClick={() => setDifficulty('beginner')}
              className={`px-4 py-2 font-medium ${difficulty === 'beginner' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}`}
            >
              Beginner
            </button>
            <button 
              onClick={() => setDifficulty('intermediate')}
              className={`px-4 py-2 font-medium ${difficulty === 'intermediate' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}`}
            >
              Intermediate
            </button>
            <button 
              onClick={() => setDifficulty('advanced')}
              className={`px-4 py-2 font-medium ${difficulty === 'advanced' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}`}
            >
              Advanced
            </button>
          </div>
        </div>
        
        {board && (
          <div 
            ref={boardRef}
            id="container"
            className="grid grid-cols-9 gap-px bg-gray-300 dark:bg-gray-700 border-2 border-gray-500 dark:border-gray-600 rounded-lg overflow-hidden mb-6"
          >
            {board.map((row, rowIndex) => 
              row.map((cell, colIndex) => (
                <div                 
                  key={`${rowIndex}-${colIndex}`}
                  className={`sudoku-cell aspect-square flex items-center justify-center text-lg font-semibold ${
                    selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex
                      ? 'bg-blue-200 dark:bg-blue-900'
                      : 'bg-white dark:bg-gray-900'
                  } ${
                    (rowIndex % 3 === 2 && rowIndex < 8) ? 'border-b-2 border-gray-500 dark:border-gray-600' : ''
                  } ${
                    (colIndex % 3 === 2 && colIndex < 8) ? 'border-r-2 border-gray-500 dark:border-gray-600' : ''
                  } ${
                    cell.fixed 
                      ? 'text-black dark:text-white' 
                      : 'text-blue-600 dark:text-blue-400 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-950'
                  }`}
                  onClick={() => handleCellSelect(rowIndex, colIndex)}
                >
                  {cell.value !== 0 ? cell.value : ''}
                </div>
              ))
            )}
          </div>
        )}
        
        <div className="grid grid-cols-5 gap-2 mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button
              key={num}
              onClick={() => handleNumberInput(num)}
              className="py-3 text-lg font-semibold rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
              style={{ color: 'var(--foreground)' }}
              id="container"
            >
              {num}
            </button>
          ))}
          <button
            onClick={clearCell}
            className="py-3 text-lg font-semibold rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
            style={{ color: 'var(--foreground)' }}
            id="container"
          >
            Clear
          </button>
        </div>
        
        <div className="flex justify-between">
          <button 
            onClick={onExit}
            className="px-4 py-2 rounded-lg font-semibold text-white-100 bg-red-600 hover:bg-gray-300 transition-colors dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}