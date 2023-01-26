import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallDutyComponent } from './call-duty.component';

describe('CallDutyComponent', () => {
  let component: CallDutyComponent;
  let fixture: ComponentFixture<CallDutyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallDutyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
