import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAnalysissSummaryComponent } from './content-analysiss-summary.component';

describe('ContentAnalysissSummaryComponent', () => {
  let component: ContentAnalysissSummaryComponent;
  let fixture: ComponentFixture<ContentAnalysissSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentAnalysissSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentAnalysissSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
