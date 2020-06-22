import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeekelyDealsComponent } from './add-weekely-deals.component';

describe('AddWeekelyDealsComponent', () => {
  let component: AddWeekelyDealsComponent;
  let fixture: ComponentFixture<AddWeekelyDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWeekelyDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWeekelyDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
