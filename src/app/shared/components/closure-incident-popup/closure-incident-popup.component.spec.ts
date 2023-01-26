import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosureIncidentPopupComponent } from './closure-incident-popup.component';

describe('ClosureIncidentPopupComponent', () => {
  let component: ClosureIncidentPopupComponent;
  let fixture: ComponentFixture<ClosureIncidentPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosureIncidentPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosureIncidentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
