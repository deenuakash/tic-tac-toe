import { useState } from "react";

const useGame = (size) => {
  const [board, setBoard] = useState(new Array(size * size).fill(null));
  const [isX, setIsX] = useState(true);

  const handleClick = (index) => {
    if (validateWin(board) || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = isX ? "X" : "O";
    setBoard(newBoard);
    setIsX(!isX);
  };

  const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const validateWin = (board) => {
    for (let i = 0; i < winningCombo.length; i++) {
      const combo = winningCombo[i];
      const first = board[combo[0]]
      if(first && combo.every((index) => board[index] === first)) 
        return first
    }
    return null;
  };

  const handleMessage = () => {
    let winStatus = validateWin(board)
    if (winStatus) {
        return `Player ${winStatus} wins`
    }
    if (board.every((el) => el !== null)) return "Draw!";
    const player = isX ? "X" : "O";
    return `Player ${player} turn`;
  };

  const reset = () => {
    setBoard(new Array(size * size).fill(null));
    setIsX(true);
  };

  return { board, isX, handleClick, handleMessage, reset };
};

export default useGame;
