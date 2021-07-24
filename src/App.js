import React from 'react'
import ReactDOM from 'react-dom'
import { Board } from "./Board"
import { Game } from "./Game"


export class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        player1: '',
        player2: '',
        playersSubmitted: false,
        score: [0, 0]
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      const value = event.target.value;
      this.setState({ [event.target.name]: value });
    }
  
    handleSubmit(event) {
      if (this.state.player1 != '' && this.state.player2 != '') {
        this.setState({ playersSubmitted: true });
        event.preventDefault();
      }
    }
  
    render() {
      return (
        <div>
  
          <div >
            {(this.state.playersSubmitted)
              ? <div>
                <h2> welcome {this.state.player1} and {this.state.player2}</h2>
                <Game />
              </div>
              : <div>
                <h2> Login to play </h2>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Player 1
                    <input type="text" name="player1" value={this.state.player1} onChange={this.handleChange} />
                    Player 2
                    <input type="text" name="player2" value={this.state.player2} onChange={this.handleChange} />
                  </label>
                  <input type="submit" value="Submit" />
                </form>
              </div>
            }
          </div>
        </div>
      );
    }
  
  
  }

 