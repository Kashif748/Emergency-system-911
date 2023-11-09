import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteWorkContentComponent } from './remote-work-content.component';

describe('RemoteWorkContentComponent', () => {
  let component: RemoteWorkContentComponent;
  let fixture: ComponentFixture<RemoteWorkContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteWorkContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteWorkContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
