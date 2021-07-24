import React, { Component } from 'react'
//import {Game} from './Game' 

export default class Score extends Component {
  constructor(props) {
    super(props)
    this.state =
    {
      updated: false,
      X: 0,
      O: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  /*updateScore(winner) {
      let newScore = this.state.score
      newScore[{winner}] += 1 
      this.setState({score: newScore})
      console.log(newScore)
    }*/

  handleClick = () => {
    let winner = this.props.winner
    let restart = this.props.restart
    if (restart) {
      if (this.state.updated) {
        this.setState({ updated: false })
      }
    }
    if (winner && !(this.state.updated)) {
      if (winner === 'X') {
        this.setState({ X: this.state.X + 1 })
      }
      else {
        this.setState({ O: this.state.O + 1 })
      }
      this.setState({ updated: true })
      winner = null
    }
  }
  render() {
    return (
      <div>
        <td><button onClick={this.handleClick}>Update Score</button></td>
        <div><h4>Player 1  {this.state.X}  :  {this.state.O}  Player 2 </h4></div>
      </div>
    )
  }
}
