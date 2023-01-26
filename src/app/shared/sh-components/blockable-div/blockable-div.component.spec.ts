/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BlockableDivComponent } from './blockable-div.component';

describe('BlockableDivComponent', () => {
  let component: BlockableDivComponent;
  let fixture: ComponentFixture<BlockableDivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockableDivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockableDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
