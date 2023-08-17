import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseAppSystemsComponent } from './browse-app-systems.component';

describe('BrowseAppSystemsComponent', () => {
  let component: BrowseAppSystemsComponent;
  let fixture: ComponentFixture<BrowseAppSystemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseAppSystemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseAppSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
