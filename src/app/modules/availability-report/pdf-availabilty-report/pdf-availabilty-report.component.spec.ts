import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfAvailabiltyReportComponent } from './pdf-availabilty-report.component';

describe('PdfAvailabiltyReportComponent', () => {
  let component: PdfAvailabiltyReportComponent;
  let fixture: ComponentFixture<PdfAvailabiltyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfAvailabiltyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfAvailabiltyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
