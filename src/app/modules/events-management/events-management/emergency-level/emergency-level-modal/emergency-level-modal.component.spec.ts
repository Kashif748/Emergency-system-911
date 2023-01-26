import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyLevelModalComponent } from './emergency-level-modal.component';

describe('EmergencyLevelModalComponent', () => {
  let component: EmergencyLevelModalComponent;
  let fixture: ComponentFixture<EmergencyLevelModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyLevelModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyLevelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
