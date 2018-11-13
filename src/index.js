var Plotly = require('plotly.js-dist');

Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv", function(err, rows){

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}

  
var trace1 = {
  type: "scatter",
  mode: "lines",
  x: unpack(rows, 'Date'),
  y: unpack(rows, 'AAPL.High'),
  line: {color: '#17BECF'}
}

var trace2 = {
  type: "scatter",
  mode: "lines",
  x: unpack(rows, 'Date'),
  y: unpack(rows, 'AAPL.Low'),
  line: {color: '#7F7F7F'}
}

var data = [trace1,trace2];
  
var layout = {
  title: 'Robin\'s Plotly Demo', 
  xaxis: {
    type: 'date'
  }, 
  yaxis: {
    autorange: true, 
    type: 'linear'
  },
  shapes: [{
    type: 'line',
    x0: '2016-01-11',
    y0: 0,
    x1: '2016-01-11',
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

});

var time = 1;
var updateTime = function(){
  var update = {
    shapes: [{
    type: 'line',
    x0: '2016-0'+ time + '-11',
    y0: 0,
    x1: '2016-0'+ time + '-11',
    yref: 'paper',
    y1: 1,
    line: {
      color: 'grey',
      width: 1.5,
      dash: 'dot'
    }
  }],
  };
  time += 1;
  if ( time >= 9){
    time = 1;
  }
  Plotly.relayout('myDiv', update);
  
}
