import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpLevelWorkingDialogComponent } from './imp-level-working-dialog.component';

describe('ImpLevelWorkingDialogComponent', () => {
  let component: ImpLevelWorkingDialogComponent;
  let fixture: ComponentFixture<ImpLevelWorkingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpLevelWorkingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpLevelWorkingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
