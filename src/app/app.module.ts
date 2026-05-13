import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
//import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';               // ← [(ngModel)] এর জন্য
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgParticlesModule } from 'ng-particles';

// ── Angular Material ──
import { MatToolbarModule }          from '@angular/material/toolbar';
import { MatCardModule }             from '@angular/material/card';
import { MatFormFieldModule }        from '@angular/material/form-field';
import { MatInputModule }            from '@angular/material/input';
import { MatSelectModule }           from '@angular/material/select';
import { MatButtonModule }           from '@angular/material/button';
import { MatProgressSpinnerModule }  from '@angular/material/progress-spinner';
import { MatSnackBarModule }         from '@angular/material/snack-bar';
import { MatListModule }             from '@angular/material/list';
import { MatIconModule }             from '@angular/material/icon';      // ← mat-icon
import { MatRippleModule }           from '@angular/material/core';      // ← matRipple
import { MatTooltipModule }          from '@angular/material/tooltip';   // ← matTooltip
import { MatDividerModule }          from '@angular/material/divider';   // ← mat-divider

// ── Components ──
import { AppComponent }              from './app.component';
import { LoginComponent }            from './pages/login/login.component';
import { RegisterComponent }         from './pages/register/register.component';
import { ForgotPasswordComponent }   from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent }    from './pages/reset-password/reset-password.component';
import { LandingComponent }          from './pages/landing/landing.component';
import { TokenInterceptor }          from './core/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,              // ← [(ngModel)] এর জন্য
    HttpClientModule,
    RouterModule,
    NgParticlesModule,

    // Material
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatListModule,
    MatIconModule,            // ← mat-icon
    MatRippleModule,          // ← matRipple / matRippleColor
    MatTooltipModule,         // ← matTooltip
    MatDividerModule,         // ← mat-divider
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }