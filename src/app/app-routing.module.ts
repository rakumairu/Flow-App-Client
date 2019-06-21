import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilesComponent } from './files/files.component';
import { DisplayComponent } from './display/display.component';
import { PreprocessComponent } from './preprocess/preprocess.component';
import { FilterComponent } from './filter/filter.component';
import { GraphComponent } from './graph/graph.component';
import { ControlFlowComponent } from './control-flow/control-flow.component';
import { DottedChartComponent } from './dotted-chart/dotted-chart.component';
import { StatisticComponent } from './statistic/statistic.component';
import { AlgoritmaComponent } from './algoritma/algoritma.component';
import { PreprocessingComponent } from './preprocessing/preprocessing.component';
import { PreprocessingAlphaComponent } from './preprocessing-alpha/preprocessing-alpha.component';

const routes: Routes = [
  { path: '', redirectTo: '/upload', pathMatch: 'full' },
  { path: 'upload', component: FilesComponent },
  { path: 'display', component: DisplayComponent },
  { 
    path: 'preprocessing', component: PreprocessingComponent,
    children: [
      { path: 'preprocess', component: PreprocessComponent },
      { path: 'preprocessingalpha', component: PreprocessingAlphaComponent }
    ]
  },
  { path: 'filter', component: FilterComponent },
  { path: 'statistic', component: StatisticComponent },
  { path: 'algoritma', component: AlgoritmaComponent },
  {
    path: 'graph', component: GraphComponent,
    children: [
      { path: 'controlflow', component: ControlFlowComponent },
      { path: 'dottedchart', component: DottedChartComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
