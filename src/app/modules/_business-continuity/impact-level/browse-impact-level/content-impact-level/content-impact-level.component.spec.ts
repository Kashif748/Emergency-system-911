import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentImpactLevelComponent } from './content-impact-level.component';

describe('ContentImpactLevelComponent', () => {
  let component: ContentImpactLevelComponent;
  let fixture: ComponentFixture<ContentImpactLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentImpactLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentImpactLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
