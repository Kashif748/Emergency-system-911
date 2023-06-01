import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentRtoComponent } from './content-rto.component';

describe('ContentRtoComponent', () => {
  let component: ContentRtoComponent;
  let fixture: ComponentFixture<ContentRtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentRtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentRtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
