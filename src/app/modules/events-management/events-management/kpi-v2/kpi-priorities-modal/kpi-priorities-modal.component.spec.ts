import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiPrioritiesModalComponent } from './kpi-priorities-modal.component';

describe('KpiPrioritiesModalComponent', () => {
  let component: KpiPrioritiesModalComponent;
  let fixture: ComponentFixture<KpiPrioritiesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiPrioritiesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiPrioritiesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
