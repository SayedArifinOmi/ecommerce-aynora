import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../../../core/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: { username: string; email: string } | null = null;

  pwd = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private api: ProfileService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.api.me().subscribe(u => {
      this.user = { username: u.username, email: u.email };
    });
  }

  changePwd() {
    if (this.pwd.invalid) return;
    const { currentPassword, newPassword } = this.pwd.value;
    this.api.changePassword(currentPassword!, newPassword!).subscribe({
      next: () =>
        this.snack.open('Password changed', 'Close', { duration: 1500 }),
      error: () =>
        this.snack.open('Change failed', 'Close', { duration: 2000 })
    });
  }
}
