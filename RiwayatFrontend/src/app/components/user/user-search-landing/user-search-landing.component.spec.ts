import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchLandingComponent } from './user-search-landing.component';

describe('UserSearchLandingComponent', () => {
  let component: UserSearchLandingComponent;
  let fixture: ComponentFixture<UserSearchLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSearchLandingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSearchLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
