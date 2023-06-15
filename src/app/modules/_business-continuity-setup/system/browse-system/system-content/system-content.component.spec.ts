import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemContentComponent } from './system-content.component';

describe('SystemContentComponent', () => {
  let component: SystemContentComponent;
  let fixture: ComponentFixture<SystemContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
