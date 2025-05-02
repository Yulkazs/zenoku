type Cell = {
    value: number;
    fixed: boolean;
  };
  
  export type SudokuType = Cell[][];
  
  // Returns a randomly arranged array of numbers 1-9
  function shuffleArray(array: number[]): number[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  
  // Check if it's valid to place a number at a specific position
  function isValid(board: number[][], row: number, col: number, num: number): boolean {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false;
    }
  
    // Check column
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) return false;
    }
  
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRow + i][boxCol + j] === num) return false;
      }
    }
  
    return true;
  }
  
  // Solve the Sudoku board using backtracking
  function solveSudoku(board: number[][]): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          // Try placing numbers 1-9
          const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          for (const num of nums) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              
              if (solveSudoku(board)) {
                return true;
              }
              
              // If placing the number doesn't lead to a solution, backtrack
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true; // All cells filled
  }
  
  // Generate a full, solved Sudoku board
  function generateFullSudoku(): number[][] {
    // Create an empty board
    const board: number[][] = Array(9).fill(0).map(() => Array(9).fill(0));
    
    // Seed the board with a few random numbers
    const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    board[0][0] = nums[0];
    board[1][3] = nums[1];
    board[2][6] = nums[2];
    board[3][1] = nums[3];
    board[4][4] = nums[4];
    board[5][7] = nums[5];
    board[6][2] = nums[6];
    board[7][5] = nums[7];
    board[8][8] = nums[8];
    
    // Solve the board to create a full valid Sudoku
    solveSudoku(board);
    
    return board;
  }
  
  // Create a puzzle by removing numbers from a solved board
  function createPuzzleFromSolution(
    solution: number[][], 
    difficulty: 'beginner' | 'intermediate' | 'advanced'
  ): SudokuType {
    // Clone the solution
    const solvedBoard = solution.map(row => [...row]);
    
    // Determine how many cells to reveal based on difficulty
    let cellsToRemove: number;
    switch (difficulty) {
      case 'beginner':
        cellsToRemove = 35; // Reveal 46 cells (out of 81)
        break;
      case 'intermediate':
        cellsToRemove = 45; // Reveal 36 cells
        break;
      case 'advanced':
        cellsToRemove = 55; // Reveal 26 cells
        break;
    }
    
    // Create a list of all positions
    const positions: [number, number][] = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        positions.push([i, j]);
      }
    }
    
    // Shuffle the positions
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    
    // Create the puzzle by removing numbers
    const puzzle: SudokuType = solvedBoard.map(row => 
      row.map(value => ({ value, fixed: true }))
    );
    
    // Remove numbers from the puzzle
    for (let i = 0; i < cellsToRemove; i++) {
      if (i < positions.length) {
        const [row, col] = positions[i];
        puzzle[row][col] = { value: 0, fixed: false };
      }
    }
    
    return puzzle;
  }
  
  // Generate a Sudoku puzzle with solution based on difficulty
  export function generateSudoku(difficulty: 'beginner' | 'intermediate' | 'advanced'): {
    puzzle: SudokuType;
    solution: number[][];
  } {
    const solution = generateFullSudoku();
    const puzzle = createPuzzleFromSolution(solution, difficulty);
    
    return { puzzle, solution };
  }
  
  // Convert SudokuType to number[][] for validation
  function convertToNumberArray(board: SudokuType): number[][] {
    return board.map(row => row.map(cell => cell.value));
  }
  
  // Check if a Sudoku board is valid
  export function checkSudoku(board: SudokuType): boolean {
    const numBoard = convertToNumberArray(board);
    
    // Check rows
    for (let row = 0; row < 9; row++) {
      const seen = new Set<number>();
      for (let col = 0; col < 9; col++) {
        const num = numBoard[row][col];
        if (num === 0) return false;
        if (seen.has(num)) return false;
        seen.add(num);
      }
    }
    
    // Check columns
    for (let col = 0; col < 9; col++) {
      const seen = new Set<number>();
      for (let row = 0; row < 9; row++) {
        const num = numBoard[row][col];
        if (seen.has(num)) return false;
        seen.add(num);
      }
    }
    
    // Check 3x3 boxes
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        const seen = new Set<number>();
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const row = boxRow * 3 + i;
            const col = boxCol * 3 + j;
            const num = numBoard[row][col];
            if (seen.has(num)) return false;
            seen.add(num);
          }
        }
      }
    }
    
    return true;
  }