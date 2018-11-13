var Plotly = require('plotly.js-dist');
Plotly.d3.csv("https://raw.githubusercontent.com/Tehsurfer/MPB/hoverGraph/simple_heart/models/data/openCorExport.csv", function(err, rows){

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}

  
var trace1 = {
  type: "scatter",
  name: 'Electrode 1',
  mode: "lines",
  x: unpack(rows, 'environment | time (millisecond)'),
  y: unpack(rows, '1 | V (millivolt)'),
  line: {color: '#17BECF'}
}

var trace2 = {
  type: "scatter",
  name: 'Electrode 2',
  mode: "lines",
  x: unpack(rows, 'environment | time (millisecond)'),
  y: unpack(rows, '2 | V (millivolt)'),
  line: {color: '#7F7F7F'}
}

var data = [trace1,trace2];
    
var layout = {
  title: 'Plotly test demo', 
  xaxis: {
    type: 'seconds',
    title: 'milliseconds'
  }, 
  yaxis: {
    autorange: true, 
    type: 'linear'
  },
  shapes: [{
    type: 'line',
    x0: '0',
    y0: 0,
    x1: '0',
    yref: 'paper',
    y1: 1,
    line: {
      color: 'grey',
      width: 1.5,
      dash: 'dot'
    }
  }],
};

Plotly.newPlot('myDiv', data, layout);

})

var time = 1;
var updateTime = function(){
  var update = {
    shapes: [{
    type: 'line',
    x0: time,
    y0: 0,
    x1: time,
    yref: 'paper',
    y1: 1,
    line: {
      color: 'grey',
      width: 1.5,
      dash: 'dot'
    }
  }],
  };
  time += 10;
  if ( time >= 12676){
    time = 1;
  }
  Plotly.relayout('myDiv', update);
  
}
var addUpdate = function(){
  setInterval(updateTime, 200);
}

var button = document.getElementById('faster');
button.onclick = addUpdate
