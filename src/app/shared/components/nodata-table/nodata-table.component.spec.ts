import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodataTableComponent } from './nodata-table.component';

describe('NodataTableComponent', () => {
  let component: NodataTableComponent;
  let fixture: ComponentFixture<NodataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
