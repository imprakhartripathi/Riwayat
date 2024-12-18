import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminDashboardComponent } from './components/admin-planner/admin-dashboard/admin-dashboard.component';
import { ServiceProviderDashboardComponent } from './components/service-provider/service-provider-dashboard/service-provider-dashboard.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component'; 
import { AuthenticatorComponent } from './authenticator/authenticator.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component'; 
import { AdminProfileComponent } from './components/admin-planner/admin-profile/admin-profile.component';
import { UserSearchLandingComponent } from './components/user/user-search-landing/user-search-landing.component'; 
import { OfferLandingComponent } from './components/user/offer-landing/offer-landing.component';
import { PlannerProfileComponent } from './components/user/planner-profile/planner-profile.component';
import { VendorProfileComponent } from './components/user/vendor-profile/vendor-profile.component';
import { Title } from '@angular/platform-browser';
import { OrderprevComponent } from './components/user/orderprev/orderprev.component';
import { PaymentSuccessComponent } from './components/user/payment-success/payment-success.component';
import { PaymentInProgressComponent } from './components/user/payment-in-progress/payment-in-progress.component';
import { SupportComponent } from './components/support/support.component';
import { OrderDisplayComponent } from './components/user/order-display/order-display.component';
import { PaymentFailureComponent } from './components/user/payment-failure/payment-failure.component';

const routes: Routes = [
  { path: '', component: AuthenticatorComponent, data: { title: 'Riwayat - Authenticator' } },
  // { path: 'admin', component: AdminDashboardComponent, data: { title: 'Riwayat - Admin Dashboard' } },
  // { path: 'serviceprov', component: ServiceProviderDashboardComponent, data: { title: 'Riwayat - Service Provider Dashboard' } },
  { path: 'user', component: UserDashboardComponent, data: { title: 'Riwayat - User Dashboard' } },
  { path: 'showcase', component: HomePageComponent, data: { title: 'Riwayat - Showcase' } },
  // { path: 'userprofile', component: UserProfileComponent, data: { title: 'Riwayat - User Profile' } },
  { path: 'adminprofile', component: AdminProfileComponent, data: { title: 'Riwayat - Admin Profile' } },
  { path: 'search/:term', component:UserSearchLandingComponent, data: { title: 'Riwayat - Search Result' } },
  { path: 'offer/:term', component: OfferLandingComponent, data: { title: 'Riwayat - Current Offers' } },
  { path: 'plannerprofile/:term', component: PlannerProfileComponent, data: { title: 'Riwayat - Planner Profile' } },
  { path: 'vendorprofile/:term', component: VendorProfileComponent, data: { title: 'Riwayat - Vendor Profile' } },
  { path: 'orderprev', component: OrderprevComponent, data: { title: 'Riwayat - Order Preview' } },
  { path: 'paysuccess', component: PaymentSuccessComponent, data: { title: 'Riwayat - Payment Successful' } },
  { path: 'payinprogress', component: PaymentInProgressComponent, data: { title: 'Riwayat - Payment in Progress' } },
  { path: 'support', component: SupportComponent, data: { title: 'Riwayat - Support & Team' } },
  { path: 'displayorder', component: OrderDisplayComponent, data: { title: 'Riwayat - Your Order' } },
  { path: 'payfail', component: PaymentFailureComponent, data: { title: 'Riwayat - Payment Failed' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
