import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessImpactAnalysisDialogComponent } from './business-impact-analysis-dialog.component';

describe('BusinessImpactAnalysisDialogComponent', () => {
  let component: BusinessImpactAnalysisDialogComponent;
  let fixture: ComponentFixture<BusinessImpactAnalysisDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessImpactAnalysisDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessImpactAnalysisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
