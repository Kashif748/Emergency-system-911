import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentOrgDetailComponent } from './content-org-detail.component';

describe('ContentOrgDetailComponent', () => {
  let component: ContentOrgDetailComponent;
  let fixture: ComponentFixture<ContentOrgDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentOrgDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentOrgDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
