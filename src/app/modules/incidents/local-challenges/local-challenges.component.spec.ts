import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalChallengesComponent } from './local-challenges.component';

describe('LocalChallengesComponent', () => {
  let component: LocalChallengesComponent;
  let fixture: ComponentFixture<LocalChallengesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalChallengesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
