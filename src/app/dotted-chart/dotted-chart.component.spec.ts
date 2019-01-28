import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DottedChartComponent } from './dotted-chart.component';

describe('DottedChartComponent', () => {
  let component: DottedChartComponent;
  let fixture: ComponentFixture<DottedChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DottedChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DottedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
