import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrioritySeqComponent } from './add-priority-seq.component';

describe('AddPrioritySeqComponent', () => {
  let component: AddPrioritySeqComponent;
  let fixture: ComponentFixture<AddPrioritySeqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPrioritySeqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPrioritySeqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
