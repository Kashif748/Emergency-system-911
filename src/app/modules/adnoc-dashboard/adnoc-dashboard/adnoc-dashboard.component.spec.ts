import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdnocDashboardComponent } from './adnoc-dashboard.component';

describe('AdnocDashboardComponent', () => {
  let component: AdnocDashboardComponent;
  let fixture: ComponentFixture<AdnocDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdnocDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdnocDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
