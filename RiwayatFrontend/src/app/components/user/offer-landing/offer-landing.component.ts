import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

interface Vendor {
  type: 'vendor';
  name: string;
  description: string;
  category: string;
  rating: number;
  peopleServed: number;
  image: string; 
  offer:String;
}
type SearchResult = Vendor;
@Component({
  selector: 'app-offer-landing',
  templateUrl: './offer-landing.component.html',
  styleUrl: './offer-landing.component.scss'
})
export class OfferLandingComponent implements OnInit {
  searchTerm: string = '';
  allVendors: Vendor[] = [
    {
      type: 'vendor',
      name: 'Elegant Decorations',
      description: 'Providing world-class decoration services for weddings, parties, and more.',
      category: 'Decorations',
      rating: 4.5,
      peopleServed: 120,
      image: 'assets/vendor.jpg',
      offer:'Decorations'
    },
    {
      type: 'vendor',
      name: 'Venue Royale',
      description: 'Premium venues for all types of events.',
      category: 'Venue',
      rating: 4.2,
      peopleServed: 90,
      image: 'assets/vendor.jpg',
      offer:'Venue'
    },
    {
      type: 'vendor',
      name: 'Elite Catering',
      description: 'Top-notch catering with a wide range of cuisines.',
      category: 'Catering',
      rating: 4.8,
      peopleServed: 150,
      image: 'assets/vendor.jpg',
      offer:'Catering'
    },
    {
      type: 'vendor',
      name: 'Star Entertainment',
      description: 'Bringing the best entertainment acts to your events.',
      category: 'Entertainment',
      rating: 4.7,
      peopleServed: 200,
      image: 'assets/vendor.jpg',
      offer:'Entertainment'
    },
    {
      type: 'vendor',
      name: 'Grand Events',
      description: 'Luxury event management and decoration services.',
      category: 'Decorations',
      rating: 4.9,
      peopleServed: 250,
      image: 'assets/vendor.jpg',
      offer: 'Decorations'
    },
    {
      type: 'vendor',
      name: 'Culinary Masters',
      description: 'Gourmet catering for weddings and corporate events.',
      category: 'Catering',
      rating: 4.6,
      peopleServed: 180,
      image: 'assets/vendor.jpg',
      offer: 'Catering'
    },
    {
      type: 'vendor',
      name: 'Spectacular Venues',
      description: 'Exquisite venues with a wide range of amenities.',
      category: 'Venue',
      rating: 4.3,
      peopleServed: 100,
      image: 'assets/vendor.jpg',
      offer:'Venue'
    },
    {
      type: 'vendor',
      name: 'Ultimate DJ',
      description: 'Top-rated DJ services for any kind of event.',
      category: 'Entertainment',
      rating: 4.9,
      peopleServed: 220,
      image: 'assets/vendor.jpg',
      offer: 'DJ'
    }
  ];
  searchResults: SearchResult[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchTerm = params['term'];
      this.filterVendors();
    });
  }

  filterVendors(): void {
    const searchLower = this.searchTerm ? this.searchTerm.toLowerCase() : '';
  
    // Clear previous results
    this.searchResults = [];
  
    if (['vendor', 'vendors'].includes(searchLower)) {
      // If the search term indicates vendors, show all vendors
      this.searchResults = [...this.allVendors];
    }else {
      // Otherwise, filter both vendors and planners by name or category
      this.searchResults = [
        ...this.allVendors.filter(vendor =>
          vendor.name.toLowerCase().includes(searchLower) || 
          vendor.category.toLowerCase().includes(searchLower) ||
          vendor.offer.toLocaleLowerCase().includes(searchLower)
        )
      ];
    }
    
    console.log('Filtered results:', this.searchResults);  // Debug log
  }
  getStars(rating: number): Array<number> {
    return Array(Math.round(rating)).fill(0);
  }
  goToProfile(result: SearchResult) {
    this.router.navigate(['/vendorprofile', result.name]);
  }
}
