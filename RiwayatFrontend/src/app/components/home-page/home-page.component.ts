import { Component } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  features = [
    { title: 'Trending Services', description: 'Discover the most popular services for your events.' },
    { title: 'Multi-Service Booking', description: 'Book multiple services in a single click.' },
    { title: 'Service Provider Profiles', description: 'Browse profiles and select the best service providers.' },
    { title: 'Secure Payments', description: 'Make safe and secure payments with ease.' },
    { title: 'Admin Dashboard', description: 'Manage all your bookings and services in one place.' },
    { title: 'Mini Project', description: 'This Project is our Mini Project for 3rd Year of B. Tech - CS' }
  ];

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
