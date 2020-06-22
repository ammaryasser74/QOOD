import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayDishModalComponent } from './day-dish-modal.component';

describe('DayDishModalComponent', () => {
  let component: DayDishModalComponent;
  let fixture: ComponentFixture<DayDishModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayDishModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayDishModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
