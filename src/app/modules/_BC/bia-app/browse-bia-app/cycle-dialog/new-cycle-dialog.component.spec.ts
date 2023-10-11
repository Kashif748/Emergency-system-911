import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCycleDialogComponent } from './new-cycle-dialog.component';

describe('NewCycleDialogComponent', () => {
  let component: NewCycleDialogComponent;
  let fixture: ComponentFixture<NewCycleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCycleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCycleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
