import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiresChartsComponent } from './inquires-charts.component';

describe('InquiresChartsComponent', () => {
  let component: InquiresChartsComponent;
  let fixture: ComponentFixture<InquiresChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiresChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiresChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
