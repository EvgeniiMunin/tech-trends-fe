import { Component, OnInit } from '@angular/core';

import { Entry } from '../entry';
import { MONTHS } from '../utils/months';
import { getRandomColor } from '../utils/randomColor';
import parseDate from '../utils/parseDate'

import { QueryService } from '../query.service';

@Component({
  selector: 'app-chartcontrol',
  templateUrl: './chartcontrol.component.html',
  styleUrls: ['./chartcontrol.component.css']
})
export class ChartcontrolComponent implements OnInit {
  entries: Entry[] = [];
  tags: string[] = ['solid','plasma','SSTO','liquid'];
  company_name: string = '';

  from_date: any = { _d: new Date('2016-12-01')};
  to_date: any = {_d : new Date('2017-12-31')};

data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: "My First dataset",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45],
            },
                {
                label: "My Second dataset",
                backgroundColor: 'rgb(30, 99, 132)',
                borderColor: 'rgb(70, 99, 132)',
                data: [10, 8, 6, 4, 8, 2, 3],
                }
            ]
        };


  constructor(public queryService: QueryService) { }

  ngOnInit() {
    this.getAll();
  }

/**
 * X-AXIS
 **/
  getLabels(): string[] {
    let start = parseDate(this.from_date._d.toISOString());
    let end = parseDate(this.to_date._d.toISOString());

    let labels: string[] = [];

    // first year
    if (start.month != 12) {
      let lastmonth = 12;
      if (start.year == end.year) {lastmonth=end.month;}
      for (let i=start.month; i<lastmonth; i++) {
        labels.push(MONTHS[i]+' '+ start.year);
      }
    }

    // middle years
    if (start.year < end.year-1) {
      for (let y=start.year+1; y<end.year; y++) {
        for (let i=0; i<12; i++) {
          labels.push(MONTHS[i]+' '+ y);
        }
      }
    }

    // last year
    if (start.year != end.year) {
      for (let i=0; i<end.month; i++) {
        labels.push(MONTHS[i]+' '+ end.year);
      }
    }

    return labels;
  }

/**
 * GET EVERYTHING
 **/
  getAll(): void {
    let response = this.queryService.getAll(this.company_name)
        .subscribe(entries => {
            this.entries = entries;
            this.preProcessByTag(this.tags);
        });

  }


/**
* Y-AXIS
**/
  preProcessByTag(tags): void {

    this.data.labels = this.getLabels();

    this.data.datasets = [];
    for (const index in tags) {
      this.data.datasets.push({
        label: tags[index],
        backgroundColor: getRandomColor(tags.length, index),
        borderColor: 'rgb(60,60,60)',
        data: this.accumByTag(tags[index]),
      })
    }
  }

  accumByTag(tag): number[] {
    let Ydata: number[] = [];

    let start = parseDate(this.from_date._d.toISOString());
    let end = parseDate(this.to_date._d.toISOString());

    // first year
    if (start.month != 12) {
      let lastmonth = 12;
      if (start.year == end.year) {lastmonth=end.month;}
      for (let i=start.month; i<lastmonth; i++) {
        let accum = 0;
        for (let j=0; j<this.entries.length; j++) {
          if (this.entries[j].tag && this.entries[j].tag.includes(tag)) {

              let artDate = parseDate(this.entries[j].date);
              if (artDate.month == i+1 && artDate.year == start.year) {accum++;}
          }
        }
        Ydata.push(accum);
      }
    }

    // middle years
    if (start.year < end.year-1) {
      for (let y=start.year+1; y<end.year; y++) {
        for (let i=0; i<12; i++) {
          let accum = 0;
          for (let j=0; j<this.entries.length; j++) {
            if (this.entries[j].tag && this.entries[j].tag.includes(tag)) {

              let artDate = parseDate(this.entries[j].date);
              if (artDate.month == i+1 && artDate.year == y) {accum++;}
            }
          }
          Ydata.push(accum);
        }
      }
    }

    // last year
    if (start.year != end.year) {
      for (let i=0; i<end.month; i++) {
        let accum = 0;
        for (let j=0; j<this.entries.length; j++) {
          if (this.entries[j].tag && this.entries[j].tag.includes(tag)) {

            let artDate = parseDate(this.entries[j].date);
            if (artDate.month == i+1 && artDate.year == end.year) {accum++;}
          }
        }
        Ydata.push(accum);
      }
    }

    return Ydata;
  }

/**
 * AUTO UPDATE
 **/
  timesUpdated = 0;
  printDates(): void {
    this.preProcessByTag(this.tags);    
    this.timesUpdated++;
  }
}

