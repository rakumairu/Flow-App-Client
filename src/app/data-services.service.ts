import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogHeader } from './log-header';

@Injectable({
  providedIn: 'root'
})
export class DataServicesService {

  public title
  // public fileExist = false
  public _displayUrl = 'http://127.0.0.1:5000/api/display'
  public _preprocessUrl = 'http://127.0.0.1:5000/api/prepos'
  public _controlFlowUrl = 'http://127.0.0.1:5000/api/controlflow'
  public _dottedChartUrl = 'http://127.0.0.1:5000/api/dottedchart'
  public _filesUrl = 'http://127.0.0.1:5000/api/files'
  public _existUrl = 'http://127.0.0.1:5000/api/exist'

  constructor(private http: HttpClient) { }

  setTitle(title) {
    this.title = title
  }

  getTitle() {
    return this.title
  }

  isExist() {
    this.checkExist().subscribe((data:any) => {
      data = JSON.parse(data)
      if (data.status == 'success') {
        // this.fileExist = true
        return true
      } else {
        // this.fileExist = false
        return false
      }
    })
  }

  checkExist() {
    return this.http.get(this._existUrl)
  }
  
  display() {
    // TODO: add parameter to choose which file to get, raw or final
    return this.http.get(this._displayUrl)
  }

  preprocess(formData: FormData) {
    return this.http.post(this._preprocessUrl, formData)
  }

  preprocessHead() {
    return this.http.get(this._preprocessUrl)
  }

  controlFlow() {
    return this.http.get(this._controlFlowUrl)
  }

  dottedChart() {
    return this.http.get(this._dottedChartUrl)
  }

  upload(formData: FormData) {
    let options = {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    }
    return this.http.post(this._filesUrl, formData, options)
  }

  delete() {
    return this.http.delete(this._filesUrl)
  }

}
