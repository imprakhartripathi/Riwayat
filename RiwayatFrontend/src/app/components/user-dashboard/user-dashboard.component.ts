// user-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { UserNotificationComponent } from '../user-notification/user-notification.component';
import { UserCartComponent } from '../user-cart/user-cart.component';
import { UserOrdersComponent } from '../user-orders/user-orders.component';
import { UserFavoriteComponent } from '../user-favorite/user-favorite.component';
import { UserSettingsComponent } from '../user-settings/user-settings.component';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  notificationBadge=3;
  cartBadge = 2;

  categories = [
    {
      name: 'Catering',
      trendingServices: ['Italian Cuisine', 'Indian Buffet', 'Chinese Special']
    },
    {
      name: 'Venue',
      trendingServices: ['Beach Wedding', 'Garden Party', 'Banquet Hall']
    },
    {
      name: 'Entertainment',
      trendingServices: ['Live Band', 'DJ', 'Stand-up Comedy']
    },
    {
      name: 'Decorations',
      trendingServices: ['Floral Decor', 'Theme Lighting', 'Balloon Decor']
    }
  ];

  offers = [
    '10% off on Venue bookings',
    'Flat ₹500 off on Catering services',
    'Free DJ with Wedding Package'
  ];

  previousOrders = [
    'Italian Cuisine - ₹20,000',
    'Banquet Hall - ₹50,000',
    'Live Band - ₹15,000'
  ];

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  goToUserProfile() {
    this.router.navigate(['/userprofile']);
  }

  openNotificationDialog() {
    this.dialog.open(UserNotificationComponent,{
      width: '1000px', // Set the width of the dialog
      height: '500px', // Set the height of the dialog
      panelClass: 'custom-dialog-container', // Apply a custom CSS class
      data: {} // Pass any data you want to share with the component
    });
  }

  openCartDialog() {
    this.dialog.open(UserCartComponent,{
      width: '1000px', // Set the width of the dialog
      height: '500px', // Set the height of the dialog
      panelClass: 'custom-dialog-container', // Apply a custom CSS class
      data: {} // Pass any data you want to share with the component
    });
  }

  openOrdersDialog() {
    this.dialog.open(UserOrdersComponent,{
      width: '1000px', // Set the width of the dialog
      height: '500px', // Set the height of the dialog
      panelClass: 'custom-dialog-container', // Apply a custom CSS class
      data: {} // Pass any data you want to share with the component
    });
  }

  openFavoriteDialog() {
    this.dialog.open(UserFavoriteComponent,{
      width: '1000px', // Set the width of the dialog
      height: '500px', // Set the height of the dialog
      panelClass: 'custom-dialog-container', // Apply a custom CSS class
      data: {} // Pass any data you want to share with the component
    });
  }

  openSettingsDialog() {
    this.dialog.open(UserSettingsComponent,{
      width: '1000px', // Set the width of the dialog
      height: '500px', // Set the height of the dialog
      panelClass: 'custom-dialog-container', // Apply a custom CSS class
      data: {} // Pass any data you want to share with the component
    });
  }

}
