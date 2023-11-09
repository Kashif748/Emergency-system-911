import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraContentComponent } from './infra-content.component';

describe('InfraContentComponent', () => {
  let component: InfraContentComponent;
  let fixture: ComponentFixture<InfraContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfraContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfraContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
