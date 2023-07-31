import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgDetailDialogComponent } from './org-detail-dialog.component';

describe('OrgDetailDialogComponent', () => {
  let component: OrgDetailDialogComponent;
  let fixture: ComponentFixture<OrgDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
