import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentGroupsComponent } from './incident-groups.component';

describe('IncidentGroupsComponent', () => {
  let component: IncidentGroupsComponent;
  let fixture: ComponentFixture<IncidentGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
