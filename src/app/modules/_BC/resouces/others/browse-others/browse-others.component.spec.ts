import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseOthersComponent } from './browse-others.component';

describe('BrowseOthersComponent', () => {
  let component: BrowseOthersComponent;
  let fixture: ComponentFixture<BrowseOthersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseOthersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
