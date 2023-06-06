import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSystemDialogComponent } from './add-system-dialog.component';

describe('AddSystemDialogComponent', () => {
  let component: AddSystemDialogComponent;
  let fixture: ComponentFixture<AddSystemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSystemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSystemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
