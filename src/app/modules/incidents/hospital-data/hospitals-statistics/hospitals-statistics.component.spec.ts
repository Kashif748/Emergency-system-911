import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalsStatisticsComponent } from './hospitals-statistics.component';

describe('HospitalsStatisticsComponent', () => {
  let component: HospitalsStatisticsComponent;
  let fixture: ComponentFixture<HospitalsStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalsStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
