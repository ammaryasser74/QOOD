import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterChiefComponent } from './register-chief.component';

describe('RegisterChiefComponent', () => {
  let component: RegisterChiefComponent;
  let fixture: ComponentFixture<RegisterChiefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterChiefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterChiefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
