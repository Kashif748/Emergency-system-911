import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMobileVersionComponent } from './add-edit-mobile-version.component';

describe('AddEditMobileVersionComponent', () => {
  let component: AddEditMobileVersionComponent;
  let fixture: ComponentFixture<AddEditMobileVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditMobileVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditMobileVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
