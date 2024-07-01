import useGame from "../hooks/useGame";

const Game = () => {
  const { board, handleClick, handleMessage, reset, setSize, size } = useGame();

  return (
    <div className="container" style={{ maxWidth: `calc(${size} * 100px)` }}>
      <p>{handleMessage()}</p>
      <div className="message">
        <div className="size-container">
          <label htmlFor="size">Enter Size</label>
          <input
            id="size"
            type="number"
            placeholder="Enter Size"
            onChange={(e) => setSize(e.target.value)}
            value={size}
          />
        </div>
        <button className="reset" onClick={() => reset()}>
          Reset
        </button>
      </div>
      <div
        className="board"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
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
    </div>
  );
};

export default Game;
