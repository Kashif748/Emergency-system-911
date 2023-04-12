import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRtoDialogComponent } from './add-rto-dialog.component';

describe('AddRtoDialogComponent', () => {
  let component: AddRtoDialogComponent;
  let fixture: ComponentFixture<AddRtoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRtoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRtoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
