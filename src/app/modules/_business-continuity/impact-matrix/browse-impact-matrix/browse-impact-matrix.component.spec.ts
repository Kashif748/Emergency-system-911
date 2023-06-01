import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseImpactMatrixComponent } from './browse-impact-matrix.component';

describe('BrowseImpactMatrixComponent', () => {
  let component: BrowseImpactMatrixComponent;
  let fixture: ComponentFixture<BrowseImpactMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseImpactMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseImpactMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
