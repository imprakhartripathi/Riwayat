import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


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
}

