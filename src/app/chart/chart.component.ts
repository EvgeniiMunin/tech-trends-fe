import { Component, AfterViewInit, Input, OnInit, SimpleChanges, OnChanges} from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() data: any;
  @Input() timesUpdated: number;

  ctx: any;
  canvas: any;
  myChart: any = null;
  loaded: number = 0;

  date;

  ngOnInit() {

    this.createChart();

  }

  ngAfterViewInit() {
    var self = this;
    var timer = setTimeout(function() {self.loaded=1; self.updateChart();}, 3000);
  }

  createChart() {  
      this.canvas = document.getElementById('myChart');
      this.ctx = this.canvas.getContext('2d');
      this.myChart = new Chart(this.ctx, {
        type: 'line',
        options: {
          responsive: false,
          display: false,
		  scales: {
				yAxes: [{
					stacked: true
				}]
	      }
        }
      });
    }

  updateChart() {    
    if (this.loaded) {
        this.myChart.data = this.data;
        this.myChart.update();
    } else {console.log('wait...')}
    console.log(this)
  }


  constructor() { }

  /** 
   * CHANGE CONTROL FOR DATES
   **/
  ngOnChanges(changes: SimpleChanges) {
      this.updateChart();
  }

}   


