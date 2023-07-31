import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSystemsComponent } from './content-systems.component';

describe('ContentSystemsComponent', () => {
  let component: ContentSystemsComponent;
  let fixture: ComponentFixture<ContentSystemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentSystemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
