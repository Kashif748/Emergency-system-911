import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactMatrixDialogComponent } from './impact-matrix-dialog.component';

describe('ImpactMatrixDialogComponent', () => {
  let component: ImpactMatrixDialogComponent;
  let fixture: ComponentFixture<ImpactMatrixDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpactMatrixDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactMatrixDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
