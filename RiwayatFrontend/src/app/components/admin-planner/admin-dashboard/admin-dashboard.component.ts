import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AdminEventCreatorComponent } from '../admin-event-creator/admin-event-creator.component';
import { AdminNotificationComponent } from '../admin-notification/admin-notification.component';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  notificationBadge=3;
  cartBadge = 2;

  constructor(private router: Router, public dialog: MatDialog) { }

  goToAdminProfile() {
    this.router.navigate(['/adminprofile']);
  }

  openAddEventDialog() {
    this.dialog.open(AdminEventCreatorComponent,{
      width: '1000px', // Set the width of the dialog
      height: 'auto', // Set the height of the dialog
      panelClass: 'custom-dialog-container', // Apply a custom CSS class
      data: {} // Pass any data you want to share with the component
    });
  }

  openSettingsDialog() {
    this.dialog.open(AdminEventCreatorComponent,{
      width: '1000px', // Set the width of the dialog
      height: '500px', // Set the height of the dialog
      panelClass: 'custom-dialog-container', // Apply a custom CSS class
      data: {} // Pass any data you want to share with the component
    });
  }

  openNotificationsDialog() {
    this.dialog.open(AdminNotificationComponent,{
      width: '1000px', // Set the width of the dialog
      height: '500px', // Set the height of the dialog
      panelClass: 'custom-dialog-container', // Apply a custom CSS class
      data: {} // Pass any data you want to share with the component
    });
  }
}

