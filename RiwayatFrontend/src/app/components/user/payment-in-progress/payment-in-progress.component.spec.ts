import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentInProgressComponent } from './payment-in-progress.component';

describe('PaymentInProgressComponent', () => {
  let component: PaymentInProgressComponent;
  let fixture: ComponentFixture<PaymentInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentInProgressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
