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


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ServiceProviderDashboardComponent } from './components/service-provider-dashboard/service-provider-dashboard.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthenticatorComponent } from './authenticator/authenticator.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { UserFavoriteComponent } from './components/user-favorite/user-favorite.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserCartComponent } from './components/user-cart/user-cart.component';
import { UserNotificationComponent } from './components/user-notification/user-notification.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AdminEventCreatorComponent } from './components/admin-event-creator/admin-event-creator.component';

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
    AdminEventCreatorComponent
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
    MatButtonToggleModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
