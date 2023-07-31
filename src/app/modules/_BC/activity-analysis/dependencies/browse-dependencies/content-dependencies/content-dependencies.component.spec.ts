import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDependenciesComponent } from './content-dependencies.component';

describe('ContentDependenciesComponent', () => {
  let component: ContentDependenciesComponent;
  let fixture: ComponentFixture<ContentDependenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentDependenciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentDependenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
