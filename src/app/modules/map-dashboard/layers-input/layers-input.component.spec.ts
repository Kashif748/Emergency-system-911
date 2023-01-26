/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LayersInputComponent } from './layers-input.component';

describe('LayersInputComponent', () => {
  let component: LayersInputComponent;
  let fixture: ComponentFixture<LayersInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayersInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayersInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
