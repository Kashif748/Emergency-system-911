import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcWidgetComponent } from './bc-widget.component';

describe('BcWidgetComponent', () => {
  let component: BcWidgetComponent;
  let fixture: ComponentFixture<BcWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
