import React from 'react'



export class Board extends React.Component {
  /* constructor(props) {
      super(props);
      this.state = {
         squares: Array(9).fill(null),
         xIsNext: true,
      };
     } */
  renderSquare(i, isValid) {
    return (
      <div>
        <div>
          {((this.props.validSquares).indexOf(i) !== -1)
            ? isValid = true
            : isValid = false
          }
        </div>
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
          isValid={isValid}

        />
      </div>
    );
  }

  render() {
    let isValid = false
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0, isValid)}
          {this.renderSquare(1, isValid)}
          {this.renderSquare(2, isValid)}
        </div>
        <div className="board-row">
          {this.renderSquare(3, isValid)}
          {this.renderSquare(4, isValid)}
          {this.renderSquare(5, isValid)}
        </div>
        <div className="board-row">
          {this.renderSquare(6, isValid)}
          {this.renderSquare(7, isValid)}
          {this.renderSquare(8, isValid)}
        </div>

      </div>
    );
  }
}


function Square(props) {
  return (
    <div>
      <div>
        {(props.isValid == true)
          ? <button
            className="validSquare"
            onClick={props.onClick}>
            {props.value}
          </button>
          : <button
            className="square"
            onClick={props.onClick}>
            {props.value}
          </button>
        }
      </div>



    </div>
  )
}
