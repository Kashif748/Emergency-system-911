import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupIncidentsCategroiesComponent } from './group-incidents-categroies.component';

describe('GroupIncidentsCategroiesComponent', () => {
  let component: GroupIncidentsCategroiesComponent;
  let fixture: ComponentFixture<GroupIncidentsCategroiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupIncidentsCategroiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupIncidentsCategroiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
