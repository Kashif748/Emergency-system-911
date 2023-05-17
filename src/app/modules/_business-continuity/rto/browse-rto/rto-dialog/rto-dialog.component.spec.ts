import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtoDialogComponent } from './rto-dialog.component';

describe('RtoDialogComponent', () => {
  let component: RtoDialogComponent;
  let fixture: ComponentFixture<RtoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
