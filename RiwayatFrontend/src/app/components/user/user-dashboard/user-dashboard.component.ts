// user-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {


  categories = [
    {
      name: 'Catering',
      trendingServices: ['Italian Cuisine', 'Indian Buffet', 'Chinese Special'],
      image: 'assets/catering.jpeg'
    },
    {
      name: 'Venue',
      trendingServices: ['Beach Wedding', 'Garden Party', 'Banquet Hall'],
      image: 'assets/venue.webp'
    },
    {
      name: 'Entertainment',
      trendingServices: ['Live Band', 'DJ', 'Stand-up Comedy'],
      image: 'assets/entertainment.jpg'
    },
    {
      name: 'Decorations',
      trendingServices: ['Floral Decor', 'Theme Lighting', 'Balloon Decor'],
      image: 'assets/decorations.jpg'
    }
  ];

  offers = [
    {offer: 'Venue', image: 'assets/10p-venue.png'},
    {offer: 'Catering', image: 'assets/500-caterer.png'},
    {offer: 'DJ', image: 'assets/free-dj.png'}
  ];

  planners = [
    {name: 'Harvey Specter', desc: 'Hot Shot Planner for Law Events', img: 'assets/harvey.jpg'},
    {name: 'Dr. House', desc: 'Crazy Doctor with Genius Brains, best for Medical Events', img: 'assets/dr-house2.jpg'},
    {name: 'Donna', desc: 'She Can Do Anything, cuz She is Donna', img: 'assets/donna.jpg'}
  ];

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {

  }

    // Navigate to search landing page with category name
    browseCategory(categoryName: string) {
      this.router.navigate(['/search', categoryName]);
    }

    landToOffers(offer: string) {
      if (offer) {
        this.router.navigate(['/offer', offer]); 
        }
    }

    goToPlannerProfile(planner: string){
      if (planner){
        this.router.navigate(['/plannerprofile', planner])
      }
    }

    goToVendorProfile(vendor: string){
      if (vendor){
        this.router.navigate(['/plannerprofile', vendor])
      }
    }

 

}
