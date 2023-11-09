import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleDialogComponent } from './cycle-dialog.component';

describe('NewCycleDialogComponent', () => {
  let component: CycleDialogComponent;
  let fixture: ComponentFixture<CycleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CycleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CycleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
