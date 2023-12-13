import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupGisComponent } from './group-gis.component';

describe('GroupGisComponent', () => {
  let component: GroupGisComponent;
  let fixture: ComponentFixture<GroupGisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupGisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupGisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
