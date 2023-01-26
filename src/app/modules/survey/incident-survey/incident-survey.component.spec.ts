import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentSurveyComponent } from './incident-survey.component';

describe('IncidentSurveyComponent', () => {
  let component: IncidentSurveyComponent;
  let fixture: ComponentFixture<IncidentSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
