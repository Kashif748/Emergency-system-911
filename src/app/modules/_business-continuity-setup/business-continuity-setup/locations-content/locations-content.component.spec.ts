import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsContentComponent } from './locations-content.component';

describe('LocationsContentComponent', () => {
  let component: LocationsContentComponent;
  let fixture: ComponentFixture<LocationsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
