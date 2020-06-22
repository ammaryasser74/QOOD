import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceReciptComponent } from './invoice-recipt.component';

describe('InvoiceReciptComponent', () => {
  let component: InvoiceReciptComponent;
  let fixture: ComponentFixture<InvoiceReciptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceReciptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceReciptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
