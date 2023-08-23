import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseInfraReqComponent } from './browse-infra-req.component';

describe('BrowseInfraReqComponent', () => {
  let component: BrowseInfraReqComponent;
  let fixture: ComponentFixture<BrowseInfraReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseInfraReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseInfraReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
