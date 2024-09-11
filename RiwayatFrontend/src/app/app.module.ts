import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ServiceProviderDashboardComponent } from './components/service-provider-dashboard/service-provider-dashboard.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthenticatorComponent } from './authenticator/authenticator.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    ServiceProviderDashboardComponent,
    AuthenticatorComponent
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
    MatExpansionModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
