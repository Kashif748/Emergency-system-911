import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedIncidentsComponent } from './closed-incidents.component';

describe('ClosedIncidentsComponent', () => {
  let component: ClosedIncidentsComponent;
  let fixture: ComponentFixture<ClosedIncidentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedIncidentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
