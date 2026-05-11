import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  email = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.resetForm = this.fb.group({
      code: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  onSubmit() {
    if (this.resetForm.invalid) return;

    const { code, newPassword, confirmPassword } = this.resetForm.value;
    if (newPassword !== confirmPassword) {
      this.snack.open('Passwords do not match', 'Close', { duration: 3000 });
      return;
    }

    this.auth.resetPassword(this.email, code, newPassword).subscribe({
      next: () => {
        this.snack.open('Password reset successful', 'Close', { duration: 3000 });
        this.router.navigate(['/login']);
      },
      error: () => this.snack.open('Invalid or expired code', 'Close', { duration: 3000 }),
    });
  }
}
