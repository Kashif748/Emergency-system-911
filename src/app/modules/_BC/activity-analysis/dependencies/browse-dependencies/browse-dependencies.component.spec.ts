import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseDependenciesComponent } from './browse-dependencies.component';

describe('BrowseDependenciesComponent', () => {
  let component: BrowseDependenciesComponent;
  let fixture: ComponentFixture<BrowseDependenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseDependenciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseDependenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
