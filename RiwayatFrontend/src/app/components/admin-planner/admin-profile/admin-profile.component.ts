import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth/auth.service'; // Import AuthService

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss'],
})
export class AdminProfileComponent implements OnInit {
  profileData: any;
  profileImage: string | ArrayBuffer | null = null;
  isEditing: boolean = false;
  editedProfileData: any;
  editDisabled: boolean = false;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Fetch logged-in user data from AuthService
    this.profileData = this.authService.getCurrentUser();
    this.editedProfileData = { ...this.profileData };
    this.profileImage = this.profileData?.image || 'assets/user.png'; // Use profile image if available

    if (this.profileData.username === 'guestuser' || this.profileData.username === 'planner') {
      this.editDisabled = true;
    }
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

  

  logOut() {
    this.authService.logout();
    this.dialog.closeAll();
    this.router.navigate(['/']);
  }
}
