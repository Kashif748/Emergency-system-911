import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseLocationTypeComponent } from './browse-location-type.component';

describe('BrowseLocationTypeComponent', () => {
  let component: BrowseLocationTypeComponent;
  let fixture: ComponentFixture<BrowseLocationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseLocationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseLocationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
