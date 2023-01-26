import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DedDashboardComponent } from './ded-dashboard.component';

describe('DedDashboardComponent', () => {
  let component: DedDashboardComponent;
  let fixture: ComponentFixture<DedDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DedDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DedDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
