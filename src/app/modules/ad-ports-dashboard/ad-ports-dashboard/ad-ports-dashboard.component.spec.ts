import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdPortsDashboardComponent } from './ad-ports-dashboard.component';

describe('AdPortsDashboardComponent', () => {
  let component: AdPortsDashboardComponent;
  let fixture: ComponentFixture<AdPortsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdPortsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdPortsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
