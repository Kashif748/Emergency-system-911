import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibleOrgsComponent } from './responsible-orgs.component';

describe('ResponsibleOrgsComponent', () => {
  let component: ResponsibleOrgsComponent;
  let fixture: ComponentFixture<ResponsibleOrgsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsibleOrgsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsibleOrgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
