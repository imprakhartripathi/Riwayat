import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { UserNotificationComponent } from '../user-notification/user-notification.component';
import { UserCartComponent } from '../user-cart/user-cart.component';
import { UserOrdersComponent } from '../user-orders/user-orders.component';
import { UserFavoriteComponent } from '../user-favorite/user-favorite.component';
import { UserSettingsComponent } from '../user-settings/user-settings.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'] // Corrected: 'styleUrls' should be plural
})
export class UserProfileComponent implements OnInit {
  notificationBadge = 3;
  cartBadge = 2;
  profileData: any;
  profileImage: string | ArrayBuffer | null = null;
  isEditing: boolean = false;
  editedProfileData: any;
  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {}

  goToUserProfile() {
    this.router.navigate(['/userprofile']);
  }

  openNotificationDialog() {
    this.dialog.open(UserNotificationComponent, {
      width: '1000px',
      height: '500px',
      panelClass: 'custom-dialog-container',
      data: {}
    });
  }

  openCartDialog() {
    this.dialog.open(UserCartComponent, {
      width: '1000px',
      height: '500px',
      panelClass: 'custom-dialog-container',
      data: {}
    });
  }

  openOrdersDialog() {
    this.dialog.open(UserOrdersComponent, {
      width: '1000px',
      height: '500px',
      panelClass: 'custom-dialog-container',
      data: {}
    });
  }

  openFavoriteDialog() {
    this.dialog.open(UserFavoriteComponent, {
      width: '1000px',
      height: '500px',
      panelClass: 'custom-dialog-container',
      data: {}
    });
  }

  openSettingsDialog() {
    this.dialog.open(UserSettingsComponent, {
      width: '1000px',
      height: '500px',
      panelClass: 'custom-dialog-container',
      data: {}
    });
  }

  loadProfile() {
    // Fetch profile data and populate the form
    this.profileData = {
      name: 'Dr. John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      specialty: 'Cardiologist',
      experience: '10 years',
      bio: 'Experienced cardiologist with a demonstrated history of working in the hospital & health care industry.'
    };
    this.editedProfileData = { ...this.profileData };
    this.profileImage = 'assets/profile-image.jpg'; // Placeholder image
  }

  onEdit() {
    this.isEditing = true;
  }

  onSave() {
    this.isEditing = false;
    this.profileData = { ...this.editedProfileData };
  }

  onCancel() {
    this.isEditing = false;
    this.editedProfileData = { ...this.profileData };
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImage = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
