import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImpLevelComponent } from './add-imp-level.component';

describe('AddImpLevelComponent', () => {
  let component: AddImpLevelComponent;
  let fixture: ComponentFixture<AddImpLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImpLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImpLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
