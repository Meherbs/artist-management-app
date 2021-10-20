import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ForgetPasswordComponent } from './views/forget-password/forget-password.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { LogsComponent } from './views/modules/logs/logs.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'connections', loadChildren: () => import('./views/modules/connections/connections.module').then(m => m.ConnectionsModule) },
      { path: 'accounts', loadChildren: () => import('./views/modules/accounts/accounts.module').then(m => m.AccountsModule) },
      { path: 'celebrity', loadChildren: () => import('./views/modules/celebrity/celebrity.module').then(m => m.CelebrityModule) },
      { path: 'representatives', loadChildren: () => import('./views/modules/representative/representative.module').then(m => m.RepresentativeModule) },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'logs', component: LogsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'home/dashboard', pathMatch: 'full' }
    ],
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: 'home/dashboard' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
