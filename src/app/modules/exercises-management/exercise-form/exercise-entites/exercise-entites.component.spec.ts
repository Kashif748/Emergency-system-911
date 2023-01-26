import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseEntitesComponent } from './exercise-entites.component';

describe('ExerciseEntitesComponent', () => {
  let component: ExerciseEntitesComponent;
  let fixture: ComponentFixture<ExerciseEntitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseEntitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseEntitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
