import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentReminderComponent } from './incident-reminder.component';

describe('IncidentReminderComponent', () => {
  let component: IncidentReminderComponent;
  let fixture: ComponentFixture<IncidentReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentReminderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
