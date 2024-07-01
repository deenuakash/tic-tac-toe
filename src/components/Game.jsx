import useGame from "../hooks/useGame";

const Game = ({ size }) => {
  const { board, handleClick, handleMessage, reset } = useGame(size);

  return (
    <>
      <div className="message">
        {handleMessage()}
        <button className="reset" onClick={() => reset()}>Reset game</button>
      </div>
      <div className="board">
        {board?.map((cell, i) => (
          <button
            className="cell"
            key={i}
            onClick={() => handleClick(i)}
            disabled={cell !== null}
          >
            {cell}
          </button>
        ))}
      </div>
    </>
  );
};

export default Game;
