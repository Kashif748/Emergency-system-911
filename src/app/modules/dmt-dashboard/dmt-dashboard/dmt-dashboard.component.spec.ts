import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmtDashboardComponent } from './dmt-dashboard.component';

describe('DmtDashboardComponent', () => {
  let component: DmtDashboardComponent;
  let fixture: ComponentFixture<DmtDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmtDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmtDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
