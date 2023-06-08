import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseBusinessImpactAnalysisComponent } from './browse-business-impact-analysis.component';

describe('BrowseBusinessImpactAnalysisComponent', () => {
  let component: BrowseBusinessImpactAnalysisComponent;
  let fixture: ComponentFixture<BrowseBusinessImpactAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseBusinessImpactAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseBusinessImpactAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
