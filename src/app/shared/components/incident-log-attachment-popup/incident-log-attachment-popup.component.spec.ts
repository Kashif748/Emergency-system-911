import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentLogAttachmentPopupComponent } from './incident-log-attachment-popup.component';

describe('IncidentLogAttachmentPopupComponent', () => {
  let component: IncidentLogAttachmentPopupComponent;
  let fixture: ComponentFixture<IncidentLogAttachmentPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentLogAttachmentPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentLogAttachmentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
