import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferLandingComponent } from './offer-landing.component';

describe('OfferLandingComponent', () => {
  let component: OfferLandingComponent;
  let fixture: ComponentFixture<OfferLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfferLandingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfferLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
