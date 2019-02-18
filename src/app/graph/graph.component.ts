import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  private activeTab
  private value = 10

  constructor(private router: Router, private route: ActivatedRoute, private titleService: Title) {
    this.titleService.setTitle('Display Graph')
  }

  ngOnInit() {
    this.value = 100
  }

  controlFlow() {
    this.value = 50
    this.activeTab = 0
    this.router.navigate(['controlflow'], {relativeTo: this.route})
    this.value = 100
  }

  dottedChart() {
    this.value = 50
    this.activeTab = 1
    this.router.navigate(['dottedchart'], {relativeTo: this.route})
    this.value = 100
  }

}
