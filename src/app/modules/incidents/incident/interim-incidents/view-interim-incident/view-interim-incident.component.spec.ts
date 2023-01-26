import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInterimIncidentComponent } from './view-interim-incident.component';

describe('ViewInterimIncidentComponent', () => {
  let component: ViewInterimIncidentComponent;
  let fixture: ComponentFixture<ViewInterimIncidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInterimIncidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInterimIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
