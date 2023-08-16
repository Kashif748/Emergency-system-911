import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseVenderComponent } from './browse-vender.component';

describe('BrowseVenderComponent', () => {
  let component: BrowseVenderComponent;
  let fixture: ComponentFixture<BrowseVenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseVenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseVenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
