import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseCommitteComponent } from './exercise-committe.component';

describe('ExerciseCommitteComponent', () => {
  let component: ExerciseCommitteComponent;
  let fixture: ComponentFixture<ExerciseCommitteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseCommitteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseCommitteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
