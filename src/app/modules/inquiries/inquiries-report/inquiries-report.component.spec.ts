import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiriesReportComponent } from './inquiries-report.component';

describe('InquiriesReportComponent', () => {
  let component: InquiriesReportComponent;
  let fixture: ComponentFixture<InquiriesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiriesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiriesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
