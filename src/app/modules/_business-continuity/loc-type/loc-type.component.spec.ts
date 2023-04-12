import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocTypeComponent } from './loc-type.component';

describe('LocTypeComponent', () => {
  let component: LocTypeComponent;
  let fixture: ComponentFixture<LocTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
