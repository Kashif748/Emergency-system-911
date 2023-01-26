import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TadweerDashboardComponent } from './tadweer-dashboard.component';

describe('TadweerDashboardComponent', () => {
  let component: TadweerDashboardComponent;
  let fixture: ComponentFixture<TadweerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TadweerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TadweerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
