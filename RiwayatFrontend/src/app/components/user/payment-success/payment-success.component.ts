import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
  orderDetails: any;
  plannerName!: string;
  tier!: string;
  plannerImage!: string;
  isPlannerOrder!: boolean;
  fare!: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderDetails = params['orderDetails'] ? JSON.parse(params['orderDetails']) : {};
      this.plannerName = params['plannerName'];
      this.tier = params['tier'];
      this.plannerImage = params['plannerImage'];
      this.isPlannerOrder = params['isPlannerOrder'] === 'true';
      this.fare = params['fare'];
    });

    console.log(this.orderDetails, this.plannerImage, this.plannerName, this.tier, this.isPlannerOrder, this.fare)
  }

  goToDisplayOrders() {
    this.router.navigate(['displayorder'], {
      queryParams: {
        orderDetails: JSON.stringify(this.orderDetails),  // Convert orderDetails to JSON string
        plannerImage: this.plannerImage,
        plannerName: this.plannerName,
        tier: this.tier,
        isPlannerOrder: this.isPlannerOrder,
        fare: this.fare
      }
    });
  }
}
