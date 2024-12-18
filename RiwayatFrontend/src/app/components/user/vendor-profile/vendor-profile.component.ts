import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

interface Vendor {
    name: string;
    description: string;
    category: string;
    rating: number;
    fare: number;
    peopleServed: number;
    image: string;
    services: Service[];
}

interface Service {
    selected: boolean;
    name: string;
    description: string;
    fare: number;
    image: string;
}

@Component({
    selector: 'app-vendor-profile',
    templateUrl: './vendor-profile.component.html',
    styleUrls: ['./vendor-profile.component.scss']
})
export class VendorProfileComponent implements OnInit {
    selectedServicesCount = 0;
    selectedVendor: Vendor | undefined;
    serviceForm: FormGroup;
    coordinatorForm: FormGroup;
    allVendors: Vendor[] = [ {
      name: 'Elegant Decorations',
      description: 'Providing world-class decoration services for weddings, parties, and more.',
      category: 'Decorations',
      rating: 4.5,
      fare: 10000,
      peopleServed: 120,
      image: 'assets/vendor.jpg',
      services: [
        { name: 'Floral Arrangements', description: 'Beautiful flower decorations tailored to your theme.', fare: 10000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Stage Setup', description: 'Customizable stages with unique decor options.', fare: 20000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Lighting Decor', description: 'Elegant lighting setups to enhance ambiance.', fare: 8000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Mandap Decoration', description: 'Traditional mandap decor for weddings.', fare: 15000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Entrance Gate', description: 'Grand entrance setups with floral and light decor.', fare: 5000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Table Centerpieces', description: 'Elegant table decor for a complete look.', fare: 3000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Backdrop Setup', description: 'Beautiful backdrops for photography and ceremonies.', fare: 10000, image: 'assets/vendor.services.png', selected: false }
      ]
    },
    {
      name: 'Venue Royale',
      description: 'Premium venues for all types of events.',
      category: 'Venue',
      rating: 4.2,
      fare: 10000,
      peopleServed: 90,
      image: 'assets/vendor.jpg',
      services: [
        { name: 'Banquet Hall', description: 'Spacious hall with seating arrangements.', fare: 50000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Outdoor Lawn', description: 'Green lawn area perfect for outdoor events.', fare: 45000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Conference Room', description: 'Ideal for corporate events and meetings.', fare: 30000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Poolside Venue', description: 'Beautiful poolside setup for parties.', fare: 60000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Stage Setup', description: 'Complete stage setup options.', fare: 15000, image: 'assets/vendor.services.png', selected: false },
        { name: 'VIP Area', description: 'Separate VIP area for special guests.', fare: 20000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Parking', description: 'Spacious parking facility for guests.', fare: 5000, image: 'assets/vendor.services.png', selected: false }
      ]
    },
    {
      name: 'Elite Catering',
      description: 'Top-notch catering with a wide range of cuisines.',
      category: 'Catering',
      rating: 4.8,
      fare: 10000,
      peopleServed: 150,
      image: 'assets/vendor.jpg',
      services: [
        { name: 'Indian Cuisine', description: 'Traditional Indian dishes.', fare: 800, image: 'assets/vendor.services.png', selected: false },
        { name: 'Chinese Cuisine', description: 'Popular Chinese dishes.', fare: 1000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Continental Cuisine', description: 'Wide range of continental dishes.', fare: 1200, image: 'assets/vendor.services.png', selected: false },
        { name: 'Desserts', description: 'Various traditional and international desserts.', fare: 500, image: 'assets/vendor.services.png', selected: false },
        { name: 'Live Counters', description: 'Live cooking stations for an interactive experience.', fare: 2000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Beverages', description: 'Soft drinks, mocktails, and juices.', fare: 300, image: 'assets/vendor.services.png', selected: false },
        { name: 'Buffet Setup', description: 'Complete buffet setup with servers.', fare: 1500, image: 'assets/vendor.services.png', selected: false }
      ]
    },
    {
      name: 'Star Entertainment',
      description: 'Bringing the best entertainment acts to your events.',
      category: 'Entertainment',
      rating: 4.7,
      fare: 10000,
      peopleServed: 200,
      image: 'assets/vendor.jpg',
      services: [
        { name: 'DJ Services', description: 'Professional DJs for a lively event.', fare: 10000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Live Bands', description: 'Bands across genres to match your event theme.', fare: 25000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Dance Performers', description: 'Trained dancers to entertain guests.', fare: 15000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Magic Shows', description: 'Captivating magic performances.', fare: 8000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Stand-Up Comedy', description: 'Stand-up comedians for light-hearted fun.', fare: 12000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Anchor & Host', description: 'Professional hosts for seamless event flow.', fare: 7000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Cultural Performances', description: 'Indian cultural dances and music.', fare: 10000, image: 'assets/vendor.services.png', selected: false }
      ]
    },
    {
      name: 'Grand Events',
      description: 'Luxury event management and decoration services.',
      category: 'Decorations',
      rating: 4.9,
      fare: 10000,
      peopleServed: 250,
      image: 'assets/vendor.jpg',
      services: [
        { name: 'Theme Decor', description: 'Customized decor based on event theme.', fare: 15000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Seating Arrangements', description: 'Elegant seating setups for any occasion.', fare: 5000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Entrance Arch', description: 'Grand entrance arch decor.', fare: 7000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Center Stage', description: 'Eye-catching stage setup for ceremonies.', fare: 10000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Photobooth Setup', description: 'Decorated photobooth for guest photos.', fare: 6000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Aisle Decoration', description: 'Beautiful aisle decor for ceremonies.', fare: 3000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Balloon Decoration', description: 'Balloon decor for parties.', fare: 2000, image: 'assets/vendor.services.png', selected: false }
      ]
    },
    {
      name: 'Culinary Masters',
      description: 'Gourmet catering for weddings and corporate events.',
      category: 'Catering',
      rating: 4.6,
      fare: 10000,
      peopleServed: 180,
      image: 'assets/vendor.jpg',
      services: [
        { name: 'South Indian Cuisine', description: 'Authentic South Indian dishes.', fare: 900, image: 'assets/vendor.services.png', selected: false },
        { name: 'North Indian Cuisine', description: 'Popular North Indian flavors.', fare: 800, image: 'assets/vendor.services.png', selected: false },
        { name: 'Mughlai Cuisine', description: 'Rich and flavorful Mughlai dishes.', fare: 1200, image: 'assets/vendor.services.png', selected: false },
        { name: 'Street Food', description: 'Indian street food counters.', fare: 600, image: 'assets/vendor.services.png', selected: false },
        { name: 'Sweets & Savories', description: 'Traditional sweets and snacks.', fare: 500, image: 'assets/vendor.services.png', selected: false },
        { name: 'Juice & Shake Bar', description: 'Refreshing drinks and shakes.', fare: 300, image: 'assets/vendor.services.png', selected: false },
        { name: 'Chef On-Demand', description: 'Hire a chef for personalized menus.', fare: 5000, image: 'assets/vendor.services.png', selected: false }
      ]
    },
    {
      name: 'Spectacular Venues',
      description: 'Exquisite venues with a wide range of amenities.',
      category: 'Venue',
      rating: 4.3,
      fare: 10000,
      peopleServed: 100,
      image: 'assets/vendor.jpg',
      services: [
        { name: 'Wedding Hall', description: 'Spacious hall for wedding ceremonies.', fare: 70000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Conference Hall', description: 'Fully equipped hall for conferences.', fare: 50000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Private Garden', description: 'Lush garden area for outdoor events.', fare: 60000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Dining Area', description: 'Spacious dining arrangement.', fare: 20000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Valet Parking', description: 'Exclusive valet parking for guests.', fare: 5000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Green Rooms', description: 'Comfortable green rooms for guests.', fare: 8000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Catering Area', description: 'Special area for food service.', fare: 15000, image: 'assets/vendor.services.png', selected: false }
      ]
    },
    {
      name: 'Ultimate DJ',
      description: 'Top-tier DJ services to elevate the energy of your event with the best tracks.',
      category: 'Entertainment',
      rating: 4.9,
      fare: 10000,
      peopleServed: 300,
      image: 'assets/vendor.jpg',
      services: [
        { name: 'Live DJ Performance', description: 'High-energy live DJ performance with custom playlists for your event.', fare: 15000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Club DJ Setup', description: 'Full club-style DJ setup with high-quality sound and lights.', fare: 20000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Wedding DJ', description: 'Specialized wedding DJ services with romantic and upbeat tracks.', fare: 18000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Corporate Event DJ', description: 'Professional DJ services for corporate events, conferences, and seminars.', fare: 22000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Party DJ', description: 'Non-stop dance tracks to keep your guests on their feet all night long.', fare: 12000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Interactive DJ', description: 'Engage your guests with interactive music games and requests.', fare: 17000, image: 'assets/vendor.services.png', selected: false },
        { name: 'Themed DJ Performance', description: 'Themed DJ performances for costume parties, festivals, and special events.', fare: 25000, image: 'assets/vendor.services.png', selected: false }
      ]
    } 
  ];

  selectedServices: Service[] = []; // Array to store selected services


    constructor(
      private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute
    ) {
        this.serviceForm = this.fb.group({
            serviceLocationType: ['', Validators.required],
            customAddress: [''],
            serviceDate: ['', Validators.required],
            serviceTime: ['', Validators.required],
            serviceInstructions: ['']
        });

        this.coordinatorForm = this.fb.group({
          coordinatorName: ['', Validators.required],
          coordinatorPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
          coordinatorAltPhone: ['', Validators.pattern('^[0-9]{10}$')]
      });
    }

    ngOnInit() {
      this.route.params.subscribe(params => {
        const searchTerm = params['term'];
        if (searchTerm) {
          this.selectedVendor = this.allVendors.find(planner => planner.name.toLowerCase() === searchTerm.toLowerCase());
        }
      });
        this.updateSelectedServicesCount();
    }

    onSubmit() {
      if (this.serviceForm.valid && this.coordinatorForm.valid) {
        const orderData = {
          vendorName: this.selectedVendor?.name,
          vendorImage: this.selectedVendor?.image,
          servingDetails: this.serviceForm.value,
          coordinatorDetails: this.coordinatorForm.value,
          services: this.selectedServices, // Selected services
          isVendorOrder: true, // This indicates the order is for a vendor
          vendorFare: this.selectedVendor?.fare,  // Include VendorFare here
        };
  
        // Convert orderData to query parameters and navigate to '/orderprev'
        const queryParams = {
          ...orderData,
          orderDetails: JSON.stringify(orderData) // serialize form data as JSON string
        };
  
        this.router.navigate(['/orderprev'], { queryParams });
        console.log(queryParams);
      } else {
        console.error('Form is invalid');
      }
    }

    updateSelectedServicesCount() {
      this.selectedServices = this.selectedVendor?.services.filter(service => service.selected) || [];
      this.selectedServicesCount = this.selectedServices.length;
  }

    isContinueDisabledForService() {
        return this.serviceForm.invalid;
    }

    isContinueDisabledForCoordinator(){
      return this.coordinatorForm.invalid;
    }
}
