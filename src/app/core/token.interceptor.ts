import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getAccessToken();
    let cloned = req;

    if (token) {
      cloned = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    return next.handle(cloned).pipe(
      catchError((err: HttpErrorResponse) => {
        // Auto refresh on 401 if we have a refresh token
        if (err.status === 401 && this.auth.getRefreshToken() && !this.isRefreshing) {
          this.isRefreshing = true;
          return this.auth.refresh().pipe(
            switchMap(() => {
              this.isRefreshing = false;
              const newToken = this.auth.getAccessToken();
              const retried = req.clone({
                setHeaders: newToken ? { Authorization: `Bearer ${newToken}` } : {}
              });
              return next.handle(retried);
            }),
            catchError(e => {
              this.isRefreshing = false;
              this.auth.logout();
              this.router.navigate(['/login']);
              return throwError(() => e);
            })
          );
        }

        // Otherwise bubble up
        return throwError(() => err);
      })
    );
  }
}

export const TokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
};
