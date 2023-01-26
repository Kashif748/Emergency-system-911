import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickUsersComponent } from './pick-users.component';

describe('PickUsersComponent', () => {
  let component: PickUsersComponent;
  let fixture: ComponentFixture<PickUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
