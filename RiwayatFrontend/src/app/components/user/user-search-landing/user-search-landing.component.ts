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
  
}

interface Planner {
  type: 'planner';
  name: string;
  bio: string;
  specialty: string;
  experience: number;
  plannerFare: string;
  image: string;
}

type SearchResult = Vendor | Planner;

@Component({
  selector: 'app-user-search-landing',
  templateUrl: './user-search-landing.component.html',
  styleUrls: ['./user-search-landing.component.scss']
})
export class UserSearchLandingComponent implements OnInit {
  searchTerm: string = '';

  allVendors: Vendor[] = [
    {
      type: 'vendor',
      name: 'Elegant Decorations',
      description: 'Providing world-class decoration services for weddings, parties, and more.',
      category: 'Decorations',
      rating: 4.5,
      peopleServed: 120,
      image: 'assets/vendor.jpg'
    },
    {
      type: 'vendor',
      name: 'Venue Royale',
      description: 'Premium venues for all types of events.',
      category: 'Venue',
      rating: 4.2,
      peopleServed: 90,
      image: 'assets/vendor.jpg'
    },
    {
      type: 'vendor',
      name: 'Elite Catering',
      description: 'Top-notch catering with a wide range of cuisines.',
      category: 'Catering',
      rating: 4.8,
      peopleServed: 150,
      image: 'assets/vendor.jpg'
    },
    {
      type: 'vendor',
      name: 'Star Entertainment',
      description: 'Bringing the best entertainment acts to your events.',
      category: 'Entertainment',
      rating: 4.7,
      peopleServed: 200,
      image: 'assets/vendor.jpg'
    },
    {
      type: 'vendor',
      name: 'Grand Events',
      description: 'Luxury event management and decoration services.',
      category: 'Decorations',
      rating: 4.9,
      peopleServed: 250,
      image: 'assets/vendor.jpg'
    },
    {
      type: 'vendor',
      name: 'Culinary Masters',
      description: 'Gourmet catering for weddings and corporate events.',
      category: 'Catering',
      rating: 4.6,
      peopleServed: 180,
      image: 'assets/vendor.jpg'
    },
    {
      type: 'vendor',
      name: 'Spectacular Venues',
      description: 'Exquisite venues with a wide range of amenities.',
      category: 'Venue',
      rating: 4.3,
      peopleServed: 100,
      image: 'assets/vendor.jpg'
    },
    {
      type: 'vendor',
      name: 'Ultimate DJ',
      description: 'Top-rated DJ services for any kind of event.',
      category: 'Entertainment',
      rating: 4.9,
      peopleServed: 220,
      image: 'assets/vendor.jpg'
    }
  ];

  planners: Planner[] = [
    {
      type: 'planner',
      name: 'Harvey Specter',
      bio: 'Hot-Shot Lawyer who likes to plan events nowadays, best for Law-related Events',
      specialty: 'Corporate Events',
      experience: 50,
      plannerFare: '₹10,000',
      image: 'assets/harvey.jpg'
    },
    {
      type: 'planner',
      name: 'Dr. House',
      bio: 'Crazy but Genius Doctor, Side Musician, Faked his Death for his friend, best suited for Parties and Fun Events',
      specialty: 'Parties & Birthdays',
      experience: 30,
      plannerFare: '₹10,000',
      image: 'assets/dr-house2.jpg'
    },
    {
      type: 'planner',
      name: 'Donna',
      bio: 'Amazing and Confident, can do Anything because She is Donna!!',
      specialty: 'Creative Events, Themed Parties',
      experience: 40,
      plannerFare: '₹10,000',
      image: 'assets/donna.jpg'
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
    } else if (['planner', 'planners', 'plan'].includes(searchLower)) {
      // If the search term indicates planners, show all planners
      this.searchResults = [...this.planners];
    } else if (!searchLower || searchLower === 'all') {
      // Show all vendors and planners if search term is empty or 'all'
      this.searchResults = [...this.allVendors, ...this.planners];
    } else {
      // Otherwise, filter both vendors and planners by name or category
      this.searchResults = [
        ...this.allVendors.filter(vendor =>
          vendor.name.toLowerCase().includes(searchLower) || 
          vendor.category.toLowerCase().includes(searchLower)
        ),
        ...this.planners.filter(planner =>
          planner.name.toLowerCase().includes(searchLower) || 
          planner.specialty.toLowerCase().includes(searchLower)
        )
      ];
    }
    
    console.log('Filtered results:', this.searchResults);  // Debug log
  }

  getStars(rating: number): Array<number> {
    return Array(Math.round(rating)).fill(0);
  }

  goToProfile(result: SearchResult) {
    if (result.type === 'vendor') {
      this.router.navigate(['/vendorprofile', result.name]);
    } else if (result.type === 'planner') {
      this.router.navigate(['/plannerprofile', result.name]);
    }
  }
}
