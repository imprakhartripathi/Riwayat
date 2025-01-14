import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PlannerJsonService, Planner } from '../../../planner-json.service';

@Component({
  selector: 'app-planner-profile',
  templateUrl: './planner-profile.component.html',
  styleUrls: ['./planner-profile.component.scss'],
})
export class PlannerProfileComponent implements OnInit {
  selectedPlanner: Planner | undefined;
  selectedTier: any = null;
  tierForm: FormGroup;
  planners: Planner[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private pjs: PlannerJsonService // Inject PlannerJsonService
  ) {
    this.tierForm = this.fb.group({
      eventType: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventTime: ['', Validators.required],
      eventDescription: [''],
      addons: this.fb.group({
        freeSnacks: [false],
        waiterDiscount: [false],
        artistDiscount: [false],
      }),
      customServices: this.fb.group({
        customVenue: [false],
        customCatering: [false],
        customEntertainment: [false],
        customDecorations: [false],
        customWaiters: [false],
      }),
    });
  }

  ngOnInit(): void {
    // Fetch all planners from the service
    this.pjs.getPlanners().subscribe(
      (planners: Planner[]) => {
        this.planners = planners;
        console.log('Planners fetched:', this.planners);

        // Find the selected planner based on the route parameter
        this.route.params.subscribe((params) => {
          const searchTerm = params['term'];
          if (searchTerm) {
            this.selectedPlanner = this.planners.find(
              (planner) =>
                planner.name.toLowerCase() === searchTerm.toLowerCase()
            );
            console.log('Selected Planner:', this.selectedPlanner);
          }
        });
      },
      (error) => {
        console.error('Error fetching planners:', error);
      }
    );
  }

  selectTier(tier: any): void {
    this.selectedTier = tier;
    console.log('Selected Tier:', tier.name);

    // Reset and update the form when a tier is selected
    this.tierForm.patchValue({
      eventType: '',
      eventDate: '',
      eventTime: '',
      eventDescription: '',
      addons: {
        freeSnacks: false,
        waiterDiscount: false,
        artistDiscount: false,
      },
      customServices: {
        customVenue: false,
        customCatering: false,
        customEntertainment: false,
        customDecorations: false,
        customWaiters: false,
      },
    });
  }

  confirmOrder(): void {
    if (this.tierForm.valid && this.selectedPlanner && this.selectedTier) {
      const orderData = {
        tier: this.selectedTier.name,
        plannerName: this.selectedPlanner.name,
        orderDetails: this.tierForm.value,
        isPlannerOrder: true, // This indicates the order is for a planner
        plannerFare: this.selectedPlanner.plannerFare, // Include plannerFare here
      };

      // Convert orderData to query parameters and navigate to '/orderprev'
      const queryParams = {
        ...orderData,
        orderDetails: JSON.stringify(orderData.orderDetails), // Serialize form data as JSON string
      };

      this.router.navigate(['/orderprev'], { queryParams });
      console.log('Order Preview:', queryParams);
    } else {
      console.error('Form is invalid or missing selected planner/tier');
    }
  }
}
