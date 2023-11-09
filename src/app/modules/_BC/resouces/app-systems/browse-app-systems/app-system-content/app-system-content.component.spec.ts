import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSystemContentComponent } from './app-system-content.component';

describe('AppSystemContentComponent', () => {
  let component: AppSystemContentComponent;
  let fixture: ComponentFixture<AppSystemContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSystemContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSystemContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
