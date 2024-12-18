import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-order-display',
  templateUrl: './order-display.component.html',
  styleUrls: ['./order-display.component.scss']
})
export class OrderDisplayComponent implements OnInit {
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
    private router: Router
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
      this.fare = params['fare'];

      // Set planner image based on name
      this.plannerImage = this.getPlannerImage(this.plannerName);

      // Trigger change detection after setting values
      this.cdr.detectChanges();
    });
  }

  openPaymentDialog(): void {
    this.dialog.open(PaymentDialogComponent, {
      width: '400px'
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

  goToSupport(){
    this.router.navigate(['/support']);
  }
}
