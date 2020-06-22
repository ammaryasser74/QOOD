import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetMyPasswordComponent } from './reset-mypassword.component';

describe('ResetPasswordComponent', () => {
  let component: ResetMyPasswordComponent;
  let fixture: ComponentFixture<ResetMyPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetMyPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetMyPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
