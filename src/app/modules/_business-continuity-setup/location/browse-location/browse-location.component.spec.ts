import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseLocationComponent } from './browse-location.component';

describe('BrowseLocationComponent', () => {
  let component: BrowseLocationComponent;
  let fixture: ComponentFixture<BrowseLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
