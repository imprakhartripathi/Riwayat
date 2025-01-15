import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { VendorJsonService } from '../../../services/vendor-json/vendor-json.service';

interface Vendor {
  type: 'vendor';
  name: string;
  description: string;
  category: string;
  rating: number;
  peopleServed: number;
  image: string;
  offer: string;
}
type SearchResult = Vendor;

@Component({
  selector: 'app-offer-landing',
  templateUrl: './offer-landing.component.html',
  styleUrls: ['./offer-landing.component.scss'],
})
export class OfferLandingComponent implements OnInit {
  searchTerm: string = '';
  allVendors: Vendor[] = [];
  searchResults: SearchResult[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private vjs: VendorJsonService
  ) {}

  ngOnInit(): void {
    // Fetch all vendors from the service
    this.vjs.getVendors().subscribe(
      (data) => {
        console.log('Data received from VendorJsonService:', data);
        this.allVendors = data.map((vendor: Vendor) => ({
          type: 'vendor',
          name: vendor.name || '',
          description: vendor.description || '',
          category: vendor.category || '',
          image: vendor.image || '',
          rating: vendor.rating || 0,
          peopleServed: vendor.peopleServed || 0,
          offer: vendor.offer || '',
        }));
        console.log('All Vendors:', this.allVendors);
        // Trigger filtering if the searchTerm is already available
        if (this.searchTerm) {
          this.filterVendors();
        }
      },
      (error) => console.error('Error fetching vendors:', error)
    );

    this.route.params.subscribe((params) => {
      this.searchTerm = params['term'] || '';
      console.log('Search term:', this.searchTerm);
      this.filterVendors();
    });
  }

  filterVendors(): void {
    const searchLower = this.searchTerm ? this.searchTerm.toLowerCase() : '';
    console.log('searchLower:', searchLower);

    // Clear previous results
    this.searchResults = [];

    if (['vendor', 'vendors'].includes(searchLower)) {
      // If the search term indicates vendors, show all vendors
      this.searchResults = [...this.allVendors];
      console.log('Condition 1 results:', this.searchResults);
    } else {
      // Otherwise, filter vendors by name, category, or offer
      this.searchResults = this.allVendors.filter(
        (vendor) =>
          (vendor.name && vendor.name.toLowerCase().includes(searchLower)) ||
          (vendor.category &&
            vendor.category.toLowerCase().includes(searchLower)) ||
          (vendor.offer && vendor.offer.toLowerCase().includes(searchLower))
      );
      console.log('Condition 2 results:', this.searchResults);
    }

    console.log('Final filtered results:', this.searchResults);
  }

  getStars(rating: number): Array<number> {
    return Array(Math.round(rating)).fill(0);
  }

  goToProfile(result: SearchResult) {
    this.router.navigate(['/vendorprofile', result.name]);
  }
}
