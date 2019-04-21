import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataServicesService } from '../data-services.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  public title
  private value = 10
  private reverseIndex = false

  constructor(private titleService: Title, private dataService: DataServicesService, private router: Router, private snackbar: MatSnackBar) {
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
      this.snackbar.open(data.message, '', {
        duration: 3000
      })
      this.value = 100
    })
  }

  openUpload() {
    document.getElementById('file').click()
  }

  reverseEvent(event) {
    this.reverseIndex = event.checked
  }

  fileChange(event) {
    let fileList: FileList = event.target.files
    this.value = 25
    if (fileList.length > 0) {
      let file = fileList[0]
      let formData = new FormData()
      formData.append('file', file, file.name)
      formData.append('reverse', this.reverseIndex.toString())
      this.dataService.upload(formData).subscribe((data: any) => {
        this.value = 50
        data = JSON.parse(data)
        this.value = 75
        if (data.status == 'success') {
          this.router.navigate(['display'])
        }
        this.snackbar.open(data.message, '', {
          duration: 3000
        })
        this.value = 100
      })
    }
  }

}
