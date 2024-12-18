import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for Material Animations
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatBadgeModule} from '@angular/material/badge';
import {MatAccordion, MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core'; // Datepicker Adapter
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminDashboardComponent } from './components/admin-planner/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component'; 
import { ServiceProviderDashboardComponent } from './components/service-provider/service-provider-dashboard/service-provider-dashboard.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthenticatorComponent } from './authenticator/authenticator.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserSettingsComponent } from './components/user/user-settings/user-settings.component';
import { UserFavoriteComponent } from './components/user/user-favorite/user-favorite.component';
import { UserOrdersComponent } from './components/user/user-orders/user-orders.component';
import { UserCartComponent } from './components/user/user-cart/user-cart.component';
import { UserNotificationComponent } from './components/user/user-notification/user-notification.component';
import { AdminProfileComponent } from './components/admin-planner/admin-profile/admin-profile.component';
import { AdminEventCreatorComponent } from './components/admin-planner/admin-event-creator/admin-event-creator.component';
import { AdminNotificationComponent } from './components/admin-planner/admin-notification/admin-notification.component';
import { VendorListComponent } from './components/admin-planner/vendor-list/vendor-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserSearchDialogComponent } from './components/user/user-search-dialog/user-search-dialog.component'; 
import { UserSearchLandingComponent } from './components/user/user-search-landing/user-search-landing.component'; 
import { UserNavbarComponent } from './components/user/user-navbar/user-navbar.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { PlannerProfileComponent } from './components/user/planner-profile/planner-profile.component';
import { VendorProfileComponent } from './components/user/vendor-profile/vendor-profile.component';
import { OfferLandingComponent } from './components/user/offer-landing/offer-landing.component';
import {MatDividerModule} from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSliderModule } from '@angular/material/slider';
import { OrderprevComponent } from './components/user/orderprev/orderprev.component';
import { PaymentDialogComponent } from './components/user/payment-dialog/payment-dialog.component';
import { PaymentSuccessComponent } from './components/user/payment-success/payment-success.component';
import { PaymentInProgressComponent } from './components/user/payment-in-progress/payment-in-progress.component';
import { SupportComponent } from './components/support/support.component';
import { OrderDisplayComponent } from './components/user/order-display/order-display.component';
import { DateFormatterPipe } from './date-formatter.pipe';
import { PaymentFailureComponent } from './components/user/payment-failure/payment-failure.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    ServiceProviderDashboardComponent,
    AuthenticatorComponent,
    UserProfileComponent,
    UserSettingsComponent,
    UserFavoriteComponent,
    UserOrdersComponent,
    UserCartComponent,
    UserNotificationComponent,
    AdminProfileComponent,
    AdminEventCreatorComponent,
    AdminNotificationComponent,
    VendorListComponent,
    UserSearchDialogComponent,
    UserSearchLandingComponent,
    UserNavbarComponent,
    PlannerProfileComponent,
    VendorProfileComponent,
    OfferLandingComponent,
    OrderprevComponent,
    PaymentDialogComponent,
    PaymentSuccessComponent,
    PaymentInProgressComponent,
    SupportComponent,
    OrderDisplayComponent,
    PaymentFailureComponent,
    DateFormatterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
    MatDatepickerModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTabsModule,
    MatMenuModule,
    MatStepperModule,
    MatSliderModule

  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
