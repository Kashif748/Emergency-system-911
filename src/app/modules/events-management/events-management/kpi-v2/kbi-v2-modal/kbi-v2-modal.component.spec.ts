import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbiV2ModalComponent } from './kbi-v2-modal.component';

describe('KbiV2ModalComponent', () => {
  let component: KbiV2ModalComponent;
  let fixture: ComponentFixture<KbiV2ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbiV2ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbiV2ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
