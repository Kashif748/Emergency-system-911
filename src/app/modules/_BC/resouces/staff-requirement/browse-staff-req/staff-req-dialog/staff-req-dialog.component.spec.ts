import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffReqDialogComponent } from './staff-req-dialog.component';

describe('StaffReqDialogComponent', () => {
  let component: StaffReqDialogComponent;
  let fixture: ComponentFixture<StaffReqDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffReqDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffReqDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
