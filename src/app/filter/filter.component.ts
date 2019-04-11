import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataServicesService } from '../data-services.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  
  private value
  // Start
  private startData
  private selectedStart: Array<String> = []
  private startReady = false
  // End
  private endData
  private selectedEnd: Array<String> = []
  private endReady = false
  // All
  private allData
  private selectedAll: Array<String> = []
  private allReady = false
  
  constructor(private titleService: Title, private dataService: DataServicesService, private router: Router, private snackbar: MatSnackBar) {
    this.titleService.setTitle('Filter Data')
  }
  
  ngOnInit() {
    this.value = 25
    this.dataService.getStatisticStart().subscribe((data:any) => {
      this.value = 50
      data = JSON.parse(data)
      this.value = 75
      if (data.status == 'success') {
        this.startData = data.data.start_occurance
        this.startReady = true
      } else if (data.message == 'Data is not finished') {
        this.router.navigate(['preprocess'])
      }
      this.snackbar.open(data.message, '', {
        duration: 3000
      })
      this.value = 100
    })
  }

  stepChange(event) {
    this.value = 25
    if (event.selectedIndex == 0) {
      this.startReady = false
      this.dataService.getStatisticStart().subscribe((data:any) => {
        this.value = 50
        data = JSON.parse(data)
        this.value = 75
        if (data.status == 'success') {
          this.startData = data.data.start_occurance
          this.startReady = true
        }
        this.snackbar.open(data.message, '', {
          duration: 3000
        })
        this.value = 100
      })
    } else if (event.selectedIndex == 1) {
      this.endReady = false
      this.dataService.getStatisticEnd().subscribe((data:any) => {
        this.value = 50
        data = JSON.parse(data)
        this.value = 75
        if (data.status == 'success') {
          this.endData = data.data.end_occurance
          this.endReady = true
        }
        this.snackbar.open(data.message, '', {
          duration: 3000
        })
        this.value = 100
      })
    } else if (event.selectedIndex == 2) {
      this.allReady = false
      this.dataService.getStatisticSummary().subscribe((data:any) => {
        this.value = 50
        data = JSON.parse(data)
        this.value = 75
        if (data.status == 'success') {
          this.allData = data.data.event_occurance
          this.allReady = true
        }
        this.snackbar.open(data.message, '', {
          duration: 3000
        })
        this.value = 100
      })
    }
  }
  
  // START
  sliderStart(event) {
    this.selectedStart = []
    this.startData.forEach(element => {
      if (element.relative >= event.value) {
        this.selectedStart.push(element.event)
      }
    });
  }

  submitStart() {
    this.value = 25

    let data = JSON.stringify(
      {
        'data' : {
          'start': this.selectedStart
        }
      }
    )

    this.dataService.sendFilter(data).subscribe((data: any) => {
      this.value = 50
      data = JSON.parse(data)
      this.value = 75
      if (data.status == 'success') {
        document.getElementById('startNext').click()
      }
      this.snackbar.open(data.message, '', {
        duration: 3000
      })
      this.value = 100
    })
  }

  // END
  sliderEnd(event) {
    this.selectedEnd = []
    this.endData.forEach(element => {
      if (element.relative >= event.value) {
        this.selectedEnd.push(element.event)
      }
    });
  }

  submitEnd() {
    this.value = 25

    let data = JSON.stringify(
      {
        'data' : {
          'end': this.selectedEnd
        }
      }
    )

    this.dataService.sendFilter(data).subscribe((data: any) => {
      this.value = 50
      data = JSON.parse(data)
      this.value = 75
      if (data.status == 'success') {
        document.getElementById('endNext').click()
      }
      this.snackbar.open(data.message, '', {
        duration: 3000
      })
      this.value = 100
    })
  }

  // ALL
  sliderAll(event) {
    this.selectedAll = []
    this.allData.forEach(element => {
      if (element.relative >= event.value) {
        this.selectedAll.push(element.event)
      }
    });
  }

  submitAll() {
    this.value - 25

    let data = JSON.stringify(
      {
        'data' : {
          'all': this.selectedAll
        }
      }
    )

    this.dataService.sendFilter(data).subscribe((data: any) => {
      this.value = 50
      data = JSON.parse(data)
      this.value = 75
      if (data.status == 'success') {
        this.router.navigate(['graph'])
      }
      this.snackbar.open(data.message, '', {
        duration: 3000
      })
      this.value = 100
    })
  }
  
}
