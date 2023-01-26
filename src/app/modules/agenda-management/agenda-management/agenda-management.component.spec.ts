import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaManagementComponent } from './agenda-management.component';

describe('AgendaManagementComponent', () => {
  let component: AgendaManagementComponent;
  let fixture: ComponentFixture<AgendaManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
