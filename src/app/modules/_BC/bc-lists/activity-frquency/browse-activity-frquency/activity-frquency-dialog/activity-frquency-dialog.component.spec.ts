import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityFrquencyDialogComponent } from './activity-frquency-dialog.component';

describe('ActivityFrquencyDialogComponent', () => {
  let component: ActivityFrquencyDialogComponent;
  let fixture: ComponentFixture<ActivityFrquencyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityFrquencyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityFrquencyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
