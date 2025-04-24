import  './TicTocApp.css'
import { useState } from 'react'



function Square({value, onSquareClick}) {
    // const [value, setValue] = useState(null)
    // return (<button className="square" onClick={()=> { setValue("X")}}>{value}</button>)
    return (<button className="square" onClick={onSquareClick} >{value}</button>)
}

function Board({isXNext, onPlay, squares})
{
    // const [square, SetSquare] = useState(Array(9).fill(null))
    // const [turnOf, setTurnOf] = useState("X")

    function handleSquareClick(index){
      if (squares[index] || calculateWinner(squares))
        {
          return;
        }
        const nextSquares = squares.slice() 
        nextSquares[index] =  isXNext ? "X" : "O"  
        onPlay(nextSquares)
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " +  (isXNext ? "X" : "O");
    }

    return(
        <>
            <div className="status">{status}</div>

        <div className="board-row">
        <Square value={squares[0]} onSquareClick={()=> handleSquareClick(0)}/>
        <Square value={squares[1]} onSquareClick={()=> handleSquareClick(1)}/>
        <Square value={squares[2]} onSquareClick={()=> handleSquareClick(2)}/>        
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={()=> handleSquareClick(3)}/>        
        <Square value={squares[4]} onSquareClick={()=> handleSquareClick(4)}/>        
        <Square value={squares[5]} onSquareClick={()=> handleSquareClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={()=> handleSquareClick(6)}/>                        
        <Square value={squares[7]} onSquareClick={()=> handleSquareClick(7)}/>                        
        <Square value={squares[8]} onSquareClick={()=> handleSquareClick(8)}/>                              
      </div>
        </>
    )
    function calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
    }
}

export default function Game() {
  const [isXNext, setIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  
  const currentSquares = history[currentMove]
  
  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove+1), nextSquares];
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
    setIsNext(!isXNext)
  }
  
  function jumpTo(nextMove){
    setCurrentMove(nextMove)
    setIsNext(moves % 2 === 0)
  }

  const moves = history.map((squares, move)=>{
    let description = move > 0 ? `Go to Move #${move}` : "Go to game start"
    return (
      <li key={move}>
<button onClick={()=> jumpTo(move)}>{description}</button>
      </li>
    )
  })
  return (
    <div className="game">
      <div className="game-board">
        <Board isXNext={isXNext} onPlay={handlePlay} squares={currentSquares} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}