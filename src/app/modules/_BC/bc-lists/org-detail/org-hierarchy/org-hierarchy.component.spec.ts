import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgHierarchyComponent } from './org-hierarchy.component';

describe('OrgHierarchyComponent', () => {
  let component: OrgHierarchyComponent;
  let fixture: ComponentFixture<OrgHierarchyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgHierarchyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
