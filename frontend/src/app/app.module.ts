import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login.component';
import { ForgetPasswordComponent } from './views/forget-password/forget-password.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { FlashMessagesModule } from 'flash-messages-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor, JwtInterceptor } from './helpers';
import { HomeComponent } from './views/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RepresentativeComponent } from './views/modules/representative/representative.component';
import { RepresentativeSaveComponent } from './views/modules/representative/representative-save/representative-save.component';
import { RepresentativeFormComponent } from './views/modules/representative/representative-form/representative-form.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentsModule } from './components/components.module';
import { CelebrityComponent } from './views/modules/celebrity/celebrity.component';
import { CelebritySaveComponent } from './views/modules/celebrity/celebrity-save/celebrity-save.component';
import { CelebrityFormComponent } from './views/modules/celebrity/celebrity-form/celebrity-form.component';
import { AccountsComponent } from './views/modules/accounts/accounts.component';
import { AccountsSaveComponent } from './views/modules/accounts/accounts-save/accounts-save.component';
import { AccountsFormComponent } from './views/modules/accounts/accounts-form/accounts-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    HomeComponent,
    RepresentativeComponent,
    RepresentativeSaveComponent,
    RepresentativeFormComponent,
    RepresentativeSaveComponent,
    RepresentativeFormComponent,
    CelebrityComponent,
    CelebritySaveComponent,
    CelebrityFormComponent,
    AccountsComponent,
    AccountsSaveComponent,
    AccountsFormComponent
  ],
  imports: [
    ComponentsModule,
    DragDropModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    MatSidenavModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSlideToggleModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
