import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactLevelDialogComponent } from './impact-level-dialog.component';

describe('ImpactLevelDialogComponent', () => {
  let component: ImpactLevelDialogComponent;
  let fixture: ComponentFixture<ImpactLevelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpactLevelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactLevelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
