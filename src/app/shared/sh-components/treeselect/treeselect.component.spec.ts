/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TreeselectComponent } from './treeselect.component';

describe('TreeselectComponent', () => {
  let component: TreeselectComponent;
  let fixture: ComponentFixture<TreeselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
