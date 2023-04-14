import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActivityFrqComponent } from './add-activity-frq.component';

describe('AddActivityFrqComponent', () => {
  let component: AddActivityFrqComponent;
  let fixture: ComponentFixture<AddActivityFrqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddActivityFrqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActivityFrqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
