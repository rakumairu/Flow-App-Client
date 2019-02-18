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

  private head
  private viewReady = false
  private step1 = false
  private value = 10

  constructor(private dataService: DataServicesService, private router: Router, private titleService: Title) {
    this.titleService.setTitle('Preprocess Data')
  }

  ngOnInit() {
    this.value = 25
    this.dataService.preprocessHead().subscribe((data: any) => {
      this.value = 50
      data = JSON.parse(data)
      this.value = 75
      if (data.status == 'success') {
        this.head = data.data
        this.viewReady = true
      } else {
        console.log(data)
      }
      this.value = 100
    })
  }

  onSubmit(form: NgForm) {
    // let logHeader = new LogHeader(form.value.case_id, form.value.task, form.value.timestamp)
    // // TODO: add progress bar
    // this.dataService.preprocess(logHeader).subscribe((data: any) => {
    //   data = JSON.parse(data)
    //   if (data.status == 'success') {
    //     this.router.navigate(['filter'])
    //   } else {
    //     console.error(data)
    //   }
    // })
    if (form.valid) {
      let case_id = form.value.case_id
      let task = form.value.task
      let timestamp = form.value.timestamp
      let formData = new FormData()
      formData.append('case_id', case_id)
      formData.append('event', task)
      formData.append('timestamp', timestamp)
      this.dataService.preprocess(formData).subscribe((data: any) => {
        data = JSON.parse(data)
        document.getElementById('nextButton').click()
        // TODO: handle after this
      })
    } else {
      // TODO: add invalid form handle
    }
  }

}
