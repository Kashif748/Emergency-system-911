import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseEmployeesComponent } from './browse-employees.component';

describe('BrowseEmployeesComponent', () => {
  let component: BrowseEmployeesComponent;
  let fixture: ComponentFixture<BrowseEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
