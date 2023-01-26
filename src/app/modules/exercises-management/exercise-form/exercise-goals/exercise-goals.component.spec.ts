import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseGoalsComponent } from './exercise-goals.component';

describe('ExerciseGoalsComponent', () => {
  let component: ExerciseGoalsComponent;
  let fixture: ComponentFixture<ExerciseGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
