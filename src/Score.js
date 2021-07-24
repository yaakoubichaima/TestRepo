import React, { Component } from 'react'

export default class Score extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <div><h4>Player 1  {this.props.scoreX}  :  {this.props.scoreO}  Player 2 </h4></div>
      </div>
    )
  }
}
