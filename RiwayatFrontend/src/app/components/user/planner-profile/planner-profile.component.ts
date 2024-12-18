import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

interface Planner {
  name: string;
  bio: string;
  specialty: string;
  experience: number;
  plannerFare: string;
  tiers: Array<{
    name: string;
    fare: string;
    services: string;
    image: string;
  }>;
  image: string;
}

@Component({
  selector: 'app-planner-profile',
  templateUrl: './planner-profile.component.html',
  styleUrls: ['./planner-profile.component.scss']
})
export class PlannerProfileComponent implements OnInit {
  selectedPlanner: Planner | undefined;
  selectedTier: any = null;
  tierForm: FormGroup;

  planners: Planner[] = [
    {
      name: 'Harvey Specter',
      bio: 'Hot-Shot Lawyer who likes to plan events nowadays, best for Law-related Events',
      specialty: 'Corporate Events',
      experience: 50,
      plannerFare: '₹10,000',
      tiers: [
        { name: 'Basic', fare: '$1000', services: 'Venue & Catering', image: 'assets/basictier.png' },
        { name: 'Standard', fare: '$1900', services: 'Venue, Catering & Decorations', image: 'assets/stdtier.png' },
        { name: 'Premium', fare: '$2500', services: 'Venue, Catering, Decorations, Entertainment & Waiter/Staff', image: 'assets/premtier.png' },
        { name: 'Custom', fare: 'Depends on the Services', services: 'Customize with any of the services', image: 'assets/customtier.png' }
      ],
      image: 'assets/harvey.jpg'
    },
    {
      name: 'Dr. House',
      bio: 'Crazy but Genius Doctor, Side Musician, Faked his Death for his friend, best suited for Parties and Fun Events',
      specialty: 'Parties & Birthdays',
      experience: 30,
      plannerFare: '₹10,000',
      tiers: [
        { name: 'Basic', fare: '$1000', services: 'Venue & Catering', image: 'assets/basictier.png' },
        { name: 'Standard', fare: '$1900', services: 'Venue, Catering & Decorations', image: 'assets/stdtier.png' },
        { name: 'Premium', fare: '$2500', services: 'Venue, Catering, Decorations, Entertainment & Waiter/Staff', image: 'assets/premtier.png' },
        { name: 'Custom', fare: 'Depends on the Services', services: 'Customize with any of the services', image: 'assets/customtier.png' }
      ],
      image: 'assets/dr-house2.jpg'
    },
    {
      name: 'Donna',
      bio: 'Amazing and Confident, can do Anything because She is Donna!!',
      specialty: 'Creative Events, Themed Parties',
      experience: 40,
      plannerFare: '₹10,000',
      tiers: [
        { name: 'Basic', fare: '$1000', services: 'Venue & Catering', image: 'assets/basictier.png' },
        { name: 'Standard', fare: '$1900', services: 'Venue, Catering & Decorations', image: 'assets/stdtier.png' },
        { name: 'Premium', fare: '$2500', services: 'Venue, Catering, Decorations, Entertainment & Waiter/Staff', image: 'assets/premtier.png' },
        { name: 'Custom', fare: 'Depends on the Services', services: 'Customize with any of the services', image: 'assets/customtier.png' }
      ],
      image: 'assets/donna.jpg'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.tierForm = this.fb.group({
      eventType: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventTime: ['', Validators.required],
      eventDescription: [''],
      addons: this.fb.group({
        freeSnacks: [false],
        waiterDiscount: [false],
        artistDiscount: [false]
      }),
      customServices: this.fb.group({
        customVenue: [false],
        customCatering: [false],
        customEntertainment: [false],
        customDecorations: [false],
        customWaiters: [false]
      })
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const searchTerm = params['term'];
      if (searchTerm) {
        this.selectedPlanner = this.planners.find(planner => planner.name.toLowerCase() === searchTerm.toLowerCase());
      }
    });
  }

  selectTier(tier: any): void {
    this.selectedTier = tier;
    console.log('Selected Tier:', tier.name);

    // Update the form when a tier is selected
    this.tierForm.patchValue({
      eventType: '',
      eventDate: '',
      eventTime: '',
      eventDescription: '',
      addons: {
        freeSnacks: false,
        waiterDiscount: false,
        artistDiscount: false
      },
      customServices: {
        customVenue: false,
        customCatering: false,
        customEntertainment: false,
        customDecorations: false,
        customWaiters: false
      }
    });
  }

  confirmOrder(): void {
    if (this.tierForm.valid && this.selectedPlanner && this.selectedTier) {
      const orderData = {
        tier: this.selectedTier.name,
        plannerName: this.selectedPlanner.name,
        orderDetails: this.tierForm.value,
        isPlannerOrder: true, // This indicates the order is for a vendor
        plannerFare: this.selectedPlanner.plannerFare,  // Include plannerFare here
      };

      // Convert orderData to query parameters and navigate to '/orderprev'
      const queryParams = {
        ...orderData,
        orderDetails: JSON.stringify(orderData.orderDetails) // serialize form data as JSON string
      };

      this.router.navigate(['/orderprev'], { queryParams });
      console.log(queryParams);
    } else {
      console.error('Form is invalid or missing selected planner/tier');
    }
  }
}
