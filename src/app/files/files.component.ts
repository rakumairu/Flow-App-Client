import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataServicesService } from '../data-services.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  public title

  constructor(private titleService: Title, private dataService: DataServicesService, private router: Router) {
    this.titleService.setTitle('Upload')
  }

  ngOnInit() {
  }

  fileChange(event) {
    let fileList: FileList = event.target.files
    if (fileList.length > 0) {
      let file = fileList[0]
      let formData = new FormData()
      formData.append('file', file, file.name)
      // TODO: add progress bar
      this.dataService.upload(formData).subscribe((data: any) => {
        data = JSON.parse(data)
        if (data.status == 'success') {
          this.router.navigate(['display'])
        } else {
          // TODO: handle error
          console.log(data)
        }
      })
    }
  }

}
