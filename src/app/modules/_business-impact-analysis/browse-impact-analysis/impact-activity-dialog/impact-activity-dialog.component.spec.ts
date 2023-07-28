import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactActivityDialogComponent } from './impact-activity-dialog.component';

describe('ImpactActivityDialogComponent', () => {
  let component: ImpactActivityDialogComponent;
  let fixture: ComponentFixture<ImpactActivityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpactActivityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactActivityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
