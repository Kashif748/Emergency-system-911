import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseSystemComponent } from './browse-system.component';

describe('BrowseSystemComponent', () => {
  let component: BrowseSystemComponent;
  let fixture: ComponentFixture<BrowseSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
