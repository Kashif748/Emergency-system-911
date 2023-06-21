import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessActivityAnalysisComponent } from './business-activity-analysis.component';

describe('BusinessActivityAnalysisComponent', () => {
  let component: BusinessActivityAnalysisComponent;
  let fixture: ComponentFixture<BusinessActivityAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessActivityAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessActivityAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
