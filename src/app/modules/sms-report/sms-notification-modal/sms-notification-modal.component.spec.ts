import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsNotificationModalComponent } from './sms-notification-modal.component';

describe('SmsNotificationModalComponent', () => {
  let component: SmsNotificationModalComponent;
  let fixture: ComponentFixture<SmsNotificationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsNotificationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsNotificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
