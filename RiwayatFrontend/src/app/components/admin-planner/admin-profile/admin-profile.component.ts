import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth/auth.service';
import { PlannerJsonService } from '../../../services/planner-json/planner-json.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss'],
})
export class AdminProfileComponent implements OnInit {
  profileData: any;
  plannerData: any;
  profileImage: string | ArrayBuffer | null = null;
  isEditing: boolean = false;
  editedProfileData: any;
  editDisabled: boolean = false;
  plannerOCP: number = 0;
  plannerRating: number = 0;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    private pjs: PlannerJsonService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Fetch logged-in user data from AuthService
    this.profileData = this.authService.getCurrentUser();
    console.log(this.profileData);
    this.editedProfileData = { ...this.profileData };
    this.profileImage = this.profileData?.image || 'assets/user.png';

    if (
      this.profileData.username === 'guestuser' ||
      this.profileData.username === 'planner'
    ) {
      this.editDisabled = true;
    }

    // Calculate target values
    const targetOCP = this.profileData.orderCompletionPercentage || 0;
    const targetRating = (this.profileData.rating || 0) * 2 * 10; // Convert rating to match progress scale

    // Gradually increase values
    this.animateProgress('plannerOCP', targetOCP);
    this.animateProgress('plannerRating', targetRating);
  }

  animateProgress(
    property: 'plannerOCP' | 'plannerRating',
    targetValue: number
  ) {
    const step = Math.ceil(targetValue / 50); // Adjust speed by changing divisor
    const interval = setInterval(() => {
      if (this[property] < targetValue) {
        this[property] += step;
        if (this[property] > targetValue) {
          this[property] = targetValue; // Ensure it doesn't exceed target
        }
      } else {
        clearInterval(interval);
      }
    }, 30); // Adjust speed by changing interval
  }

  onEdit() {
    this.isEditing = true;
  }

  goBack() {
    this.location.back();
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

  logOut() {
    this.authService.logout();
    this.dialog.closeAll();
    this.router.navigate(['/']);
  }
}
