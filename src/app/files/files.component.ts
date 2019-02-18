import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataServicesService } from '../data-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  public title
  private value = 10

  constructor(private titleService: Title, private dataService: DataServicesService, private router: Router) {
    this.titleService.setTitle('Upload')
  }
  
  ngOnInit() {
    this.value = 25
    this.dataService.checkExist().subscribe((data: any) => {
      this.value = 50
      data = JSON.parse(data)
      this.value = 75
      if (data.status == 'success') {
        this.router.navigate(['display'])
      }
      this.value = 100
    })
  }

  openUpload() {
    document.getElementById('file').click()
  }

  fileChange(event) {
    let fileList: FileList = event.target.files
    this.value = 25
    if (fileList.length > 0) {
      let file = fileList[0]
      let formData = new FormData()
      formData.append('file', file, file.name)
      // TODO: add progress bar
      this.dataService.upload(formData).subscribe((data: any) => {
        this.value = 50
        data = JSON.parse(data)
        this.value = 75
        if (data.status == 'success') {
          this.value = 100
          this.router.navigate(['display'])
        } else {
          // TODO: handle error
          this.value = 100
          console.log(data)
        }
      })
    }
  }

}
