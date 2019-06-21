import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-preprocessing',
  templateUrl: './preprocessing.component.html',
  styleUrls: ['./preprocessing.component.css']
})
export class PreprocessingComponent implements OnInit {

  private activeTab
  private progressmode = 'determinate'

  constructor(private router: Router, private route: ActivatedRoute, private titleService: Title) {
    this.titleService.setTitle('Display Graph')
  }

  ngOnInit() {
  }

  generalPrepro() {
    this.activeTab = 0
    this.router.navigate(['preprocess'], {relativeTo: this.route})
  }

  alphaPrepro(){
    this.activeTab = 1
    this.router.navigate(['preprocessingalpha'], {relativeTo: this.route})
  }

}
