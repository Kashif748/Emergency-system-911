import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToOrgsComponent } from './to-orgs.component';

describe('ToOrgsComponent', () => {
  let component: ToOrgsComponent;
  let fixture: ComponentFixture<ToOrgsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToOrgsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToOrgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
