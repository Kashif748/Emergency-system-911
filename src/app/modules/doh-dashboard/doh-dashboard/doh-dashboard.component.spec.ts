import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DohDashboardComponent } from './doh-dashboard.component';

describe('DohDashboardComponent', () => {
  let component: DohDashboardComponent;
  let fixture: ComponentFixture<DohDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DohDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DohDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
