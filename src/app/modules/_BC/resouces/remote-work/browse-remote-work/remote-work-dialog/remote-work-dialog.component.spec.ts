import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteWorkDialogComponent } from './remote-work-dialog.component';

describe('RemoteWorkDialogComponent', () => {
  let component: RemoteWorkDialogComponent;
  let fixture: ComponentFixture<RemoteWorkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteWorkDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteWorkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
