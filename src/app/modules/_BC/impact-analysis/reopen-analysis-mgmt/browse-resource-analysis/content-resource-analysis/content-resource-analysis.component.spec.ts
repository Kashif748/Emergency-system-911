import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentResourceAnalysisComponent } from './content-resource-analysis.component';

describe('ContentResourceAnalysisComponent', () => {
  let component: ContentResourceAnalysisComponent;
  let fixture: ComponentFixture<ContentResourceAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentResourceAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentResourceAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
