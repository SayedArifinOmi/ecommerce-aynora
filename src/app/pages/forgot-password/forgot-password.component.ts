import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']    
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotForm.invalid) return;

    const email = this.forgotForm.value.email;
    this.auth.forgotPassword(email).subscribe({
      next: () => {
        this.snack.open('If the email exists, a reset code has been sent', 'Close', { duration: 3000 });
        this.router.navigate(['/reset-password'], { queryParams: { email } });
      },
      error: () => {
        this.snack.open('Error sending reset code', 'Close', { duration: 3000 });
      }
    });
  }
}
