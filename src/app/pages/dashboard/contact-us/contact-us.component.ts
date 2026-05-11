import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../../core/services/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', Validators.required]
    });
  }

  submit() {
    if (this.contactForm.invalid) return;

    this.contactService.sendMessage(this.contactForm.value).subscribe({
      next: () => {
        this.snackBar.open('Message sent successfully!', 'Close', { duration: 3000 });
        this.contactForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to send message', 'Close', { duration: 3000 });
      }
    });
  }
}
