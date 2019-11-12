import React, { Component } from 'react'
import { get } from 'axios'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';

import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
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
    return (
      <div>
        <h1>Grafico exemplo</h1>
        <XYPlot
          width={300}
          height={300}>
          <HorizontalGridLines />
          <LineSeries
            data={this.state.value}/>
          <XAxis />
          <YAxis />
        </XYPlot>        
      </div>
      );
  }
}

export default App;
