import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenciesDialogComponent } from './dependencies-dialog.component';

describe('DependenciesDialogComponent', () => {
  let component: DependenciesDialogComponent;
  let fixture: ComponentFixture<DependenciesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependenciesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependenciesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
