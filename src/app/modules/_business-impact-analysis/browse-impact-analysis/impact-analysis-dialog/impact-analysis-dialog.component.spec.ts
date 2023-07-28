import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactAnalysisDialogComponent } from './impact-analysis-dialog.component';

describe('ImpactAnalysisDialogComponent', () => {
  let component: ImpactAnalysisDialogComponent;
  let fixture: ComponentFixture<ImpactAnalysisDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpactAnalysisDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactAnalysisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
