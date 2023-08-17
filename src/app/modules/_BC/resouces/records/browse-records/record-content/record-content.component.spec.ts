import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordContentComponent } from './record-content.component';

describe('RecordContentComponent', () => {
  let component: RecordContentComponent;
  let fixture: ComponentFixture<RecordContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
