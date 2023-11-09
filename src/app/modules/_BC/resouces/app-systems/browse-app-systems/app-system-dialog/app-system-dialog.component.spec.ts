import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSystemDialogComponent } from './app-system-dialog.component';

describe('AppSystemDialogComponent', () => {
  let component: AppSystemDialogComponent;
  let fixture: ComponentFixture<AppSystemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSystemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSystemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
