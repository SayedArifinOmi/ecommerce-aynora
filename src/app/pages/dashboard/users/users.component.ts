import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppUser } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  cols = ['id','username','email','role'];
  rows: AppUser[] = [];

  constructor(private api: UserService, private snack: MatSnackBar) {}
  ngOnInit(): void { this.api.list().subscribe(r => this.rows = r); }

  setRole(id: number, role: string) {
    this.api.setRole(id, role).subscribe({
      next: () => this.snack.open('Role updated', 'Close', { duration: 1500 }),
      error: () => this.snack.open('Update failed', 'Close', { duration: 2000 })
    });
  }
}
