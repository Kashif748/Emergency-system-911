import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderDialogComponent } from './vender-dialog.component';

describe('VenderDialogComponent', () => {
  let component: VenderDialogComponent;
  let fixture: ComponentFixture<VenderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
