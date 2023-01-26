import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseEvaluationComponent } from './exercise-evaluation.component';

describe('ExerciseEvaluationComponent', () => {
  let component: ExerciseEvaluationComponent;
  let fixture: ComponentFixture<ExerciseEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
