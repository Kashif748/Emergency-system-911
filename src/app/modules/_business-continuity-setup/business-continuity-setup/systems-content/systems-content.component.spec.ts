import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemsContentComponent } from './systems-content.component';

describe('SystemsContentComponent', () => {
  let component: SystemsContentComponent;
  let fixture: ComponentFixture<SystemsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
