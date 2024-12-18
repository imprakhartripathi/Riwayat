import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../auth.service'; // Import AuthService
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileData: any;
  profileImage: string | ArrayBuffer | null = null;
  isEditing: boolean = false;
  editedProfileData: any;

  constructor(private router: Router, public dialog: MatDialog, private authService: AuthService) {}

  ngOnInit(): void {
    // Fetch logged-in user data from AuthService
    this.profileData = this.authService.getCurrentUser();
    this.editedProfileData = { ...this.profileData };
    this.profileImage = this.profileData?.image || 'assets/user.png'; // Use profile image if available
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

  openPaymentDialog(): void {
    this.dialog.open(PaymentDialogComponent, {
      width: '400px'
    });
  }

  logOut() {
    this.authService.logout();
    this.dialog.closeAll();
    this.router.navigate(['/']);
  }
}
