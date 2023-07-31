import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPriorityDialogComponent } from './activity-priority-dialog.component';

describe('ActivityPriorityDialogComponent', () => {
  let component: ActivityPriorityDialogComponent;
  let fixture: ComponentFixture<ActivityPriorityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityPriorityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityPriorityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
