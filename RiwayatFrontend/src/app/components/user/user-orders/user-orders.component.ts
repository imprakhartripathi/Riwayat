import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../orders.service';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {
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

  constructor(private ordersService: OrdersService, private authService: AuthService) {}

  ngOnInit(): void {
    this.profileData = this.authService.getCurrentUser();
    this.currentUser = this.profileData?.username || 'guestuser';
    console.log(this.currentUser);
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.ordersService.getOrders().subscribe((orders: any[]) => {
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
          console.log("No Orders Found");
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
    // Define a function to remove an order from an array
    const removeFromArray = (array: any[]) => {
      const index = array.findIndex(order => order.orderId === orderId);
      if (index !== -1) {
        array.splice(index, 1);
      }
    };
  
    // Remove from plannerOrders and its categorized arrays
    removeFromArray(this.plannerOrders);
    removeFromArray(this.todayPlannerOrders);
    removeFromArray(this.upcomingPlannerOrders);
    removeFromArray(this.previousPlannerOrders);
  
    // Remove from vendorOrders and its categorized arrays
    removeFromArray(this.vendorOrders);
    removeFromArray(this.todayVendorOrders);
    removeFromArray(this.upcomingVendorOrders);
    removeFromArray(this.previousVendorOrders);
  
    console.log(`Order with ID ${orderId} has been cancelled and removed from all arrays.`);
  }
  
  
}
