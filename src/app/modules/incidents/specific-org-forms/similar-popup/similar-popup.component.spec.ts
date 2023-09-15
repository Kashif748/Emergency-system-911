import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarPopupComponent } from './similar-popup.component';

describe('SimilarPopupComponent', () => {
  let component: SimilarPopupComponent;
  let fixture: ComponentFixture<SimilarPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilarPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
