import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../auth.service';
import { VendorJsonService } from '../../../vendor-json.service';

@Component({
  selector: 'app-user-favorite',
  templateUrl: './user-favorite.component.html',
  styleUrls: ['./user-favorite.component.scss']
})
export class UserFavoriteComponent implements OnInit {
  allVendors: any[] = [];
  profileData: any;
  favVendors: any[] = []; // This should be an array of strings (vendor names)
  favoriteVendors: any[] = [];

  constructor(private router: Router, public dialog: MatDialog, private authService: AuthService, private vendorJsonService: VendorJsonService) {}

  ngOnInit(): void {
    // Get user data and assign favVendors from the user's profile
    this.profileData = this.authService.getCurrentUser();
    console.log("Profile Data:", this.profileData); // Log the entire profile data

    if (this.profileData && this.profileData.favVendors) {
      // Log the favVendors to check its structure before processing
      console.log("FavVendors from profile before processing:", this.profileData.favVendors);

      // Check if favVendors is an array of strings or an array of objects with 'name' property
      if (Array.isArray(this.profileData.favVendors)) {
        // Check if favVendors are just strings (vendor names)
        if (typeof this.profileData.favVendors[0] === 'string') {
          this.favVendors = this.profileData.favVendors.map((vendor: string) => vendor.toLowerCase());
        } else {
          // Assuming each item in favVendors is an object with a 'name' property
          this.favVendors = this.profileData.favVendors.map((vendor: any) => vendor.name ? vendor.name.toLowerCase() : '');
        }
      } else {
        console.error("favVendors is not an array or contains invalid data:", this.profileData.favVendors);
      }
    }

    console.log("Processed favVendors:", this.favVendors); // Log processed favVendors

    // Fetch all vendors from the service
    this.vendorJsonService.getVendors().subscribe((data) => {
      this.allVendors = data.map(vendor => ({
        name: vendor.name,
        role: vendor.description,
        category: vendor.category,
        image: vendor.image,
        rating: vendor.rating
      }));

      console.log("All Vendors:", this.allVendors); // Log allVendors
      this.filterFavoriteVendors();
    });
  }

  filterFavoriteVendors(): void {
    // Filter allVendors to match names in favVendors with case-insensitivity
    this.favoriteVendors = this.allVendors.filter(vendor =>
      this.favVendors.includes(vendor.name.toLowerCase())
    );

    console.log("Favorite Vendors after Filtering:", this.favoriteVendors); // Log filtered favorite vendors
  }

  unlikeVendor(index: number): void {
    this.favoriteVendors.splice(index, 1);
  }

  getStars(rating: number): Array<number> {
    return Array(Math.round(rating)).fill(0);
  }

  goToProfile(vendor: string) {
    this.router.navigate(['/vendorprofile', vendor]);
    this.dialog.closeAll();
  }
}