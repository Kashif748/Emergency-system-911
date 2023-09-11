import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseResourceAnalysisComponent } from './browse-resource-analysis.component';

describe('BrowseResourceAnalysisComponent', () => {
  let component: BrowseResourceAnalysisComponent;
  let fixture: ComponentFixture<BrowseResourceAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseResourceAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseResourceAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
