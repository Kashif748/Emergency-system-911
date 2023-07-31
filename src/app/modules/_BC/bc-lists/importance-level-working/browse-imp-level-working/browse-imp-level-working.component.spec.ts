import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseImpLevelWorkingComponent } from './browse-imp-level-working.component';

describe('BrowseImpLevelWorkingComponent', () => {
  let component: BrowseImpLevelWorkingComponent;
  let fixture: ComponentFixture<BrowseImpLevelWorkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseImpLevelWorkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseImpLevelWorkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
