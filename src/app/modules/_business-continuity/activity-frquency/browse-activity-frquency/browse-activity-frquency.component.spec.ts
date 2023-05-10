import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseActivityFrquencyComponent } from './browse-activity-frquency.component';

describe('BrowseActivityFrquencyComponent', () => {
  let component: BrowseActivityFrquencyComponent;
  let fixture: ComponentFixture<BrowseActivityFrquencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseActivityFrquencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseActivityFrquencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
