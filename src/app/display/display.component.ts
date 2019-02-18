import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DataServicesService } from '../data-services.service';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DisplayComponent implements OnInit {

  private title = 'Display Data'
  public fullLog
  private eventLog
  private isHidden = true
  public isDisabled = true
  private activeTab
  private display = 'none'
  public displayedColumns
  public columnsToDisplay
  private value = 10

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(private dataService: DataServicesService, private titleServie: Title) {
    this.titleServie.setTitle('Display Data')
  }
  
  ngOnInit() {
    // TODO: add progress bar
    this.value = 25
    this.dataService.display().subscribe((data: any) => {
      this.value = 50
      data = JSON.parse(data)
      this.value = 75
      if (data.status == 'success') {
        this.fullLog = data.data
        if (this.fullLog.final) {
          this.isDisabled = false
        }
      } else {
        console.log(data)
      }
      this.value = 100
    })
  }

  applyFilter(filterValue: string) {
    this.eventLog.filter = filterValue.trim().toLowerCase()

    if (this.eventLog.paginator) {
      this.eventLog.paginator.firstPage()
    }
  }

  raw() {
    // TODO: add progress bar in between changing displaying raw and final file
    this.eventLog = new MatTableDataSource(this.fullLog.raw.data)
    this.eventLog.paginator = this.paginator
    this.eventLog.sort = this.sort
    this.displayedColumns = this.fullLog.raw.head
    this.columnsToDisplay = this.displayedColumns.slice()
    this.display = 'block'
    this.activeTab = 0
    this.isHidden = false
  }

  final() {
    // TODO: add progress bar in between changing displaying raw and final file
    this.display = 'none'
    this.eventLog = new MatTableDataSource(this.fullLog.final.data)
    this.eventLog.paginator = this.paginator
    this.eventLog.sort = this.sort
    this.displayedColumns = this.fullLog.final.head
    this.columnsToDisplay = this.displayedColumns.slice()
    this.display = 'block'
    this.activeTab = 1
    this.isHidden = false
  }

}
