import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderprevComponent } from './orderprev.component';

describe('OrderprevComponent', () => {
  let component: OrderprevComponent;
  let fixture: ComponentFixture<OrderprevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderprevComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderprevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
