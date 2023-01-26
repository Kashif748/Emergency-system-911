import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgRolesComponent } from './org-roles.component';

describe('OrgRolesComponent', () => {
  let component: OrgRolesComponent;
  let fixture: ComponentFixture<OrgRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
