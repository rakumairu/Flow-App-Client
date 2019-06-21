import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoritmaComponent } from './algoritma.component';

describe('AlgoritmaComponent', () => {
  let component: AlgoritmaComponent;
  let fixture: ComponentFixture<AlgoritmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgoritmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoritmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
