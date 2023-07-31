import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentLocationTypeComponent } from './content-location-type.component';

describe('ContentLocationTypeComponent', () => {
  let component: ContentLocationTypeComponent;
  let fixture: ComponentFixture<ContentLocationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentLocationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentLocationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
