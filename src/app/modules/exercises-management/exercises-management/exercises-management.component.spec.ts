import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesManagementComponent } from './exercises-management.component';

describe('ExercisesManagementComponent', () => {
  let component: ExercisesManagementComponent;
  let fixture: ComponentFixture<ExercisesManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercisesManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
