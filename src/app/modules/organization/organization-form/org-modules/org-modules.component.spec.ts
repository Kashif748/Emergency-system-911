import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgModulesComponent } from './org-modules.component';

describe('OrgModulesComponent', () => {
  let component: OrgModulesComponent;
  let fixture: ComponentFixture<OrgModulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgModulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
