import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  VendorJsonService,
  Vendor,
  Service,
} from '../../../services/vendor-json/vendor-json.service';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.scss'],
})
export class VendorProfileComponent implements OnInit {
  selectedServicesCount = 0;
  selectedVendor: Vendor | undefined;
  serviceForm: FormGroup;
  coordinatorForm: FormGroup;
  allVendors: Vendor[] = [];
  selectedServices: Service[] = []; // Array to store selected services

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private vendorService: VendorJsonService // Injecting the service
  ) {
    this.serviceForm = this.fb.group({
      serviceLocationType: ['', Validators.required],
      customAddress: [''],
      serviceDate: ['', Validators.required],
      serviceTime: ['', Validators.required],
      serviceInstructions: [''],
    });

    this.coordinatorForm = this.fb.group({
      coordinatorName: ['', Validators.required],
      coordinatorPhone: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      coordinatorAltPhone: ['', Validators.pattern('^[0-9]{10}$')],
    });
  }

  ngOnInit(): void {
    // Fetch all vendors from the service
    this.vendorService.getVendors().subscribe(
      (vendors: Vendor[]) => {
        this.allVendors = vendors;
        console.log('Vendors fetched:', this.allVendors);

        // Find the selected vendor based on the route parameter
        this.route.params.subscribe((params) => {
          const searchTerm = params['term'];
          if (searchTerm) {
            this.selectedVendor = this.allVendors.find(
              (vendor) => vendor.name.toLowerCase() === searchTerm.toLowerCase()
            );
            console.log('Selected Vendor:', this.selectedVendor);

            // Update selected services count
            this.updateSelectedServicesCount();
          }
        });
      },
      (error) => {
        console.error('Error fetching vendors:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.serviceForm.valid && this.coordinatorForm.valid) {
      const orderData = {
        vendorName: this.selectedVendor?.name,
        vendorImage: this.selectedVendor?.image,
        servingDetails: this.serviceForm.value,
        coordinatorDetails: this.coordinatorForm.value,
        services: this.selectedServices, // Selected services
        isVendorOrder: true, // This indicates the order is for a vendor
        vendorFare: this.selectedVendor?.fare, // Include VendorFare here
      };

      // Convert orderData to query parameters and navigate to '/orderprev'
      const queryParams = {
        ...orderData,
        orderDetails: JSON.stringify(orderData), // Serialize form data as JSON string
      };

      this.router.navigate(['/orderprev'], { queryParams });
      console.log('Order Preview:', queryParams);
    } else {
      console.error('Form is invalid');
    }
  }

  updateSelectedServicesCount(): void {
    this.selectedServices =
      this.selectedVendor?.services.filter((service) => service.selected) || [];
    this.selectedServicesCount = this.selectedServices.length;
  }

  isContinueDisabledForService(): boolean {
    return this.serviceForm.invalid;
  }

  isContinueDisabledForCoordinator(): boolean {
    return this.coordinatorForm.invalid;
  }
}
