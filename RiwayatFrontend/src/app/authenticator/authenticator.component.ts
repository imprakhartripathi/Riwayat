import { Component, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.scss']
})
export class AuthenticatorComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';  // For signup
  isLogin: boolean = true;  // To toggle between login and signup

  // Change private to public so it can be accessed in the template
  constructor(private router: Router, @Optional() public dialogRef: MatDialogRef<AuthenticatorComponent>) {}

  toggleAuth() {
    this.isLogin = !this.isLogin;
  }

  onSubmit() {
    if (this.isLogin) {
      // Login logic
      if (this.username === 'admin' && this.password === 'admin') {
        this.router.navigate(['/admin']);
      } else if (this.username === 'user' && this.password === 'user') {
        this.router.navigate(['/user']);
      } else if (this.username === 'serviceprov' && this.password === 'serviceprov') {
        this.router.navigate(['/serviceprov']);
      } else {
        alert('Invalid credentials');
      }
    } else {
      // Sign up logic (you can add validation like password match, etc.)
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match');
      } else {
        alert('Account created successfully');
        // Handle account creation here
      }
    }

    // Close the dialog only if it's opened in a dialog
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  // Method to navigate to the showcase route
  goToShowcase() {
    this.router.navigate(['/showcase']);
  }
}
