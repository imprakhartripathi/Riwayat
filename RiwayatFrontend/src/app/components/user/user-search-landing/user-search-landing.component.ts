import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { VendorJsonService, Vendor } from '../../../services/vendor-json/vendor-json.service';
import { PlannerJsonService, Planner } from '../../../services/planner-json/planner-json.service';


type SearchResult = Vendor | Planner;

@Component({
  selector: 'app-user-search-landing',
  templateUrl: './user-search-landing.component.html',
  styleUrls: ['./user-search-landing.component.scss'],
})
export class UserSearchLandingComponent implements OnInit {
  searchTerm: string = '';
  allVendors: Vendor[] = [];
  planners: Planner[] = [];
  searchResults: SearchResult[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private vjs: VendorJsonService,
    private pjs: PlannerJsonService
  ) {}

  ngOnInit(): void {
    // Fetch all vendors
    this.vjs.getVendors().subscribe(
      (vendors) => {
        this.allVendors = vendors.map((vendor) => ({
          ...vendor,
          type: 'vendor',
        }));
        console.log('Vendors loaded:', this.allVendors);
        this.triggerFiltering();
      },
      (error) => console.error('Error fetching vendors:', error)
    );

    // Fetch all planners
    this.pjs.getPlanners().subscribe(
      (planners) => {
        this.planners = planners.map((planner) => ({
          ...planner,
          type: 'planner',
        }));
        console.log('Planners loaded:', this.planners);
        this.triggerFiltering();
      },
      (error) => console.error('Error fetching planners:', error)
    );

    // Subscribe to route parameters
    this.route.params.subscribe((params) => {
      this.searchTerm = params['term'] || '';
      console.log('Search term updated:', this.searchTerm);
      this.triggerFiltering();
    });
  }

  triggerFiltering(): void {
    const searchLower = this.searchTerm.toLowerCase().trim();

    if (['vendor', 'vendors'].includes(searchLower)) {
      this.searchResults = [...this.allVendors];
    } else if (['planner', 'planners', 'plan'].includes(searchLower)) {
      this.searchResults = [...this.planners];
    } else if (!searchLower || searchLower === 'all') {
      this.searchResults = [...this.allVendors, ...this.planners];
    } else {
      this.searchResults = [
        ...this.allVendors.filter(
          (vendor) =>
            vendor.name.toLowerCase().includes(searchLower) ||
            vendor.category.toLowerCase().includes(searchLower)
        ),
        ...this.planners.filter(
          (planner) =>
            planner.name.toLowerCase().includes(searchLower) ||
            planner.specialty.toLowerCase().includes(searchLower)
        ),
      ];
    }

    console.log('Filtered results:', this.searchResults);
  }

  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

  goToProfile(result: SearchResult): void {
    if (result.type === 'vendor') {
      this.router.navigate(['/vendorprofile', result.name]);
    } else if (result.type === 'planner') {
      this.router.navigate(['/plannerprofile', result.name]);
    }
  }
}
