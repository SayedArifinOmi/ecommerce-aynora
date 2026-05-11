import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../core/services/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: any[] = [];
  loading = false;

  constructor(
    private contactService: ContactService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.loading = true;
    this.contactService.getMessages().subscribe({
      next: res => { this.messages = res; this.loading = false; },
      error: err => { console.error(err); this.loading = false; }
    });
  }

  deleteMessage(id: number) {
    if (!confirm('Are you sure?')) return;

    this.contactService.deleteMessage(id).subscribe({
      next: () => {
        this.snackBar.open('Message deleted', 'Close', { duration: 2000 });
        this.messages = this.messages.filter(m => m.id !== id);
      },
      error: err => console.error(err)
    });
  }

  markRead(message: any) {
    if (message.isRead) return;

    this.contactService.markRead(message.id).subscribe({
      next: (res) => {
        message.isRead = true;
      },
      error: err => console.error(err)
    });
  }
}
