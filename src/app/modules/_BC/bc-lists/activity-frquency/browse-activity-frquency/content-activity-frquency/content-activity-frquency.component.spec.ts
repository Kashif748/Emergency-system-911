import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentActivityFrquencyComponent } from './content-activity-frquency.component';

describe('ContentActivityFrquencyComponent', () => {
  let component: ContentActivityFrquencyComponent;
  let fixture: ComponentFixture<ContentActivityFrquencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentActivityFrquencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentActivityFrquencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
