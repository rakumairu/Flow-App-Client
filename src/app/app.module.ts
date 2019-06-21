import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module'
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayComponent } from './display/display.component';
import { PreprocessComponent } from './preprocess/preprocess.component';
import { FilterComponent } from './filter/filter.component';
import { GraphComponent } from './graph/graph.component';
import { FilesComponent } from './files/files.component';
import { ControlFlowComponent } from './control-flow/control-flow.component';
import { DottedChartComponent } from './dotted-chart/dotted-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StatisticComponent } from './statistic/statistic.component';
import { AlgoritmaComponent } from './algoritma/algoritma.component';
import { PreprocessingComponent } from './preprocessing/preprocessing.component';
import { PreprocessingAlphaComponent } from './preprocessing-alpha/preprocessing-alpha.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    PreprocessComponent,
    FilterComponent,
    GraphComponent,
    FilesComponent,
    ControlFlowComponent,
    DottedChartComponent,
    StatisticComponent,
    AlgoritmaComponent,
    PreprocessingComponent,
    PreprocessingAlphaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
