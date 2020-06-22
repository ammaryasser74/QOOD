import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuShoppingComponent } from './continu-shopping.component';

describe('ContinuShoppingComponent', () => {
  let component: ContinuShoppingComponent;
  let fixture: ComponentFixture<ContinuShoppingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContinuShoppingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinuShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
