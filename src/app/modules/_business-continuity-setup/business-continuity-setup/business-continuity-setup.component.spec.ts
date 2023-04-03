import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessContinuitySetupComponent } from './business-continuity-setup.component';

describe('BusinessContinuitySetupComponent', () => {
  let component: BusinessContinuitySetupComponent;
  let fixture: ComponentFixture<BusinessContinuitySetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessContinuitySetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessContinuitySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
