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

  ngOnInit(): void {
    this.loadProfile();
  }

  goToUserProfile() {
    this.router.navigate(['/userprofile']);
  }

  goToUserHome() {
    this.router.navigate(['/user']);
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
      name: 'Prakhar Tripathi',
      email: 'imprakhartripathiofficial@gmail.com',
      phone: '+91 8707406448',
      userID: '4269'
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
