import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityFrquencyComponent } from './activity-frquency.component';

describe('ActivityFrquencyComponent', () => {
  let component: ActivityFrquencyComponent;
  let fixture: ComponentFixture<ActivityFrquencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityFrquencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityFrquencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
