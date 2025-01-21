import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-secondary-navbar',
  templateUrl: './secondary-navbar.component.html',
  styleUrl: './secondary-navbar.component.scss',
})
export class SecondaryNavbarComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }

  goForward() {
    this.location.forward();
  }

  
}
