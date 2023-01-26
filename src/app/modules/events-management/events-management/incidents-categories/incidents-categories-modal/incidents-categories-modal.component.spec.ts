import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsCategoriesModalComponent } from './incidents-categories-modal.component';

describe('IncidentsCategoriesModalComponent', () => {
  let component: IncidentsCategoriesModalComponent;
  let fixture: ComponentFixture<IncidentsCategoriesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentsCategoriesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentsCategoriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
