import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyBrevityComponent } from './daily-brevity.component';

describe('DailyBrevityComponent', () => {
  let component: DailyBrevityComponent;
  let fixture: ComponentFixture<DailyBrevityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyBrevityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyBrevityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
