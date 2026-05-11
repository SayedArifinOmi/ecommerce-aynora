import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

interface LoginRequest { email: string; password: string; }
interface RegisterRequest { username: string; email: string; password: string; role?: string; }
interface TokenResponse { accessToken: string; refreshToken: string; }
interface ProfileResponse { username: string; email: string; role: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
    getUserId() {
    }
  private base = environment.apiBaseUrl;
  private authUrl = `${this.base}/auth`;
  private secureUrl = `${this.base}/secure`;
    currentUser: any;

  constructor(private http: HttpClient, private router: Router) {}

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, data);
  }

  login(credentials: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.authUrl}/login`, credentials).pipe(
      tap(res => this.saveTokens(res))
    );
  }

  refresh(): Observable<TokenResponse> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<TokenResponse>(`${this.authUrl}/refresh`, { refreshToken }).pipe(
      tap(res => this.saveTokens(res))
    );
  }

getProfile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(`${this.secureUrl}/profile`);
  }
//forgotPassword(email: string): Observable<any> {
  //return this.http.post(`${this.base}/auth/forgot-password`, { email });
//}

//resetPassword(email: string, token: string, newPassword: string): Observable<any> {
  //return this.http.post(`${this.base}/auth/reset-password`, { email, token, newPassword });
//}


  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.base}/auth/forgot-password`, { email });
  }

  resetPassword(email: string, code: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.base}/auth/reset-password`, { email, code, newPassword });
  }

  logout(): void {
    // Optional: wanna server logout hit then uncomment:
    // this.http.post(`${this.authUrl}/logout`, {}).subscribe({ next: () => {} });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  isLoggedIn(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;
    // simple expiry check (optional)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  private saveTokens(res: TokenResponse) {
    localStorage.setItem('access_token', res.accessToken);
    localStorage.setItem('refresh_token', res.refreshToken);
  }
}
