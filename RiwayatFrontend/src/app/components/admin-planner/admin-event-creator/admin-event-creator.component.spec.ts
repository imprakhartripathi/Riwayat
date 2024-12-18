import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventCreatorComponent } from './admin-event-creator.component';

describe('AdminEventCreatorComponent', () => {
  let component: AdminEventCreatorComponent;
  let fixture: ComponentFixture<AdminEventCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEventCreatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminEventCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
