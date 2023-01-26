import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIncidentsViewComponent } from './new-incidents-view.component';

describe('NewIncidentsViewComponent', () => {
  let component: NewIncidentsViewComponent;
  let fixture: ComponentFixture<NewIncidentsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIncidentsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIncidentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
