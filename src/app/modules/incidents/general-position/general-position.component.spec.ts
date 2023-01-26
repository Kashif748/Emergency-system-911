import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralPositionComponent } from './general-position.component';

describe('GeneralPositionComponent', () => {
  let component: GeneralPositionComponent;
  let fixture: ComponentFixture<GeneralPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
