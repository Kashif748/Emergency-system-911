import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScadDashboardComponent } from './scad-dashboard.component';

describe('ScadDashboardComponent', () => {
  let component: ScadDashboardComponent;
  let fixture: ComponentFixture<ScadDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScadDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScadDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
