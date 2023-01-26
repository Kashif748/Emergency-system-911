import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalChallengesFormComponent } from './local-challenges-form.component';

describe('LocalChallengesFormComponent', () => {
  let component: LocalChallengesFormComponent;
  let fixture: ComponentFixture<LocalChallengesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalChallengesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalChallengesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
