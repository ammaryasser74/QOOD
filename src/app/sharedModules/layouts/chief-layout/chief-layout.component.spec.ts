import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiefLayoutComponent } from './chief-layout.component';

describe('ChiefLayoutComponent', () => {
  let component: ChiefLayoutComponent;
  let fixture: ComponentFixture<ChiefLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiefLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiefLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
