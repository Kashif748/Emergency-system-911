import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentActivityPriorityComponent } from './content-activity-priority.component';

describe('ContentActivityPriorityComponent', () => {
  let component: ContentActivityPriorityComponent;
  let fixture: ComponentFixture<ContentActivityPriorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentActivityPriorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentActivityPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
