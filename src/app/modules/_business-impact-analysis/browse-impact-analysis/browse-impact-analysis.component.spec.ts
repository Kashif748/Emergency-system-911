import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseImpactAnalysisComponent } from './browse-impact-analysis.component';

describe('BrowseImpactAnalysisComponent', () => {
  let component: BrowseImpactAnalysisComponent;
  let fixture: ComponentFixture<BrowseImpactAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseImpactAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseImpactAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
