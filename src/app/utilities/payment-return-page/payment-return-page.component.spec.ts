import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReturnPageComponent } from './payment-return-page.component';

describe('PaymentReturnPageComponent', () => {
  let component: PaymentReturnPageComponent;
  let fixture: ComponentFixture<PaymentReturnPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentReturnPageComponent]
    });
    fixture = TestBed.createComponent(PaymentReturnPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
