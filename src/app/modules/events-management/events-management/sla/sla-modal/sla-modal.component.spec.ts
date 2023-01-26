import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaModalComponent } from './sla-modal.component';

describe('SlaModalComponent', () => {
  let component: SlaModalComponent;
  let fixture: ComponentFixture<SlaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
