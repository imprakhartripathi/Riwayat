import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../auth.service'; // Import AuthService

@Component({
  selector: 'app-user-notification',
  templateUrl: './user-notification.component.html',
  styleUrls: ['./user-notification.component.scss']
})
export class UserNotificationComponent implements OnInit {

  profileData: any;
  notifications: any[] = []; // Define a property to hold notifications

  constructor(private router: Router, public dialog: MatDialog, private authService: AuthService) {}

  ngOnInit(): void {
    // Get current user data from AuthService
    this.profileData = this.authService.getCurrentUser();

    // Check if profileData exists and has notifications, then assign to notifications property
    if (this.profileData && this.profileData.notifications) {
      this.notifications = this.profileData.notifications;
    }
  }
}
