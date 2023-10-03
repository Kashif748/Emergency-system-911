import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseBiaAppComponent } from './browse-bia-app.component';

describe('BrowseBiaAppComponent', () => {
  let component: BrowseBiaAppComponent;
  let fixture: ComponentFixture<BrowseBiaAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseBiaAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseBiaAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
