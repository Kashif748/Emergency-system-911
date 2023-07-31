import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseSystemsComponent } from './browse-systems.component';

describe('BrowseSystemsComponent', () => {
  let component: BrowseSystemsComponent;
  let fixture: ComponentFixture<BrowseSystemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseSystemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
