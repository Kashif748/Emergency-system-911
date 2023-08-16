import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgHierarchyFormComponent } from './org-hierarchy-form.component';

describe('OrgHierarchyFormComponent', () => {
  let component: OrgHierarchyFormComponent;
  let fixture: ComponentFixture<OrgHierarchyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgHierarchyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgHierarchyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
