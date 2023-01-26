/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OugInputComponent } from './oug-input.component';

describe('OugInputComponent', () => {
  let component: OugInputComponent;
  let fixture: ComponentFixture<OugInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OugInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OugInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
