import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderBuildComponent } from './under-build.component';

describe('UnderBuildComponent', () => {
  let component: UnderBuildComponent;
  let fixture: ComponentFixture<UnderBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
