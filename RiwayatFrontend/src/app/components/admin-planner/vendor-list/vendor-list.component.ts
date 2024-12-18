import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent {

  categories: string[] = ['All', 'Catering', 'Venue', 'Decorations', 'Entertainment'];
  selectedCategory: string = 'All'; // Default to 'All'
  vendors: { name: string; description: string; category: string; image: string }[] = [
    { name: 'Sxmpra Catering', description: 'Top-tier catering services', category: 'Catering', image: 'assets/blank.png' },
    { name: 'Elegance Venues', description: 'Elegant venues for every occasion', category: 'Venue', image: 'assets/blank.png' },
    { name: 'Party Decorations', description: 'Creative decorations for events', category: 'Decorations', image: 'assets/blank.png' },
    { name: 'DJ Entertainment', description: 'Professional DJ services', category: 'Entertainment', image: 'assets/blank.png' }
  ];

  filteredVendors = [...this.vendors];
  selectedVendors: { name: string; description: string; image: string }[] = []; // For storing selected vendors

  constructor(public dialogRef: MatDialogRef<VendorListComponent>) {}

  filterVendors(): void {
    if (this.selectedCategory === 'All' || !this.selectedCategory) {
      this.filteredVendors = [...this.vendors];
    } else {
      this.filteredVendors = this.vendors.filter(vendor => vendor.category === this.selectedCategory);
    }
  }

  toggleVendorSelection(vendor: { name: string; description: string; image: string }): void {
    const index = this.selectedVendors.findIndex(v => v.name === vendor.name);
    if (index === -1) {
      this.selectedVendors.push(vendor);
    } else {
      this.selectedVendors.splice(index, 1);
    }
  }

  submitVendors(): void {
    if (this.selectedVendors.length > 0) {
      this.dialogRef.close(this.selectedVendors); // Return the selected vendors when the dialog is closed
    } else {
      alert('Please select at least one vendor.');
    }
  }
}
