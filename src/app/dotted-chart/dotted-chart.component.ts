import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../assets/canvasjs.min.js'
import { DataServicesService } from '../data-services.service.js';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dotted-chart',
  templateUrl: './dotted-chart.component.html',
  styleUrls: ['./dotted-chart.component.css']
})
export class DottedChartComponent implements OnInit {

  private eventLog

  constructor(private dataService: DataServicesService, private titleService: Title) {
    this.titleService.setTitle('Dotted Chart')
  }

  ngOnInit() {
    this.dataService.dottedChart().subscribe((data: any) => {
      data = JSON.parse(data)
      if (data.status == 'success') {
        this.eventLog = data.data
        this.loadChart(this.initContent())
      } else {
        console.error(data)
      }
    })
  }

  initContent() {
    let content = []
    for (let row in this.eventLog) {
      let dataPoint = []
      for (let idx in this.eventLog[row].case_id) {
        let cid = this.eventLog[row].case_id[idx]
        let tstamp = new Date(this.eventLog[row].timestamp[idx]).getTime()
        dataPoint.push(
          {
            x: tstamp,
            y: cid
          }
        )
      }
      content.push(
        {
          type: "scatter",
          toolTipContent: "<span><b>{name}</b></span><br/><b> Time:</b> {x}<br/><b> Case ID:</b></span> {y}",
          name: row,
          showInLegend: true,
          dataPoints: dataPoint
        }
      )
    }
    return content
  }

  loadChart(content) {
    let chart = new CanvasJS.Chart('chartContainer', {
      zoomEnabled: true,
      animationEnabled: true,
      axisX: {
        title:"time"
      },
      axisY:{
        title: "case id"
      },
        
      data: content
    })
    chart.render();
  }

}
