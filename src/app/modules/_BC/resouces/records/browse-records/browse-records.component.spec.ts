import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseRecordsComponent } from './browse-records.component';

describe('BrowseRecordsComponent', () => {
  let component: BrowseRecordsComponent;
  let fixture: ComponentFixture<BrowseRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
