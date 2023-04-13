import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAnalysisCycleComponent } from './add-new-analysis-cycle.component';

describe('AddNewAnalysisCycleComponent', () => {
  let component: AddNewAnalysisCycleComponent;
  let fixture: ComponentFixture<AddNewAnalysisCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewAnalysisCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewAnalysisCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
