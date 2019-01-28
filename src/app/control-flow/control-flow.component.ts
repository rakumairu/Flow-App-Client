import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataServicesService } from '../data-services.service';
import { select, zoom, event } from 'd3';
import { render } from 'dagre-d3';
import { read } from 'graphlib-dot'
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-control-flow',
  templateUrl: './control-flow.component.html',
  styleUrls: ['./control-flow.component.css']
})
export class ControlFlowComponent implements OnInit {

  @ViewChild('svg') svg: ElementRef
  @ViewChild('g') g: ElementRef

  private ymin = 1
  private ymax = 5
  private eventLog
  private max
  private min
  private content

  constructor(private dataService: DataServicesService, private titleService: Title) {
    this.titleService.setTitle('Control Flow')
  }

  ngOnInit() {
    // TODO: add progress bar
    this.dataService.controlFlow().subscribe((data: any) => {
      data = JSON.parse(data)
      if (data.status == 'success') {
        this.eventLog = data.data.log
        this.max = data.data.max
        this.min = data.data.min
        this.initContent()
        this.generate()
      } else {
        console.log(data)
      }
    })
  }

  initContent() {
    this.content = `digraph {
      node [rx=5 ry=5 labelStyle="font: 300 14px 'Helvetica Neue', Helvetica"]
      edge [labelStyle="font: 300 14px 'Helvetica Neue', Helvetica"]`
    for (let task in this.eventLog) {
      let count = [0]
      for (let task2 in this.eventLog[task]) {
        let c = this.ymin + (this.ymax - this.ymin) * (this.eventLog[task][task2] - this.min) / (this.max - this.min)
        this.content += '\n' + task + ' -> ' + task2 + ' [label="' + this.eventLog[task][task2] + '" style="stroke-width: ' + c + '"]'
        count.push(count.pop() + this.eventLog[task][task2])
      }
      let c = (this.max - count[0]) / (this.max - this.min) * 255
      if (c < 130) {
        this.content += '\n' + task + ` [labelType="html" label="<div style='text-align:center;color: rgb(255,255,255)'>` + task + '<br>(' + count[0] + ')</div" style="fill: rgb(' + c + ',' + c + ',' + c + ')"]'
      } else {
        this.content += '\n' + task + ` [labelType="html" label="<div style='text-align:center;color: rgb(0,0,0)'>` + task + '<br>(' + count[0] + ')</div" style="fill: rgb(' + c + ',' + c + ',' + c + ')"]'
      }
    }
    this.content += '}'
  }

  generate() {
    let svg = select(this.svg.nativeElement)
    let inner = select(this.g.nativeElement)
    let zooms = zoom()
        .on("zoom", function() {
        inner.attr("transform", event.transform)
    })
    svg.call(zooms);

    let g
    try {
        g = read(this.content)
    } catch (e) {
        console.error(e)
        throw e
    }
    if (!g.graph().hasOwnProperty("marginx") && !g.graph().hasOwnProperty("marginy")) {
        g.graph().marginx = 20
        g.graph().marginy = 20
    }
    g.graph().transition = function(selection) {
        return selection.transition().duration(500);
    };

    g.graph().rankDir = 'LR'

    select(this.g.nativeElement).call(new render(), g)
  }

}
