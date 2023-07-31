import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentImpLevelWorkingComponent } from './content-imp-level-working.component';

describe('ContentImpLevelWorkingComponent', () => {
  let component: ContentImpLevelWorkingComponent;
  let fixture: ComponentFixture<ContentImpLevelWorkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentImpLevelWorkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentImpLevelWorkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
