import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentEmployeesComponent } from './content-employees.component';

describe('ContentEmployeesComponent', () => {
  let component: ContentEmployeesComponent;
  let fixture: ComponentFixture<ContentEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
