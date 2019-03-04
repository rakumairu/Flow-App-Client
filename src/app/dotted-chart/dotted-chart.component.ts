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
  private sort
  private eventLogDuration
  private sortDuration
  private contentFirst
  private contentSecond
  private contentReady = false

  constructor(private dataService: DataServicesService, private titleService: Title) {
    this.titleService.setTitle('Dotted Chart')
  }

  ngOnInit() {
    this.dataService.dottedChart().subscribe((data: any) => {
      data = JSON.parse(data)
      if (data.status == 'success') {
        this.eventLog = data.data.data
        this.sort = data.data.sort
        this.contentFirst = this.initContent()
        this.contentReady = true
      } else {
        console.error(data)
      }
    })

    this.dataService.dottedChartDuration().subscribe((data: any) => {
      data = JSON.parse(data)
      if (data.status == 'success') {
        this.eventLogDuration = data.data.data
        this.sortDuration = data.data.sort
        this.contentSecond = this.initContentDuration()
        this.contentReady = true
      } else {
        console.error(data)
      }
    })
  }

  changeView(event) {
    if (event.value == 'starttime') {
      this.loadChart(this.contentFirst)
    } else if (event.value == 'duration') {
      this.loadChart(this.contentSecond)
    }
  }

  initContent() {
    let content = []
    for (let row in this.eventLog) {
      let dataPoint = []
      for (let idx in this.eventLog[row].case_id) {
        let cid = this.eventLog[row].case_id[idx]
        let tstamp = new Date(this.eventLog[row].timestamp[idx])
        dataPoint.push(
          {
            x: tstamp,
            y: this.sort[cid],
            case_id: cid
          }
        )
      }
      content.push(
        {
          type: "scatter",
          toolTipContent: "<span><b>{name}</b></span><br/><b> Time:</b> {x}<br/><b> Case ID:</b></span> {case_id}",
          name: row,
          showInLegend: true,
          dataPoints: dataPoint
        }
      )
    }
    return content
  }

  initContentDuration() {
    let content = []
    for (let row in this.eventLogDuration) {
      let dataPoint = []
      for (let idx in this.eventLogDuration[row].case_id) {
        let cid = this.eventLogDuration[row].case_id[idx]
        let tstamp = new Date(1970,0,1)
        let parts = this.eventLogDuration[row].timestamp[idx].match(/(\d+)\:(\d+)\:(\d+)/)
        tstamp.setHours(parseInt(parts[1]))
        tstamp.setMinutes(parseInt(parts[2]))
        tstamp.setSeconds(parseInt(parts[3]))
        dataPoint.push(
          {
            x: tstamp,
            y: this.sortDuration[cid],
            case_id: cid,
            time: this.eventLogDuration[row].timestamp[idx]
          }
        )
      }
      content.push(
        {
          type: "scatter",
          toolTipContent: "<span><b>{name}</b></span><br/><b> Time:</b> {time}<br/><b> Case ID:</b></span> {case_id}",
          name: row,
          showInLegend: true,
          dataPoints: dataPoint
        }
      )
    }
    return content
  }

  loadChart(content) {
    let chart = new CanvasJS.Chart('chart', {
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
