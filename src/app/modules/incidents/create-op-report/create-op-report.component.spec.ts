import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOpReportComponent } from './create-op-report.component';

describe('CreateOpReportComponent', () => {
  let component: CreateOpReportComponent;
  let fixture: ComponentFixture<CreateOpReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOpReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOpReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
