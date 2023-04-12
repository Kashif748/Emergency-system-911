import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPrioritySeqComponent } from './activity-priority-seq.component';

describe('ActivityPrioritySeqComponent', () => {
  let component: ActivityPrioritySeqComponent;
  let fixture: ComponentFixture<ActivityPrioritySeqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityPrioritySeqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityPrioritySeqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
