import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticatorComponent } from '../../authenticator/authenticator.component'; // Adjust the path as needed

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  features = [
    { title: 'Wedding Planning', description: 'Hey! Wedding Planners, need a tool to Book and Manage the Vendors, We are here for You.' },
    { title: 'Birthday Parties', description: 'Multiple Packeges & Deals on Birthday Parties.' },
    { title: 'Social Gathering', description: 'Book the Catering and Venue together for Social Events.' },
    { title: 'Private Service', description: 'Get Private Service at Your Home for any event you want.' },
    { title: 'Bulk Order Catering', description: 'Book Proper Catering Services With Cooks and Servers.' },
    { title: 'Mini Project', description: 'This Project is our Mini Project for 3rd Year of B. Tech-CS at GLA University' }
  ];

  constructor(private router: Router, public dialog: MatDialog) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  openLoginDialog() {
    this.dialog.open(AuthenticatorComponent, {
      width: '1000px', // Set the width of the dialog
      height: '500px', // Set the height of the dialog
      panelClass: 'custom-dialog-container', // Apply a custom CSS class
      data: {} // Pass any data you want to share with the component
    });
  }
  
}
