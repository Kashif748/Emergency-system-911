import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessImpactActivityDialogComponent } from './business-impact-activity-dialog.component';

describe('BusinessImpactActivityDialogComponent', () => {
  let component: BusinessImpactActivityDialogComponent;
  let fixture: ComponentFixture<BusinessImpactActivityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessImpactActivityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessImpactActivityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
