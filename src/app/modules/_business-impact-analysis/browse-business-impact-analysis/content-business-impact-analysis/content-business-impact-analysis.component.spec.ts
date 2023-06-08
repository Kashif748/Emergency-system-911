import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentBusinessImpactAnalysisComponent } from './content-business-impact-analysis.component';

describe('ContentBusinessImpactAnalysisComponent', () => {
  let component: ContentBusinessImpactAnalysisComponent;
  let fixture: ComponentFixture<ContentBusinessImpactAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentBusinessImpactAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentBusinessImpactAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
