import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentBiaAppComponent } from './content-bia-app.component';

describe('ContentBiaAppComponent', () => {
  let component: ContentBiaAppComponent;
  let fixture: ComponentFixture<ContentBiaAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentBiaAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentBiaAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
