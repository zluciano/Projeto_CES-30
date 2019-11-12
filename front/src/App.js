import React, { Component } from 'react'
import { get } from 'axios'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      a: 1,
      value: [],
    }
  }

  componentDidMount = () => {
    get(
      'http://localhost:3001/'
    )
    .then(res => {
      this.setState({ value: res.data.values })
    })
    .catch(err => console.log(err))
  }

  render = () => {
    console.log(this.state.value.length)
    return (
      <div>
        response length
        <p>{this.state.value.length}</p>
      </div>
      );
  }
}

export default App;
