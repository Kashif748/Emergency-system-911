import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsManagementComponent } from './shifts-management.component';

describe('ShiftsManagementComponent', () => {
  let component: ShiftsManagementComponent;
  let fixture: ComponentFixture<ShiftsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
