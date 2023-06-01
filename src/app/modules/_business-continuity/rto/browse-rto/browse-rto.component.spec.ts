import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseRtoComponent } from './browse-rto.component';

describe('BrowseRtoComponent', () => {
  let component: BrowseRtoComponent;
  let fixture: ComponentFixture<BrowseRtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseRtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseRtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
