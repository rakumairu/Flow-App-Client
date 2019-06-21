import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreprocessingAlphaComponent } from './preprocessing-alpha.component';

describe('PreprocessingAlphaComponent', () => {
  let component: PreprocessingAlphaComponent;
  let fixture: ComponentFixture<PreprocessingAlphaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreprocessingAlphaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreprocessingAlphaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
