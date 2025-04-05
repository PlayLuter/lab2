

import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="w-16 h-16 text-2xl font-bold border border-gray-500 flex items-center justify-center hover:bg-gray-200 transition"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
  
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
  
    onPlay(nextSquares);
  }
  
  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);
  
  let status;
  if (winner) {
    status = "Победил: " + winner;
  } else if (isDraw) {
    status = "Ничья";
  } else {
    status = "Ходит игрок: " + (xIsNext ? "X" : "O");
  }
  
  

  return (
    <>
      <div className="text-gray-500 dark:text-gray-500 p-4">{status}</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 ">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Перейти на ход №' + move;
    } else {
      description = 'Начать игру заново';
    }
    return (
      <li key={move}>
        <button className="bg-gray-900 hover:bg-violet-600 focus:outline-1 focus:outline-offset-1 focus:outline-violet-500 active:bg-violet-700 mx-auto flex max-w-sm items-center gap-x-4 rounded-xl p-2 text-white" onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="flex flex-col items-center p-6">
      <div className="mb-4">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <ol className="space-y-2">
          {history.map((_, move) => (
            <li key={move}>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
                onClick={() => jumpTo(move)}
              >
                {move > 0 ? `Go to move #${move}` : "Go to game start"}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}



