import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  profileForm!: FormGroup;
  profilePicUrl: string = 'assets/user.png'; // For storing profile picture URL
  profit: number = 75; // Example monthly profit percentage

  admin = {name: 'Krishna Bansal', title: 'Event Planner (Admin)', phone: '+91 0987654321', email: 'imkrishnabansal@gmail.com'}

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      bio: ['', Validators.maxLength(200)],
      role: [{ value: 'Admin', disabled: true }],
      accountBalance: [{ value: 5000, disabled: true }],
      profilePic: ['']
    });

    this.loadProfile();
  }

  loadProfile(): void {
    const existingProfile = {
      name: 'Admin User',
      email: 'admin@example.com',
      phoneNumber: '1234567890',
      address: '123 Wedding Lane, Dream City',
      bio: 'Passionate about planning weddings and making dreams come true.',
      role: 'Admin',
      accountBalance: 5000,
      profilePic: '' // Load the profile picture if available
    };

    this.profileForm.patchValue(existingProfile);
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log('Profile updated:', this.profileForm.value);
      this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 });
    }
  }

  // Handle profile picture change
  onProfilePicChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicUrl = reader.result as string;
        this.profileForm.patchValue({ profilePic: this.profilePicUrl });
      };
      reader.readAsDataURL(file);
    }
  }
}
