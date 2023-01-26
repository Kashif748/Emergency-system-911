import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatePositionComponent } from './private-position.component';

describe('PrivatePositionComponent', () => {
  let component: PrivatePositionComponent;
  let fixture: ComponentFixture<PrivatePositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivatePositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
