/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TasksReportComponent } from './tasks-report.component';

describe('TasksReportComponent', () => {
  let component: TasksReportComponent;
  let fixture: ComponentFixture<TasksReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
