import { useEffect, useState } from "react";

const useGame = () => {
  const [isX, setIsX] = useState(true);
  const [size, setSize] = useState(3);
  const [board, setBoard] = useState();

  const initialize = (size) => {
    setBoard(new Array(size * size).fill(null));
    setIsX(true)
  };

  useEffect(() => {
    initialize(size > 3 ? size : 3);
  }, [size]);

  const handleClick = (index) => {
    if (validateWin(board) || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = isX ? "X" : "O";
    setBoard(newBoard);
    setIsX(!isX);
  };

  const generateWinningCombo = (size) => {
    const winningCombo = [];

    //rows
    for (let i = 0; i < size; i++) {
      const rows = [];
      for (let j = 0; j < size; j++) {
        rows.push(i * size + j);
      }
      winningCombo.push(rows);
    }

    // columns
    for (let i = 0; i < size; i++) {
      const columns = [];
      for (let j = 0; j < size; j++) {
        columns.push(j * size + i);
      }
      winningCombo.push(columns);
    }

    //diagonals
    const diagonals1 = [],
      diagonals2 = [];
    for (let i = 0; i < size; i++) {
      diagonals1.push(i * size + i);
      diagonals2.push(i * size + (size - i - 1));
    }
    winningCombo.push([...diagonals1], [...diagonals2]);
    return winningCombo;
  };

  const winningCombo = generateWinningCombo(size);

  const validateWin = (board) => {
    for (let i = 0; i < winningCombo.length; i++) {
      const combo = winningCombo[i];
      const first = board[combo[0]];
      if (first && combo.every((index) => board[index] === first)) return first;
    }
    return null;
  };

  const handleMessage = () => {
    let winStatus = board && validateWin(board);
    if (winStatus) {
      return `Player ${winStatus} wins`;
    }
    if (board?.every((el) => el !== null)) return "Draw!";
    const player = isX ? "X" : "O";
    return `Player ${player} turn`;
  };

  const reset = () => {
    setBoard(new Array(size * size).fill(null));
    setIsX(true);
  };

  return { board, isX, handleClick, handleMessage, reset, setSize, size };
};

export default useGame;
