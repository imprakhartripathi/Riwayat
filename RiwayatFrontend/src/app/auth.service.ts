import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Observable to hold current user data
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Load any existing user data from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  // Login method to set user data
  login(userData: any) {
    this.currentUserSubject.next(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  }

  // Logout method to clear user data
  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  // Method to check if user is logged in
  isLoggedIn() {
    return this.currentUserSubject.value !== null;
  }

  // Method to get the current logged-in user
  getCurrentUser() {
    return this.currentUserSubject.value;
  }
}
