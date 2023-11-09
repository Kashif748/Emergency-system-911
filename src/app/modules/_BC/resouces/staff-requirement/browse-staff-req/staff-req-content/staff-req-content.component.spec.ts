import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffReqContentComponent } from './staff-req-content.component';

describe('StaffReqContentComponent', () => {
  let component: StaffReqContentComponent;
  let fixture: ComponentFixture<StaffReqContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffReqContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffReqContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
