import { Component, OnChanges, OnInit } from '@angular/core';
import { DataServicesService } from './data-services.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // TODO: change all viewready to blog-post div
  private fileExist = false

  constructor(private dataService: DataServicesService, private router: Router) {
  }

  ngOnInit() {
    this.detectChanges()
  }

  onActivate() {
    this.detectChanges()
  }

  detectChanges() {
    this.dataService.checkExist().subscribe((data:any) => {
      data = JSON.parse(data)
      if (data.status == 'success') {
        this.fileExist = true
      } else {
        this.fileExist = false
      }
    })
  }

  delete() {
    this.dataService.delete().subscribe((data:any) => {
      data = JSON.parse(data)
      if (data.status == 'success') {
        this.router.navigate(['upload'])
        this.fileExist = false
      } else {
        console.log(data)
      }
    })
  }

}
