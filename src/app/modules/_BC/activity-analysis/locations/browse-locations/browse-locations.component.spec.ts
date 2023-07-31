import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseLocationsComponent } from './browse-locations.component';

describe('BrowseLocationsComponent', () => {
  let component: BrowseLocationsComponent;
  let fixture: ComponentFixture<BrowseLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
