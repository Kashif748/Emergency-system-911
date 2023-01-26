import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationUpdatesComponent } from './location-updates.component';

describe('LocationUpdatesComponent', () => {
  let component: LocationUpdatesComponent;
  let fixture: ComponentFixture<LocationUpdatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationUpdatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
