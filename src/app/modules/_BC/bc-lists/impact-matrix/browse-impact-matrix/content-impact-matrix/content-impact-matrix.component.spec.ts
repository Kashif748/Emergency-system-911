import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentImpactMatrixComponent } from './content-impact-matrix.component';

describe('ContentImpactMatrixComponent', () => {
  let component: ContentImpactMatrixComponent;
  let fixture: ComponentFixture<ContentImpactMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentImpactMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentImpactMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
