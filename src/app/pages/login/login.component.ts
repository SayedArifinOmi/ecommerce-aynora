import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { tsParticles } from 'tsparticles';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;

  particlesOptions = {
    background: { color: { value: "#000000" } },
    particles: {
      number: { value: 70 },
      color: { value: "#ffd700" },
      links: { enable: true, color: "#ffd700", distance: 150, opacity: 0.5, width: 1 },
      move: { enable: true, speed: 2 },
      size: { value: 2 },
      opacity: { value: 0.7 }
    },
    interactivity: {
      events: { onHover: { enable: true, mode: "repulse" } }
    }
  };

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.particlesInit();
  }

  private particlesInit() {
    tsParticles.load('tsparticles', this.particlesOptions);
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.auth.login(this.loginForm.value as any).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.snack.open(err?.error?.message || 'Login failed', 'Close', { duration: 3000 });
      }
    });
  }
}
