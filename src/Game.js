import { Board } from "./Board"
import React from 'react'
import Score from './Score'
export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      intialHistory: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      restart: false,
      validSquares: Array(3)
    }
    //let l = Array(9).fill(null)
    this.restart = this.restart.bind(this)
    //this.handleClick = this.handleClick.bind(this)
  }

  /*handleChange(winner,line){
    if (winner){
      this.setState({validSquares: line})
      console.log(this.state.validSquares)
      console.log('Im here')
    }
  
  }*/
  restart = () => {
    this.setState({
      history: this.state.intialHistory,
      stepNumber: 0,
      xIsNext: true,
      restart: true
    })
    console.log (this.state.restart)
  }
   
  calculateWinner(squares) {
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
         //this.setState({validSqaures: lines[i]}) 
        (this.state.restart === true ) 
          ? this.setState({restart: false}) 
          : console.log(this.state.restart)
          return squares[a];
      }
    }
    return null;
  }

  getValidline(squares)
  {
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
        return lines[i];
      }
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = this.calculateWinner(squares)
    let line = this.getValidline(current.squares)
    console.log(winner)
    
    if (winner){
      console.log(line)
      this.setState({validSquares: line})
      console.log(this.state.validSquares)
      
    }
    if (winner || squares[i]) {
      return;
    }

    

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }


  isFull(squares) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] == null)
        return false
    }
    return true
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    let line = Array(3).fill(null)
    const moves = history.map((step, move) => {
      const desc = move
        ? 'Go to move #' + move
        : 'Go to game start';
      return (
        <div>
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        </div>

      );
    });

    let status;
    if (winner) {
      status = 'Winner:' + winner
      line = this.getValidline(current.squares)
    }
    else {
      if (this.isFull(current.squares)) {
        status = "game ended in a draw"
      }
      else {
        status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O')
      }
    }
   
    return (
      <div >
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            validSquares = {line}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div>
          <span><button onClick={() => this.restart()}>Restart</button></span>
          <Score 
          winner={winner} 
          restart={this.state.restart}
          />
        </div>
      </div>
    );
  }
}


