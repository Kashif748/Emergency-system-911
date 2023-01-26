import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityReportComponent } from './availability-report.component';

describe('AvailabilityReportComponent', () => {
  let component: AvailabilityReportComponent;
  let fixture: ComponentFixture<AvailabilityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailabilityReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
