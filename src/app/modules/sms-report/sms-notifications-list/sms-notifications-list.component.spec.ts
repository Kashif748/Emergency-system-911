import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsNotificationsListComponent } from './sms-notifications-list.component';

describe('SmsNotificationsListComponent', () => {
  let component: SmsNotificationsListComponent;
  let fixture: ComponentFixture<SmsNotificationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsNotificationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsNotificationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
