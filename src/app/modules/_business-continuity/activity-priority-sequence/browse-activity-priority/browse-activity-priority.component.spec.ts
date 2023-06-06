import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseActivityPriorityComponent } from './browse-activity-priority.component';

describe('BrowseActivityPriorityComponent', () => {
  let component: BrowseActivityPriorityComponent;
  let fixture: ComponentFixture<BrowseActivityPriorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseActivityPriorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseActivityPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
