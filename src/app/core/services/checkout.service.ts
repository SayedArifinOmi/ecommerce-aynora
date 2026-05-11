import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateOrderDto, OrderCreatedResponse, PayRequest, PayResponse } from '../models/checkout.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = `${environment.apiBaseUrl}/checkout`;

  constructor(private http: HttpClient) {}

 
  createOrder(dto: CreateOrderDto): Observable<OrderCreatedResponse> {
    return this.http.post<OrderCreatedResponse>(`${this.apiUrl}/create-order`, dto);
  }

  // Start payment process
   
  pay(request: PayRequest): Observable<PayResponse> {
    return this.http.post<PayResponse>(`${this.apiUrl}/pay`, request);
  }


  confirmStripePayment(sessionId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirm?sessionId=${sessionId}`, {});
  }

  // Get order by Stripe session
   
  getOrderBySession(sessionId: string): Observable<any> {
    return this.confirmStripePayment(sessionId);
  }

  // Get current user’s orders
  
  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/my-orders`);
  }
}
