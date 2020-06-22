import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderModalDetailsComponent } from './order-modal-details.component';

describe('OrderModalDetailsComponent', () => {
  let component: OrderModalDetailsComponent;
  let fixture: ComponentFixture<OrderModalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderModalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderModalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
