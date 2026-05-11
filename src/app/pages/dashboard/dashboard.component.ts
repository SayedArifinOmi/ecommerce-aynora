import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppUser } from '../../core/models/user.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  profile?: AppUser;
  searchText = '';
  isDarkMode = false;
  static search$ = new BehaviorSubject<string>('');

  constructor(private profileSrv: ProfileService, private router: Router) {}

  ngOnInit(): void {
    this.profileSrv.me().subscribe(p => (this.profile = p));

    // Better dark mode initialization
    const storedDarkMode = localStorage.getItem('darkMode');
    this.isDarkMode = storedDarkMode ? storedDarkMode === 'true' : false;
    this.updateBodyClass();
  }

  onSearchChange() {
    DashboardComponent.search$.next(this.searchText.trim());
  }

  clearSearch() {
    this.searchText = '';
    this.onSearchChange();
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  toggleDarkMode(event: MatSlideToggleChange) {
    this.isDarkMode = event.checked;
    localStorage.setItem('darkMode', String(this.isDarkMode));
    this.updateBodyClass();
  }

  private updateBodyClass() {
    const body = document.body;
    const html = document.documentElement;
    
    if (this.isDarkMode) {
      body.classList.add('dark-mode');
      html.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
      html.classList.remove('dark-mode');
    }
  }
}