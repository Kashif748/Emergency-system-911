import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickOrgComponent } from './pick-org.component';

describe('PickOrgComponent', () => {
  let component: PickOrgComponent;
  let fixture: ComponentFixture<PickOrgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickOrgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
