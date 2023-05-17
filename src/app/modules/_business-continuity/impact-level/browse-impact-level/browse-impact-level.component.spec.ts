import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseImpactLevelComponent } from './browse-impact-level.component';

describe('BrowseImpactLevelComponent', () => {
  let component: BrowseImpactLevelComponent;
  let fixture: ComponentFixture<BrowseImpactLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseImpactLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseImpactLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
