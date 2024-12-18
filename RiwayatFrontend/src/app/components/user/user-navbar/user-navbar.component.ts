import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../auth.service'; // Import AuthService
import { UserNotificationComponent } from '../user-notification/user-notification.component';
import { UserCartComponent } from '../user-cart/user-cart.component';
import { UserOrdersComponent } from '../user-orders/user-orders.component';
import { UserFavoriteComponent } from '../user-favorite/user-favorite.component';
import { UserSettingsComponent } from '../user-settings/user-settings.component';
import { UserSearchDialogComponent } from '../user-search-dialog/user-search-dialog.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent implements OnDestroy {
  private searchDialogRef: MatDialogRef<UserSearchDialogComponent> | null = null;
  private notificationDialogRef: MatDialogRef<UserNotificationComponent> | null = null;
  private cartDialogRef: MatDialogRef<UserCartComponent> | null = null;
  private ordersDialogRef: MatDialogRef<UserOrdersComponent> | null = null;
  private favoriteDialogRef: MatDialogRef<UserFavoriteComponent> | null = null;
  private settingsDialogRef: MatDialogRef<UserSettingsComponent> | null = null;
  private userProfileDialogRef: MatDialogRef<UserProfileComponent> | null = null;

  constructor(private router: Router, public dialog: MatDialog, private authService: AuthService) {
    // Listen for the '/' keypress
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  profileData: any;
  profileImage: string | ArrayBuffer | null = null;

  ngOnInit(){
    this.profileData = this.authService.getCurrentUser();
    this.profileImage = this.profileData?.image || 'assets/user.png'; // Use profile image if available
  }

  ngOnDestroy(): void {
    // Clean up the event listener on component destruction
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === '/') {
      event.preventDefault(); // Prevent default browser behavior
      this.toggleSearchDialog();
    }
  }

  toggleSearchDialog(): void {
    if (this.searchDialogRef) {
      this.searchDialogRef.close();
      this.searchDialogRef = null;
    } else {
      this.searchDialogRef = this.dialog.open(UserSearchDialogComponent, {
        width: '1000px',
        height: 'auto',
        panelClass: 'custom-dialog-container',
      });
      this.searchDialogRef.afterClosed().subscribe(() => this.searchDialogRef = null);
    }
  }

  openNotificationDialog(): void {
    if (!this.notificationDialogRef) {
      this.notificationDialogRef = this.dialog.open(UserNotificationComponent, {
        width: '1000px',
        height: '500px',
        panelClass: 'custom-dialog-container',
      });
      this.notificationDialogRef.afterClosed().subscribe(() => this.notificationDialogRef = null);
    }
  }

  openCartDialog(): void {
    if (!this.cartDialogRef) {
      this.cartDialogRef = this.dialog.open(UserCartComponent, {
        width: '1000px',
        height: '500px',
        panelClass: 'custom-dialog-container',
      });
      this.cartDialogRef.afterClosed().subscribe(() => this.cartDialogRef = null);
    }
  }

  openOrdersDialog(): void {
    if (!this.ordersDialogRef) {
      this.ordersDialogRef = this.dialog.open(UserOrdersComponent, {
        width: '1000px',
        height: '500px',
        panelClass: 'custom-dialog-container',
      });
      this.ordersDialogRef.afterClosed().subscribe(() => this.ordersDialogRef = null);
    }
  }

  openFavoriteDialog(): void {
    if (!this.favoriteDialogRef) {
      this.favoriteDialogRef = this.dialog.open(UserFavoriteComponent, {
        width: '1000px',
        height: '500px',
        panelClass: 'custom-dialog-container',
      });
      this.favoriteDialogRef.afterClosed().subscribe(() => this.favoriteDialogRef = null);
    }
  }

  openSettingsDialog(): void {
    if (!this.settingsDialogRef) {
      this.settingsDialogRef = this.dialog.open(UserSettingsComponent, {
        width: '1000px',
        height: 'auto',
        panelClass: 'custom-dialog-container',
      });
      this.settingsDialogRef.afterClosed().subscribe(() => this.settingsDialogRef = null);
    }
  }

  goToUserProfile(): void {
    if (!this.userProfileDialogRef) {
      this.userProfileDialogRef = this.dialog.open(UserProfileComponent, {
        width: '1000px',
        height: 'auto',
        panelClass: 'custom-dialog-container',
      });
      this.userProfileDialogRef.afterClosed().subscribe(() => this.userProfileDialogRef = null);
    }
  }

  goToUserHome(): void {
    this.router.navigate(['/user']);
  }
}
