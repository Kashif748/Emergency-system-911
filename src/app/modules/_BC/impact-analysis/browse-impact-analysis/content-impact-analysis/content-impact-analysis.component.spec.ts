import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentImpactAnalysisComponent } from './content-impact-analysis.component';

describe('ContentImpactAnalysisComponent', () => {
  let component: ContentImpactAnalysisComponent;
  let fixture: ComponentFixture<ContentImpactAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentImpactAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentImpactAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
