import React from 'react'
import { Chart } from 'react-charts'
import { useState, useEffect } from "react";
import { get } from 'axios'
 
function Plot() {
  const [dados, setDados] = useState([]);
  var dado = [];
  useEffect(() => {
    get(
      'http://localhost:3001/enem/estatisticas'
    )
      .then(res => {
        setDados(res.data.rows);
      });
  }, []);

  const updateDado = () => {
    if(dados[0] !== undefined){
      var currentValue = 750;
      var currentStudents = 0;
      for(var i in dados){
        if(dados[i][0]>=currentValue){
          currentStudents += dados[i][1];
        }
        else{
          dado.push([currentValue, currentStudents])
          currentValue -= 5;
          currentStudents = 0;
        }
      }
      dado.push([350, 0])
    }
  }

  updateDado();
  console.log(dado);
  
  var data = [
      {
        label: 'Series 1',
        data: dados[0] !== undefined ? dado : [[0, 1]]
      }
    ];
  
  console.log(data);
  
 
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )
 
  const lineChart = (
    // A react-chart hyper-responsively and continuusly fills the available
    // space of its parent element automatically
    <div
      style={{
        width: '840px',
        height: '300px'
      }}
    >
      <Chart data={data} axes={axes} />
    </div>
  )

  return lineChart;
}

export default Plot;
