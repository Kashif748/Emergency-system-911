import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShareLocationComponent } from './new-share-location.component';

describe('NewShareLocationComponent', () => {
  let component: NewShareLocationComponent;
  let fixture: ComponentFixture<NewShareLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewShareLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewShareLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
