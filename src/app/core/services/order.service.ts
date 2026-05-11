import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiBaseUrl}/orders`;

  constructor(private http: HttpClient) {}

  // Get all orders (Admin)
  getOrders(search = '', page = 1, pageSize = 10, status?: string): Observable<any> {
    let params = new HttpParams()
      .set('search', search)
      .set('page', page)
      .set('pageSize', pageSize);

    if (status) params = params.set('status', status);

    return this.http.get(`${this.apiUrl}`, { params });
  }

  // Get current user orders
  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/my-orders`);
  }

  // This is the method component is calling
  setOrderStatus(orderId: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${orderId}/status`, { status });
  }

  
}
