import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentOrganizationsComponent } from './content-organizations.component';

describe('ContentOrganizationsComponent', () => {
  let component: ContentOrganizationsComponent;
  let fixture: ComponentFixture<ContentOrganizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentOrganizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
