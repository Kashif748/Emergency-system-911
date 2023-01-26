import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyLevelComponent } from './emergency-level.component';

describe('EmergencyLevelComponent', () => {
  let component: EmergencyLevelComponent;
  let fixture: ComponentFixture<EmergencyLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
