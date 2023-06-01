import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseOrgDetailComponent } from './browse-org-detail.component';

describe('BrowseOrgDetailComponent', () => {
  let component: BrowseOrgDetailComponent;
  let fixture: ComponentFixture<BrowseOrgDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseOrgDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseOrgDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
