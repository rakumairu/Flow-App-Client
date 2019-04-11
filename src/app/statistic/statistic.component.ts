import { Component, OnInit } from '@angular/core';
import { DataServicesService } from '../data-services.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  
  private value = 0
  private totalCase
  private totalEvent
  private jenisEvent
  private eventOccurance
  private startEvent
  private endEvent
  private startOccurance
  private endOccurance
  private displayedColumns = ['event','absolute','relative']
  private columnsToDisplay = this.displayedColumns.slice()
  
  constructor(private dataService: DataServicesService, private titleService: Title, private router: Router, private snackbar: MatSnackBar) {
    this.titleService.setTitle('Data Statistic')
  }

  ngOnInit() {
    this.value = 25
    this.dataService.getStatisticSummary().subscribe((data:any) => {
      this.value = 50
      data = JSON.parse(data)
      this.value = 75
      if (data.status == 'success') {
        this.totalCase = data.data.total_case
        this.totalEvent = data.data.total_event
        this.jenisEvent = data.data.jenis_event
        this.eventOccurance = data.data.event_occurance
      } else if (data.message == 'Data is not finished') {
        this.router.navigate(['preprocess'])
      }
      this.snackbar.open(data.message, '', {
        duration: 3000
      })
      this.value = 100
    })

    this.dataService.getStatisticStart().subscribe((data:any) => {
      this.value = 50
      data = JSON.parse(data)
      this.value = 75
      if (data.status == 'success') {
        this.startEvent = data.data.start_event
        this.startOccurance = data.data.start_occurance
      } else if (data.message == 'Data is not finished') {
        this.router.navigate(['preprocess'])
      }
      this.snackbar.open(data.message, '', {
        duration: 3000
      })
      this.value = 100
    })

    this.dataService.getStatisticEnd().subscribe((data:any) => {
      this.value = 50
      data = JSON.parse(data)
      this.value = 75
      if (data.status == 'success') {
        this.endEvent = data.data.end_event
        this.endOccurance = data.data.end_occurance
      } else if (data.message == 'Data is not finished') {
        this.router.navigate(['preprocess'])
      }
      this.snackbar.open(data.message, '', {
        duration: 3000
      })
      this.value = 100
    })
  }

}
