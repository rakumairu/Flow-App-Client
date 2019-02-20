import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataServicesService } from '../data-services.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  
  private value
  private startData
  private startReady = false
  private endData
  private endReady = false
  private allData
  private allReady = false
  
  constructor(private titleService: Title, private dataService: DataServicesService, private router: Router) {
    this.titleService.setTitle('Filter Data')
  }
  
  ngOnInit() {
    this.value = 25
    this.dataService.getFilter().subscribe((data:any) => {
      this.value = 50
      data = JSON.parse(data)
      this.value = 75
      if (data.status == 'success') {
        this.startData = data.data.start
        this.startReady = true
        this.value = 100
      }
    })
  }

  stepChange(event) {
    this.value = 25
    if (event.selectedIndex == 0) {
      this.startReady = false
      this.dataService.getFilter().subscribe((data:any) => {
        this.value = 50
        data = JSON.parse(data)
        this.value = 75
        if (data.status == 'success') {
          this.startData = data.data.start
          this.startReady = true
          this.value = 100
        }
      })
    } else if (event.selectedIndex == 1) {
      this.endReady = false
      this.dataService.getFilter().subscribe((data:any) => {
        this.value = 50
        data = JSON.parse(data)
        this.value = 75
        if (data.status == 'success') {
          this.endData = data.data.end
          this.endReady = true
          this.value = 100
        }
      })
    } else if (event.selectedIndex == 2) {
      this.allReady = false
      this.dataService.getFilter().subscribe((data:any) => {
        this.value = 50
        data = JSON.parse(data)
        this.value = 75
        if (data.status == 'success') {
          this.allData = data.data.all
          this.allReady = true
          this.value = 100
        }
      })
    }
  }

  // START
  submitStart(start: NgForm) {
    this.value = 25
    let checked = []

    for (let x in start.value) {
      if (start.value[x] == true) {
        checked.push(x)
      }
    }

    let data = JSON.stringify(
      {
        'data' : {
          'start': checked
        }
      }
    )

    this.dataService.sendFilter(data).subscribe((data: any) => {
      this.value = 50
      data = JSON.parse(data)
      this.value = 75
      if (data.status == 'success') {
        document.getElementById('startNext').click()
        this.value = 100
      }
    })
  }

  // END
  submitEnd(end: NgForm) {
    this.value = 25
    let checked = []

    for (let x in end.value) {
      if (end.value[x] == true) {
        checked.push(x)
      }
    }

    let data = JSON.stringify(
      {
        'data' : {
          'end': checked
        }
      }
    )

    this.dataService.sendFilter(data).subscribe((data: any) => {
      this.value = 50
      data = JSON.parse(data)
      this.value = 75
      if (data.status == 'success') {
        document.getElementById('endNext').click()
        this.value = 100
      }
    })
  }

  // ALL
  submitAll(all: NgForm) {
    this.value - 25
    let checked = []

    for (let x in all.value) {
      if (all.value[x] == true) {
        checked.push(x)
      }
    }

    let data = JSON.stringify(
      {
        'data' : {
          'all': checked
        }
      }
    )

    this.dataService.sendFilter(data).subscribe((data: any) => {
      this.value = 50
      data = JSON.parse(data)
      this.value = 75
      if (data.status == 'success') {
        // document.getElementById('startNext').click()
        this.router.navigate(['graph'])
        this.value = 100
      }
    })
  }
  
}
