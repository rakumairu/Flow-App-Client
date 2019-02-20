import { Component, OnInit } from '@angular/core';
import { DataServicesService } from '../data-services.service';
import {NgForm} from '@angular/forms';
import { LogHeader } from '../log-header';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { catchError, map, tap } from 'rxjs/operators'

@Component({
  selector: 'app-preprocess',
  templateUrl: './preprocess.component.html',
  styleUrls: ['./preprocess.component.css']
})
export class PreprocessComponent implements OnInit {

  // private viewReady = false
  // private step1 = false
  private value = 10
  // Alias
  private aliasReady = false
  private aliasColumn
  private aliasData
  private aliasChoosenColumn
  private selectedValueAlias
  // Join
  private joinReady = false
  private joinColumn
  // Drop
  private dropReady = false
  private dropColumn
  // Choose
  private chooseData
  private chooseReady = false

  constructor(private dataService: DataServicesService, private router: Router, private titleService: Title) {
    this.titleService.setTitle('Preprocess Data')
  }

  ngOnInit() {
    this.value = 25
    // Alias
    this.dataService.getAlias().subscribe((data: any) => {
      this.value = 50
      data = JSON.parse(data)
      this.value = 75
      if (data.status == 'success') {
        this.aliasColumn = data.data.column
        this.aliasData = data.data.data
        this.aliasReady = true
        this.value = 100
      }
    })
  }

  stepChange(event) {
    this.value = 25
    if (event.selectedIndex == 0) {
      this.aliasReady = false
      this.dataService.getAlias().subscribe((data: any) => {
        this.value = 50
        data = JSON.parse(data)
        this.value = 75
        if (data.status == 'success') {
          this.aliasColumn = data.data.column
          this.aliasData = data.data.data
          this.aliasReady = true
          this.value = 100
        }
      })
    } else if (event.selectedIndex == 1) {
      this.joinReady = false
      this.dataService.getJoin().subscribe((data: any) => {
        this.value = 50
        data = JSON.parse(data)
        this.value = 75
        if (data.status == 'success') {
          this.joinColumn = data.data
          this.joinReady = true
          this.value = 100
        }
      })
    } else if (event.selectedIndex == 2) {
      this.dropReady = false
      this.dataService.getDrop().subscribe((data: any) => {
        this.value = 50
        data = JSON.parse(data)
        this.value = 75
        if (data.status == 'success') {
          this.dropColumn = data.data
          this.dropReady = true
          this.value = 100
        }
      })
    } else if (event.selectedIndex == 3) {
      this.dataService.preprocessHead().subscribe((data: any) => {
        this.value = 50
        data = JSON.parse(data)
        this.value = 75
        if (data.status == 'success') {
          this.chooseData = data.data
          this.chooseReady = true
          this.value = 100
        }
      })
    }
  }
  
  // ALIAS
  copyAlias(data) {
    document.getElementById(data).innerHTML = data
  }

  aliasColumnChoosen(event) {
    this.aliasChoosenColumn = event.value
  }
  
  submitAlias(alias: NgForm) {
    this.value = 25
    let data = JSON.stringify(
      {
        'data': {
          'alias': alias.value,
          'col': this.aliasChoosenColumn
        }
      }
    )
    
    this.dataService.sendAlias(data).subscribe((data: any) => {
      this.value = 50
      data = JSON.parse(data)
      this.value = 75
      if (data.status == 'success') {
        this.selectedValueAlias = null
        this.aliasChoosenColumn = null
        this.aliasColumn = data.data.column
        this.aliasData = data.data.data
        this.value = 100
      }
    })
  }

  // JOIN
  submitJoin(join: NgForm) {
    this.value = 25
    let data = JSON.stringify(
      {
        'data': join.value
      }
      )

      this.dataService.sendJoin(data).subscribe((data: any) => {
      this.value = 50
      data = JSON.parse(data)
      this.value = 75
      if (data.status == 'success') {
        join.resetForm()
        this.joinColumn = data.data
        this.value = 100
      }
    })
  }

  // DROP
  submitDrop(drop: NgForm) {
    this.value = 25
    let data = JSON.stringify(
      {
        'data': drop.value
      }
    )
    
    this.dataService.sendDrop(data).subscribe((data: any) => {
      this.value = 50
      data = JSON.parse(data)
      this.value = 75
      if (data.status == 'success') {
        drop.resetForm()
        this.dropColumn = data.data
        this.value = 100
      }
    })
  }

  // CHOOSE
  submitChoose(choose: NgForm) {
    if (choose.valid) {
      this.value = 25
      let case_id = choose.value.case_id
      let task = choose.value.task
      let timestamp = choose.value.timestamp
      let formData = new FormData()
      formData.append('case_id', case_id)
      formData.append('event', task)
      formData.append('timestamp', timestamp)
      this.value = 50
      this.dataService.preprocess(formData).subscribe((data: any) => {
        data = JSON.parse(data)
        if (data.status == 'success') {
          this.router.navigate(['display'])
        }
      })
    }
  }
  
}
