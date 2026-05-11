import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService, Product } from '../../../core/services/home.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../../core/services/cart.service';
import { CheckoutService } from '../../../core/services/checkout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];

  constructor(
    private home: HomeService,
    private router: Router,
    private snack: MatSnackBar,
    private cart: CartService,
    private checkout: CheckoutService
  ) {}

  ngOnInit(): void {
    this.home.getFeaturedProducts().subscribe({
      next: res => this.featuredProducts = res,
      error: _ => this.snack.open('Failed to load products', 'Close', { duration: 2000 })
    });
  }

  viewProduct(id: number) {
    this.router.navigate(['/dashboard/product-details', id]);
  }

 buyNow(productId: number, qty: number) {
  // find product details from featuredProducts
  const p = this.featuredProducts.find(x => x.id === productId);
  if (!p) { this.snack.open('Product not found', 'Close', { duration: 2000 }); return; }
  this.cart.add({
    productId: p.id, name: p.name, price: p.price, quantity: qty, imageUrl: p.imageUrl,
    stock: p.stock
  });
  this.snack.open('Added to cart', 'Close', { duration: 1500 });
  // optionally navigate to cart:
  this.router.navigate(['/dashboard/cart']);
}
}
