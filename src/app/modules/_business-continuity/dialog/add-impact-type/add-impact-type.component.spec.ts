import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImpactTypeComponent } from './add-impact-type.component';

describe('AddImpactTypeComponent', () => {
  let component: AddImpactTypeComponent;
  let fixture: ComponentFixture<AddImpactTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImpactTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImpactTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
