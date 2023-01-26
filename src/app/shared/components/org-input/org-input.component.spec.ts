import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgInputComponent } from './org-input.component';

describe('OrgInputComponent', () => {
  let component: OrgInputComponent;
  let fixture: ComponentFixture<OrgInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
