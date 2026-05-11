import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AppUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private base = `${environment.apiBaseUrl}/profile`;
  constructor(private http: HttpClient) {}

  me() { return this.http.get<AppUser>(`${this.base}/me`); }
  update(data: Partial<AppUser>) { return this.http.put<AppUser>(`${this.base}/me`, data); }
  changePassword(currentPassword: string, newPassword: string) {
    return this.http.put<void>(`${this.base}/password`, { currentPassword, newPassword });
  }
}
