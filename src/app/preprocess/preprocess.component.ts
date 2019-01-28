import { Component, OnInit } from '@angular/core';
import { DataServicesService } from '../data-services.service';
import {NgForm} from '@angular/forms';
import { LogHeader } from '../log-header';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-preprocess',
  templateUrl: './preprocess.component.html',
  styleUrls: ['./preprocess.component.css']
})
export class PreprocessComponent implements OnInit {

  private head
  private viewReady = false

  constructor(private dataService: DataServicesService, private router: Router, private titleService: Title) {
    this.titleService.setTitle('Preprocess Data')
  }

  ngOnInit() {
    // TODO: add progress bar
    this.dataService.preprocessHead().subscribe((data: any) => {
      data = JSON.parse(data)
      if (data.status == 'success') {
        this.head = data.data
        this.viewReady = true
      } else {
        console.log(data)
      }
    })
  }

  onSubmit(form: NgForm) {
    let logHeader = new LogHeader(form.value.case_id, form.value.task, form.value.timestamp)
    // TODO: add progress bar
    this.dataService.preprocess(logHeader).subscribe((data: any) => {
      data = JSON.parse(data)
      if (data.status == 'success') {
        this.router.navigate(['filter'])
      } else {
        console.error(data)
      }
    })
  }

}
