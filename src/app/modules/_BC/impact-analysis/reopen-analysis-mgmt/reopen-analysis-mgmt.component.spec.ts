import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReopenAnalysisMgmtComponent } from './reopen-analysis-mgmt.component';

describe('ReopenAnalysisMgmtComponent', () => {
  let component: ReopenAnalysisMgmtComponent;
  let fixture: ComponentFixture<ReopenAnalysisMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReopenAnalysisMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReopenAnalysisMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
