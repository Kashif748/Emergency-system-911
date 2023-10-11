import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLocationDialogComponent } from './location-dialog.component';

describe('ActivityLocationDialogComponent', () => {
  let component: ActivityLocationDialogComponent;
  let fixture: ComponentFixture<ActivityLocationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityLocationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityLocationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
