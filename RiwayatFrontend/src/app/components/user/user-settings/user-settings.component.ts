import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../auth.service'; // Import AuthService

interface UserSettings {
  notifications: boolean;
  homeAddress: string;
  officeAddress: string;
  latestOffers: boolean;
}

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit{
  settings: UserSettings = {
    notifications: true,
    homeAddress: '159, Radha City, Mathura',
    officeAddress: 'GLA University, NH19, Mathura',
    latestOffers: false
  };

  constructor(private router: Router, public dialog: MatDialog, private authService: AuthService) {}
  profileData: any;
  isUpdated: boolean = false;
  message: string = '';

  ngOnInit(): void {
    // Fetch logged-in user data from AuthService
    this.profileData = this.authService.getCurrentUser();
  }

  // Mark settings as updated
  markAsUpdated(): void {
    this.isUpdated = true;
  }

  // Save the settings
  saveSettings(): void {
    // Logic to save settings (e.g., send to API)
    this.message = 'Settings saved successfully!';
    this.isUpdated = false;
  }
}
