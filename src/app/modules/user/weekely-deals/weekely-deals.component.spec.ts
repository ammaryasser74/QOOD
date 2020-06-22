import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekelyDealsComponent } from './weekely-deals.component';

describe('WeekelyDealsComponent', () => {
  let component: WeekelyDealsComponent;
  let fixture: ComponentFixture<WeekelyDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekelyDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekelyDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
