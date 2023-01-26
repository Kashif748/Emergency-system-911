import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseOtherInfoComponent } from './exercise-other-info.component';

describe('ExerciseOtherInfoComponent', () => {
  let component: ExerciseOtherInfoComponent;
  let fixture: ComponentFixture<ExerciseOtherInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseOtherInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseOtherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
