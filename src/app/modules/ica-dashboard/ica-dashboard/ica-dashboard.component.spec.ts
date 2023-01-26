import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcaDashboardComponent } from './ica-dashboard.component';

describe('IcaDashboardComponent', () => {
  let component: IcaDashboardComponent;
  let fixture: ComponentFixture<IcaDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
