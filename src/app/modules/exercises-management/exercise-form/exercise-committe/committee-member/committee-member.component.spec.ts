import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeMemberComponent } from './committee-member.component';

describe('CommitteeMemberComponent', () => {
  let component: CommitteeMemberComponent;
  let fixture: ComponentFixture<CommitteeMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitteeMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitteeMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
