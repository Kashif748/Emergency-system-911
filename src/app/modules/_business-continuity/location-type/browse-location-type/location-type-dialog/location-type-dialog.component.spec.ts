import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTypeDialogComponent } from './location-type-dialog.component';

describe('LocationTypeDialogComponent', () => {
  let component: LocationTypeDialogComponent;
  let fixture: ComponentFixture<LocationTypeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationTypeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
