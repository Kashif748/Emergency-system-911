import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToUsersComponent } from './to-users.component';

describe('ToUsersComponent', () => {
  let component: ToUsersComponent;
  let fixture: ComponentFixture<ToUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
