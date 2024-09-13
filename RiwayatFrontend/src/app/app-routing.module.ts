import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ServiceProviderDashboardComponent } from './components/service-provider-dashboard/service-provider-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AuthenticatorComponent } from './authenticator/authenticator.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: AuthenticatorComponent, data: { title: 'Riwayat - Authenticator' } },
  { path: 'admin', component: AdminDashboardComponent, data: { title: 'Riwayat - Admin Dashboard' } },
  { path: 'serviceprov', component: ServiceProviderDashboardComponent, data: { title: 'Riwayat - Service Provider Dashboard' } },
  { path: 'user', component: UserDashboardComponent, data: { title: 'Riwayat - User Dashboard' } },
  { path: 'showcase', component: HomePageComponent, data: { title: 'Riwayat - Showcase' } },
  { path: 'userprofile', component: UserProfileComponent, data: { title: 'Riwayat - User Profile' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
