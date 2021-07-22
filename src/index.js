import userEvent from '@testing-library/user-event';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import Button from 'react-bootstrap/Button';
//import '/node_modules/bootstrap/dist/css/bootstrap.css';

/*class Square extends React.Component {
    render() {
      return (
        <button 
        className="square"  
        onClick={()=> this.props.onClick()}
        //the event handler (in board render) will call this.props.onClick() 
        // the square's onClick prop was specified by the board 
        >      
           {this.props.value}               
        </button>
      );
    }
  }*/

  function Square(props) {
    return(
      <button 
      className="square" 
      onClick=  {props.onClick}>
      {props.value}
      </button>
    )
  }
  
  class Board extends React.Component {
   /* constructor(props) {
       super(props);
       this.state = {
          squares: Array(9).fill(null),
          xIsNext: true,
       };
      } */
    renderSquare(i) {
      return (
      <Square 
      value={this.props.squares[i]}
      //onClick={() => this.handleClick(i)} //set up a click event listener 
      onClick={() => this.props.onClick(i)} 
      />
      );
    }
  
    render() {
      /*const winner = 
      calculateWinner(this.state.squares);
      let status;
      if (winner){
        status = 'Winner: ' + winner;
      }
      else {
         status = 'Next player:' + 
         (this.state.xIsNext ? 'X' : 'O');
      }*/
  
      return (
        <div>
         
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor (props){
      super(props);
      this.state = {
          history: [{
            squares: Array(9).fill(null),
          }],
          stepNumber: 0,
          xIsNext: true
      }
    }

    handleClick(i){
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1]; 
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]){
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O' ;
      this.setState({
        history : history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
       });
    }

    jumpTo(step){
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
    });
  }
      
    

    render() {
      
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner =  calculateWinner(current.squares);

      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key = {move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

         let status;
         if (winner){
           status = 'Winner:' + winner 
         }
         else{
          status = 'Next Player: ' + 
          (this.state.xIsNext ? 'X' : 'O')
         }

      return (
        <div className="game">
          <div className="Login"> 
             
          </div>
          <div className="game-board">
              <Board 
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
             />
          </div> 
          <div className="game-info">
              <div>{ status }</div>
              <ol>{ moves }</ol>
          </div>
        </div>
      );
    }
  }

  class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {player1: '', player2: '', playersSubmitted: false};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      //let player1: event.target.value;
      //let player2: event.target.value;
      const value = event.target.value;
      this.setState({[event.target.name]: value});
    }
  
    handleSubmit(event) {
      //const name = this.state.name;
      //const submitted = true ;
      if (this.state.player1 != '' && this.state.player2 != '' )
       { this.setState({playersSubmitted: true});
       event.preventDefault();
        }
      }
      
    
  
    render() {
     // let submitted = false;
      return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Player 1  
            <input type="text" name="player1" value={this.state.player1} onChange={this.handleChange} />
            Player 2
            <input type="text" name="player2" value={this.state.player2} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div className="game">
        { (this.state.playersSubmitted) 
        ? <div>
          <h2> welcome {this.state.player1} and {this.state.player2}</h2>
          <Game/>
         </div>
        : <h2> Login to play </h2>
        } 
        </div>
      </div>
      );
        }
        
    
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
  

  // ========================================
  
  ReactDOM.render(
    
    <NameForm/>,
    document.getElementById('root')
  );
  