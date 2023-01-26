import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RanksModalComponent } from './ranks-modal.component';

describe('RanksModalComponent', () => {
  let component: RanksModalComponent;
  let fixture: ComponentFixture<RanksModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RanksModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RanksModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
