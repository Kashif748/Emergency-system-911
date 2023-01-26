import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoeDashboardComponent } from './doe-dashboard.component';

describe('DoeDashboardComponent', () => {
  let component: DoeDashboardComponent;
  let fixture: ComponentFixture<DoeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
