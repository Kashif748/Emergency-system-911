import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MainCategoryWidgetComponent} from './main-category-widget.component';

describe('MainCategoryWidgetComponent', () => {
  let component: MainCategoryWidgetComponent;
  let fixture: ComponentFixture<MainCategoryWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCategoryWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCategoryWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
