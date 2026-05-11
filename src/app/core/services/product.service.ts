import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PagedResult, Product, ProductCreate } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = `${environment.apiBaseUrl}/products`;

  constructor(private http: HttpClient) {}


  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.base}/${id}`);
  }

  list(
    search = '',
    page = 1,
    pageSize = 10,
    sort = 'createdAt',
    dir: 'asc' | 'desc' = 'desc'
  ): Observable<PagedResult<Product>> {
    let params = new HttpParams()
      .set('search', search)
      .set('page', page)
      .set('pageSize', pageSize)
      .set('sort', sort)
      .set('dir', dir);
    return this.http.get<PagedResult<Product>>(this.base, { params });
  }

  get(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.base}/${id}`);
  }

  create(dto: ProductCreate): Observable<Product> {
    return this.http.post<Product>(this.base, dto);
  }

  update(id: number, dto: ProductCreate): Observable<Product> {
    return this.http.put<Product>(`${this.base}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
