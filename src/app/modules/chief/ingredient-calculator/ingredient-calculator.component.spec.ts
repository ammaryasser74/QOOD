import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientCalculatorComponent } from './ingredient-calculator.component';

describe('IngredientCalculatorComponent', () => {
  let component: IngredientCalculatorComponent;
  let fixture: ComponentFixture<IngredientCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
