import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class HomeService {
  private base = `${environment.apiBaseUrl}/home`;

  constructor(private http: HttpClient) {}

 getFeaturedProducts(): Observable<Product[]> {
  return this.http.get<Product[]>(`${this.base}/featured`);
}


  getProduct(id: number): Observable<Product> {   // return Observable<Product>
    return this.http.get<Product>(`${this.base}/${id}`);
  }
}


