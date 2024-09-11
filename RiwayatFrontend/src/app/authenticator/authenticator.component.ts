import { Component, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.scss']
})
export class AuthenticatorComponent {
  isLogin: boolean = true;
  authForm: FormGroup;

  constructor(private router: Router, @Optional() public dialogRef: MatDialogRef<AuthenticatorComponent>, private fb: FormBuilder) {
    this.authForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: [''],
      phone: [''],
      newPassword: ['']
    });
  }

  toggleAuth() {
    this.isLogin = !this.isLogin;
  }

  onSubmit() {
    if (this.isLogin) {
      if (this.authForm.valid) {
        const { username, password } = this.authForm.value;
        // Login logic
        if (username === 'admin' && password === 'admin') {
          this.router.navigate(['/admin']);
        } else if (username === 'user' && password === 'user') {
          this.router.navigate(['/user']);
        } else if (username === 'serviceprov' && password === 'serviceprov') {
          this.router.navigate(['/serviceprov']);
        } else {
          alert('Invalid credentials');
        }
      } else {
        alert('Please fill out all fields correctly');
      }
    } else {
      // Sign-up logic
      if (this.authForm.valid) {
        alert('Account created successfully');
        console.log(this.authForm.value);
        // Additional account creation handling
      } else {
        alert('Please fill out all fields correctly');
      }
    }

    // Close the dialog if opened in a dialog
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  goToShowcase() {
    this.router.navigate(['/showcase']);
  }
}
