import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseRemoteWorkComponent } from './browse-remote-work.component';

describe('BrowseRemoteWorkComponent', () => {
  let component: BrowseRemoteWorkComponent;
  let fixture: ComponentFixture<BrowseRemoteWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseRemoteWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseRemoteWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
