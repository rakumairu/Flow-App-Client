import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogHeader } from './log-header';

@Injectable({
  providedIn: 'root'
})
export class DataServicesService {

  public title
  // public fileExist = false
  public _ip = 'http://127.0.0.1:5000/'
  public _displayUrl = this._ip + 'api/display'
  public _preprocessUrl = this._ip + 'api/prepos'
  public _controlFlowUrl = this._ip + 'api/controlflow'
  public _dottedChartUrl = this._ip + 'api/dottedchart'
  public _dottedChartdurationUrl = this._ip + 'api/dottedchartduration'
  public _filesUrl = this._ip + 'api/files'
  public _existUrl = this._ip + 'api/exist'
  public _convertUrl = this._ip + 'api/convert'
  public _aliasUrl = this._ip + 'api/alias'
  public _joinUrl = this._ip + 'api/join'
  public _dropUrl = this._ip + 'api/drop'
  public _statisticStartUrl = this._ip + 'api/statisticstart'
  public _statisticEndUrl = this._ip + 'api/statisticend'
  public _statisticSummaryUrl = this._ip + 'api/statisticsummary'
  public _filterUrl = this._ip + 'api/filter'

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

  dottedChartDuration() {
    return this.http.get(this._dottedChartdurationUrl)
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

  getConvert() {
    return this.http.get(this._convertUrl)
  }

  sendConvert(data) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.http.post(this._convertUrl, data, options)
  }

  getAlias() {
    return this.http.get(this._aliasUrl)
  }

  sendAlias(data) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.http.post(this._aliasUrl, data, options)
  }

  getJoin() {
    return this.http.get(this._joinUrl)
  }

  sendJoin(data) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.http.post(this._joinUrl, data, options)
  }

  getDrop() {
    return this.http.get(this._dropUrl)
  }

  sendDrop(data) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post(this._dropUrl, data, options)
  }

  getStatisticStart() {
    return this.http.get(this._statisticStartUrl)
  }

  getStatisticEnd() {
    return this.http.get(this._statisticEndUrl)
  }

  getStatisticSummary() {
    return this.http.get(this._statisticSummaryUrl)
  }

  getFilter() {
    return this.http.get(this._filterUrl)
  }

  sendFilter(data) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post(this._filterUrl, data, options)
  }

}
