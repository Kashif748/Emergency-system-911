import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendersDialogComponent } from './add-venders-dialog.component';

describe('AddVendersDialogComponent', () => {
  let component: AddVendersDialogComponent;
  let fixture: ComponentFixture<AddVendersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVendersDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVendersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
