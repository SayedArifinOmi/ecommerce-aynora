import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tsParticles } from 'tsparticles';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading = false;
  passwordMismatch = false;

  // Particle background settings
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

  // Form group
  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
    role: ['User']
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    tsParticles.load('tsparticles', this.particlesOptions);
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    const { username, email, password, confirmPassword, role } = this.registerForm.value;

    // Password mismatch check
    if (password !== confirmPassword) {
      this.passwordMismatch = true;
      return;
    }
    this.passwordMismatch = false;

    this.loading = true;
    this.auth.register({ username: username!, email: email!, password: password!, role: role! }).subscribe({
      next: () => {
        this.loading = false;
        this.snack.open('Registration successful! Please login.', 'Close', { duration: 2500 });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.snack.open(err?.error?.message || 'Register failed', 'Close', { duration: 3000 });
      }
    });
  }
}
