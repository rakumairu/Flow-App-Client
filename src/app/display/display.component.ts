import { Component, OnInit } from '@angular/core';
import { DataServicesService } from '../data-services.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  private title = 'Display Data'
  public fullLog
  private eventLog
  private isHidden = true
  public isDisabled = true
  private viewReady = false

  constructor(private dataService: DataServicesService, private titleServie: Title) {
    this.titleServie.setTitle('Display Data')
  }
  
  ngOnInit() {
    // TODO: add progress bar
    this.dataService.display().subscribe((data: any) => {
      data = JSON.parse(data)
      if (data.status == 'success') {
        this.fullLog = data.data
        if (this.fullLog.final) {
          this.isDisabled = false
        }
      } else {
        console.log(data)
      }
    })
  }

  raw() {
    // TODO: add progress bar in between changing displaying raw and final file
    this.viewReady = true
    this.eventLog = this.fullLog.raw
    this.isHidden = false
  }

  final() {
    // TODO: add progress bar in between changing displaying raw and final file
    this.viewReady = true
    this.isHidden = true
    this.eventLog = this.fullLog.final
    this.isHidden = false
  }

}
