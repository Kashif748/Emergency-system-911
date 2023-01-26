import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryTableComponent } from './inquiry-table.component';

describe('InquiryTableComponent', () => {
  let component: InquiryTableComponent;
  let fixture: ComponentFixture<InquiryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
