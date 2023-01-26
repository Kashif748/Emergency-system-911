import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidDahsboardComponent } from './covid-dahsboard.component';

describe('CovidDahsboardComponent', () => {
  let component: CovidDahsboardComponent;
  let fixture: ComponentFixture<CovidDahsboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidDahsboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidDahsboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
