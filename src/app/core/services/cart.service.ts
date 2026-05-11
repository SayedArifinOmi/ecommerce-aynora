import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CartItem } from '../models/cart.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { tap, catchError } from 'rxjs/operators';

const LOCAL_KEY = 'aynora_cart_v1';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: CartItem[] = [];
  private subject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.subject.asObservable();
  private api = `${environment.apiBaseUrl}/cart`;

  constructor(private http: HttpClient, private auth: AuthService) {
    const raw = localStorage.getItem(LOCAL_KEY);
    this.items = raw ? JSON.parse(raw) : [];
    this.subject.next(this.items);
  }

  private saveLocal() {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(this.items));
    this.subject.next([...this.items]);
  }

  getItemsLocal() { return [...this.items]; }

  /** Adds to cart. If logged in -> server add; otherwise local */
  add(item: CartItem): void {
    if (this.auth.isLoggedIn()) {
      // call server add
      this.http.post(`${this.api}/add`, { productId: item.productId, quantity: item.quantity }).pipe(
        tap(() => this.reloadServerCart()),
        catchError(_ => {
          // fallback: local add
          this._localAdd(item);
          return of(null);
        })
      ).subscribe();
    } else {
      this._localAdd(item);
    }
  }

  private _localAdd(item: CartItem) {
    const found = this.items.find(i => i.productId === item.productId);
    if (found) found.quantity += item.quantity;
    else this.items.push({ ...item });
    this.saveLocal();
  }

  updateQuantity(productId: number, qty: number) {
    if (this.auth.isLoggedIn()) {
      this.http.put(`${this.api}/update`, { productId, quantity: qty }).subscribe(() => this.reloadServerCart());
    } else {
      const it = this.items.find(i => i.productId === productId);
      if (!it) return;
      it.quantity = Math.max(1, qty);
      this.saveLocal();
    }
  }

  remove(productId: number) {
    if (this.auth.isLoggedIn()) {
      this.http.delete(`${this.api}/remove/${productId}`).subscribe(() => this.reloadServerCart());
    } else {
      this.items = this.items.filter(i => i.productId !== productId);
      this.saveLocal();
    }
  }

  clear() {
    if (this.auth.isLoggedIn()) {
      this.http.delete(`${this.api}/clear`).subscribe(() => this.reloadServerCart());
    } else {
      this.items = [];
      this.saveLocal();
    }
  }

  getCount(): number {
    return this.items.reduce((s, i) => s + i.quantity, 0);
  }

  getTotal(): number {
    return this.items.reduce((s, i) => s + i.price * i.quantity, 0);
  }

  // reload from server cart
  reloadServerCart() {
    if (!this.auth.isLoggedIn()) return;
    this.http.get<any>(this.api).subscribe((res: any) => {
      // server returns items array with { productId, productName, price, quantity, imageUrl, stock }
      this.items = res.items.map((x: any) => ({
        productId: x.productId,
        name: x.productName,
        price: x.price,
        quantity: x.quantity,
        imageUrl: x.imageUrl,
        stock: x.stock
      }));
      this.saveLocal(); // keep local in sync for UI reading
    });
  }
}
