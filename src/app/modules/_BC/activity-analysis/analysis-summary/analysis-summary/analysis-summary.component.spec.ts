import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisSummaryComponent } from './analysis-summary.component';

describe('AnalysisSummaryComponent', () => {
  let component: AnalysisSummaryComponent;
  let fixture: ComponentFixture<AnalysisSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
