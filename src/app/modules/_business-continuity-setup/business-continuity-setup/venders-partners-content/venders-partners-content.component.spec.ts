import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendersPartnersContentComponent } from './venders-partners-content.component';

describe('VendersPartnersContentComponent', () => {
  let component: VendersPartnersContentComponent;
  let fixture: ComponentFixture<VendersPartnersContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendersPartnersContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendersPartnersContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
