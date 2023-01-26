import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsStatisticsComponent } from './incidents-statistics.component';

describe('IncidentsStatisticsComponent', () => {
  let component: IncidentsStatisticsComponent;
  let fixture: ComponentFixture<IncidentsStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentsStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
