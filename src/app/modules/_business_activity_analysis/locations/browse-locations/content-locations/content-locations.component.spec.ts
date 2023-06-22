import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentLocationsComponent } from './content-locations.component';

describe('ContentLocationsComponent', () => {
  let component: ContentLocationsComponent;
  let fixture: ComponentFixture<ContentLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
