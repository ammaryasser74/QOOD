import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroceryComponent } from './add-grocery.component';

describe('AddGroceryComponent', () => {
  let component: AddGroceryComponent;
  let fixture: ComponentFixture<AddGroceryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGroceryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroceryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
