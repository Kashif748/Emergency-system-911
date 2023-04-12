import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtoListContentComponent } from './rto-list-content.component';

describe('RtoListContentComponent', () => {
  let component: RtoListContentComponent;
  let fixture: ComponentFixture<RtoListContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtoListContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtoListContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
