import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseOrganizationsComponent } from './browse-organizations.component';

describe('BrowseOrganizationsComponent', () => {
  let component: BrowseOrganizationsComponent;
  let fixture: ComponentFixture<BrowseOrganizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseOrganizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
