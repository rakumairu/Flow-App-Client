import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private titleService: Title) {
    this.titleService.setTitle('Display Graph')
  }

  ngOnInit() {
  }

  controlFlow() {
    this.router.navigate(['controlflow'], {relativeTo: this.route})
  }

  dottedChart() {
    this.router.navigate(['dottedchart'], {relativeTo: this.route})
  }

}
