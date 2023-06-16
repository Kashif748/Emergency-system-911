import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderContentComponent } from './vender-content.component';

describe('VenderContentComponent', () => {
  let component: VenderContentComponent;
  let fixture: ComponentFixture<VenderContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenderContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenderContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
