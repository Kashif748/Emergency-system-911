import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseStaffReqComponent } from './browse-staff-req.component';

describe('BrowseStaffReqComponent', () => {
  let component: BrowseStaffReqComponent;
  let fixture: ComponentFixture<BrowseStaffReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseStaffReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseStaffReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
