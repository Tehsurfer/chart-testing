var Plotly = require('plotly.js-dist');
var Chart = require('chart.js');

var mychart;
Plotly.d3.csv("https://raw.githubusercontent.com/Tehsurfer/MPB/hoverGraph/simple_heart/models/data/openCorExport.csv", function(err, rows){

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}
  
// Extend the chart line class  
var originalLineDraw = Chart.controllers.line.prototype.draw;
Chart.helpers.extend(Chart.controllers.line.prototype, {
  draw: function() {
    originalLineDraw.apply(this, arguments);

    var chart = this.chart;
    var ctx = chart.chart.ctx;

    var index = chart.config.data.lineAtIndex;
    if (index) {
      var xaxis = chart.scales['x-axis-0'];
      var yaxis = chart.scales['y-axis-0'];

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(xaxis.getPixelForValue(undefined, index), yaxis.top);
      ctx.strokeStyle = '#ff0000';
      ctx.lineTo(xaxis.getPixelForValue(undefined, index), yaxis.bottom);
      ctx.stroke();
      ctx.restore();
    }
  }
});

// define our chart config
var config = {
  type: 'line',
  data: {
    lineAtIndex: 1000,
    labels: unpack(rows, 'environment | time (millisecond)'),
    datasets: [{ 
        data: unpack(rows, '1 | V (millivolt)'),
        label: "ECG node 1",
        borderColor: "#3e95cd",
        fill: false
      }, { 
        data: unpack(rows, '2 | V (millivolt)'),
        label: "ECG node 2",
        borderColor: "#8e5ea2",
        fill: false
      }, { 
        data: unpack(rows, '3 | V (millivolt)'),
        label: "ECG node 3",
        borderColor: "#3cba9f",
        fill: false
      }, { 
        data: unpack(rows, '4 | V (millivolt)'),
        label: "ECG node 4",
        borderColor: "#e8c3b9",
        fill: false
      }, { 
        data: unpack(rows, '5 | V (millivolt)'),
        label: "ECG node 5",
        borderColor: "#c45850",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'ECG data from openheart expirement'
    }
  }
};


var ctx = document.getElementById("line-chart").getContext("2d");
mychart = new Chart(ctx, config);
});

var time = 0;
var updateTime = function(){
  mychart.data.lineAtIndex = time;
  mychart.update()
  time += 10;
  if ( time > 12690) {
    time = 0;
  }
}

var addUpdate = function(){
  setInterval(updateTime, 200);
}

var button = document.getElementById('faster');
button.onclick = addUpdate;