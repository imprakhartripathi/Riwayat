import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../cart.service';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {
  currentUser: string = ''; // Placeholder for the current user
  plannerOrders: any[] = []; // All Planner Orders
  vendorOrders: any[] = []; // All Vendor Orders
  todayPlannerOrders: any[] = []; // Today's Planner Orders
  todayVendorOrders: any[] = []; // Today's Vendor Orders
  upcomingPlannerOrders: any[] = [];
  upcomingVendorOrders: any[] = [];
  previousPlannerOrders: any[] = [];
  previousVendorOrders: any[] = [];
  profileData: any;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.profileData = this.authService.getCurrentUser();
    this.currentUser = this.profileData?.username || 'guestuser';
    console.log(this.currentUser);
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.cartService.getOrders().subscribe((orders: any[]) => {
      const currentDate = new Date();
      const today = new Date(currentDate).setHours(0, 0, 0, 0);

      // Filter orders based on current user
      const userOrders = orders.filter(order => order.orderBy === this.currentUser);

      // Separate and categorize orders
      userOrders.forEach(order => {
        if (order.isPlannerOrder) {
          this.plannerOrders.push(order); // Add to plannerOrders array
        } else if (order.isVendorOrder) {
          this.vendorOrders.push(order); // Add to vendorOrders array
        } else {
          console.log('No Orders Found');
        }
      });

      // Apply filters for planner and vendor orders
      this.plannerFilter();
      this.vendorFilter();
    });
  }

  plannerFilter(): void {
    const currentDate = new Date().setHours(0, 0, 0, 0);

    this.plannerOrders.forEach(order => {
      const orderDate = new Date(order.orderDetails.eventDate).getTime();

      if (orderDate === currentDate) {
        this.todayPlannerOrders.push(order); // Today's Planner Orders
      } else if (orderDate > currentDate) {
        this.upcomingPlannerOrders.push(order); // Upcoming Planner Orders
      } else {
        this.previousPlannerOrders.push(order); // Previous Planner Orders
      }
    });
  }

  vendorFilter(): void {
    const currentDate = new Date().setHours(0, 0, 0, 0);

    this.vendorOrders.forEach(order => {
      const orderDate = new Date(order.orderDetails.servingDetails.serviceDate).getTime();

      if (orderDate === currentDate) {
        this.todayVendorOrders.push(order); // Today's Vendor Orders
      } else if (orderDate > currentDate) {
        this.upcomingVendorOrders.push(order); // Upcoming Vendor Orders
      } else {
        this.previousVendorOrders.push(order); // Previous Vendor Orders
      }
    });
  }

  cancelOrder(orderId: string): void {
    const removeFromArray = (array: any[]) => {
      const index = array.findIndex(order => order.orderId === orderId);
      if (index !== -1) {
        array.splice(index, 1);
      }
    };

    removeFromArray(this.plannerOrders);
    removeFromArray(this.todayPlannerOrders);
    removeFromArray(this.upcomingPlannerOrders);
    removeFromArray(this.previousPlannerOrders);

    removeFromArray(this.vendorOrders);
    removeFromArray(this.todayVendorOrders);
    removeFromArray(this.upcomingVendorOrders);
    removeFromArray(this.previousVendorOrders);

    console.log(`Order with ID ${orderId} has been cancelled and removed from all arrays.`);
  }

  placePlannerOrder(orderId: string): void {
    // Find the planner order by orderId
    const order = this.plannerOrders.find(order => order.orderId === orderId);
  
    if (order) {
      this.router.navigate(['/orderprev'], {
        queryParams: {
          orderDetails: JSON.stringify(order.orderDetails), // Send the detailed order object
          isPlannerOrder: 'true', // Specify it's a planner order
          plannerName: order.plannerName || '', // Pass planner name
          tier: order.tier || '', // Pass tier information
          plannerFare: order.fare || '' // Pass planner fare
        }
      });
      console.log('Navigated to orderprev with planner order details:', order);
    } else {
      console.error('Planner order not found');
    }
    this.dialog.closeAll();
  }
  
  placeVendorOrder(orderId: string): void {
    // Find the vendor order by orderId
    const order = this.vendorOrders.find(order => order.orderId === orderId);
  
    if (order) {
      this.router.navigate(['/orderprev'], {
        queryParams: {
          orderDetails: JSON.stringify(order.orderDetails), // Send the detailed order object
          isVendorOrder: 'true', // Specify it's a vendor order
          plannerName: order.vendorName || '', // Pass vendor name as plannerName for consistency
          tier: '', // No tier for vendor orders
          plannerFare: order.vendorFare || '' // Pass vendor fare
        }
      });
      console.log('Navigated to orderprev with vendor order details:', order);
    } else {
      console.error('Vendor order not found');
    }
    this.dialog.closeAll();
  }
  

}
