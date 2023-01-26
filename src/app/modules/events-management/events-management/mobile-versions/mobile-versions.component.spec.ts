import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileVersionsComponent } from './mobile-versions.component';

describe('MobileVersionsComponent', () => {
  let component: MobileVersionsComponent;
  let fixture: ComponentFixture<MobileVersionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileVersionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
