import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraDialogComponent } from './infra-dialog.component';

describe('InfraDialogComponent', () => {
  let component: InfraDialogComponent;
  let fixture: ComponentFixture<InfraDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfraDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfraDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
