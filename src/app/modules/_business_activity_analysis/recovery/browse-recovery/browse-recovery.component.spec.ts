import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseRecoveryComponent } from './browse-recovery.component';

describe('BrowseRecoveryComponent', () => {
  let component: BrowseRecoveryComponent;
  let fixture: ComponentFixture<BrowseRecoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseRecoveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
