import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerficationCodeComponent } from './verfication-code.component';

describe('VerficationCodeComponent', () => {
  let component: VerficationCodeComponent;
  let fixture: ComponentFixture<VerficationCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerficationCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerficationCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
