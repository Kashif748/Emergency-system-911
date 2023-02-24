import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseGroupsComponent } from './browse-groups.component';

describe('BrowseGroupsComponent', () => {
  let component: BrowseGroupsComponent;
  let fixture: ComponentFixture<BrowseGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
