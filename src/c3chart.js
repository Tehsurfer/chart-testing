var c3 = require('c3')
var chart, test1, test2

chart = c3.generate({
    bindto: '#chart',
    data: {
        columns: [
            ['sample', 30, 200, 100, 400, 150, 250],
            ['sample2', 1300, 1200, 1100, 1400, 1500, 1250],
        ],
        axes: {
            sample2: 'y2'
        }
    },
    axis: {
        y2: {
            show: true
        }
    },
    transition: {
      duration: 0
    },
    grid: {
        x: {
            lines: [
                {value: 1, text: 'Label 50 for ys'},
            ]
        }
    }
});


var time = 0;
var updateTime = function(){


  function removeGrid(callback){
    chart.xgrids.remove();
    callback();
  }

  removeGrid(function(){
    chart.xgrids.add({value: time, text: 'Current time of model is: '+ Math.round(time*100)/100});
  });
  
  time += .005;
  if ( time >= 5) {
    time = 0;
  }
  
}

var addUpdate = function(){
  setInterval(updateTime, 200);
}

var button = document.getElementById('faster');
button.onclick = addUpdate;

