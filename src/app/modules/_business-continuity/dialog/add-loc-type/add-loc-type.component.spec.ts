import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocTypeComponent } from './add-loc-type.component';

describe('AddLocTypeComponent', () => {
  let component: AddLocTypeComponent;
  let fixture: ComponentFixture<AddLocTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLocTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLocTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
