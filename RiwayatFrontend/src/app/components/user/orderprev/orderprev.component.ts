import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-orderprev',
  templateUrl: './orderprev.component.html',
  styleUrls: ['./orderprev.component.scss']
})
export class OrderprevComponent implements OnInit {
  isPlannerOrder = false;
  isVendorOrder = false;
  orderDetails: any = {}; // Initialize as an empty object
  plannerName: string | undefined;
  tier: string | undefined;
  fare: string | undefined;
  plannerImage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef, // Inject ChangeDetectorRef
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // Parse the order details if they are in JSON string format
      this.orderDetails = params['orderDetails'] ? JSON.parse(params['orderDetails']) : {};
      console.log(this.orderDetails);

      this.isVendorOrder = params['isVendorOrder'] === 'true';
      this.plannerName = params['plannerName'];
      this.tier = params['tier'];
      this.isPlannerOrder = params['isPlannerOrder'] === 'true';
      this.fare = params['plannerFare'];

      // Set planner image based on name
      this.plannerImage = this.getPlannerImage(this.plannerName);

      // Trigger change detection after setting values
      this.cdr.detectChanges();

      // Call dumpOrderData to output data
    });
  }

  openPaymentDialog(): void {
    this.dialog.open(PaymentDialogComponent, {
      width: '400px',
      data: {
        orderDetails: this.orderDetails, 
        plannerName: this.plannerName, 
        tier: this.tier, 
        plannerImage: this.plannerImage, 
        isPlannerOrder: this.isPlannerOrder, 
        fare: this.fare
      }
    });
  }

  private getPlannerImage(plannerName: string | undefined): string {
    switch (plannerName) {
      case 'Donna': return 'assets/donna.jpg';
      case 'Dr. House': return 'assets/dr-house2.jpg';
      case 'Harvey Specter': return 'assets/harvey.jpg';
      default: return 'assets/user.png';
    }
  }

  goToPlannerProfile(){
    if (this.isPlannerOrder){
      this.router.navigate(['/plannerprofile', this.plannerName])
    }
  }

  goToVendorProfile(){
    if (this.isVendorOrder){
      this.router.navigate(['/vendorprofile', this.orderDetails.vendorName])
    }
  }

  goBack(){
    this.location.back();
  }

  goToSupport(){
    this.router.navigate(['/support']);
  }

  // Method to dump order details to the console or save as a JSON file
  dumpOrderData(): void {
    const dataToDump = {
      isPlannerOrder: this.isPlannerOrder,
      isVendorOrder: this.isVendorOrder,
      orderDetails: this.orderDetails,
      plannerName: this.plannerName,
      tier: this.tier,
      fare: this.fare,
      plannerImage: this.plannerImage
    };

    // Log data to console
    console.log('Dumped Order Data:', dataToDump);

    // Create a downloadable JSON file with the data
    const jsonString = JSON.stringify(dataToDump, null, 2); // Pretty-print with indentation
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'orderDetails.json';
    link.click();

    // Clean up the object URL
    window.URL.revokeObjectURL(url);
  }

  downloadBill(): void {
    let billContent = 'Order Invoice\n-------------\n';
  
    if (this.isPlannerOrder) {
      // Generate bill for planner
      billContent += `
        Planner Order
        -------------
        Name: ${this.plannerName}
        Tier: ${this.tier}
        Fare: ${this.fare || 'N/A'}
    
        Order Details:
        Event Type: ${this.orderDetails.eventType || 'N/A'}
        Event Date: ${this.orderDetails.eventDate || 'N/A'}
        Event Time: ${this.orderDetails.eventTime || 'N/A'}
        Event Description: ${this.orderDetails.eventDescription || 'Not Provided'}
  
        Addons:
        Free Snacks = ${this.orderDetails.addons?.freeSnacks}
        Waiter Discount = ${this.orderDetails.addons?.waiterDiscount}
        Standup Artist Discount = ${this.orderDetails.addons?.artistDiscount}
  
        Custom Services:
        Venue = ${this.orderDetails.customServices?.customVenue}
        Catering = ${this.orderDetails.customServices?.customCatering}
        Decorations = ${this.orderDetails.customServices?.customDecorations}
        Entertainment = ${this.orderDetails.customServices?.customEntertainment}
        Waiters = ${this.orderDetails.customServices?.customWaiters}
  
        --------------------------------
      `;
    } else if (this.isVendorOrder) {
      // Generate bill for vendor
      billContent += `
        Vendor Order
        -------------
        Name: ${this.orderDetails.vendorName || 'N/A'}
        Fare: ${this.orderDetails.vendorFare || 'N/A'}
    
        Services Availed:
      `;
      if (this.orderDetails.services?.length) {
        this.orderDetails.services.forEach((service: any) => {
          billContent += `- ${service.name || 'Unnamed Service'}: ${service.description || 'No description provided'}\n      `;
        });
      } else {
        billContent += 'No services availed.\n';
      }
  
      billContent += `
        Coordinator Details:
        Name: ${this.orderDetails.coordinatorDetails?.coordinatorName || 'N/A'}
        Phone: ${this.orderDetails.coordinatorDetails?.coordinatorPhone || 'N/A'}
        Alternative Phone: ${this.orderDetails.coordinatorDetails?.coordinatorAltPhone || 'Not Provided'}
  
        Serving Details:
        Location Type: ${this.orderDetails.servingDetails?.serviceLocationType || 'N/A'}
        Custom Address: ${this.orderDetails.servingDetails?.customAddress || 'Not Needed'}
        Date: ${this.orderDetails.servingDetails?.serviceDate || 'N/A'}
        Time: ${this.orderDetails.servingDetails?.serviceTime || 'N/A'}
  
        Instructions:
        ${this.orderDetails.servingDetails?.serviceInstructions || 'No Instructions'}
  
        --------------------------------
      `;
    } else {
      billContent += 'No valid order details provided.\n';
    }
  
    billContent += '\nThank you for using our services!';
  
    // Create a Blob from the bill content and trigger the download
    const blob = new Blob([billContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'invoice.txt';
    link.click();
  
    // Clean up the object URL
    window.URL.revokeObjectURL(url);
  }
  
  
  
}
