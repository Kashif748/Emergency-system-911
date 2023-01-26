import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalRisksComponent } from './local-risks.component';

describe('LocalRisksComponent', () => {
  let component: LocalRisksComponent;
  let fixture: ComponentFixture<LocalRisksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalRisksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalRisksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
