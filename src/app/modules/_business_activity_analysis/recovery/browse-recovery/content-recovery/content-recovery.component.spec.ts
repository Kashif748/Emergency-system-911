import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentRecoveryComponent } from './content-recovery.component';

describe('ContentRecoveryComponent', () => {
  let component: ContentRecoveryComponent;
  let fixture: ComponentFixture<ContentRecoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentRecoveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
