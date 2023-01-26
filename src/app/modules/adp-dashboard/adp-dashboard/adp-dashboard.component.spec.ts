import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdpDashboardComponent } from './adp-dashboard.component';

describe('AdpDashboardComponent', () => {
  let component: AdpDashboardComponent;
  let fixture: ComponentFixture<AdpDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdpDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdpDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
